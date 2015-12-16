package xltutil;

import org.junit.runner.RunWith;

import com.xceptance.xlt.api.engine.scripting.AbstractScriptTestCase;

import xltutil.annotation.TestTarget;
import xltutil.annotation.TestTargets;
import xltutil.runner.AnnotationRunner;

/**
 * This is a wrapper-class designed to run XLT-testcases. To use this class you simply inherit from this and add
 * {@link TestTargets} annotation that contains a list of {@link TestTarget} annotations. Within this annotations you
 * can specify in what browser environment your testcase should be executed. You are able to specify the browser,
 * browserversion, operating system and the scope (remote at SauceLabs or local). Furthermore you can define a own for
 * every scenario to distinguish your testcases from each other.
 * 
 * @author m.kaufmann
 */
@RunWith(AnnotationRunner.class)
public abstract class AbstractAnnotatedScriptTestCase extends AbstractScriptTestCase
{
}
