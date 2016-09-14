app.controller('contentCtrl', ['$scope', '$interval', '$http',
function($scope, $interval, $http){

    var urlBase = 'http://127.0.0.1:8081/';
    $scope.displaycontent = null

    var loadContentWithKey = function(snippetid){
        if (!snippetid){ //CREATE
            $http({
                method: 'POST',
                url: urlBase + 'snippets/:',
                params : { 
                    id:-1
                },
                data : {
                    content : "Empty",
                    tags : "new",
                    contentType : "text"
                    }
            }).then(function successCallback(response){
                $scope.testdebug = response.data;
                $scope.displaycontent = response.data;
                //var emitWhat = [key, response.data.id];
                //$scope.$emit("filecontentloaded", emitWhat);
            }, function errorCallback(response){
                $scope.testdebug = response;
            });
        } //Fetch
        else
        {
            $http({
                method: 'GET',
                url: urlBase + 'snippets/:',
                params : { 
                    id:snippetid
                }
            }).then(function successCallback(response){
                $scope.testdebug = response.data;
                $scope.displaycontent = response.data;
            }, function errorCallback(response){
                $scope.testdebug = response;
            });
        }
    }

    $scope.displayContentKey = function(key){
        
        for(var i = 0; i < $scope.datasource.length; i++){
            if($scope.datasource[i].key === key){
                $scope.displaycontent = $scope.datasource[i];
            }
        }
    }

    $scope.$on("showfile", function(event, data){
        var snippetid = data[0].id
        console.log("Showing what item: " + snippetid)
        loadContentWithKey(snippetid);
        //$scope.displayContentKey(key);
    });

    $scope.isInEditmode = false;

    $scope.editbuttonclick = function(btn){
        $scope.isInEditmode = !$scope.isInEditmode;
    }
}]);