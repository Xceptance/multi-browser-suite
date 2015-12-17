/*
 * NOTE: This file is generated. Do not edit! Your changes will be lost.
 */
package tests.navigation;
import com.xceptance.xlt.api.engine.scripting.AbstractScriptTestCase;
import com.xceptance.xlt.api.engine.scripting.ScriptName;

import tests.augment.AbstractAnnotatedScriptTestCase;
import tests.augment.annotation.TestTarget;
import tests.augment.annotation.TestTargets;
import tests.augment.enums.Browser;
import tests.augment.enums.Scope;


/**
 * <p>Test opens Level 1 Categories and validates Catalog Page</p>
 * <h1 id="1-setup-and-preparation">1. Setup and preparation</h1>
 * <ul>
 * <li>Start session, open homepage and delete all visible cookies</li>
 * </ul>
 * <h1 id="2-scope-of-test">2. Scope of test</h1>
 * <ul>
 * <li>open Handbags</li>
 * <li>validate Page</li>
 * <li>open Clothing</li>
 * <li>validate Page</li>
 * </ul>
 */
@ScriptName
("tests.navigation.TNavigation_ValidateLevel1")
@TestTargets(
    {
    	@TestTarget(testCaseName = "IE8-SauceLabs-Testcase", browser = Browser.InternetExplorer, browserVersion = "8.0", scope = Scope.SauceLabs),
        @TestTarget(testCaseName = "IE11-SauceLabs-Testcase", browser = Browser.InternetExplorer, browserVersion = "11.0", scope = Scope.SauceLabs)
    })
public class TNavigation_ValidateLevel1 extends AbstractAnnotatedScriptTestCase
{
}