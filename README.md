# Readme

This is a demo test suite for [katespade.com](http://www.katespade.com).

This test suite has been built for and with __XLT__


# Test Suite Setup

The following prerequisites and installation steps are needed to run the test suite with __XLT Script Developer__ in Firefox or the __XLT Framework__ orchestrating different WebDrivers. For further help please refer to [XLT Online](https://www.xceptance.com/en/xlt/documentation.html).

Methods of Execution
	1. IDE (Eclipse), 
	2. Ant

# Internet Explorer, Chrome, Firefox  via Eclipse

## Prerequisites

- XLT&reg; Framework v4.5 (or higher) [Download the XLT Framework](https://www.xceptance.com/en/xlt/download.html)
- JDK 7 or higher
- Java IDE (e.g. [Eclipse](https://eclipse.org/downloads/))
- Browser: 
-- Goole Chrome v30 (or higher)
-- or Firefox 42.0 It now supports Firefox 31/ESR to 42
-- or Internet Explorer 8

## Basic Eclipse Configuration
- File -> Import 
- Git -> Projects from Git -> [Next] 
- Clone URI -> [Next]
- URI to: https://github.com/Xceptance/multi-browser-suite.git -> [Next] 
- Select “master” -> [Next] 
- Directory: your Workspace (eg: path/to/multi-browser-suite) -> [Next] 
- Select “Import existing Eclipse projects” -> [Next] 
- Check all values and press [Finish]
- Click left on project folder
- Select Build Path configure Build Path
- Libraries -> [Add External JARs]
- Go to your xlt path /libs
- Select all jar files and press [OK]


## Chrome Configuration
- [Download ChromeDriver](https://sites.google.com/a/chromium.org/chromedriver/downloads) (from https://sites.google.com/a/chromium.org/chromedriver/downloads) and unpack it (eg: D:/dev/webDriver/)
- Open file multi-browser-suite/config/default.properties
- Change the defaulte value "xlt.webDriver = firefox" to "xlt.webDriver = chrome"
- Adjust the value "xlt.webDriver.chrome.pathToDriverServer = xxx" with your ChromeDriver folder
	- Windows eg: to "xlt.webDriver.chrome.pathToDriverServer = path/to/webDriver/chromedriver.exe
	- Linux eg: to "xlt.webDriver.chrome.pathToDriverServer = /home/.../dev/webDriver/chromedriver

## Internet Explorer Configuration (only Microsoft OS Support)
- [Download Internet Explorer Webdriver](http://www.seleniumhq.org/download/) (from from http://www.seleniumhq.org/download/) and unpack it (eg: D:/dev/webDriver/)
- Open file multi-browser-suite/config/default.properties
- Change the defaulte value "xlt.webDriver = firefox" to "xlt.webDriver = ie"
- Adjust the value "xlt.webDriver.ie.pathToDriverServer  = xxx" with your IEWebdriver folder
	- Windows eg: to "xlt.webDriver.ie.pathToDriverServer  = path/to/webDriver/IEDriverServer.exe"

# Apache Ant
## Prerequisites
- XLT&reg; Script Developer 4.5.8 (or higher)
- [Apache Ant] (https://ant.apache.org/bindownload.cgi) [note for Install Apache Ant](https://ant.apache.org/manual/install.html#installing)

## run Apache Ant

### ant clean
* Deletes any result file from a previous test run

### ant compilie
* Compiles the Java sources

### ant test.init
*Prepares everything for testing

### ant test.java
* Performs a functional test by running the configured Java test cases


### ant test.script
* Performs a functional test by running the configured script test cases

### ant once
* Run the generic script test case suite

### run test
* Performs all the functional tests and creates a JUnit test report

### ant loadtest
* Performs a load test with the test cases configured in the test suite. For this, the XLT load test environment is used.


# XLT Script Developer

## Prerequisites

- XLT&reg; Script Developer 4.5.8 (or higher)
- Firefox 42.0 It now supports Firefox 31/ESR to 42
- [XLT Script Developer](https://www.xceptance.com/en/xlt/download.html) and install Firefox add-on
- multi-browser-suite


## working with XLT Script Developer
- Open `Tools > XLT Script Developer` in Firefox.
- Download and unzip this test suite in a directory of your choice (eg: path/to/multi-browser-suite).
- Import test suite by clicking the `folder` icon above the navigation panel.
- Open test case 'TSearch_ProductOnly' in the navigation panel and click the replay button in the toolbar.

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

