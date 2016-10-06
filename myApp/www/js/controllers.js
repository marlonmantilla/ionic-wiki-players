angular.module('app.controllers', [])
  
.controller('pageCtrl', ['$scope', '$state', '$stateParams', 'Restangular','$localStorage', 'DatabaseFactory',  'Player',
function ( $scope, $state, $stateParams,Restangular,$localStorage, DatabaseFactory, Player) {

  $scope.player = {};
  $scope.loading = null;
  $scope.localPlayers = [];

  DatabaseFactory.selectAll('player').then(
    function () { console.log('Empty Result!'); },
    function () { console.log('Error!'); },
    function (data) {
      $scope.localPlayers = _.map(data.result.rows, function (p) {return p});
    }
  );

  $scope.openPlayer = function (player) {
    $scope.player.name = "";
    $localStorage.name = player.name;
    $localStorage.team = player.team;
    $localStorage.age = player.dob;
    $localStorage.avatar = player.avatar;
    $localStorage.clubes = player.clubes;
    $state.go("player");
  };

  $scope.find = function(){

    $scope.loading = "Loading...";

    if ($scope.player.name == "") {
      $scope.notFound = true;
      $scope.loading = null;
      return;
    }

    Player.exists($scope.player.name).then(function (localData) {

      if (localData.rows.length > 0) {
        $scope.loading = null;
        $scope.openPlayer(localData.rows[0]);
      }else {
        Player.fetch($scope.player.name).then(function(data){
          $scope.loading = null;
          if (data.clubes.length == 0) {
            $scope.notFound = true;
          }else {

            $scope.notFound = false;
            $localStorage.name = data.name;
            $localStorage.team = data.team;
            $localStorage.age = data.dob;
            $localStorage.avatar = data.avatar;
            
            $localStorage.clubes = _.map(data.clubes, function (d){ return d.club }).reverse().join();

            var newPlayer = {
              name: data.name,
              team: data.team,
              dob: data.dob,
              avatar: data.avatar,
              clubes: $localStorage.clubes
            };

            DatabaseFactory.save('player', newPlayer);

            $state.go("player");  
          }
          
        });
      }
      
    });

    
  };

}])
.controller('page2Ctrl', ['$scope', '$stateParams','$localStorage', 
function ($scope, $stateParams,$localStorage) {

  $scope.name = $localStorage.name;
  $scope.team = $localStorage.team;
  $scope.age = $localStorage.age;
  $scope.avatar = $localStorage.avatar;
  $scope.clubes = $localStorage.clubes;


}])
 