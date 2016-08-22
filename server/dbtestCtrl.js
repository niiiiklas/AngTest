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


    $scope.getAllWorkspaces = function(){
        $http({
            method: 'GET',
            url: urlBase + 'workspaces',
        }).then(function successCallback(response){
            $scope.workspacesres = response.resultData;
        }, function errorCallback(response){
            $scope.workspacesres = response;
        });
    }

    $scope.postNewWorkspace = function(){
        var postData = { items:[
            {
                icontype : 0, //0 folder, 1 file/snippet
                title : "Root",
                contentref : "0",
                items : [
                    {
                        icontype : 0,
                        title : "Android",
                        contentref : "1",
                        items : [
                            {
                                icontype : 1,
                                title : "AXML font weight",
                                contentref : "2",
                            },
                            {
                                icontype : 1,
                                title : "Toast plz function",
                                contentref : "3",
                            }
                        ]
                    },
                    {
                        icontype : 1,
                        title : "Secret passwords",
                        contentref : "4",
                    }
                ]
            },
            {
                icontype : 0,
                title : "credits",
                contentref : "5",
                items : []
            }
        ]};
        $http({
            method: 'POST',
            url: urlBase + 'workspaces',
            body: postData
        }).then(function successCallback(response){
            $scope.allworkspacesres = response;
        }, function errorCallback(response){
            $scope.allworkspacesres = response;
        });
    }
}]);
