# XLT Multi Browser Test Suite
This test suite has been built for and with __XLT__ to demo the support of multiple browsers as well as a Sauce Labs integration for test automation with XLT.

# Test Suite Setup
See below for prerequisites and installation steps needed to run the test suite with the __XLT Framework__ orchestrating different WebDrivers. For further information, please refer to [XLT Online](https://www.xceptance.com/en/xlt/documentation.html).

# Overview
- Step 1) IDE Setup
    - Preparation
    - Project Configuration
- Step 2) WebDriver Configuration
    - Firefox (legacy and GeckoDriver)
    - Chrome
    - Internet Explorer
- Step 3) Execution
    - Eclipse
    - Maven

# Prerequisites
- JDK 8 ([JSE](https://www.oracle.com/technetwork/java/javase/downloads)) or higher
- Browser:
    - [Firefox](https://www.mozilla.org/en-US/firefox/)
    - or [Google Chrome](https://www.google.com/chrome/browser/desktop/)
    - or Internet Explorer 11 
- Execution Environment:
    - Java IDE (e.g. [Eclipse](https://eclipse.org/downloads/)) or
    - [Apache Maven](https://maven.apache.org/download.cgi)  ( [Install Apache Maven](http://maven.apache.org/install.html) )
- [SauceLabs Account](https://saucelabs.com/)


# Step 1: IDE Setup
## Preparation (Eclipse)
- `Help` -> `Eclipse Marketplace...`
- Click on tab `Installed` and look for 'Maven Integration for Eclipse'
- If you found a match, you are done
- Otherwise, click on tab `Search`, type 'Maven' into the search field and press `Enter`
- Select 'Maven Integration for Eclipse' that matches your Eclipse version (e.g. 'Luna or newer') and click on `[Install]`

## Project Configuration (Eclipse)
- `File` -> `Import`
- `Git` -> `Projects from Git` -> `[Next]`
- `Clone URI` -> `[Next]`
- URI to: https://github.com/Xceptance/multi-browser-suite.git -> `[Next]`
- Select `“master”` -> `[Next]`
- Directory: your Workspace (eg: path/to/multi-browser-suite) -> `[Next]`
- Select `“Import existing Eclipse projects”` -> `[Next]`
- Check all values and press `[Finish]`



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


## Test Execution
### Start test case in Eclipse
- Select testcase in Package Explorer 
    - Example: src -> test -> java -> multibrowser -> search -> `TBlogSearch.java` 
- `Run as` item in context menu -> `JUnit Test`

### Run Apache Maven
Open the command prompt/terminal window and change to your `multi-browser-suite` path.

```sh
$ maven clean test
```

### Run Apache Maven with Browsertag Support
Note: The option `-Dbrowserdefinition=<comma separated list of browsertags>` enables you to run only testcases that are annotated with a specific browsertag.

Example
```sh
$ maven clean test -Dbrowserdefinition="chrome_local, ie8_saucelabs"
```

## XLT Result Browser
The result browser offers an integrated navigation to browse the complete page output of the transaction and to look at every single request in detail. For more information about the XLT Result Browser, [click here](https://lab.xceptance.de/releases/xlt/latest/user-manual.html#XLTResultBrowser).

## XLT Result - Structure

```sh
---+ multi-browser-suite
   `---+ target
        `---+ results
             `---+ [testcase]
                 `---+ [virtual-user]
                     `---+ output
                         `---+ [transaction-ID]
                             |---- css
                             |---- images
                             |---+ pages
                             |    `---- cache
                             `---- responses
```

###  Deletes any result file from a previous test run
```sh
$ maven clean
```

# Test Suite Structure

This section gives a small introduction to the multi-browser-suite structure. 

## General

```sh
---+ multi-browser-suite
   |---- config                             # XLT framework configuration
   |---+ src
   |   `---+ test
   |       `---- java                       # Java test class sources
   |---+ target
   |   |---- classes                        # Compiled Java classes
   |   |---- results                        # XLT Result Browsers
   |   `---- surefire-reports               # JUnit test results
   |---- pom.xml                            # Maven POM file
   |---- LICENSE                            # Project License
   `---- README.md                          # This file
```
