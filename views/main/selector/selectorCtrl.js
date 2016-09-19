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
                snippets : new Array(),
                isSelected : false,
                isExpanded : false,
                addIfNotExists : function(newSnippet){
                    for(var i=0; i < this.snippets.length; i++){
                        if(this.snippets[i].id == newSnippet.id)
                            return;
                    }
                    this.snippets.push(newSnippet);
                },
                isSelectedStyle : function(){
                    if(this.isSelected)
                        return " active ";
                    else
                        return "";
                }
            });
        }
    }

    var findSnippet = function(id){
        for(var i = 0; i < $scope.directories.length; i++){
            for(var sn = 0; sn < $scope.directories[i].snippets.length; sn++){
                if($scope.directories[i].snippets[sn].id == id)
                    return $scope.directories[i].snippets[sn];
            }
        }
        return null;
    }

    $scope.ondirectoryclick = function(dir){
        for(var i = 0; i < $scope.directories.length; i++){
            $scope.directories[i].isSelected = false;
        }
        dir.isExpanded = !dir.isExpanded;
        dir.isSelected = true;

        getSnippetsForDirectory(dir);
    }

    //not used...
    $scope.toggleDirectoryExpand = function(dir){
        dir.isExpanded = !dir.isExpanded;
    } 

    $scope.onsnippetclick = function(snippet){
        $scope.$emit("openfile", { id : snippet.id });
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

    var getSnippetsForDirectory = function(dir){
        $http({
            method: 'GET',
            url: urlBase + 'snippets/:',
            params :{directoryid:dir.id}
        }).then(
            function successCallback(response){
                console.log(response);
                for(var i = 0; i < response.data.length; i++){
                    var snippet = {
                        id: response.data[i].id,
                        name: response.data[i].name,
                        directoryid: response.data[i].directoryid,
                        contenttype : response.data[i].contenttype,
                        isSelected : false
                    };
                    dir.addIfNotExists(snippet);
                }
                
            }, function errorCallback(response){
                console.log(response);
            })
    };


    $scope.createNewSnippetInDir = function(dir){
        var toPost = {
            directoryid : dir.id,
            name : "<new>",
            content : "",
            tags : "new",
            contentType : "unknown"
        };

        $http({
            method: "POST",
            url: urlBase + "snippets/:",
            params : {userid:1},
            data : toPost
        }).then(
            function successCallback(response){
                console.log(response);
                var snippet = {
                        id: response.data.id,
                        name: response.data.name,
                        directoryid: response.data.directoryid,
                        contenttype : response.data.contenttype,
                        isSelected : false
                    };
                    dir.addIfNotExists(snippet);
            }, function errorCallback(response){
                console.log(response);
            }
        );
    }

    $scope.$on("filenamechangedbroadcast", function(event, data){
        console.log("filenamechangedbroadcast in sel");
        console.log(data);

        var snippetToChangeName = findSnippet(data.id);
        console.log(snippetToChangeName);
        if(snippetToChangeName != null)
            snippetToChangeName.name = data.name;
    });

    getDirectories(1);
}]);