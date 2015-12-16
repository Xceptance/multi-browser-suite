package xltutil.enums;

import xltutil.interfaces.IDeviceType;

/**
 * Enumeration of different browser types including mobile devices. Devicenames reffer to Chrome device emulations. Do
 * not edit them.
 * 
 * @author m.kaufmann
 */
public enum Browser implements IDeviceType
{
 Chrome("Chrome", DeviceType.Desktop, "Desktop"),
 Firefox("Firefox", DeviceType.Desktop, "Desktop"),
 InternetExplorer("Internet Explorer", DeviceType.Desktop, "Desktop"),
 Safari("Safari", DeviceType.Desktop, "Desktop"),
 MobileIphone4("Chrome", DeviceType.Mobile, "Apple iPhone 4"),
 MobileIphone5("Chrome", DeviceType.Mobile, "Apple iPhone 5"),
 MobileIphone6("Chrome", DeviceType.Mobile, "Apple iPhone 6"),
 MobileIphone6Plus("Chrome", DeviceType.Mobile, "Apple iPhone 6 Plus"),
 MobileNexus4("Chrome", DeviceType.Mobile, "Google Nexus 4"),
 MobileNexus5("Chrome", DeviceType.Mobile, "Google Nexus 5"),
 MobileNexus6("Chrome", DeviceType.Mobile, "Google Nexus 6"),
 MobileGalaxyNote3("Chrome", DeviceType.Mobile, "Samsung Galaxy Note 3"),
 MobileGalaxyNote2("Chrome", DeviceType.Mobile, "Samsung Galaxy Note II"),
 MobileGalaxyS3("Chrome", DeviceType.Mobile, "Samsung Galaxy S III"),
 MobileGalaxyS4("Chrome", DeviceType.Mobile, "Samsung Galaxy S4");

    private DeviceType deviceType;

    private String deviceName;

    private String browserName;

    Browser(String browserName, DeviceType deviceType, String deviceName)
    {
        this.browserName = browserName;
        this.deviceType = deviceType;
        this.deviceName = deviceName;
    }

    @Override
    public DeviceType getDeviceType()
    {
        return deviceType;
    }

    @Override
    public boolean isMobileDevice()
    {
        return (deviceType == DeviceType.Mobile);
    }

    @Override
    public boolean isDesktopDevice()
    {
        return (deviceType == DeviceType.Desktop);
    }

    @Override
    public String getDeviceName()
    {
        return deviceName;
    }

    public String getBrowserName()
    {
        return browserName;
    }
}
