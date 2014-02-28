ichip.factory("$authProxy", ["$resource", "$config", function($resource, $config){

    return $resource($config.serviceUrl, { methodName : "@methodName" }, {

        getAccountToken : { method : "POST", methodName : "GetAccountToken" },
        getSessionToken : { method : "POST", methodName : "GetSessionToken" },
        sendForgotPassword : {method : "POST", methodName : "ForgotPassword"},
        setPasswordData : { method : "POST", methodName: "SetPasswordData" }
    });

}]);