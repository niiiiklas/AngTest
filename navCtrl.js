app.controller('navCtrl', ['$scope', '$interval',
function($scope, $interval){

    //initial setup

    $scope.navoptions = [
        {
            title : "Home",
            ref : "/views/home/home.html",
            active : true            
        },
        {
            title : "Snippets",
            ref : "/views/main/main.html",
            active : false 
        },
        {
            title : "History",
            ref : "/views/history/history.html",
            active : false
        },
        {
            title : "Users",
            ref : "/views/users/users.html",
            active : false
        }
    ]

    $scope.currentpageurl = $scope.navoptions[0].ref;
    $scope.setpage = function(url){
        $scope.currentpageurl = url;
    }

    $scope.OnNavItemClick = function (item) {
        var title = item.title;

        $scope.navoptions.forEach( function(entry){
            entry.active = false;
        });
        item.active = true;
        
        $scope.setpage(item.ref);
    }


    //Debug start in snippets:
    $scope.OnNavItemClick($scope.navoptions[3]);
}]);
    