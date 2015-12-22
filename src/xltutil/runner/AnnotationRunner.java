package xltutil.runner;

import java.lang.annotation.Annotation;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import org.apache.commons.lang.IllegalClassException;
import org.apache.commons.lang3.StringUtils;
import org.junit.Test;
import org.junit.runner.Description;
import org.junit.runners.model.FrameworkMethod;
import org.junit.runners.model.Statement;
import org.openqa.selenium.WebDriver;

import com.xceptance.xlt.api.engine.scripting.AbstractScriptTestCase;
import com.xceptance.xlt.api.util.XltProperties;
import com.xceptance.xlt.engine.util.XltTestRunner;

import xltutil.AbstractAnnotatedScriptTestCase;
import xltutil.annotation.TestTargets;
import xltutil.dto.BrowserConfigurationDto;
import xltutil.runner.helper.AnnotationRunnerHelper;

/**
 * JUnit runner used to run testcases that inherit from {@link AbstractAnnotatedScriptTestCase}. This class reads the
 * annotation based configuration of {@link TestTargets} and executes the testcase multiple-times with different
 * annotated configurations.
 * 
 * @author m.kaufmann
 * @see {@link AbstractAnnotatedScriptTestCase}, {@link TestTargets}, {@link TestTarget}
 */
public class AnnotationRunner extends XltTestRunner
{
    /**
     * The JUnit children of this runner.
     */
    private final List<FrameworkMethod> methods = new ArrayList<FrameworkMethod>();

    /**
     * Sets the test instance up.
     *
     * @param method
     *            the method
     * @param test
     *            the test instance
     */
    protected void setUpTest(final FrameworkMethod method, final Object test)
    {
        if (test instanceof AbstractScriptTestCase)
        {
            // set the test data set at the test instance
            final AnnotatedFrameworkMethod frameworkMethod = (AnnotatedFrameworkMethod) method;

            // create configuration pojo from read annotation
            // AnnotationRunnerConfiguration config = new AnnotationRunnerConfiguration(frameworkMethod.annotation);

            BrowserConfigurationDto config = frameworkMethod.getBrowserConfiguration();

            // instantiate webdriver and set browser window size
            WebDriver driver = AnnotationRunnerHelper.createWebdriver(config);
            AnnotationRunnerHelper.setBrowserWindowSize(config, driver);

            if (driver != null)
            {
                ((AbstractScriptTestCase) test).setWebDriver(driver);
            }
        }
    }

    public AnnotationRunner(Class<?> testCaseClass) throws Throwable
    {
        this(testCaseClass, testCaseClass.getSimpleName(), "");
    }

    public AnnotationRunner(Class<?> testCaseClass, String testCaseName, String defaultTestMethodName) throws Throwable
    {
        super(testCaseClass);

        XltProperties xltProperties = XltProperties.getInstance();

        Map<String, BrowserConfigurationDto> parsedBrowserProperties = AnnotationRunnerHelper.parseBrowserProperties(xltProperties);

        String ieDriverPath = xltProperties.getProperty("xlt.webDriver.ie.pathToDriverServer");
        String chromeDriverPath = xltProperties.getProperty("xlt.webDriver.chrome.pathToDriverServer");

        if (!StringUtils.isEmpty(ieDriverPath))
            System.setProperty("webdriver.ie.driver", ieDriverPath);

        if (!StringUtils.isEmpty(chromeDriverPath))
            System.setProperty("webdriver.chrome.driver", chromeDriverPath);

        boolean foundTargetsAnnotation = false;

        // Get annotations of test class.
        Annotation[] annotations = testCaseClass.getAnnotations();
        for (Annotation annotation : annotations)
        {
            // only check TestTargets annotation with a list of nested TestTarget annotations
            if (annotation instanceof TestTargets)
            {
                foundTargetsAnnotation = true;

                String[] targets = ((TestTargets) annotation).value();

                for (String target : targets)
                {
                    BrowserConfigurationDto foundBrowserConfiguration = parsedBrowserProperties.get(target);
                    if (foundBrowserConfiguration == null)
                    {
                        throw new IllegalArgumentException("Can not find browser configuration with tag: " + target);
                    }

                    for (final FrameworkMethod frameworkMethod : getTestClass().getAnnotatedMethods(Test.class))
                    {
                        methods.add(new AnnotatedFrameworkMethod(frameworkMethod.getMethod(), "", foundBrowserConfiguration));
                    }
                }
            }
        }

        if (!foundTargetsAnnotation)
            throw new IllegalClassException("The class (" + testCaseClass.getSimpleName() +
                                            ") does not have a required TestTargets annotation.");
    }

    /**
     * {@inheritDoc}
     */
    @Override
    protected List<FrameworkMethod> getChildren()
    {
        return methods;
    }

    /**
     * {@inheritDoc}
     */
    @Override
    public Description getDescription()
    {
        final Description description = Description.createSuiteDescription(getTestClass().getJavaClass());

        for (final FrameworkMethod frameworkMethod : getChildren())
        {
            description.addChild(Description.createTestDescription(getTestClass().getJavaClass(), frameworkMethod.getName()));
        }

        return description;
    }

    /**
     * {@inheritDoc}
     */
    @Override
    protected Statement methodInvoker(final FrameworkMethod method, final Object test)
    {
        // prepare the test instance before executing it
        setUpTest(method, test);

        // the real job is done here
        return super.methodInvoker(method, test);
    }

}
