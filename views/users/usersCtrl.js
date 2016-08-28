app.controller('usersCtrl', ['$scope', '$interval', '$http',
function($scope, $interval, $http){
    $scope.title = "Hej användare";

    var urlBase = 'http://127.0.0.1:8081/';

    $scope.getallUsers = function(){
        $http({
            method: 'GET',
            url: urlBase + 'users'
        }).then(function successCallback(response){
            $scope.userlist = response.data;
        }, function errorCallback(response){
            $scope.userlist = response;
        });
    }

    $scope.getallUsers();


    $scope.addNewUser = function(){
        $http({
            method: 'POST',
            url: urlBase + 'users',
            params: {
                name : $scope.newusername,
                secret : $scope.newusersecret
            }
        }).then(function successCallback(response){
            $scope.res = response.data;
            $scope.getallUsers();
        }, function errorCallback(response){
            $scope.res = response;
        });
    }
}]);
