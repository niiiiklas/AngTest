app.controller('mainCtrl', ['$scope', '$interval',
function($scope, $interval){

    $scope.$on("openfile", function(event, data){
        //alert(data[0]);
        console.log("openfile", data);
        $scope.$broadcast("showfile", [data]);
    });

    $scope.$on("filecontentloaded", function(event, data){
        console.log("filecontentloaded", data);
        $scope.$broadcast("newfilecreated", data);
    });
}]);