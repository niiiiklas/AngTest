app.controller('paintCtrl', ['$scope', '$interval',
    function($scope, $interval){
    
    //inits
    $scope.test = "Niklas";

    $scope.testtable = [
        [1,2,3,4],
        [8,4,2,7],
        [4,3,6,5],
        [0,8,6,3]
    ];
    function randomIntFromInterval(min,max)
    {
        return Math.floor(Math.random()*(max-min+1)+min);
    }

    function GetRNGColorString() {
        var str = "rgb(";
        str += "" + randomIntFromInterval(100,200) + ",";
        str += "" + randomIntFromInterval(100,200) + ",";
        str += "" + randomIntFromInterval(100,200) + ")";
        return str;
    }

    function GetRandomColor(){
        return { 'background-color' : GetRNGColorString() };
    }

    function SetRNGCellColors(){

        var count = 24
        $scope.celldata = new Array(count);

        for(var x = 0; x < count; x++){
            $scope.celldata[x] = new Array(count);
            for(var y = 0; y < count; y++){
                $scope.celldata[x][y] = {
                    rngNum : "---", //Math.random(),
                    bg : GetRandomColor()
                };
                
                
            }
        }
    }

    $interval(function (){ SetRNGCellColors()}, 500);

}]);