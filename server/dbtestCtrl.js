app.controller('dbtestCtrl', ['$scope', '$interval', '$http',
function($scope, $interval, $http){
    $scope.test = "Something";

    var urlBase = 'http://localhost:8081/';

    $scope.getSnippetById = function(){
        var id = $scope.snippetbyid;
        $http({
            method: 'GET',
            url: urlBase + 'snippets?id='+id
        }).then(function successCallback(response) {
            $scope.snippetbyidres = response;
        }, function errorCallback(response) {
            $scope.snippetbyidres = response;
        });

    }


    $scope.postSnippet = function(){
        var postData = $scope.postsnippet;
        $http({
            method: 'POST',
            url: urlBase + 'snippets',
            params: postData
        }).then(function successCallback(response){
            $scope.postsnippetres = response;
        }, function errorCallback(response){
            $scope.postsnippetres = response;
        });
    }
}]);
