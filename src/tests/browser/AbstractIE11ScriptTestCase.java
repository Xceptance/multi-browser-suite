package tests.browser;

import org.openqa.selenium.Platform;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.remote.DesiredCapabilities;
import org.openqa.selenium.remote.RemoteWebDriver;

public abstract class AbstractIE11ScriptTestCase extends AbstractIEScriptTestCase {

	public AbstractIE11ScriptTestCase() {
		DesiredCapabilities capabilities = DesiredCapabilities.internetExplorer();
		capabilities.setCapability("version", "11.0");
		capabilities.setCapability("name", "IE11-Testcase");
		capabilities.setCapability("platform", Platform.WIN8_1);

		WebDriver driver = new RemoteWebDriver(getSaucelabUrl(), capabilities);
		setWebDriver(driver);
	}
}
