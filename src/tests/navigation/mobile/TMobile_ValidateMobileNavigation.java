/*
 * NOTE: This file is generated. Do not edit! Your changes will be lost.
 */
package tests.navigation.mobile;

import com.xceptance.xlt.api.engine.scripting.ScriptName;

import xltutil.AbstractAnnotatedScriptTestCase;
import xltutil.annotation.TestTargets;

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
        "iphone5"
    })
public class TMobile_ValidateMobileNavigation extends AbstractAnnotatedScriptTestCase
{
}
