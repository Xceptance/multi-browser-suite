/*
 * NOTE: This file is generated. Do not edit! Your changes will be lost.
 */
package tests.search;

import com.xceptance.xlt.api.engine.scripting.ScriptName;

import tests.augment.AbstractAugmentedScriptTestCase;
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
        // @TestTarget(testCaseName = "IE8-Testcase", browser = Browser.InternetExplorer, browserVersion = "8.0", os =
        // OS.Windows,
        // scope = Scope.Local),
        // @TestTarget(testCaseName = "IE11-Testcase", browser = Browser.InternetExplorer, browserVersion = "11.0", os =
       //  OS.Windows,
       //  scope = Scope.SauceLabs),
        @TestTarget(testCaseName = "FF-Testcase", browser = Browser.Chrome, browserVersion = "", os = OS.Windows, scope = Scope.Local),

    })
public class TSearch_ProductOnly_Augmented extends AbstractAugmentedScriptTestCase
{
}
