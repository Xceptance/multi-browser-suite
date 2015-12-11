package tests.augment.runner;

import java.lang.annotation.Annotation;
import java.lang.reflect.Method;
import java.net.MalformedURLException;
import java.net.URL;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.apache.commons.lang.IllegalClassException;
import org.apache.commons.lang3.StringUtils;
import org.junit.Test;
import org.junit.runners.model.FrameworkMethod;
import org.openqa.selenium.Platform;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.chrome.ChromeDriver;
import org.openqa.selenium.firefox.FirefoxDriver;
import org.openqa.selenium.ie.InternetExplorerDriver;
import org.openqa.selenium.remote.DesiredCapabilities;
import org.openqa.selenium.remote.RemoteWebDriver;
import org.openqa.selenium.safari.SafariDriver;

import com.xceptance.xlt.api.util.XltProperties;
import com.xceptance.xlt.engine.scripting.junit.ScriptTestCaseRunner;

import tests.augment.AbstractAugmentedScriptTestCase;
import tests.augment.annotation.TestTarget;
import tests.augment.annotation.TestTargets;

public class AnnotationRunner extends ScriptTestCaseRunner
{

    Map<FrameworkMethod, AnnotationRunnerConfiguration> config = null;

    /**
     * {@inheritDoc}
     */
    @Override
    protected void setUpTest(final FrameworkMethod method, final Object test)
    {
        super.setUpTest(method, test);

        AbstractAugmentedScriptTestCase testCase = ((AbstractAugmentedScriptTestCase) test);

        AnnotationRunnerConfiguration annotationRunnerConfiguration = config.get(method);

        WebDriver driver = createWebdriverUrl(annotationRunnerConfiguration);
        if (driver != null)
        {
            testCase.setWebDriver(driver);
        }
    }

    private DesiredCapabilities setUpBrowserCapabilities(AnnotationRunnerConfiguration config)
    {
        DesiredCapabilities capabilities = null;
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
                break;
        }

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

        capabilities.setVersion(config.getBrowserVersion());

        if (!StringUtils.isEmpty(config.getTestCaseName()))
        {
            capabilities.setCapability("name", config.getTestCaseName());
        }

        return capabilities;
    }

    private WebDriver createWebdriverUrl(AnnotationRunnerConfiguration config)
    {
        DesiredCapabilities capabilities = setUpBrowserCapabilities(config);
        switch (config.getScope())
        {
            case SauceLabs:
                return new RemoteWebDriver(createSauceLabUrl(), capabilities);

            case Local:
                switch (config.getBrowser())
                {
                    case InternetExplorer:
                        return new InternetExplorerDriver(capabilities);

                    case Chrome:
                    	System.setProperty("webdriver.chrome.driver", "D:/Tools/chromedriver.exe");
                        return new ChromeDriver(capabilities);

                    case Firefox:
                        return new FirefoxDriver(capabilities);

                    case Safari:
                        return new SafariDriver(capabilities);

                    default:
                        return null;
                }

            default:
                return null;
        }
    }

    public AnnotationRunner(Class<?> testCaseClass) throws Throwable
    {
        super(testCaseClass);

        XltProperties xltProperties = XltProperties.getInstance();

        String ieDriverPath = xltProperties.getProperty("xlt.webDriver.ie.pathToDriverServer");
        String chromeDriverPath = xltProperties.getProperty("xlt.webDriver.chrome.pathToDriverServer");

        if (!StringUtils.isEmpty(ieDriverPath))
            System.setProperty("webdriver.ie.driver", ieDriverPath);

        if (!StringUtils.isEmpty(chromeDriverPath))
            System.setProperty("webdriver.chrome.driver", chromeDriverPath);

        config = new HashMap<FrameworkMethod, AnnotationRunnerConfiguration>();

        boolean foundTargetsAnnotation = false;
        boolean foundTargetAnnotation = false;

        // Get annotations of test class.
        Annotation[] annotations = testCaseClass.getAnnotations();
        for (Annotation annotation : annotations)
        {
            // only check TestTargets annotation with a list of nested TestTarget annotations
            if (annotation instanceof TestTargets)
            {
                List<FrameworkMethod> listOfTests = getChildren();
                foundTargetsAnnotation = true;
                TestTargets targets = (TestTargets) annotation;

                if (targets.value().length > 0)
                    foundTargetAnnotation = true;

                // iterate over all defined test targets and check with current testscope
                for (TestTarget target : targets.value())
                {
                    for (final FrameworkMethod frameworkMethod : getTestClass().getAnnotatedMethods(Test.class))
                    {
                        // get the test method to run
                        final Method testMethod = frameworkMethod.getMethod();
                        FrameworkMethod fm = new FrameworkMethod(testMethod);
                        listOfTests.add(fm);
                        AnnotationRunnerConfiguration annotationRunnerConfiguration = new AnnotationRunnerConfiguration(target);
                        config.put(fm, annotationRunnerConfiguration);
                    }
                    // FrameworkMethod testMethod = new FrameworkMethod(null); // TODO: create framework method and add
                    // it to list like its done in AbstractTestCaseRunner()

                }
            }
        }

        if (!foundTargetsAnnotation)
            throw new IllegalClassException("The class (" + testCaseClass.getSimpleName() +
                                            ") does not have a required TestTargets annotation.");

        if (!foundTargetAnnotation)
            throw new IllegalClassException("The class (" + testCaseClass.getSimpleName() + ") does not have a single defined TestTarget.");
    }

    private URL createSauceLabUrl()
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
}
