package xltutil.mapper;

import java.util.Map;

import xltutil.dto.ProxyConfigurationDTO;
import xltutil.interfaces.IMapper;

public class PropertiesToProxyConfigurationMapper implements IMapper<Map<String, String>, xltutil.dto.ProxyConfigurationDTO>
{

    @Override
    public ProxyConfigurationDTO toDto(Map<String, String> o)
    {
        ProxyConfigurationDTO r = new ProxyConfigurationDTO();

        r.setHost(o.get("host"));
        r.setPort(o.get("port"));
        r.setUsername(o.get("userName"));
        r.setPassword(o.get("password"));
        r.setProxyByPass(o.get("bypassForHosts"));

        return r;
    }

    @Override
    public Map<String, String> fromDto(ProxyConfigurationDTO o)
    {
        throw new RuntimeException("Not implemented yet.");
    }

}
