angular.module('starter.controllers', [])

.controller('DashCtrl', function($scope, allgames) {
  $scope.games = allgames;
})

.controller('GameDetailCtrl', function($scope, $stateParams, onegame) {
	
  $scope.game = onegame;
})

.controller('ChatsCtrl', function($scope, alllists) {
  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //
  //$scope.$on('$ionicView.enter', function(e) {
  //});
  
  $scope.lists = alllists;
})

.controller('ChatDetailCtrl', function($scope, $stateParams, gamesfromlist) {
  $scope.gamesfromlist = gamesfromlist;
})

.controller('AccountCtrl', function($scope) {
})

.controller('LoginCtrl', function($scope, LoginService, $ionicPopup, $state, $http) {
    $scope.data = {};
 
    $scope.login = function() {
        LoginService.loginUser($scope.data.username, $scope.data.password, $http).success(function(data) {
            $state.go('tab.dash');
        }).error(function(data) {
            var alertPopup = $ionicPopup.alert({
                title: 'Login failed!',
                template: 'Please check your credentials!'
            });
        });
    }
})
