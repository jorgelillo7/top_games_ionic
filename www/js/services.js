var SERVER_URL = 'http://127.0.0.1:8000/api/';
var idUser = 0;
angular.module('starter.services', [])

.factory('Games', function($http, $q) {
var games = [];
  return {
    all: function(){
      var dfd = $q.defer();
      $http.get(SERVER_URL + "games").then(function(response){
        games = response.data.juegos;
        dfd.resolve(games);
      });
      return dfd.promise;
    },
	formList: function(listId){
	  var gamesFromList = [];
      var dfd = $q.defer();
      $http.get(SERVER_URL + "games/fromList/" + listId).then(function(response){
        gamesFromList = response.data;
        dfd.resolve(gamesFromList);
      });
      return dfd.promise;
    },
    get: function(gameId) {
		var game = [];
		var dfd = $q.defer();
       $http.get(SERVER_URL + "games/" + gameId).then(function(response){
	   game = response.data.juego
       dfd.resolve(game);
      });
      return dfd.promise;
    }
  }
})

.factory('Lists', function($http, $q) {
var lists = [];
  return {
    all: function(){
      var dfd = $q.defer();
      $http.get(SERVER_URL + "lists/fromUser/" + idUser).then(function(response){
        lists = response.data;
        dfd.resolve(lists);
      });
      return dfd.promise;
    },
    get: function(listId) {
		var list = [];
		var dfd = $q.defer();
       $http.get(SERVER_URL + "lists/" + listId).then(function(response){
	   list = response.data.juego
       dfd.resolve(list);
      });
      return dfd.promise;
    }
  }
})
 
.factory('Chats', function() {
  // Might use a resource here that returns a JSON array

  // Some fake testing data
  var chats = [{
    id: 0,
    name: 'Ben Sparrow',
    lastText: 'You on your way?',
    face: 'https://pbs.twimg.com/profile_images/514549811765211136/9SgAuHeY.png'
  }, {
    id: 1,
    name: 'Max Lynx',
    lastText: 'Hey, it\'s me',
    face: 'https://avatars3.githubusercontent.com/u/11214?v=3&s=460'
  },{
    id: 2,
    name: 'Adam Bradleyson',
    lastText: 'I should buy a boat',
    face: 'https://pbs.twimg.com/profile_images/479090794058379264/84TKj_qa.jpeg'
  }, {
    id: 3,
    name: 'Perry Governor',
    lastText: 'Look at my mukluks!',
    face: 'https://pbs.twimg.com/profile_images/598205061232103424/3j5HUXMY.png'
  }, {
    id: 4,
    name: 'Mike Harrington',
    lastText: 'This is wicked good ice cream.',
    face: 'https://pbs.twimg.com/profile_images/578237281384841216/R3ae1n61.png'
  }];

  return {
    all: function() {
      return chats;
    },
    remove: function(chat) {
      chats.splice(chats.indexOf(chat), 1);
    },
    get: function(chatId) {
      for (var i = 0; i < chats.length; i++) {
        if (chats[i].id === parseInt(chatId)) {
          return chats[i];
        }
      }
      return null;
    }
  };
})

.service('LoginService', function($q) {
    return {
        loginUser: function(name, pw, http) {
            var deferred = $q.defer();
            var promise = deferred.promise;
 
			http.defaults.headers.post['Access-Control-Allow-Credentials'] = 'true';
			http.post(SERVER_URL + 'users/login', {
                user: name,
                pass: pw
            }, { withCredentials: true }).success(function(data) {
					 if(data.login == true){
						 idUser = data.idUser;  
						 deferred.resolve('Welcome ' + name + '!');
					 } else {
						 deferred.reject('Wrong credentials.');
					 }
					 
				})
				.error(function(data) {
					 deferred.reject('Wrong credentials.');
				});
			
            
            promise.success = function(fn) {
                promise.then(fn);
                return promise;
            }
            promise.error = function(fn) {
                promise.then(null, fn);
                return promise;
            }
            return promise;
        }
    }
});
