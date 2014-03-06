var ichip = angular.module("ichip", ["ngRoute", "ngResource"]);


// Constants Declaration
ichip.constant("$config", {
    serviceUrl : "http://localhost:81/api/mobile/:controller/:methodName",
    accountTokenKey : "accountToken",
    sessionTokenKey : "sessionToken",
    translationFolder : "languages",
    defaultLanguage : "en-us",

    // Declaration of Global String
    messageEmailPwdIncorrect : "Email or Password Incorrect",
    messageEnterEmail : "Enter E-mail Address",
    messageInvalidEmail : "Invalid E-mail Address",
    messageEnterPwd : "Enter Password",
    messageInvalidPwd : "Invalid Password",

    messageErrorSending : "Error in Sending mail",
    messageErrorShowPwd : "Error Response",
    messagePwdNotMatch : "Password Does Not Matched"
});


ichip.config(["$routeProvider", "$httpProvider", "$locationProvider",function ($route, $httpProvider, $locationProvider) {
    //$locationProvider.html5Mode(true);

    $route.when("/login", {
        templateUrl: "views/login.html",
        controller: "loginController"
    });

    $route.when("/forget", {
        templateUrl:"views/forget.html",
        controller:"forgetController"
    });


    $route.when("/reset",{
        templateUrl:"views/reset.html",
        controller:"resetController"
    });

    $route.when("/setPassword", {
        templateUrl:"views/setPassword.html",
        controller:"setPasswordController"
    });


    $route.when("/dashboard", {
        templateUrl: "views/dashboard.html",
        controller: "dashboardController"
    });

    $route.otherwise({ redirectTo: '/login' });

    // Header Declaration
    $httpProvider.defaults.headers.common["Content-Type"] = "application/json;charset=UTF-8";
    $httpProvider.defaults.headers.common["deviceAppSecret"] = "b5g56055-39g8-2233-cd60-11d154e83d56";
    $httpProvider.defaults.useXDomain = true;

    delete $httpProvider.defaults.headers.common['X-Requested-With'];

}]);