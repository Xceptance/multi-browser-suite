package xltutil.annotation;

import xltutil.enums.Browser;
import xltutil.enums.OS;
import xltutil.enums.Scope;

public @interface TestTarget
{
    Browser browser();

    String browserVersion() default "";

    OS os() default OS.Windows;

    Scope scope() default Scope.Local;
    
    String testCaseName() default "";
}
