package tests.augment.runner.helper;

import java.net.MalformedURLException;
import java.net.URL;
import java.util.HashMap;
import java.util.Map;

import org.openqa.selenium.Dimension;
import org.openqa.selenium.Platform;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.chrome.ChromeDriver;
import org.openqa.selenium.chrome.ChromeOptions;
import org.openqa.selenium.firefox.FirefoxDriver;
import org.openqa.selenium.ie.InternetExplorerDriver;
import org.openqa.selenium.remote.DesiredCapabilities;
import org.openqa.selenium.remote.RemoteWebDriver;
import org.openqa.selenium.safari.SafariDriver;

import com.xceptance.xlt.api.util.XltProperties;
import com.xceptance.xlt.engine.SessionImpl;

import tests.augment.annotation.TestTargets;
import tests.augment.runner.AnnotationRunnerConfiguration;

public final class AnnotationRunnerHelper
{

    /**
     * The prefix of all factory-related configuration settings.
     */
    private static final String PROP_PREFIX_WEB_DRIVER = "xlt.webDriver";

    /**
     * Returns an {@link URL} to SauceLabs that contains username and access-key from xlt properties
     * <p>
     * Credentials are read from <B>/config/project.properties</B>
     * <ul>
     * <li>saucelab.username is your saucelab username
     * <li>saucelab.accesskey is the access key generated for your SauceLab account. Not to be confused with the
     * SauceLab account password
     * </ul>
     * 
     * @return {@link URL} to SauceLabs augmented with credentials
     */
    public static URL createSauceLabUrl()
    {
        XltProperties xltProperties = XltProperties.getInstance();
        String saucelabUsername = xltProperties.getProperty("saucelab.username");
        String saucelabAccesskey = xltProperties.getProperty("saucelab.accesskey");

        try
        {
            return new URL("http://" + saucelabUsername + ":" + saucelabAccesskey + "@ondemand.saucelabs.com:80/wd/hub");
        }
        catch (MalformedURLException e)
        {
            throw new RuntimeException(e);
        }
    }

    public static DesiredCapabilities setUpBrowserCapabilities(AnnotationRunnerConfiguration config)
    {
        DesiredCapabilities capabilities = null;

        boolean isMobileDevice = config.getBrowser().isMobileDevice();

        // instantiate browser driver
        switch (config.getBrowser())
        {
            case InternetExplorer:
                capabilities = DesiredCapabilities.internetExplorer();
                break;

            case Chrome:
                capabilities = DesiredCapabilities.chrome();
                break;

            case Firefox:
                capabilities = DesiredCapabilities.firefox();
                break;

            case Safari:
                capabilities = DesiredCapabilities.safari();

            default:
                // mobile emulation is currently only available with chrome
                if (isMobileDevice)
                {
                    capabilities = DesiredCapabilities.chrome();
                }
                break;
        }

        // set specific os-version for saucelab browser-version/os-version mapping
        switch (config.getScope())
        {
            case SauceLabs:
                switch (config.getBrowser())
                {
                    case InternetExplorer:
                        if ("8.0".equals(config.getBrowserVersion()))
                        {
                            capabilities.setCapability("platform", Platform.WINDOWS);
                        }
                        else if ("11.0".equals(config.getBrowserVersion()))
                        {
                            capabilities.setCapability("platform", Platform.WIN8_1);
                        }
                        else
                        {
                            // default platform for all other versions of internet explorer
                            capabilities.setCapability("platform", Platform.WIN8_1);
                        }
                        break;

                    default:
                        break;
                }
                break;

            default:
                break;
        }

        // set browser version
        capabilities.setVersion(config.getBrowserVersion());

        // set test case name
        capabilities.setCapability("name", config.toString());

        return capabilities;
    }

    /**
     * Sets the browser window size
     * <p>
     * Reads the default size from xlt properties and applies them to the browser window as long as its no
     * device-emulation test. In case of device-emulation the emulated device specifies the size of the browser window.
     * <p>
     * If there is no window size defined in properties, there is an fallback to 1024 X 768
     * 
     * @param config
     * @param driver
     */
    public static void setBrowserWindowSize(AnnotationRunnerConfiguration config, WebDriver driver)
    {
        if (config.getBrowser().isDesktopDevice())
        {
            final int screenWidth;
            final int screenHeight;

            // get the configured window size and set it if defined
            final XltProperties props = XltProperties.getInstance();

            final int windowWidth = props.getProperty(getEffectiveKey(PROP_PREFIX_WEB_DRIVER + ".window.width"), -1);
            final int windowHeight = props.getProperty(getEffectiveKey(PROP_PREFIX_WEB_DRIVER + ".window.height"), -1);

            if (windowWidth > 0 && windowHeight > 0)
            {
                screenWidth = windowWidth;
                screenHeight = windowHeight;
            }
            else
            {
                // use average browser size as default according to
                // http://www.w3schools.com/browsers/browsers_display.asp
                // "As of today, about 97% of our visitors have a screen resolution of 1024x768 pixels or higher:"
                screenWidth = 1024;
                screenHeight = 768;
            }

            Dimension browserSize = new Dimension(screenWidth, screenHeight);
            driver.manage().window().setSize(browserSize);
        }
    }

    /**
     * Instantiate the {@link WebDriver} according to the configuration read from {@link TestTargets} annotations.
     * 
     * @param config
     * @return
     */
    public static WebDriver createWebdriver(AnnotationRunnerConfiguration config)
    {
        DesiredCapabilities capabilities = setUpBrowserCapabilities(config);

        // check for mobile device emulation (only available on chrome) and set required capabilities
        boolean isMobileDevice = config.getBrowser().isMobileDevice();
        if (isMobileDevice)
        {
            Map<String, String> mobileEmulation = new HashMap<String, String>();
            mobileEmulation.put("deviceName", config.getBrowser().getDeviceName());

            Map<String, Object> chromeOptions = new HashMap<String, Object>();
            chromeOptions.put("mobileEmulation", mobileEmulation);
            capabilities.setCapability(ChromeOptions.CAPABILITY, chromeOptions);
        }

        switch (config.getScope())
        {
            case SauceLabs:
                return new RemoteWebDriver(AnnotationRunnerHelper.createSauceLabUrl(), capabilities);

            case Local:
                switch (config.getBrowser())
                {
                    case InternetExplorer:
                        return new InternetExplorerDriver(capabilities);

                    case Chrome:
                        return new ChromeDriver(capabilities);

                    case Firefox:
                        return new FirefoxDriver(capabilities);

                    case Safari:
                        return new SafariDriver(capabilities);

                    default:
                        if (isMobileDevice)
                        {
                            return new ChromeDriver(capabilities);
                        }
                        break;
                }

            default:
                break;
        }

        return null;
    }

    /**
     * Returns the effective key to be used for property lookup via one of the getProperty(...) methods.
     * <p>
     * When looking up a key, "password" for example, the following effective keys are tried, in this order:
     * <ol>
     * <li>the test user name plus simple key, e.g. "TAuthor.password"</li>
     * <li>the test class name plus simple key, e.g. "com.xceptance.xlt.samples.tests.TAuthor.password"</li>
     * <li>the simple key, e.g. "password"</li>
     * </ol>
     * 
     * @param bareKey
     *            the bare property key, i.e. without any prefixes
     * @return the first key that produces a result
     */
    private static String getEffectiveKey(final String bareKey)
    {
        final SessionImpl session = SessionImpl.getCurrent();
        if (session == null)
        {
            return bareKey;
        }

        final String effectiveKey;
        final XltProperties properties = XltProperties.getInstance();

        // 1. use the current user name as prefix
        final String userNameQualifiedKey = session.getUserName() + "." + bareKey;
        if (properties.containsKey(userNameQualifiedKey))
        {
            effectiveKey = userNameQualifiedKey;
        }
        else
        {
            // 2. use the current class name as prefix
            final String classNameQualifiedKey = session.getTestCaseClassName() + "." + bareKey;
            if (properties.containsKey(classNameQualifiedKey))
            {
                effectiveKey = classNameQualifiedKey;
            }
            else
            {
                // 3. use the bare key
                effectiveKey = bareKey;
            }
        }

        return effectiveKey;
    }
}
