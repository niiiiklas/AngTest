app.controller('mainCtrl', ['$scope', '$interval',
function($scope, $interval){

    $scope.$on("openfile", function(event, data){
        //alert(data[0]);
        console.log(data);
        $scope.$broadcast("showfile", [data]);
    });
}]);