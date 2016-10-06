angular.module('app.controllers', [])
  
.controller('pageCtrl', ['$scope', '$state', '$stateParams', 'Restangular','$localStorage', 'DatabaseFactory',  'Player',
function ( $scope, $state, $stateParams,Restangular,$localStorage, DatabaseFactory, Player) {

  $scope.player = {};
  $scope.loading = null;
  $scope.localPlayers = [];
  $scope.notFound = false;

  Player.all().then(function (res) {
    $scope.localPlayers = res;
  });
   
  $scope.openPlayer = function (player) {
    Player.setCurrentPlayer(player);
    $state.go("player");
  };

  $scope.find = function(){

    $scope.loading = "Loading...";

    if ($scope.player.name == "") {
      $scope.notFound = true;
      $scope.loading = null;
      return;
    }

    Player.existsLocally($scope.player.name).then(function (localData) {
      if (localData) {
        $scope.loading = null;
        $scope.openPlayer(localData);
      }else {
        Player.fetch($scope.player.name).then(function(data){
          $scope.loading = null;
          if (data.clubes.length == 0) {
            $scope.notFound = true;
          }else {

            $scope.notFound = false;
            
            var newPlayer = Player.setCurrentPlayer(data);

            Player.save(newPlayer).catch(function (err) {
              console.log(err);
            });

            $state.go("player");  
          }
          
        });
      }
      
    });

    
  };

}])
.controller('page2Ctrl', ['$scope', '$stateParams','$localStorage', 
function ($scope, $stateParams,$localStorage) {

  $scope.player = $localStorage.player;

}])
