package tests.augment.runner;

import tests.augment.annotation.TestTarget;
import tests.augment.enums.Browser;
import tests.augment.enums.OS;
import tests.augment.enums.Scope;

public class AnnotationRunnerConfiguration
{
    private Browser browser;

    private String browserVersion;

    private OS os;

    private Scope scope;
    
    private String testCaseName;

    public AnnotationRunnerConfiguration(TestTarget target)
    {
        setBrowser(target.browser());
        setBrowserVersion(target.browserVersion());
        setOs(target.os());
        setScope(target.scope());
        setTestCaseName(target.testCaseName());
    }

    public Browser getBrowser()
    {
        return browser;
    }

    public void setBrowser(Browser browser)
    {
        this.browser = browser;
    }

    public String getBrowserVersion()
    {
        return browserVersion;
    }

    public void setBrowserVersion(String browserVersion)
    {
        this.browserVersion = browserVersion;
    }

    public OS getOs()
    {
        return os;
    }

    public void setOs(OS os)
    {
        this.os = os;
    }

    public Scope getScope()
    {
        return scope;
    }

    public void setScope(Scope scope)
    {
        this.scope = scope;
    }

    public String getTestCaseName()
    {
        return testCaseName;
    }

    public void setTestCaseName(String testCaseName)
    {
        this.testCaseName = testCaseName;
    }
}
