app.controller('selectorCtrl', ['$scope', '$interval', '$http',
function($scope, $interval, $http){
    
    //Init setup:
    var urlBase = 'http://127.0.0.1:8081/';

    var getRoot = function(){
        $http({
            method: 'GET',
            url: urlBase + 'directories/:',
            params : {userid:1}
        }).then(function successCallback(response){
            $scope.testdebug = response;
            var loadedItem = parseResponseItem(response);
            updateItemsWithItem(loadedItem);
        }, function errorCallback(response){
            $scope.userlist = response;
        });
    }

    var getItemsOfItem = function(itemId) {
        $http({
            method: 'GET',
            url: urlBase + 'directories/:',
            params : {diritemid:itemId}
        }).then(function successCallback(response){
            $scope.testdebug = response;
            var loadedItem = parseResponseItem(response);
            if(loadedItem)
                updateItemsWithItem(loadedItem);
        }, function errorCallback(response){
            $scope.testdebug = response;
        });
    }
    $scope.items = null;

    var parseResponseItem = function(response){
        var respItem = response.data[0];
        if(!respItem){
            return;
        }
        console.log(respItem);
        return {
            id : respItem.id,
            title : respItem.title,
            contentref : respItem.snippetId,
            parentId : respItem.parentId,
            icontype : 0,
            isopen : false,
            items : new Array()
        };
    }

    var updateItemsWithItem = function(item){
        if($scope.items == null){
            $scope.items = new Array();
            $scope.items.push(item);
        }
        else{
            var parent = findParentOfItem(item);
            parent.items.push(item);
        }
    }

    var findParentOfItem = function(item){
        var parent = null;
        for(var i = 0; i < $scope.items.length; i++){
            parent = findParent($scope.items[i], item)
            if(parent != false)
                break;
        }
        return parent;
    }

    var findParent = function(item, tryFindItem){
        var tmpCorrect = null;
        if(item.id == tryFindItem.parentId)
            return item;
        else{
            for(var i = 0; i < item.items.length; i++){
                var res = findParent(item.items[i], tryFindItem);
                if(res != false)
                    return res;
            }
        }
    }

    $scope.selectItem = function(item){
        $scope.currentItem = item;

        $scope.$emit("openfile", [$scope.currentItem])
    }

    $scope.toggleItemOpen = function(item){
        if(!item.isopen){
            item.isopen = true;
            getItemsOfItem(item.id);
        }
    }

    //fix later..
    $scope.addNewItem = function(folderItem){
        folderItem.items.push( {
            icontype : 0,
            title : "(added)",
            contentref : 6,
            items : []
        });
    }

    getRoot();
}]);