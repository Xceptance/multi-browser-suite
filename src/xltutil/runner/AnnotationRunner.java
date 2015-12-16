package xltutil.runner;

import java.lang.annotation.Annotation;
import java.lang.reflect.Method;
import java.util.ArrayList;
import java.util.List;

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
import xltutil.annotation.TestTarget;
import xltutil.annotation.TestTargets;
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

    // TODO: maybe this can be deleted
    // static
    // {
    // XltProperties.getInstance();
    // }

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
            AnnotationRunnerConfiguration config = new AnnotationRunnerConfiguration(frameworkMethod.annotation);

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

        String ieDriverPath = xltProperties.getProperty("xlt.webDriver.ie.pathToDriverServer");
        String chromeDriverPath = xltProperties.getProperty("xlt.webDriver.chrome.pathToDriverServer");

        if (!StringUtils.isEmpty(ieDriverPath))
            System.setProperty("webdriver.ie.driver", ieDriverPath);

        if (!StringUtils.isEmpty(chromeDriverPath))
            System.setProperty("webdriver.chrome.driver", chromeDriverPath);

        boolean foundTargetsAnnotation = false;
        boolean foundTargetAnnotation = false;

        // Get annotations of test class.
        Annotation[] annotations = testCaseClass.getAnnotations();
        for (Annotation annotation : annotations)
        {
            // only check TestTargets annotation with a list of nested TestTarget annotations
            if (annotation instanceof TestTargets)
            {
                foundTargetsAnnotation = true;
                TestTargets targets = (TestTargets) annotation;

                if (targets.value().length > 0)
                    foundTargetAnnotation = true;

                // iterate over all defined test targets and check with current testscope
                for (TestTarget target : targets.value())
                {
                    for (final FrameworkMethod frameworkMethod : getTestClass().getAnnotatedMethods(Test.class))
                    {
                        AnnotatedFrameworkMethod afm = new AnnotatedFrameworkMethod(frameworkMethod.getMethod(), "", target);
                        methods.add(afm);
                    }
                }
            }
        }

        if (!foundTargetsAnnotation)
            throw new IllegalClassException("The class (" + testCaseClass.getSimpleName() +
                                            ") does not have a required TestTargets annotation.");

        if (!foundTargetAnnotation)
            throw new IllegalClassException("The class (" + testCaseClass.getSimpleName() + ") does not have a single defined TestTarget.");
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
        // TODO: check whether there is a better place to do this
        setUpTest(method, test);

        // the real job is done here
        return super.methodInvoker(method, test);
    }

    /**
     * A specialization of {@link FrameworkMethod}, which replaces the default method name with the provided name and
     * the test data set used.
     */
    private static class AnnotatedFrameworkMethod extends FrameworkMethod
    {
        /**
         * The test data set to use.
         */
        private final TestTarget annotation;

        /**
         * The new method name.
         */
        private final String name;

        /**
         * Constructor.
         *
         * @param method
         *            the test method
         * @param testMethodName
         *            the name to show for the test method
         * @param index
         *            the index of the test run
         * @param dataSet
         *            the test data set
         */
        public AnnotatedFrameworkMethod(final Method method, final String testMethodName, final TestTarget annotationParameter)
        {
            super(method);

            this.annotation = annotationParameter;
//            name = testMethodName + annotationParameter.testCaseName();
            name = new AnnotationRunnerConfiguration(annotationParameter).toString();
        }

        /**
         * {@inheritDoc}
         */
        @Override
        public String getName()
        {
            return name;
        }

        /**
         * {@inheritDoc}
         */
        @Override
        public boolean equals(final Object obj)
        {
            return this == obj;
        }

        /**
         * {@inheritDoc}
         */
        @Override
        public int hashCode()
        {
            return System.identityHashCode(this);
        }
    }

}
