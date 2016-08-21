app.controller('selectorCtrl', ['$scope', '$interval',
function($scope, $interval){
    
    //Fake values:

    var testDataSource = {
        items:[
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
        ]
    };

    $scope.items = testDataSource.items;

    $scope.currentItem = $scope.items[0];

    $scope.selectItem = function(item){
        $scope.currentItem = item;

        $scope.$emit("openfile", [$scope.currentItem.contentref])
    }

    $scope.addNewItem = function(folderItem){
        folderItem.items.push( {
            icontype : 0,
            title : "(added)",
            contentref : 6,
            items : []
        });
    }
}]);