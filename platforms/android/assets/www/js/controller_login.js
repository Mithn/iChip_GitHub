
//, "$session", "User"

ichip.controller("LoginController", ["$scope", "$location","$http","myConstants",
    function($scope, $location, $http, myConstants){

        var email = document.getElementById("emaildiv");
        var pass = document.getElementById("passdiv");
        var spinner = document.getElementById("spinner");

        var error_message = document.getElementById("incorrect_alert_message");
        var login_error_message = document.getElementById("login_error_message");

        error_message.style.display = "none";
        login_error_message.style.display = "none";


        var device_id = device.uuid;
        alert("DEVICE ID \n"+device_id);

        window.localStorage.setItem( 'device_ID', device_id);


        // function to submit the form after all validation has occurred
        $scope.processForm = function () {

//            $scope.doesConnectionExist();

            //Checking Network Connection Availability
            $.ajax({
                url: "http://www.google.com",
                context: document.body,
                error: function(jqXHR, exception) {
                    alert('Network Error, Please try again later.');
//                    window.close();
                },
                success: function(){
                    $scope.$apply(function() {
                        $scope.loginProcess();

                    });
                }
            })
        };

        $scope.loginProcess = function () {

            if($scope.valid_login() == true) {

                spinner.style.display = "block";

                // Clear all previous message
                error_message.style.display = "none";
                login_error_message.style.display = "none";


                var device_id = +window.localStorage.getItem( 'device_ID' );
                var post_data = {'username': email.value,
                    'password': pass.value,
                    'deviceId':device_id};
                var content_type = 'application/json';


                // App Secrete key in header, service will automatically add certain HTTP headers to requests.
//                $http.defaults.headers.common.Authorization = 'Basic'+ myConstants.app_SecreteKey;

                $http({
                    method  : 'POST',
                    url     : myConstants.loginUrl,
                    data    : $.param(post_data),  // pass in data as strings
//                    headers : { 'Content-Type': content_type }
                    headers: {'Authorization': 'Basic '+myConstants.app_SecreteKey}
                    // set the headers so angular passing info as form data (not request payload)
                })
                    .success(function(data, status, headers, config) {
                        spinner.style.display = "none";
                        alert("loginSuccess");
                        console.log(status);
                        console.log(data);
                    })
                    .error(function(data, status, headers, config) {
                        spinner.style.display = "none";
                        error_message.style.display = "block";
                        alert("failed");
                        console.log(status);
                        console.log(data);

                        if (404 == status) {
//                       $scope.invalidUsernamePassword = true; // <--------------
                        }
                    });
            }

        };

        $scope.valid_login = function () {

            // Checking for email-address and password input field
            if((email.value)== ""){
                login_error_message.style.display = "block";
                login_error_message.innerHTML = "Enter email address";
                return false;

            } else if (myConstants.email_regular_expression.test(email.value) == false) {
                login_error_message.style.display = "block";
                login_error_message.innerHTML = "Invalid Email Address";
                return false;

            } else if((pass.value)== ""){
                login_error_message.style.display = "block";
                login_error_message.innerHTML = "Enter password";
                return false;

            } else if((pass.value.length)< 8) {
                login_error_message.style.display = "block";
                login_error_message.innerHTML = "Password should not be less than 8 digit";
                return false;

//            } else if(myConstants.password_regular_expression.test(pass.value) == false) {
//                login_error_message.style.display = "block";
//                login_error_message.innerHTML = "Password is week, It should contain 1 uppercase, 1 lowercase, " +
//                    "1 numeric digit and 1 special character";
            } else {
                return true;
            }
        };

//    $scope.login = function(){
//        $user.login({ email : $scope.email, password : $scope.password }, function(response){
//            console.log(JSON.stringify(response));
//            $session.set(response.Id);
//            $location.path("/dashboard");
//        }, function(response){
//            console.log(JSON.stringify(response));
//            if(response.data)
//                alert(response.data.error);
//        });
//    };

    }]);
