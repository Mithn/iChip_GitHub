ichip.service("$session", ["$location", function($location){
    var session = null;
    return {
        set : function(token){
            session = token;
        },
        current : function(){
            return session;
        },
        validate : function(){
            if(!session)
                $location.path("/login");
        }
    }
}]);