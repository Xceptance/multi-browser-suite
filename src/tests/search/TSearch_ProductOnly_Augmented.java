/*
 * NOTE: This file is generated. Do not edit! Your changes will be lost.
 */
package tests.search;

import com.xceptance.xlt.api.engine.scripting.ScriptName;

import tests.augment.AbstractAnnotatedScriptTestCase;
import tests.augment.annotation.TestTarget;
import tests.augment.annotation.TestTargets;
import tests.augment.enums.Browser;
import tests.augment.enums.OS;
import tests.augment.enums.Scope;

/**
 * <p>
 * Test search for products.
 * </p>
 * <h1 id="1-setup-and-preparation">1. Setup and preparation</h1>
 * <ul>
 * <li>Start session, open homepage and delete all visible cookies</li>
 * </ul>
 * <h1 id="2-scope-of-test">2. Scope of test</h1>
 * <ul>
 * <li>Open searchbar</li>
 * <li>Search for text</li>
 * <li>Leads to a catalog page</li>
 * <li>Click first article on catalog</li>
 * <li>Validate product detail page</li>
 * </ul>
 */
@ScriptName("tests.search.TSearch_ProductOnly")
@TestTargets(
    {
    	@TestTarget(testCaseName = "IE8-SauceLabs-Testcase", browser = Browser.InternetExplorer, browserVersion = "8.0", scope = Scope.SauceLabs),
        @TestTarget(testCaseName = "IE11-SauceLabs-Testcase", browser = Browser.InternetExplorer, browserVersion = "11.0", scope = Scope.SauceLabs),
        @TestTarget(testCaseName = "IE11-Local-Testcase", browser = Browser.InternetExplorer, browserVersion = "11.0", scope = Scope.Local),
        @TestTarget(testCaseName = "Firefox-Local-Testcase", browser = Browser.Firefox, scope = Scope.Local),
        @TestTarget(testCaseName = "Chrome-Local-Testcase", browser = Browser.Chrome, scope = Scope.Local),
        @TestTarget(browser = Browser.MobileIphone6Plus, scope = Scope.Local),
        @TestTarget(browser = Browser.MobileGalaxyS3, scope = Scope.Local),
        @TestTarget(browser = Browser.MobileNexus6, scope = Scope.Local),
        @TestTarget(browser = Browser.MobileIphone4, scope = Scope.Local)
    })
public class TSearch_ProductOnly_Augmented extends AbstractAnnotatedScriptTestCase
{
}
