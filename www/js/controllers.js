angular.module('starter.controllers', [])

.controller('GameCtrl', function($scope, allgames, $http, Games) {
  $scope.games = [];
  Games.all().then(function(items){
	$scope.games = items;
  });
  
  $scope.loadMore = function() {
    $http.get(SERVER_URL + "games").success(function(items) {
		var oldGames= $scope.games;
		var newGames = items.juegos; 
	  $scope.games = oldGames.concat(newGames);
      $scope.$broadcast('scroll.infiniteScrollComplete');
    });
  };
 
})

.controller('GameDetailCtrl', function($scope, $stateParams, onegame) {
	
  $scope.game = onegame;
})

.controller('ListsCtrl', function($scope, alllists) {
  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //
  //$scope.$on('$ionicView.enter', function(e) {
  //});
  
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
                title: 'Login failed!',
                template: 'Please check your credentials!'
            });
        });
    }
})
