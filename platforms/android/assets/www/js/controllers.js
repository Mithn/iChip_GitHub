
ichip.controller("loginController", ["$scope", "$location", "$auth",
    function($scope, $location, $auth){

        $scope.data = { email : null, password : null };
        $scope.displayMessage = null;
        $scope.messageType = null;

        var successCallback = function () {
            $location.path("/dashboard");
        };
        var errorCallback = function () {
            $scope.showMessage("Email or Password Incorrect", "error");
        };

        // if we already have the accountToken, authenticate the user automatically
        if($auth.accountToken())
            $auth.authenticate($auth.accountToken(), $scope.getDeviceId(), successCallback, errorCallback);


        $scope.login = function(){
            if($scope.isValid()){
                $auth.login({
                    email : $scope.data.email,
                    password : $scope.data.password,
                    deviceId : $scope.getDeviceId()
                }, successCallback, errorCallback);
            }
        };

        $scope.getDeviceId = function () {
            // see more at http://docs.phonegap.com/en/1.0.0/phonegap_device_device.md.html
            if(window.device)
                return window.device.uuid;
            return null;
        };

        $scope.isValid = function(){
            if(!$scope.data.email){
                $scope.showMessage("Enter E-mail Address", "error");
                return false;
            }

            if(!/^(([a-zA-Z0-9~\{\}\^\?%&=`'/\*!#\+_\-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([a-zA-Z0-9\-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?))$/.test($scope.data.email)){
                $scope.showMessage("Invalid E-mail Address", "error");
                return false;
            }

            if(!$scope.data.password){
                $scope.showMessage("Enter Password", "error");
                return false;
            }

            if($scope.data.password.length < 8){
                $scope.showMessage("Invalid Password", "error");
                return false;
            }
            return true;
        };

        $scope.showMessage = function(text, type){
            $scope.displayMessage = text;
            $scope.messageType = type;
        };
}]);




ichip.controller("forgetController", ["$scope", "$location", "$auth", function($scope, $location,  $auth){

    $scope.displayMessage = null;
    $scope.messageType = null;
    $scope.data = { forgetemail : null };

    var successCallback = function () {
        $location.path("/login");
    };
    var errorCallback = function () {
        $scope.showMessage("Error in Sending mail", "error");
    };

    $scope.submitForm = function () {
        if($scope.isValid()){
            $scope.displayMessage = null;
            $scope.messageType = null;
            // alert("hello");

            $auth.forgetPassword({
                email : $scope.data.forgetemail

            }, successCallback, errorCallback);
        }
    };



    $scope.isValid = function(){

        if(!$scope.data.forgetemail){
            $scope.showMessage("Please enter E-mail address", "error");
            return false;
        }

        if(!/^(([a-zA-Z0-9~\{\}\^\?%&=`'/\*!#\+_\-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([a-zA-Z0-9\-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?))$/.test($scope.data.forgetemail)){
            $scope.showMessage("Invalid E-mail address", "error");
            return false;
        }

        return true;
    };

    $scope.showMessage = function(text, type){
        $scope.displayMessage = text;
        $scope.messageType = type;
    };
}]);


ichip.controller("resetController", ["$scope", "$location", function($scope, $location){

}]);


ichip.controller("setPasswordController", ["$scope", "$location", "$auth", "$route", "$routeParams",
    function($scope, $location, $auth, $route,$routeParams){

    $scope.setData = { password : null, confirmPass : null };
    $scope.displayMessage = null;
    $scope.messageType = null;

//  $scope.token = window.localStorage.getItem("token");
//  alert("token : "+$scope.token);

    $scope.getUrlToken = function () {
//        //parse URL to get Token ex. ref : http://plnkr.co/edit/4tVZCuCIkqPzhvoa7ffN?p=preview
//        $scope.location = $location.url();
//        $scope.token = $location.hash().split('=')[1];
        $scope.token = window.localStorage.getItem("token");
        return $scope.token;
    };

    $scope.passwordSet = function () {
        if($scope.isPassValid()){
            $auth.setPassword({
                password : $scope.setData.password,
                confirmPass : $scope.setData.confirmPass,
                urlToken : $scope.getUrlToken()

            }, setPassSuccessCallback, setPassErrorCallback);
        }
    };

    var setPassSuccessCallback = function () {
        $location.path("/login");
    };

    var setPassErrorCallback = function () {
        $scope.showPassMessage("Error Response", "error");
    };

    $scope.isPassValid = function () {

        if(!($scope.setData.password) || !($scope.setData.confirmPass)){
            $scope.showPassMessage("Enter Password", "error");
            return false;
        }

        if(($scope.setData.password.length < 8) || ($scope.setData.confirmPass.length < 8)){
            $scope.showPassMessage("Invalid Password", "error");
            return false;
        }

        if(!($scope.setData.password === $scope.setData.confirmPass)){
            $scope.showPassMessage("Password Does Not Matched","error");
            return false;
        }
        return true;
    };


    $scope.showPassMessage = function (text, type) {
        $scope.displayMessage = text;
        $scope.messageType = type;
    };

}]);