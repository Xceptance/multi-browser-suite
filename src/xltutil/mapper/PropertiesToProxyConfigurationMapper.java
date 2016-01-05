package xltutil.mapper;

import com.xceptance.xlt.api.util.XltProperties;

import xltutil.dto.ProxyConfigurationDto;
import xltutil.interfaces.IMapper;
import xltutil.runner.helper.XltPropertyKey;

public class PropertiesToProxyConfigurationMapper implements IMapper<XltProperties, ProxyConfigurationDto>
{
    @Override
    public ProxyConfigurationDto toDto(XltProperties o)
    {
        String strProxyEnabled = o.getProperty(XltPropertyKey.PROXY, null);

        if (Boolean.parseBoolean(strProxyEnabled))
        {
            ProxyConfigurationDto r = new ProxyConfigurationDto();

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
    public XltProperties fromDto(ProxyConfigurationDto o)
    {
        throw new RuntimeException("Not implemented yet.");
    }

}
