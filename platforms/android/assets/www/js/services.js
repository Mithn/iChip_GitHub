
// $auth will contain all the handshake and token management logic
ichip.service("$auth", ["$config", "$authProxy", function($config, $proxy){
    return {

        // get the stored account token
        accountToken : function(){
            return window.localStorage.getItem($config.accountTokenKey);
        },

        // get the session token by authenticating the deviceId and accountToken
        authenticate: function (accountToken, deviceId, successCallback, errorCallback) {
            // get the sessionToken
            $proxy.getSessionToken({ accountToken : accountToken, deviceId : deviceId }, function(sessionToken){

                // and save the sessionToken
                window.localStorage.setItem($config.sessionTokenKey, sessionToken);
                successCallback();

            }, errorCallback);
        },


        // performs full authentication
        login : function(credentials, successCallback, errorCallback){

            $proxy.getAccountToken(credentials, function(accountToken){

                // save the account accountToken
                window.localStorage.setItem($config.accountTokenKey, accountToken);

               this.authenticate(accountToken, credentials.deviceId, successCallback, errorCallback);

            }, errorCallback);
        },

        forgetPassword: function(email,successCallback,errorCallback){

            $proxy.sendForgotPassword(email, function(){

                // Show the Success Message

            }, errorCallback);

        },

        setPassword : function (setPassData, setPassSuccessCallback, setPassErrorCallback){

            $proxy.setPasswordData(setPassData, function() {

            }, setPassErrorCallback);

        }

    };
}]);

