package tests.browser;

import org.openqa.selenium.Platform;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.remote.DesiredCapabilities;
import org.openqa.selenium.remote.RemoteWebDriver;

public abstract class AbstractIE8ScriptTestCase extends AbstractIEScriptTestCase {
	
	public AbstractIE8ScriptTestCase() {
		DesiredCapabilities capabilities = DesiredCapabilities.internetExplorer();
		capabilities.setCapability("version", "8.0");
		capabilities.setCapability("name", "IE8-Testcase");
		capabilities.setCapability("platform", Platform.WINDOWS);

		WebDriver driver = new RemoteWebDriver(getSaucelabUrl(), capabilities);
		setWebDriver(driver);
	}
}
