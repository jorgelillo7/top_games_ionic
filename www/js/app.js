// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.services' is found in services.js
// 'starter.controllers' is found in controllers.js
angular.module('starter', ['ionic', 'starter.controllers', 'starter.services'])

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if (window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleLightContent();
    }
  });
})

.config(['$httpProvider', function($httpProvider) {

        $httpProvider.defaults.useXDomain = true;
        delete $httpProvider.defaults.headers.common['X-Requested-With'];  
    }
])

.config(function($stateProvider, $urlRouterProvider) {

  // Ionic uses AngularUI Router which uses the concept of states
  // Learn more here: https://github.com/angular-ui/ui-router
  // Set up the various states which the app can be in.
  // Each state's controller can be found in controllers.js
  $stateProvider

  // setup an abstract state for the tabs directive
    .state('tab', {
    url: "/tab",
    abstract: true,
    templateUrl: function() {
        if (ionic.Platform.isAndroid()) {
            return  "templates/tabs-android.html";
        }
        return "templates/tabs-ios.html";
    }
  })

  // Each tab has its own nav history stack:

  .state('tab.dash', {
    url: '/dash',
    views: {
      'tab-dash': {
        templateUrl: 'templates/tab-game.html',
        controller: 'DashCtrl',
		resolve: {
        allgames: function(Games) {
          return Games.all(); }
      }
      }
    }
  })
  .state('tab.dash-detail', {
      url: '/dash/:gameId',
      views: {
        'tab-dash': {
          templateUrl: 'templates/tab-game-detail.html',
          controller: 'GameDetailCtrl',
		  resolve: {
          onegame: function(Games, $stateParams) {
          return Games.get($stateParams.gameId); }
		}
		}
	  }
    })
  .state('tab.chats', {
      url: '/chats',
      views: {
        'tab-chats': {
          templateUrl: 'templates/tab-chats.html',
          controller: 'ChatsCtrl',
		  resolve: {
          alllists: function(Lists) {
          return Lists.all(); }
		}
		}
      }
    })
    .state('tab.chat-detail', {
      url: '/chats/:listId',
      views: {
        'tab-chats': {
          templateUrl: 'templates/chat-detail.html',
          controller: 'ChatDetailCtrl',
		  resolve: {
          gamesfromlist: function(Games, $stateParams) {
          return Games.formList($stateParams.listId); }
		}
		}
      }
    })
	
	.state('tab.chat-detail-game-detail', {
      url: '/chats/:list/game/:gameId',
      views: {
        'tab-chats': {
          templateUrl: 'templates/tab-game-detail.html',
          controller: 'GameDetailCtrl',
		  resolve: {
          onegame: function(Games, $stateParams) {
          return Games.get($stateParams.gameId); }
		}
		}
      }
    })
	
	 .state('login', {
      url: '/login',
      templateUrl: 'templates/login.html',
      controller: 'LoginCtrl'
  })

  .state('tab.account', {
    url: '/account',
    views: {
      'tab-account': {
        templateUrl: 'templates/tab-account.html',
        controller: 'AccountCtrl'
      }
    }
  });

  // if none of the above states are matched, use this as the fallback
 $urlRouterProvider.otherwise('/login');

});
