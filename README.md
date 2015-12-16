# Readme

This is a demo test suite for [katespade.com](http://www.katespade.com).
This test suite has been built for and with __XLT__.

# Test Suite Setup

See below for prerequisites and installation steps needed to run the test suite with __XLT Script Developer__ in Firefox or the __XLT Framework__ orchestrating different WebDrivers. For further information, please refer to [XLT Online](https://www.xceptance.com/en/xlt/documentation.html).

# Overview
- Step 1) Execution Environments
    - IDE
    - Ant
- Step 2) WebDrive Configuration
    - Firefox
    - Chrome
    - Internet Explorer
- Step 3) Execution
    - Eclipse
    - Ant

# Prerequisites
- XLT&reg; Framework v4.5 (or higher) - [Download the XLT Framework](https://www.xceptance.com/en/xlt/download.html)
- JDK 7 ([JSE](https://www.oracle.com/technetwork/java/javase/downloads)) or higher
- Browser:
    - (Firefox 31)[https://www.mozilla.org/firefox-download] up to latest version 42
    - or (Google Chrome)[https://www.google.com/chrome/browser/desktop/index.html#] version 30 (or higher)
    - or Internet Explorer 11 
- Execution Environment:
    - Java IDE (e.g. [Eclipse](https://eclipse.org/downloads/)) or
    - [Apache Ant](https://ant.apache.org/bindownload.cgi)  ( [install Apache Ant](https://ant.apache.org/manual/install.html#installing) )
- [Source Labs Account](https://saucelabs.com/)



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
- Click left on project folder
- Select `Build Path configure` `Build Path`
- `Libraries` -> `[Add External JARs]`
- Go to `your xlt path /libs`
- Select `all jar files` and press `[OK]`

## Ant - Project Configuration
Open file `multi-browser-suite/build.properties` and adjust the values
```sh
xlt.lib.dir = path/to/xlt/lib
```
```sh
test.lib.dir = path/to/xlt/lib
```
# Step 2: WebDriver Configuration

## Firefox
Note: installation and configuration not required. FirefoxWebdriver are integrated.
- Open file `multi-browser-suite/config/default.properties` and set property to
```sh
xlt.webDriver = firefox
```

## Chrome
Note: For information about ChromeWebdriver, [click here](https://sites.google.com/a/chromium.org/chromedriver)
- [Download ChromeDriver](https://sites.google.com/a/chromium.org/chromedriver/downloads) and unpack it (eg: D:/dev/webDriver/)
- Open file `multi-browser-suite/config/default.properties`
- Set property and adjust path to the downloaded ChromeDriver
```sh
xlt.webDriver = chrome
xlt.webDriver.chrome.pathToDriverServer = path/to/webDriver/chromedriver.exe
```

## Internet Explorer 11 (only Microsoft OS Support)
Note: For general information about IEWebdriver, [click here](https://code.google.com/p/selenium/wiki/InternetExplorerDriver). 
Information about installation/configuration information can be found [here](https://code.google.com/p/selenium/wiki/InternetExplorerDriver#Required_Configuration).

- [Download Internet Explorer Webdriver](http://www.seleniumhq.org/download/) and unpack it (eg: D:/dev/webDriver/)
- Open file `multi-browser-suite/config/default.properties`
- Set property and adjust path to the downloaded IEWebdriver
```sh
xlt.webDriver = ie
xlt.webDriver.ie.pathToDriverServer = path/to/webDriver/IEDriverServer.exe
```

# Step 3: Configuration and Execution testcase
## Configuration Sourcelab account setting
- Log into Sauce Labs
- Navigate to the User Settings page: `https://saucelabs.com/beta/user-settings`
- on section `Access Key` click the `[Show]` button
- copy this `Access Key` into clipboard
- open file `multi-browser-suite/config/default.properties` and enter properties
```sh
saucelab.username  = xx
saucelab.accesskey = xx
```
## Configuration testcase
### Preperation testcase
- Start Eclipse
- Open testcase eg. 'test.search/TSearch_ProductOnly.java'
- Replace row 'import com.xceptance.xlt.api.engine.scripting.AbstractScriptTestCase;'
- With
```sh
import com.xceptance.xlt.api.engine.scripting.ScriptName;
import tests.augment.AbstractAnnotatedScriptTestCase;
import tests.augment.annotation.TestTarget;
import tests.augment.annotation.TestTargets;
import tests.augment.enums.Browser;
import tests.augment.enums.OS;
import tests.augment.enums.Scope;
```
- replace AbstractScriptTestCase with AbstractAnnotatedScriptTestCase
- below row '@ScriptName(..)' and 'public class ...' add new rows

```sh
@ScriptName("xxxxxx")
@TestTargets(
{
})
public class Tcase_name extends AbstractAnnotatedScriptTestCase
```

### One browser definition for a testcase
- Add  "@TestTarget("
	- [required value]'browser = xx' Example. Browser.Chrome, Browser.Firefox, Browser.InternetExplorer
	- [optional value] 'testCaseName = xx' name for this testcase
	- [optional value] 'browserVersion = xx' browser Version, Example: "11.0"
	- [optional value] 'os = xx' Operating System, Example: "OS.Windows", "OS.Linux"
	- [optional value] 'scope = xx' who run this testcase, Example: Scope.SauceLabs, Scope.Local
- Add )
- Example row: InternetExplorer with Version 11 on SauceLabs
```sh
@TestTargets(
{
@TestTarget(testCaseName = "IE11-Testcase", browser = Browser.InternetExplorer, browserVersion = "11.0", scope = Scope.SauceLabs)
})
```

### Many browser definition for a testcase
- It it possible to add more than one browser definition to the testcase
- Comma separated values
Example:
```sh
@TestTarget(browser = Browser.InternetExplorer, browserVersion = "11.0", scope = Scope.SauceLabs),
@TestTarget(browser = Browser.Chrome, scope = Scope.local)
```

Full Example: 
- InternetExplorer with Version 8 and 11 on SauceLabs
- Firefox and Chrome run local
```sh
package tests.search;
import com.xceptance.xlt.api.engine.scripting.ScriptName;
import tests.augment.AbstractAnnotatedScriptTestCase;
import tests.augment.annotation.TestTarget;
import tests.augment.annotation.TestTargets;
import tests.augment.enums.Browser;
import tests.augment.enums.OS;
import tests.augment.enums.Scope;

//coment ...

@ScriptName("xxxxxx")
@TestTargets(
{
    @TestTarget(browser = Browser.InternetExplorer, browserVersion = "8.0", os = OS.Windows, scope = Scope.SauceLabs),
    @TestTarget(browser = Browser.InternetExplorer, browserVersion = "11.0", os = OS.Windows, scope = Scope.SauceLabs),
    @TestTarget(browser = Browser.Firefox, scope = Scope.local),
    @TestTarget(browser = Browser.Chrome, scope = Scope.local)
})
public class Tcase_name extends AbstractAnnotatedScriptTestCase
{
}
```


## Execution testcase
### Start test case in Eclipse
- select java file from the testcase eg. src->test.search->'TSearch_ProductOnly.java' 
- 'Run as' item in context menu -> 'JUnit Test'

### Run Apache Ant
Open the command prompt window: click the Start button picture of the Start button, then click All Programs, then Accessories, then Command Prompt.

```sh
$ ant test.java
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
