app.controller('selectorCtrl', ['$scope', '$interval',
function($scope, $interval){
    
    //Fake values:

    var testDataSource = {
        items:[
            {
                icontype : 0, //0 folder, 1 file/snippet
                title : "Root",
                items : [
                    {
                        icontype : 0,
                        title : "Android",
                        items : [
                            {
                                icontype : 1,
                                title : "AXML font weight"
                            },
                            {
                                icontype : 1,
                                title : "Toast plz function"
                            }
                        ]
                    },
                    {
                        icontype : 1,
                        title : "Secret passwords"
                    }
                ]
            },
            {
                icontype : 0,
                title : "credits",
                items : []
            }
        ]
    };

    $scope.items = testDataSource.items;
}]);