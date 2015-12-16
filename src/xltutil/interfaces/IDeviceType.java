package xltutil.interfaces;

import xltutil.enums.Browser;
import xltutil.enums.DeviceType;

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
