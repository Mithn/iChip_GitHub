ichip.controller("forgetController", ["$scope", "$location","myConstants", function($scope, $location, myConstants){

//    var email_regular_expression = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
    var forget_email = document.getElementById("forget_email");

    var spinner = document.getElementById("spinner");

    var login_error_message = document.getElementById("login_error_message");
    login_error_message.style.display = "none";

    $scope.forget_submit = function () {

        if(forget_email.value.length != 0) {

            if (myConstants.email_regular_expression.test(forget_email.value) == false) {

                login_error_message.style.display = "block";
                login_error_message.innerHTML = "Invalid Email Address";

            } else {

                spinner.style.display = "block";

                // Hide div after certain time
                var timePeriodInMs = 4000;

                setTimeout(function(){

                    spinner.style.display = "none";

                    $scope.$apply(function() {

                        $location.path("/reset");

                    });


                }, timePeriodInMs);
            }

        } else {
            login_error_message.style.display = "block";
            login_error_message.innerHTML = "Invalid Email Address";
        }
    };

}]);
