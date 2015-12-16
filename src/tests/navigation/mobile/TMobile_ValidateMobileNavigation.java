/*
 * NOTE: This file is generated. Do not edit! Your changes will be lost.
 */
package tests.navigation.mobile;

import com.xceptance.xlt.api.engine.scripting.ScriptName;

import tests.augment.AbstractAnnotatedScriptTestCase;
import tests.augment.annotation.TestTarget;
import tests.augment.annotation.TestTargets;
import tests.augment.enums.Browser;
import tests.augment.enums.Scope;

/**
 * <p>
 * Test is for mobile devices only - it uses mobile menu to navigate to the catalog page
 * </p>
 * <p>
 * This test case will only work when your browser window is smaller than 500 pixel
 * </p>
 * <h1 id="1-setup-and-preparation">1. Setup and preparation</h1>
 * <ul>
 * <li>open site, delete cookies , open it again</li>
 * </ul>
 * <h1 id="2-scope-of-test">2. Scope of test</h1>
 * <ul>
 * <li>click on mobile menu</li>
 * <li>click on clothing</li>
 * <li>click on mobile menu</li>
 * <li>close mobile menu</li>
 * </ul>
 */
@ScriptName("tests.navigation.mobile.TMobile_ValidateMobileNavigation")
@TestTargets(
    {
        @TestTarget(browser = Browser.MobileNexus6, scope = Scope.SauceLabs), //
        @TestTarget(browser = Browser.MobileIphone5, scope = Scope.SauceLabs), //
    })
public class TMobile_ValidateMobileNavigation extends AbstractAnnotatedScriptTestCase
{
}
