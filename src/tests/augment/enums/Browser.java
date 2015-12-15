package tests.augment.enums;

import tests.augment.interfaces.IDeviceType;

/**
 * Enumeration of different browser types including mobile devices. Devicenames reffer to Chrome device emulations. Do
 * not edit them.
 * 
 * @author m.kaufmann
 */
public enum Browser implements IDeviceType
{
 Chrome(DeviceType.Desktop, "Desktop"),
 Firefox(DeviceType.Desktop, "Desktop"),
 InternetExplorer(DeviceType.Desktop, "Desktop"),
 Safari(DeviceType.Desktop, "Desktop"),
 MobileIphone4(DeviceType.Mobile, "Apple iPhone 4"),
 MobileIphone5(DeviceType.Mobile, "Apple iPhone 5"),
 MobileIphone6(DeviceType.Mobile, "Apple iPhone 6"),
 MobileIphone6Plus(DeviceType.Mobile, "Apple iPhone 6 Plus"),
 MobileNexus4(DeviceType.Mobile, "Google Nexus 4"),
 MobileNexus5(DeviceType.Mobile, "Google Nexus 5"),
 MobileNexus6(DeviceType.Mobile, "Google Nexus 6"),
 MobileGalaxyNote3(DeviceType.Mobile, "Samsung Galaxy Note 3"),
 MobileGalaxyNote2(DeviceType.Mobile, "Samsung Galaxy Note II"),
 MobileGalaxyS3(DeviceType.Mobile, "Samsung Galaxy S III"),
 MobileGalaxyS4(DeviceType.Mobile, "Samsung Galaxy S 4");

    private DeviceType deviceType;

    private String deviceName;

    Browser(DeviceType deviceType, String deviceName)
    {
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
}
