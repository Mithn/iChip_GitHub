ichip.factory("$authProxy", ["$resource", "$config", function($resource, $config){

    return $resource($config.serviceUrl, { controller: "Authentication", methodName : "@methodName" }, {

        getAccountToken : { method : "POST", params : { methodName : "GetAccountToken" } },
        getSessionToken : { method : "POST", params : { methodName : "GetSessionToken" } },
        sendResetPasswordEmail : { method : "POST", params : { methodName : "SendResetPasswordEmail" } },
        changePassword : { method : "POST", params : { methodName : "ChangePassword" } }

    });

}]);