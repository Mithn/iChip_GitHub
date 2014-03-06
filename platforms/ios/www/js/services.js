
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
            $proxy.getSessionToken({ accountToken : accountToken, deviceId : deviceId },
                function(response){

                // and save the sessionToken
                window.localStorage.setItem($config.sessionTokenKey, response.$data);
                successCallback();

            }, errorCallback);
        },


        // performs full authentication
        login : function(credentials, successCallback, errorCallback){

            $proxy.getAccountToken(credentials, function(response){

                // save the account accountToken
                window.localStorage.setItem($config.accountTokenKey, response.$data);

                this.authenticate(response.$data, credentials.deviceId, successCallback, errorCallback);

            }, errorCallback);
        },

        // Forget Password Method
        forgetPassword: function(email,successCallback,errorCallback){

            $proxy.sendResetPasswordEmail(email, function(){

                // Show the Success Message

            }, errorCallback);

        },

        // Set Password Method
        setPassword : function (setPassData, setPassSuccessCallback, setPassErrorCallback){

            $proxy.changePassword(setPassData, function() {

            }, setPassErrorCallback);

        }

    };
}]);


ichip.service("$t", ["$config", function($config){
    return {

    };
}]);

