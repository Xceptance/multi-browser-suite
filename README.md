# Readme

This is a demo test suite for [katespade.com](http://www.katespade.com).
This test suite has been built for and with __XLT__.

# Test Suite Setup

The following prerequisites and installation steps are needed to run the test suite with __XLT Script Developer__ in Firefox or the __XLT Framework__ orchestrating different WebDrivers. For further help please refer to [XLT Online](https://www.xceptance.com/en/xlt/documentation.html).

# Overview
- Step 1) Execution Environments
    - IDE
    - Ant
- Step 2) WebDrive Configuration
    - Firefox
    - Chrome
    - Internet Explorer
- Step 3) Execution/ run
    - Eclipse
    - Ant

# Prerequisites
- XLT&reg; Framework v4.5 (or higher) - [Download the XLT Framework](https://www.xceptance.com/en/xlt/download.html)
- JDK 7 or higher
- Browser: 
    - Firefox 31 up to latest Version 42
    - or Google Chrome v30 (or higher)
    - or Internet Explorer 11 
- Execution Environent:
    - Java IDE (e.g. [Eclipse](https://eclipse.org/downloads/)) or
    - [Apache Ant](https://ant.apache.org/bindownload.cgi)  ( [note for Install Apache Ant](https://ant.apache.org/manual/install.html#installing) )
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
Open file `multi-browser-suite/config/build.properties` and adjust the values
```sh
xlt.lib.dir = path/to/xlt/lib
```
```sh
test.lib.dir = path/to/xlt/lib
```
# Step 2: WebDriver Configuration

### Firefox
Note: Installation, Configuration not required. FirefoxWebdriver are integrated.
- Open file `multi-browser-suite/config/default.properties` and set property to
```sh
xlt.webDriver = firefox
```

### Chrome
Note: Information about ChromeWebdriver [click here](https://sites.google.com/a/chromium.org/chromedriver)
- [Download ChromeDriver](https://sites.google.com/a/chromium.org/chromedriver/downloads) and unpack it (eg: D:/dev/webDriver/)
- Open file `multi-browser-suite/config/default.properties`
- Set property and adjust path to the downloaded ChromeDriver
```sh
xlt.webDriver = chrome
xlt.webDriver.chrome.pathToDriverServer = path/to/webDriver/chromedriver.exe
```

### Internet Explorer 11 (only Microsoft OS Support)
Note: Genaral information about IEWebdriver [click here](https://code.google.com/p/selenium/wiki/InternetExplorerDriver). 
For install/configuration information please read [this note](https://code.google.com/p/selenium/wiki/InternetExplorerDriver#Required_Configuration).

- [Download Internet Explorer Webdriver](http://www.seleniumhq.org/download/) and unpack it (eg: D:/dev/webDriver/)
- Open file `multi-browser-suite/config/default.properties`
- Set property and adjust path to the downloaded IEWebdriver
```sh
xlt.webDriver = ie
xlt.webDriver.ie.pathToDriverServer = path/to/webDriver/IEDriverServer.exe
```

# Step 3: Execution / Run
## Start test case in Eclipse
- select file src->test.search->'TSearch_ProductOnly.java' 
- 'Run as' item in context menu -> 'JUnit Test'

## Run Apache Ant
Open the Command Prompt window by clicking the Start button Picture of the Start button, clicking All Programs, clicking Accessories, and then clicking Command Prompt.

### Performs all the functional tests and creates a JUnit test report
```sh
$ ant test
```

### Run one test and create a JUnit test report
- 'tests.search' is the path to the test case.
- 'TSearch_ProductOnly' is the name of the example test case.
```sh
$ ant test -Dtestcase=tests.search.TSearch_ProductOnly 
```

### Run one test and create a JUnit test report via build.properties
- Open file `multi-browser-suite/config/build.properties`
- Set the name of the testcase 
```sh
test.cases.java = tests.search.TSearch_ProductOnly.java
```
- start ant on console
```sh
$ ant test
```

### Performs all the functional tests and create a JUnit test report with a selected browser
Firefox:
```sh
$ ant -Dwebdriver=firefox test
```
Chrome:
```sh
$ ant -Dwebdriver=chrome test
```
Internet Explorer:
```sh
$ ant -Dwebdriver=ie test
```
## XLT Result Browser
The result browser offers an integrated navigation to browse the complete page output of the transaction and to look at every single request in detail. For more informations about XLT Result Browser [click here](https://lab.xceptance.de/releases/xlt/latest/user-manual.html#XLTResultBrowser).

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
Please note that there is a special folder src/tests/others to collect java based test examples e.g. testing via RemoteWebDriver against [Sauce Labs](https://saucelabs.com/).
