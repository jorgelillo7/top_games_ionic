angular.module('starter.controllers', [])

.controller('GameCtrl', function($scope, firstgames, $http, Games) {
  var gameOffset = 3;
  $scope.games = [];
  Games.firstGames().then(function(items){
	$scope.games = items;
  });
  
  $scope.loadMore = function() {
    $http.get(SERVER_URL + "moreGames/" + gameOffset).success(function(items) {
		var oldGames= $scope.games;
		var newGames = items.juegos; 
	  $scope.games = oldGames.concat(newGames);
	  gameOffset = oldGames.concat(newGames).length;
      $scope.$broadcast('scroll.infiniteScrollComplete');
    });
  }; 
 
})

.controller('GameDetailCtrl', function($scope, $stateParams, onegame) {
  $scope.game = onegame;
})

.controller('ListsCtrl', function($scope, alllists) {
  $scope.lists = alllists;
})

.controller('ListDetailCtrl', function($scope, $stateParams, gamesfromlist) {
  $scope.gamesfromlist = gamesfromlist;
})

.controller('AboutCtrl', function($scope) {
})

.controller('LoginCtrl', function($scope, LoginService, $ionicPopup, $state, $http) {
    $scope.data = {};
 
    $scope.login = function() {
        LoginService.loginUser($scope.data.username, $scope.data.password, $http).success(function(data) {
            $state.go('tab.game');
        }).error(function(data) {
            var alertPopup = $ionicPopup.alert({
                title: 'Error al iniciar sesión',
                template: 'Por favor revise sus credenciales'
            });
        });
    }
})
