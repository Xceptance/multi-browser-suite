package xltutil.mapper;

import com.xceptance.xlt.api.util.XltProperties;

import xltutil.dto.ProxyConfigurationDTO;
import xltutil.interfaces.IMapper;
import xltutil.runner.helper.XltPropertyKey;

public class PropertiesToProxyConfigurationMapper implements IMapper<XltProperties, ProxyConfigurationDTO>
{
    @Override
    public ProxyConfigurationDTO toDto(XltProperties o)
    {
        String strProxyEnabled = o.getProperty(XltPropertyKey.PROXY, null);

        if (Boolean.parseBoolean(strProxyEnabled))
        {
            ProxyConfigurationDTO r = new ProxyConfigurationDTO();

            r.setHost(o.getProperty(XltPropertyKey.PROXY_HOST, null));
            r.setPort(o.getProperty(XltPropertyKey.PROXY_PORT, null));
            r.setUsername(o.getProperty(XltPropertyKey.PROXY_USERNAME, null));
            r.setPassword(o.getProperty(XltPropertyKey.PROXY_PASSWORD, null));
            r.setProxyByPass(o.getProperty(XltPropertyKey.PROXY_BYPASS, null));

            return r;
        }

        return null;
    }

    @Override
    public XltProperties fromDto(ProxyConfigurationDTO o)
    {
        throw new RuntimeException("Not implemented yet.");
    }

}
