package tests.augment.annotation;

import tests.augment.enums.Browser;
import tests.augment.enums.OS;
import tests.augment.enums.Scope;

public @interface TestTarget
{
    Browser browser();

    String browserVersion();

    OS os();

    Scope scope();
    
    String testCaseName();
}
