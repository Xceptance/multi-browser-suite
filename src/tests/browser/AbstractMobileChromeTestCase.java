package tests.browser;

/*
 * NOTE: You can change the mobile Divice at project.properties   
 */

import java.util.HashMap;
import java.util.Map;

import org.junit.After;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.chrome.ChromeDriver;
import org.openqa.selenium.chrome.ChromeOptions;
import org.openqa.selenium.remote.DesiredCapabilities;

import com.xceptance.xlt.api.engine.scripting.AbstractScriptTestCase;
import com.xceptance.xlt.api.util.XltProperties;

// This wrapper class will start your local chrome as an mobile implementation 

public class AbstractMobileChromeTestCase extends AbstractScriptTestCase {
	private WebDriver driver;

	protected AbstractMobileChromeTestCase() {

		XltProperties xltProperties = XltProperties.getInstance();
		String pathToChrome = xltProperties.getProperty("xlt.webDriver.chrome.pathToDriverServer");

		System.setProperty("webdriver.chrome.driver", pathToChrome);

		// for more adjustments you can activate the deactivated code 

		/*
		 * HashMap<String, Object> deviceMetrics = new HashMap<String,
		 * Object>(); deviceMetrics.put("width", 360);
		 * deviceMetrics.put("height", 640); deviceMetrics.put("pixelRatio",
		 * 3.0); Map<String, Object> mobileEmulation = new HashMap<String,
		 * Object>();
		 * 
		 * mobileEmulation.put("deviceMetrics", deviceMetrics);
		 * mobileEmulation.put("userAgent",
		 * "Mozilla/5.0 (Linux; Android 4.2.1; en-us; Nexus 5 Build/JOP40D) AppleWebKit/535.19 (KHTML, like Gecko) Chrome/18.0.1025.166 Mobile Safari/535.19"
		 * );
		 * 
		 * Map<String, Object> chromeOptions = new HashMap<String, Object>();
		 * chromeOptions.put("mobileEmulation", mobileEmulation);
		 * DesiredCapabilities capabilities = DesiredCapabilities.chrome();
		 * capabilities.setCapability(ChromeOptions.CAPABILITY, chromeOptions);
		 * 
		 * WebDriver driver = new ChromeDriver(capabilities);
		 */
		
		String mobileDeviceName = xltProperties.getProperty("mobiledevice.name");

		Map<String, String> mobileEmulation = new HashMap<String, String>();
		mobileEmulation.put("deviceName", mobileDeviceName);

		Map<String, Object> chromeOptions = new HashMap<String, Object>();
		chromeOptions.put("mobileEmulation", mobileEmulation);
		DesiredCapabilities capabilities = DesiredCapabilities.chrome();
		capabilities.setCapability(ChromeOptions.CAPABILITY, chromeOptions);
		WebDriver driver = new ChromeDriver(capabilities);

		setWebDriver(driver);
	}

	@Override
	@After
	public void tearDown() {
		driver.quit();
	}

}
