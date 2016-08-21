app.controller('contentCtrl', ['$scope', '$interval',
function($scope, $interval){

    $scope.datasource = [
        {
            key: 0,
            content : "niklas första fildata.."
        },
        {
            key: 1,
            content : "ingenting"
        },
        {
            key: 2,
            content : "vad är detta då??"
        },
        {
            key: 3,
            content : "ds"
        },
        {
            key: 4,
            content : "kdkdkdkd"
        },
        {
            key: 5,
            content : "dsdsdsk k kdkdkkd dkdk dkkdd"
        },
        {
            key: 6,
            content : "jjfjfiieiei"
        },
    ]


    $scope.displaycontent = $scope.datasource[0].content;

    $scope.displayContentKey = function(key){
        
        for(var i = 0; i < $scope.datasource.length; i++){
            if($scope.datasource[i].key === key){
                $scope.displaycontent = $scope.datasource[i].content;
            }
        }
    }

    $scope.$on("showfile", function(event, data){
        var key = parseInt(data[0]);
        console.log("showing what: " + key);
        $scope.displayContentKey(key);
    });
}]);