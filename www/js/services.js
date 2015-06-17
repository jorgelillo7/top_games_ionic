var SERVER_URL = 'http://127.0.0.1:8000/api/';
var idUser = 0;
angular.module('starter.services', [])

.factory('Games', function($http, $q) {
var games = [];
  return {
    firstGames: function(){
      var dfd = $q.defer();
      $http.get(SERVER_URL + "moreGames/" + 0).then(function(response){
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
