package multibrowser.search;

import org.junit.Test;

import xltutil.AbstractAnnotatedWebDriverScriptTestCase;
import xltutil.annotation.TestTargets;

/**
 * This is a simple demo for a Google search and will demonstrate how the multi browser suite works.
 */
@TestTargets(
{
  // "IE11_SauceLabs", "Firefox_SauceLabs", "Chrome_SauceLabs",
  "Chrome_1024x768", "Chrome_1500x1000"
    // "FF_1024x768", "FF_1500x1000",
    // "Safari10_SauceLabs",
    // "Galaxy_Note3_Emulation", "iphone5"
})
public class TBlogSearch extends AbstractAnnotatedWebDriverScriptTestCase
{
    /**
     * Executes the test.
     *
     * @throws Throwable
     *             if anything went wrong
     */
    @Test
    public void test()
    {
        //
        // ~~~ Homepage ~~~
        //
        // Open the Google homepage.
        startAction("Homepage");
        open("https://blog.xceptance.com/");
        assertText("css=h1.site-title", "Passionate Testing");

        //
        // ~~~ Search ~~~
        //
        startAction("Search");
        click("css=.search-toggle");
        waitForVisible("css=#search-container input.search-field");
        type("css=#search-container .search-field", "concurrent users");
        submitAndWait("css=.search-form");
        assertText("css=h1.page-title", "glob:Search Results for: concurrent users");

        //
        // ~~~ FirstArticle ~~~
        //
        startAction("FirstArticle");
        clickAndWait("css=#content article:first-of-type h1.entry-title a ");
        assertText("css=h1.entry-title", "Concurrent Users – The Art of Calculation");
    }

}