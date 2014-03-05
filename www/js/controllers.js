
ichip.controller("loginController", ["$scope", "$location", "$auth", "$config",
    function($scope, $location, $auth, $config){

        $scope.data = { email : null, password : null };
        $scope.displayMessage = null;
        $scope.messageType = null;

        // Call Back Methods
        var successCallback = function () {
            $location.path("/dashboard");
        };
        var errorCallback = function () {
            $scope.showMessage($config.messageEmailPwdIncorrect, "error");
        };

        // if we already have the accountToken, authenticate the user automatically
        if($auth.accountToken())
            $auth.authenticate($auth.accountToken(), $scope.getDeviceId(), successCallback, errorCallback);


        $scope.login = function(){
            if($scope.isValid()){
                $auth.login({
                    email : $scope.data.email,
                    password : $scope.data.password,
                    deviceId : "Android-1234"//$scope.getDeviceId()
                }, successCallback, errorCallback);
            }
        };

        // Get Device ID
        $scope.getDeviceId = function () {
            // see more at http://docs.phonegap.com/en/1.0.0/phonegap_device_device.md.html
            if(window.device)
                return window.device.uuid;
            return null;
        };

        // Validation of Email And Password
        $scope.isValid = function(){
            if(!$scope.data.email){
                $scope.showMessage($config.messageEnterEmail, "error");
                return false;
            }

            if(!/^(([a-zA-Z0-9~\{\}\^\?%&=`'/\*!#\+_\-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([a-zA-Z0-9\-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?))$/.test($scope.data.email)){
                $scope.showMessage($config.messageInvalidEmail, "error");
                return false;
            }

            if(!$scope.data.password){
                $scope.showMessage($config.messageEnterPwd, "error");
                return false;
            }

            if($scope.data.password.length < 8){
                $scope.showMessage($config.messageInvalidPwd, "error");
                return false;
            }
            return true;
        };

        // Method for Displaying Message
        $scope.showMessage = function(text, type){
            $scope.displayMessage = text;
            $scope.messageType = type;
        };
    }]);




ichip.controller("forgetController", ["$scope", "$location", "$auth", "$config",
    function($scope, $location, $auth, $config){

    $scope.displayMessage = null;
    $scope.messageType = null;
    $scope.data = { forgetemail : null };

    // Call Back Methods
    var successCallback = function () {
        $location.path("/login");
    };
    var errorCallback = function () {
        $scope.showMessage($config.messageErrorSending, "error");
    };

    // Forget Password Submit Form Method
    $scope.submitForm = function () {
        if($scope.isValid()){
            $scope.displayMessage = null;
            $scope.messageType = null;

            $auth.forgetPassword({
                email : $scope.data.forgetemail

            }, successCallback, errorCallback);
        }
    };


    // Validation of Email
    $scope.isValid = function(){

        if(!$scope.data.forgetemail){
            $scope.showMessage($config.messageEnterEmail, "error");
            return false;
        }

        if(!/^(([a-zA-Z0-9~\{\}\^\?%&=`'/\*!#\+_\-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([a-zA-Z0-9\-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?))$/.test($scope.data.forgetemail)){
            $scope.showMessage($config.messageInvalidEmail, "error");
            return false;
        }

        return true;
    };

    // Method for Displaying Message
    $scope.showMessage = function(text, type){
        $scope.displayMessage = text;
        $scope.messageType = type;
    };
}]);


ichip.controller("resetController", ["$scope", "$location", function($scope, $location){

}]);


ichip.controller("setPasswordController", ["$scope", "$location", "$auth", "$route", "$routeParams", "$config",
    function($scope, $location, $auth, $route,$routeParams, $config){

        $scope.setData = { password : null, confirmPass : null };
        $scope.displayMessage = null;
        $scope.messageType = null;


        // Get token from URL - Parse the URL and save token into local Storage
        $scope.getUrlToken = function () {
//        //parse URL to get Token ex. ref : http://plnkr.co/edit/4tVZCuCIkqPzhvoa7ffN?p=preview
//        $scope.location = $location.url();
//        $scope.token = $location.hash().split('=')[1];
            $scope.token = window.localStorage.getItem("token");
            return $scope.token;
        };

        // Set Password Click Method
        $scope.passwordSet = function () {
//        alert($scope.token);

            if($scope.isPassValid()){
                $auth.setPassword({
                    password : $scope.setData.password,
                    confirmPass : $scope.setData.confirmPass,
                    urlToken : $scope.getUrlToken()

                }, setPassSuccessCallback, setPassErrorCallback);
            }
        };

        // Call Back Methods
        var setPassSuccessCallback = function () {
            $location.path("/login");
        };

        var setPassErrorCallback = function () {
            $scope.showPassMessage($config.messageErrorShowPwd, "error");
        };

        // Validation of Password Field
        $scope.isPassValid = function () {

            if(!($scope.setData.password) || !($scope.setData.confirmPass)){
                $scope.showPassMessage($config.messageEnterPwd, "error");
                return false;
            }

            if(($scope.setData.password.length < 8) || ($scope.setData.confirmPass.length < 8)){
                $scope.showPassMessage($config.messageInvalidPwd, "error");
                return false;
            }

            if(!($scope.setData.password === $scope.setData.confirmPass)){
                $scope.showPassMessage($config.messagePwdNotMatch, "error");
                return false;
            }
            return true;
        };

        // Method to Display Message
        $scope.showPassMessage = function (text, type) {
            $scope.displayMessage = text;
            $scope.messageType = type;
        };

    }]);