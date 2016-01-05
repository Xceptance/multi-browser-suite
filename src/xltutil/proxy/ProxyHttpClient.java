package xltutil.proxy;

import static com.google.common.base.Preconditions.checkNotNull;

import java.net.URL;

import org.apache.http.client.HttpClient;
import org.openqa.selenium.remote.internal.ApacheHttpClient;

public class ProxyHttpClient implements org.openqa.selenium.remote.http.HttpClient.Factory
{
    private final HttpClient httpClient;

    public ProxyHttpClient(HttpClient httpClient)
    {
        this.httpClient = checkNotNull(httpClient, "null HttpClient");
    }

    @Override
    public org.openqa.selenium.remote.http.HttpClient createClient(URL url)
    {
        checkNotNull(url, "null URL");

        return new ApacheHttpClient(httpClient, url);
    }
}
