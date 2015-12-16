package tests.augment.interfaces;

import tests.augment.enums.Browser;
import tests.augment.enums.DeviceType;

/**
 * Interface designed for {@link Browser}
 * 
 * @author m.kaufmann
 *
 */
public interface IDeviceType
{
    public DeviceType getDeviceType();
    public boolean isMobileDevice();
    public boolean isDesktopDevice();
    public String getDeviceName();
    public String getBrowserName();
}
