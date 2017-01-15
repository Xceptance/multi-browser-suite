# XLT Multi Browser Test Suite
This test suite has been built for and with __XLT__ to demo the support of multiple browsers as well as a Sauce Labs integration for test automation with XLT.

# Test Suite Setup
See below for prerequisites and installation steps needed to run the test suite with __XLT Script Developer__ in Firefox or the __XLT Framework__ orchestrating different WebDrivers. For further information, please refer to [XLT Online](https://www.xceptance.com/en/xlt/documentation.html).

# Overview
- Step 1) Execution Environments
    - IDE
    - Ant
- Step 2) WebDriver Configuration
    - Firefox (legacy and GeckoDriver)
    - Chrome
    - Internet Explorer
- Step 3) Execution
    - Eclipse
    - Ant

# Prerequisites
- XLT&reg; Framework (latest) - [Download the XLT Framework](https://www.xceptance.com/en/xlt/download.html)
- JDK 8 ([JSE](https://www.oracle.com/technetwork/java/javase/downloads)) or higher
- Browser:
    - [Firefox 31](https://www.mozilla.org/firefox-download) or later
    - or [Google Chrome](https://www.google.com/chrome/browser/desktop/index.html) version 30 (or later)
    - or Internet Explorer 11 
- Execution Environment:
    - Java IDE (e.g. [Eclipse](https://eclipse.org/downloads/)) or
    - [Apache Ant](https://ant.apache.org/bindownload.cgi)  ( [install Apache Ant](https://ant.apache.org/manual/install.html#installing) )
- [SauceLabs Account](https://saucelabs.com/)


# Step 1: Execution Environments
## IDE - Project Configuration (Eclipse)
- `File` -> `Import`
- `Git` -> `Projects from Git` -> `[Next]`
- `Clone URI` -> `[Next]`
- URI to: https://github.com/Xceptance/multi-browser-suite.git -> `[Next]`
- Select `“master”` -> `[Next]`
- Directory: your Workspace (eg: path/to/multi-browser-suite) -> `[Next]`
- Select `“Import existing Eclipse projects”` -> `[Next]`
- Check all values and press `[Finish]`
- Click right on project folder
- Select `Build Path configure` `Build Path`
- `Libraries` -> `[Add External JARs]`
- Go to `your xlt path /libs`
- Select `all jar files` and press `[OK]`

## Ant - Project Configuration
Open file `multi-browser-suite/build.properties` and adjust the value

```sh
xlt.home.dir = /path/to/xlt
```

# Step 2: WebDriver Configuration
If you want to run tests locally with your installed browsers, adjust `config/browser.properties`. You have to set the path to the downloaded chromedriver, internetexplorerdriver, and geckodriver, depending on your OS and browsers installed of course.

- ChromeDriver: https://sites.google.com/a/chromium.org/chromedriver/
- IEDriver: https://github.com/SeleniumHQ/selenium/wiki/InternetExplorerDriver
- GeckoDriver (Firefox 48 and higher): https://github.com/mozilla/geckodriver/releases


# Step 3: Configuration and Execution of Test Cases
## Configuration SauceLabs account settings
- Copy `config/credentials.properties.template` to `config/credentials.properties`
- Open `config/credentials.properties`
- Log into your SauceLabs Account
- Navigate to the User Settings page: `https://saucelabs.com/beta/user-settings`
- On section `Access Key` click the `[Show]` button
- Copy value of `Access Key`
- Username can be found on the page as `User Information` -> `USERNAME`
- Password is your `Access Key`
```sh
browserprofile.testEnvironment.saucelabs.url = https://ondemand.saucelabs.com:443/wd/hub
browserprofile.testEnvironment.saucelabs.username = xx
browserprofile.testEnvironment.saucelabs.password = xx
```

## Configuration of other automated testing platforms
You can also define test environments other than SauceLabs, e.g. BrowserStack or even your own Selenium grid. To accomplish that just use the template below to create a access configuration. You later can refer this configuration in your browserprofile to run it in the desired test environment by setting the testEnvironment property of the browser profile to the desired `<gridname>`. See example 5 for instance.

```sh
browserprofile.testEnvironment.<gridname>.url = <URL>
browserprofile.testEnvironment.<gridname>.username = <USERNAME>
browserprofile.testEnvironment.<gridname>.password = <PASSWORD>
```

To create your own Selenium grid please see the  following article about using Selenium standalone server [https://github.com/SeleniumHQ/selenium/wiki/Grid2](https://github.com/SeleniumHQ/selenium/wiki/Grid2)

## Configuration browser definition (config/browser.properties)
All browser definitions are set in file `config/browser.properties`.
This is a short overview, for more information please look into the file, there are a lot of comments about it.

Same properties in all browser definitions:
- `browserprofile.<unique profile identifier>` -> string to make different browserprofiles unique
- `browserprofile.<unique profile identifier>.name` -> is a more detailed name of this browser definition
- `browserprofile.<unique profile identifier>.browser` -> determines which browser will be used for this test
- `browserprofile.<unique profile identifier>.browserResolution` -> determines width and height of the browser window. [optional]

Chrome device emulation properties
- `browserprofile.<unique profile identifier>.chromeEmulationProfile` -> a special property that contains a device name that should be emulated.

SauceLabs remote browser properties
- `browserprofile.<unique profile identifier>.testEnvironment` -> determines where the testcase will be executed. Possible values are local, saucelabs or what ever you defined (see `Configuration SauceLabs account settings`).
- `browserprofile.<unique profile identifier>.version` -> determines which version of the browser should be used or determines the version of the OS of an emulated device by default version references the browser version, but in case of saucelabs device emulation usage it may be used for the OS version instead
- `browserprofile.<unique profile identifier>.platform` -> defines on which (emulated) platform the test should run
- `browserprofile.<unique profile identifier>.deviceName` -> defines the name of the device
- `browserprofile.<unique profile identifier>.deviceOrientation` -> defines the device orientation

### Example 1 : `local Chrome`

```sh
browserprofile.Chrome_local.name = Latest local Chrome
browserprofile.Chrome_local.browser = chrome
browserprofile.Chrome_local.testEnvironment = local
```
### Example 2 : `Samsung Galaxy Note 3 run as local Chrome Emulation`

```sh
browserprofile.Galaxy_Note3_Emulation.name = Samsung Galaxy Note 3 Chrome Emulation
browserprofile.Galaxy_Note3_Emulation.browser = chrome
browserprofile.Galaxy_Note3_Emulation.chromeEmulationProfile = Samsung Galaxy Note 
```

### Example 3 : `local Chrome browser resolution to 1280x900 and Test-Environment to SauceLabs`

```sh
browserprofile.Chrome_1280x900_sl.name = Chrome on SauceLabs
browserprofile.Chrome_1280x900_sl.browser = chrome
browserprofile.Chrome_1280x900_sl.browserResolution = 1280x900
browserprofile.Chrome_1280x900_sl.testEnvironment = saucelabs
```

### Example 4 : `iPhone 5s on SauceLabs`

```sh
browserprofile.iPhone5s.name = iPhone5s on SauceLabs
browserprofile.iPhone5s.browser = iphone
browserprofile.iPhone5s.platform = OS X 10.10
browserprofile.iPhone5s.version = 9.2
browserprofile.iPhone5s.deviceName = iPhone 5s
browserprofile.iPhone5s.deviceOrientation = portrait
browserprofile.iPhone5s.testEnvironment = saucelabs
```

### Example 5: `Internet Explorer on own Selenium grid`
```sh
browserprofile.testEnvironment.myGrid.url = http://localhost:4444/wd/hub

browserprofile.ie11.name = IE11 on my own Selenium grid
browserprofile.ie11.browser = internetexplorer
browserprofile.ie11.version = 11
browserprofile.ie11.testEnvironment = myGrid
```


## Configuration test case
### Prepare test case
- Copy and rename generated wrapper class to make sure that your test case won't be overwritten when continuing editing, for instance copy TSearch.java to TSearchMB.java
- Make sure you fix and correct the imports at the end of editing

The following example shows a complete java file configured for multiple browsers: 
- InternetExplorer with Version 8 and 11 on SauceLabs
- Firefox and Chrome run local

```sh
package tests.search;

import com.xceptance.xlt.api.engine.scripting.ScriptName;

import xltutil.AbstractAnnotatedScriptTestCase;
import xltutil.annotation.TestTargets;

//coment ...

@ScriptName("tests.search.TSearch_ProductOnly")
@TestTargets(
    {
    	"chrome_sl", "FF_1000x768", "FF_1500x1000", "Chrome_1280x900", "Chrome_1500x1000", "Galaxy_Note3_Emulation"
    })
public class TSearchMB extends AbstractAnnotatedScriptTestCase
{
}
```

## Execution test case
### Start test case in Eclipse
- Select java file from the testcase 
    - Example: src -> test.search -> `TSearch_ProductOnly.java` 
- `Run as` item in context menu -> `JUnit Test`

### Run Apache Ant
Open the command prompt window: click the Start button picture of the Start button, then click All Programs, then Accessories, then Command Prompt, then change to your `multi-browser-suite` path.

```sh
$ ant test.java
```

### Run Apache Ant with Browsertag Support
Note: The option `-Dbrowserdefinition=<comma separated list of browsertags>` enables you to run only testcases that are annotated with a specific browsertag.

Example
```sh
$ ant test -Dbrowserdefinition=chrome_local, ie8_saucelabs
```

## XLT Result Browser
The result browser offers an integrated navigation to browse the complete page output of the transaction and to look at every single request in detail. For more information about the XLT Result Browser, [click here](https://lab.xceptance.de/releases/xlt/latest/user-manual.html#XLTResultBrowser).

## XLT Result - Structure
```sh
---+ multi-browser-suite
    `---+ results
       `---+ [testcase]
           `---+ [virtual-user]
               `---+ output
                   `---+ [transaction-ID]
                       |---- css
                       |---- images
                       |---+ pages
                       |   `---- cache
                       `---- responses
```

###  Deletes any result file from a previous test run
```sh
$ ant clean
```

# Test Suite Structure

This section gives a small introduction to the multi-browser-suite structure. 

## General

```sh
---+ multi-browser-suite
    |---- config                             # XLT framework configuration
    |---+ scripts
    |   |-- modules/helper                   # scripts for auxiliary services
    |   |---+ modules/pages                  # scripts specific pages
    |   |   |---- pdp                        # scripts for productdetailpages
    |   |   |---- search                     # scripts for search page
    |   `---+ tests
    |       `---- search                     # tests for search area
    |---+ src
    |   |---+ tests                          # XLT java wrapper classes
    |   |        `---- others                # other sample tests
    |---- build.properties                   # XLT ant build properties
    |---- build.xml                          # XLT ant build configuration
    |---- xlt-scriptdeveloper.properties     # XLT Script Developer settings
    `---- global_testdata.properties         # global testdata properties
```
Please note there is a special folder src/tests/others to collect Java-based test examples e.g. testing via RemoteWebDriver against [Sauce Labs](https://saucelabs.com/).
