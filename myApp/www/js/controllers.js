angular.module('app.controllers', [])
  
.controller('pageCtrl', ['$scope', '$state', '$stateParams', 'Restangular','$localStorage', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName

function ($scope, $state, $stateParams,Restangular,$localStorage) {
	
	$scope.find = function(){
	
	var players = Restangular.one('players');
	players.get({name: $scope.name}).then(function(data){
		$localStorage.name = data.name
		$localStorage.team = data.team
		$localStorage.age = data.dob
		$localStorage.avatar = data.avatar
		$localStorage.clubes = data.clubes[0]
		$state.go("player");
	})
	}

 
}])


   
.controller('page2Ctrl', ['$scope', '$stateParams','$localStorage', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $stateParams,$localStorage) {

	$scope.name = $localStorage.name
	$scope.team = $localStorage.team
	$scope.age = $localStorage.age
	$scope.avatar = $localStorage.avatar
	$scope.clubes = $localStorage.clubes


}])
 