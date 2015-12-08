package tests.browser;

import java.net.MalformedURLException;
import java.net.URL;

import com.xceptance.xlt.api.engine.scripting.AbstractScriptTestCase;
import com.xceptance.xlt.api.util.XltProperties;

public abstract class AbstractIEScriptTestCase extends AbstractScriptTestCase {
	private URL saucelabUrl = null;

	public AbstractIEScriptTestCase() {
		XltProperties xltProperties = XltProperties.getInstance();
		String saucelabUsername = xltProperties.getProperty("saucelab.username");
		String saucelabAccesskey = xltProperties.getProperty("saucelab.accesskey");

		try {
			saucelabUrl = new URL(
					"http://" + saucelabUsername + ":" + saucelabAccesskey + "@ondemand.saucelabs.com:80/wd/hub");
		} catch (MalformedURLException e) {
			throw new RuntimeException("URL could not resolved: " + e.toString());
		}
	}

	public URL getSaucelabUrl() {
		return saucelabUrl;
	}
}
