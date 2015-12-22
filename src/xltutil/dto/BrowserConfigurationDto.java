package xltutil.dto;

import org.openqa.selenium.remote.DesiredCapabilities;

import xltutil.enums.Scope;

public class BrowserConfigurationDto
{
    private String browserTag;

    private String name;

    private DesiredCapabilities capabilities;

    private Scope scope;

    private int browserWidth;

    private int browserHeight;

    public String getConfigTag()
    {
        return browserTag;
    }

    public void setConfigTag(String configTag)
    {
        this.browserTag = configTag;
    }

    public String getName()
    {
        return name;
    }

    public void setName(String name)
    {
        this.name = name;
    }

    public DesiredCapabilities getCapabilities()
    {
        return capabilities;
    }

    public void setCapabilities(DesiredCapabilities capabilities)
    {
        this.capabilities = capabilities;
    }

    public Scope getScope()
    {
        return scope;
    }

    public void setScope(Scope scope)
    {
        this.scope = scope;
    }

    public int getBrowserWidth()
    {
        return browserWidth;
    }

    public void setBrowserWidth(int browserWidth)
    {
        this.browserWidth = browserWidth;
    }

    public int getBrowserHeight()
    {
        return browserHeight;
    }

    public void setBrowserHeight(int browserHeight)
    {
        this.browserHeight = browserHeight;
    }
}
