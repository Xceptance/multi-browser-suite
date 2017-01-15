package xltutil.runner.helper;

import java.io.File;
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
import org.openqa.selenium.Proxy;
import org.openqa.selenium.UnsupportedCommandException;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebDriverException;
import org.openqa.selenium.chrome.ChromeDriver;
import org.openqa.selenium.chrome.ChromeOptions;
import org.openqa.selenium.firefox.FirefoxBinary;
import org.openqa.selenium.firefox.FirefoxDriver;
import org.openqa.selenium.ie.InternetExplorerDriver;
import org.openqa.selenium.remote.BrowserType;
import org.openqa.selenium.remote.CapabilityType;
import org.openqa.selenium.remote.CommandInfo;
import org.openqa.selenium.remote.DesiredCapabilities;
import org.openqa.selenium.remote.HttpCommandExecutor;
import org.openqa.selenium.remote.RemoteWebDriver;

import com.xceptance.xlt.api.util.XltProperties;
import com.xceptance.xlt.engine.SessionImpl;

import xltutil.annotation.TestTargets;
import xltutil.dto.BrowserConfigurationDto;
import xltutil.dto.ProxyConfigurationDto;
import xltutil.mapper.PropertiesToBrowserConfigurationMapper;
import xltutil.proxy.ProxyHttpClient;

public final class AnnotationRunnerHelper
{
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
     * Returns an {@link URL} to a Selenium grid (e.g. SauceLabs) that contains basic authentication for access
     * 
     * @return {@link URL} to Selenium grid augmented with credentials
     * @throws MalformedURLException
     */
    public static HttpCommandExecutor createGridExecutor(final ProxyConfigurationDto proxyConfig, final URL gridUrl, final String gridUsername,
                                                         final String gridPassword) throws MalformedURLException
    {
        // create a configuration for accessing target site via proxy (if a proxy is defined)
        // the proxy and the destination site will have different or no credentials for accessing them
        // so we need to create different authentication scopes and link them with the credentials
        final BasicCredentialsProvider basicCredentialsProvider = new BasicCredentialsProvider();

        // create credentials for proxy access
        if (proxyConfig != null //
        && !StringUtils.isEmpty(proxyConfig.getUsername()) //
        && !StringUtils.isEmpty(proxyConfig.getPassword()))
        {
            final AuthScope proxyAuth = new AuthScope(proxyConfig.getHost(), Integer.valueOf(proxyConfig.getPort()));
            final Credentials proxyCredentials = new UsernamePasswordCredentials(proxyConfig.getUsername(), proxyConfig.getPassword());
            basicCredentialsProvider.setCredentials(proxyAuth, proxyCredentials);
        }

        // create credentials for target website
        final AuthScope gridAuth = new AuthScope(gridUrl.getHost(), gridUrl.getPort());

        if (!StringUtils.isEmpty(gridUsername))
        {
            final Credentials gridCredentials = new UsernamePasswordCredentials(gridUsername, gridPassword);
            basicCredentialsProvider.setCredentials(gridAuth, gridCredentials);
        }

        // now create a http client, set the custom proxy and inject the credentials
        final HttpClientBuilder clientBuilder = HttpClientBuilder.create();
        clientBuilder.setDefaultCredentialsProvider(basicCredentialsProvider);
        if (proxyConfig != null)
            clientBuilder.setProxy(new HttpHost(proxyConfig.getHost(), Integer.valueOf(proxyConfig.getPort())));
        final CloseableHttpClient httpClient = clientBuilder.build();

        final Map<String, CommandInfo> additionalCommands = new HashMap<String, CommandInfo>();   // just a dummy

        // this command executor will do the credential magic for us. both proxy and target site credentials
        return new HttpCommandExecutor(additionalCommands, gridUrl, new ProxyHttpClient(httpClient));

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
    public static void setBrowserWindowSize(final BrowserConfigurationDto config, final WebDriver driver)
    {
        final XltProperties props = XltProperties.getInstance();

        // get the configured window size and set it if defined
        final int windowWidth = props.getProperty(getEffectiveKey(PROP_PREFIX_WEB_DRIVER + ".window.width"), -1);
        final int windowHeight = props.getProperty(getEffectiveKey(PROP_PREFIX_WEB_DRIVER + ".window.height"), -1);

        final int configuredBrowserWidth = config.getBrowserWidth();
        final int configuredBrowserHeight = config.getBrowserHeight();

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
        catch (final UnsupportedCommandException e)
        {
            // same as the exception handling below
            if (!e.getMessage().contains("not yet supported"))
                throw e;
        }
        catch (final WebDriverException e)
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
     * Creates a {@link FirefoxBinary} object and sets the path, but only if the path is not blank.
     * 
     * @param pathToBrowser
     *            the path to the browser binary
     * @return the Firefox binary
     */
    private static FirefoxBinary createFirefoxBinary(final String pathToBrowser)
    {
        if (StringUtils.isNotBlank(pathToBrowser))
        {
            return new FirefoxBinary(new File(pathToBrowser));
        }
        else
        {
            return new FirefoxBinary();
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
    public static WebDriver createWebdriver(final BrowserConfigurationDto config, final ProxyConfigurationDto proxyConfig) throws MalformedURLException
    {
        final DesiredCapabilities capabilities = config.getCapabilities();

        final String testEnvironment = config.getTestEnvironment();

        if (StringUtils.isEmpty(testEnvironment) || "local".equalsIgnoreCase(testEnvironment))
        {
            if (proxyConfig != null)
            {
                final String proxyHost = proxyConfig.getHost() + ":" + proxyConfig.getPort();

                final Proxy webdriverProxy = new Proxy();
                webdriverProxy.setHttpProxy(proxyHost);
                webdriverProxy.setSslProxy(proxyHost);
                webdriverProxy.setFtpProxy(proxyHost);
                if (!StringUtils.isEmpty(proxyConfig.getUsername()) && !StringUtils.isEmpty(proxyConfig.getPassword()))
                {
                    webdriverProxy.setSocksUsername(proxyConfig.getUsername());
                    webdriverProxy.setSocksPassword(proxyConfig.getPassword());
                }

                capabilities.setCapability(CapabilityType.PROXY, webdriverProxy);
            }

            final String browserName = config.getCapabilities().getBrowserName();
            if (chromeBrowsers.contains(browserName))
            {
                // do we have a custom path?
                final String pathToBrowser = XltProperties.getInstance().getProperty(XltPropertyKey.CHROME_PATH);
                if (StringUtils.isNotBlank(pathToBrowser))
                {
                    final ChromeOptions options = new ChromeOptions();
                    options.setBinary(pathToBrowser);
                    capabilities.setCapability(ChromeOptions.CAPABILITY, options);
                }     
                return new ChromeDriver(capabilities);
            }
            else if (firefoxBrowsers.contains(browserName))
            {
                final String pathToBrowser = XltProperties.getInstance().getProperty(XltPropertyKey.FIREFOX_PATH);
                final FirefoxBinary binary = createFirefoxBinary(pathToBrowser);
                return new FirefoxDriver(binary, null, capabilities);
            }
            else if (internetExplorerBrowsers.contains(browserName))
            {
                return new InternetExplorerDriver(capabilities);
            }
        }
        else
        {
            final XltProperties xltProperties = XltProperties.getInstance();

            final Map<String, String> propertiesForEnvironment = xltProperties.getPropertiesForKey(XltPropertyKey.BROWSERPROFILE_TEST_ENVIRONMENT +
                                                                                             testEnvironment);

            final String gridUsername = propertiesForEnvironment.get("username");
            final String gridPassword = propertiesForEnvironment.get("password");
            final String gridUrlString = propertiesForEnvironment.get("url");
            final URL gridUrl = new URL(gridUrlString);

            // establish connection to target website
            return new RemoteWebDriver(createGridExecutor(proxyConfig, gridUrl, gridUsername, gridPassword), capabilities);
        }

        return null;
    }

    public static Map<String, BrowserConfigurationDto> parseBrowserProperties(final XltProperties properties)
    {
        // Structur browserprofile.<nametag>.*

        // property prefix for browser configurations
        final String propertyKeyBrowsers = "browserprofile";

        // get all properties with prefix browserprofile. they are then truncated to <nametag>.*
        // holds all found browser configurations
        Map<String, String> browserProperties = properties.getPropertiesForKey(propertyKeyBrowsers);

        // a temporary list to hold all found browser tags
        final List<String> browserTags = new ArrayList<String>();

        // create a list of tags referencing browser configurations
        for (final String key : browserProperties.keySet())
        {
            final String[] parts = key.split("\\.");
            final String browserTag = parts[0];
            if (!StringUtils.isEmpty(browserTag) && !browserTags.contains(browserTag))
                browserTags.add(browserTag);
        }

        // map to hold all browser configurations. lookup via browser tag
        final Map<String, BrowserConfigurationDto> browserConfigurations = new HashMap<String, BrowserConfigurationDto>();

        // parse all browser properties and add them to the map
        final PropertiesToBrowserConfigurationMapper mapper = new PropertiesToBrowserConfigurationMapper();
        for (final String browserTag : browserTags)
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
}
