var ichip = angular.module("ichip", ["ngRoute"]);

//constants
ichip.constant('myConstants', {

    email_regular_expression : /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/,
    password_regular_expression :  /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{8,15}$/,

    app_SecreteKey: 'b5g56055-39g8-2233-cd60-11d154e83d56',
    loginUrl: 'http://127.0.0.1:81/api/Authentication/Login'

});



ichip.config(["$routeProvider", "$httpProvider", function ($route, $httpProvider) {

    $route.when("/login", {
        templateUrl: "views/login.html",
        controller: "LoginController"
    });

    $route.when("/forget", {
        templateUrl:"views/forget.html",
        controller:"forgetController"
    });


    $route.when("/reset",{
        templateUrl:"views/reset.html",
        controller:"resetController"
    });

    $route.when("/set-password", {
        templateUrl:"views/set-password.html",
        controller:"set-passwordController"
    });


    $route.when("/dashboard", {
        templateUrl: "views/dashboard.html",
        controller: "DashboardController"
    });

    $route.otherwise({ redirectTo: '/login' });


//    $http.defaults.headers.common.Authorization = 'Basic'+ myConstants.app_SecreteKey;

    $httpProvider.defaults.headers.common["Content-Type"] = "application/json;charset=UTF-8";
    $httpProvider.defaults.useXDomain = true;

    delete $httpProvider.defaults.headers.common['X-Requested-With'];

}]);