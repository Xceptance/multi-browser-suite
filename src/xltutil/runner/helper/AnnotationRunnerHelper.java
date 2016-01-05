package xltutil.runner.helper;

import java.net.MalformedURLException;
import java.net.URL;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.apache.commons.lang3.StringUtils;
import org.apache.http.HttpHost;
import org.apache.http.auth.AuthScope;
import org.apache.http.auth.Credentials;
import org.apache.http.auth.UsernamePasswordCredentials;
import org.apache.http.impl.client.BasicCredentialsProvider;
import org.apache.http.impl.client.CloseableHttpClient;
import org.apache.http.impl.client.HttpClientBuilder;
import org.openqa.selenium.Dimension;
import org.openqa.selenium.UnsupportedCommandException;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebDriverException;
import org.openqa.selenium.chrome.ChromeDriver;
import org.openqa.selenium.firefox.FirefoxDriver;
import org.openqa.selenium.ie.InternetExplorerDriver;
import org.openqa.selenium.remote.BrowserType;
import org.openqa.selenium.remote.CommandInfo;
import org.openqa.selenium.remote.DesiredCapabilities;
import org.openqa.selenium.remote.HttpCommandExecutor;
import org.openqa.selenium.remote.RemoteWebDriver;

import com.xceptance.xlt.api.util.XltProperties;
import com.xceptance.xlt.engine.SessionImpl;

import xltutil.annotation.TestTargets;
import xltutil.dto.BrowserConfigurationDto;
import xltutil.dto.ProxyConfigurationDTO;
import xltutil.mapper.PropertiesToBrowserConfigurationMapper;
import xltutil.mapper.PropertiesToProxyConfigurationMapper;
import xltutil.proxy.ProxyHttpClient;

public final class AnnotationRunnerHelper
{
    private static final String PROXY_PROPERTY_KEY = "com.xceptance.xlt.proxy";

    private static List<String> chromeBrowsers = new ArrayList<String>();

    private static List<String> firefoxBrowsers = new ArrayList<String>();

    private static List<String> internetExplorerBrowsers = new ArrayList<String>();

    static
    {
        chromeBrowsers.add(BrowserType.ANDROID);
        chromeBrowsers.add(BrowserType.CHROME);

        firefoxBrowsers.add(BrowserType.FIREFOX);
        firefoxBrowsers.add(BrowserType.FIREFOX_CHROME);
        firefoxBrowsers.add(BrowserType.FIREFOX_PROXY);

        internetExplorerBrowsers.add(BrowserType.IE);
        internetExplorerBrowsers.add(BrowserType.IE_HTA);
        internetExplorerBrowsers.add(BrowserType.IEXPLORE);
        internetExplorerBrowsers.add(BrowserType.IEXPLORE_PROXY);
    }

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

    /**
     * Sets the browser window size
     * <p>
     * Reads the default size from xlt properties and applies them to the browser window as long as its no
     * device-emulation test. In case of device-emulation the emulated device specifies the size of the browser window.
     *
     * @param config
     * @param driver
     */
    public static void setBrowserWindowSize(BrowserConfigurationDto config, WebDriver driver)
    {
        XltProperties props = XltProperties.getInstance();

        // get the configured window size and set it if defined
        int windowWidth = props.getProperty(getEffectiveKey(PROP_PREFIX_WEB_DRIVER + ".window.width"), -1);
        int windowHeight = props.getProperty(getEffectiveKey(PROP_PREFIX_WEB_DRIVER + ".window.height"), -1);

        int configuredBrowserWidth = config.getBrowserWidth();
        int configuredBrowserHeight = config.getBrowserHeight();

        Dimension browserSize = null;
        // first check if the configured browserprofile has a defined size, else use the xlt default browser size
        if (configuredBrowserWidth > 0 && configuredBrowserHeight > 0)
        {
            browserSize = new Dimension(configuredBrowserWidth, configuredBrowserHeight);
        }
        else if (windowWidth > 0 && windowHeight > 0)
        {
            browserSize = new Dimension(windowWidth, windowHeight);
        }

        try
        {
            driver.manage().window().setSize(browserSize);
        }
        catch (UnsupportedCommandException e)
        {
            // same as the exception handling below
            if (!e.getMessage().contains("not yet supported"))
                throw e;
        }
        catch (WebDriverException e)
        {
            // on saucelabs in some cases like iphone emulation you cant resize the browser.
            // they throw an unchecked WebDriverException with the message "Not yet implemented"
            // if we catch an exception we check the message. if another message is set we throw the exception else
            // we suppress it
            if (!e.getMessage().contains("Not yet implemented"))
                throw e;
        }
    }

    /**
     * Instantiate the {@link WebDriver} according to the configuration read from {@link TestTargets} annotations.
     *
     * @param config
     * @param proxyConfig
     * @return
     * @throws MalformedURLException
     */
    public static WebDriver createWebdriver(BrowserConfigurationDto config, ProxyConfigurationDTO proxyConfig) throws MalformedURLException
    {
        DesiredCapabilities capabilities = config.getCapabilities(); // setUpBrowserCapabilities(config);

        switch (config.getScope())
        {
            case SauceLabs:
                if (proxyConfig == null)
                {
                    return new RemoteWebDriver(AnnotationRunnerHelper.createSauceLabUrl(), capabilities);
                }
                else
                {
                    BasicCredentialsProvider basicCredentialsProvider = new BasicCredentialsProvider();

                    XltProperties xltProperties = XltProperties.getInstance();
                    String saucelabUsername = xltProperties.getProperty("saucelab.username");
                    String saucelabAccesskey = xltProperties.getProperty("saucelab.accesskey");

                    AuthScope proxyAuth = new AuthScope(proxyConfig.getHost(), Integer.valueOf(proxyConfig.getPort()));
                    Credentials proxyCredentials = new UsernamePasswordCredentials(proxyConfig.getUsername(), proxyConfig.getPassword());
                    basicCredentialsProvider.setCredentials(proxyAuth, proxyCredentials);

                    AuthScope saucelabsAuth = new AuthScope("ondemand.saucelabs.com", 80);
                    Credentials saucelabsCredentials = new UsernamePasswordCredentials(saucelabUsername, saucelabAccesskey);
                    basicCredentialsProvider.setCredentials(saucelabsAuth, saucelabsCredentials);

                    HttpClientBuilder clientBuilder = HttpClientBuilder.create();
                    clientBuilder.setDefaultCredentialsProvider(basicCredentialsProvider);
                    clientBuilder.setProxy(new HttpHost(proxyConfig.getHost(), Integer.valueOf(proxyConfig.getPort())));
                    CloseableHttpClient httpClient = clientBuilder.build();

                    Map<String, CommandInfo> additionalCommands = new HashMap<String, CommandInfo>();

                    HttpCommandExecutor httpCommandExecutor = new HttpCommandExecutor(additionalCommands,
                                                                                      new URL("http://ondemand.saucelabs.com/wd/hub"),
                                                                                      new ProxyHttpClient(httpClient));

                    return new RemoteWebDriver(httpCommandExecutor, capabilities);
                }

            case Local:
                String browserName = config.getCapabilities().getBrowserName();
                if (chromeBrowsers.contains(browserName))
                {
                    return new ChromeDriver(capabilities);
                }
                else if (firefoxBrowsers.contains(browserName))
                {
                    return new FirefoxDriver(capabilities);
                }
                else if (internetExplorerBrowsers.contains(browserName))
                {
                    return new InternetExplorerDriver(capabilities);
                }

                break;

            default:
                break;
        }

        return null;
    }

    public static Map<String, BrowserConfigurationDto> parseBrowserProperties(XltProperties properties)
    {
        // Structur browserprofile.<nametag>.*

        // property prefix for browser configurations
        String propertyKeyBrowsers = "browserprofile";

        // get all properties with prefix browserprofile. they are then truncated to <nametag>.*
        // holds all found browser configurations
        Map<String, String> browserProperties = properties.getPropertiesForKey(propertyKeyBrowsers);

        // a temporary list to hold all found browser tags
        List<String> browserTags = new ArrayList<String>();

        // create a list of tags referencing browser configurations
        for (String key : browserProperties.keySet())
        {
            String[] parts = key.split("\\.");
            String browserTag = parts[0];
            if (!StringUtils.isEmpty(browserTag) && !browserTags.contains(browserTag))
                browserTags.add(browserTag);
        }

        // map to hold all browser configurations. lookup via browser tag
        Map<String, BrowserConfigurationDto> browserConfigurations = new HashMap<String, BrowserConfigurationDto>();

        // parse all browser properties and add them to the map
        PropertiesToBrowserConfigurationMapper mapper = new PropertiesToBrowserConfigurationMapper();
        for (String browserTag : browserTags)
        {
            browserProperties = properties.getPropertiesForKey(propertyKeyBrowsers + "." + browserTag);
            browserProperties.put("browserTag", browserTag);

            if (browserConfigurations.get(browserTag) == null)
                browserConfigurations.put(browserTag, mapper.toDto(browserProperties));
        }

        return browserConfigurations;
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

    public static ProxyConfigurationDTO parseProxySettings(XltProperties xltProperties) throws Exception
    {

        String strProxyEnabled = xltProperties.getProperty(PROXY_PROPERTY_KEY);

        if (Boolean.parseBoolean(strProxyEnabled))
        {
            PropertiesToProxyConfigurationMapper proxyMapper = new PropertiesToProxyConfigurationMapper();
            ProxyConfigurationDTO proxyConfiguration = proxyMapper.toDto(xltProperties.getPropertiesForKey(PROXY_PROPERTY_KEY));

            // if (!StringUtils.isEmpty(proxyConfiguration.getHost()))
            // System.setProperty("http.proxyHost", proxyConfiguration.getHost());
            //
            // if (!StringUtils.isEmpty(proxyConfiguration.getPort()))
            // System.setProperty("http.proxyPort", proxyConfiguration.getPort());

            return proxyConfiguration;
        }

        return null;
    }
}
