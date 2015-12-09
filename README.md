# Readme

This is a demo test suite for [katespade.com](http://www.katespade.com).
This test suite has been built for and with __XLT__


# Test Suite Setup

The following prerequisites and installation steps are needed to run the test suite with __XLT Script Developer__ in Firefox or the __XLT Framework__ orchestrating different WebDrivers. For further help please refer to [XLT Online](https://www.xceptance.com/en/xlt/documentation.html).

## Prerequisites
- XLT&reg; Framework v4.5 (or higher) - [Download the XLT Framework](https://www.xceptance.com/en/xlt/download.html)
- JDK 7 or higher
- Browser: 
    - Firefox 42.0 (It now supports Firefox 31/ESR to 42)
    - Goole Chrome v30 (or higher)
    - or Internet Explorer 11 (recommendation
- Java IDE (e.g. [Eclipse](https://eclipse.org/downloads/))
- [Apache Ant](https://ant.apache.org/bindownload.cgi)  ( [note for Install Apache Ant](https://ant.apache.org/manual/install.html#installing) )
- [Source Labs Account](https://saucelabs.com/)

# Methods of Execution
1. IDE (Eclipse)
2. Ant

# Firefox, Chrome, Internet Explorer via Eclipse
## Basic Eclipse Configuration
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

## Firefox - Configuration
- Open file `multi-browser-suite/config/default.properties`
- Change the defaulte value "xlt.webDriver = firefox" to `"xlt.webDriver = firefox"`

## Chrome Configuration
- [Download ChromeDriver](https://sites.google.com/a/chromium.org/chromedriver/downloads) (from https://sites.google.com/a/chromium.org/chromedriver/downloads) and unpack it (eg: D:/dev/webDriver/)
- Open file `multi-browser-suite/config/default.properties`
- Change the defaulte value "xlt.webDriver = firefox" to `"xlt.webDriver = chrome"`
- Adjust the value "`xlt.webDriver.chrome.pathToDriverServer` = xxx" with your ChromeDriver folder
	- Windows eg: to "xlt.webDriver.chrome.pathToDriverServer = `path/to/webDriver/chromedriver.exe`
	- Linux eg: to "xlt.webDriver.chrome.pathToDriverServer = /home/.../dev/webDriver/chromedriver

## Internet Explorer Configuration (only Microsoft OS Support)
- [Download Internet Explorer Webdriver](http://www.seleniumhq.org/download/) (from from http://www.seleniumhq.org/download/) and unpack it (eg: D:/dev/webDriver/)
- Open file `multi-browser-suite/config/default.properties`
- Change the defaulte value "xlt.webDriver = firefox" to `"xlt.webDriver = ie"`
- Adjust the value "`xlt.webDriver.ie.pathToDriverServer`  = xxx" with your IEWebdriver folder
	- Windows eg: to "xlt.webDriver.ie.pathToDriverServer  = `path/to/webDriver/IEDriverServer.exe`"

# Apache Ant

## Configuration Ant 'build.properties' file
- Open file `multi-browser-suite/config/build.properties`
- Adjust the values 
    - `xlt.lib.dir = path/to/xlt/lib`
    - `test.lib.dir = = path/to/xlt/lib`

## Run Apache Ant
Open the Command Prompt window by clicking the Start button Picture of the Start button, clicking All Programs, clicking Accessories, and then clicking Command Prompt.

### Performs all the functional tests and creates a JUnit test report
Firefox:
```sh
$ ant -Dwebdriver=firefox test
```
Chrome:
```sh
$ ant -Dwebdriver=chrome test
```

### Performs one tests and create a JUnit test report
TSearch_ProductOnly is the name of the example test case.

Firefox:
```sh
$ ant -Dwebdriver=firefox test -Dtestcase=tests.search.TSearch_ProductOnly 
```
Chrome:
```sh
$ ant -Dwebdriver=chrome test -Dtestcase=tests.search.TSearch_ProductOnl
```
### Performs one tests and create a JUnit test report via build.properties
- Open file `multi-browser-suite/config/build.properties`
- value `test.cases.java = TSearch_ProductOnly.java"`
Firefox:
```sh
$ ant -Dwebdriver=firefox test
```
Chrome:
```sh
$ ant -Dwebdriver=chrome test
```

### XLT Result Browser
The result browser offers an integrated navigation to browse the complete page output of the transaction and to look at every single request in detail. 

### XLT Result - Structure
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
                       |   `--- cache
                       `---- responses
```
- more information about XLT Result Browser [click her](https://lab.xceptance.de/releases/xlt/latest/user-manual.html#XLTResultBrowser)

###  Deletes any result file from a previous test run
```sh
$ ant clean
```

# Test Suite Structure

This section gives a small introduction to the multi-browser-suite structure. 

## General

    .
    |-- config                             # XLT framework configuration
    |-- scripts
    |   |-- modules/helper                 # scripts for auxiliary services
    |   |-- modules/pages                  # scripts specific pages
    |   |   |-- pdp                        # scripts for productdetailpages
    |   |   |-- search                     # scripts for search page
    |   \-- tests
    |       \-- search                     # tests for search area
    |-- src
    |   |-- tests                          # XLT java wrapper classes
    |   |        \-- others                # other sample tests
    |-- build.properties                   # XLT ant build properties
    |-- build.xml                          # XLT ant build configuration
    |-- xlt-scriptdeveloper.properties     # XLT Script Developer settings
    \-- global_testdata.properties         # global testdata properties

Please note that there is a special folder src/tests/others to collect java based test examples e.g. testing via RemoteWebDriver against [Sauce Labs](https://saucelabs.com/).
