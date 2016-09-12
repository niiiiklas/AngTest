app.controller('selectorCtrl', ['$scope', '$interval', '$http',
function($scope, $interval, $http){
    
    //Init setup:
    var urlBase = 'http://127.0.0.1:8081/';

    var onLoadedDirectories = function(dirs){
        $scope.directories = new Array();

        for(var i = 0; i < dirs.length; i++){
            var dir = dirs[i];

            $scope.directories.push( {
                dirName : dir.title,
                id : dir.id,
                isSelected : false,
                isExpanded : false
            });
        }
    }

    $scope.ondirectoryclick = function(dir){
        for(var i = 0; i < $scope.directories.length; i++){
            $scope.directories[i].isSelected = false;
        }

        dir.isSelected = true;

        getSnippetsForDirectory(dir.id);
    }

    $scope.toggleDirectoryExpand = function(dir){
        dir.isExpanded = !dir.isExpanded;
    } 

    var getDirectories = function(nuserid){
        $http({
            method: 'GET',
            url: urlBase + 'directories/:',
            params : {userid:nuserid}
        }).then(function successCallback(response){
            console.log(response);
            onLoadedDirectories(response.data);
            //var loadedItems = parseResponseItem(response);
            //for(var i = 0; i < loadedItems.length; i++)
            //    $scope.item.AddItem(loadedItems[i]);
            
        }, function errorCallback(response){
            console.log(response);
        });
    }

    var getSnippetsForDirectory = function(directoryid){
        $http({
            method: 'GET',
            url: urlBase + 'snippets/:',
            params :{directoryid:directoryid}
        }).then(
            function successCallback(response){
                console.log(response);
            }, function errorCallback(response){
                console.log(response);
            })
    };


    getDirectories(1);
}]);