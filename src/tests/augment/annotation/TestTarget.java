package tests.augment.annotation;

import tests.augment.enums.Browser;
import tests.augment.enums.OS;
import tests.augment.enums.Scope;

public @interface TestTarget
{
    Browser browser();

    String browserVersion() default "";

    OS os() default OS.Windows;

    Scope scope() default Scope.Local;
    
    String testCaseName() default "";
}
