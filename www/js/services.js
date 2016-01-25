(function () {

	angular.module('starter.services',[] )
		.factory('Appservices', function ($http, $q) {
			var _token = "c78f904f-d541-4e0a-baed-99349d3b5376";
			return {

				getMovie : function (title) {
					$http.jsonp("http://www.myapifilms.com/imdb/idIMDB?title="+ title +"&callback=JSON_CALLBACK&token=" + _token + "&format=json&language=en-us&aka=0&business=0&seasons=0&seasonYear=0&technical=0&filter=2&exactFilter=0&limit=1&forceYear=0&trailers=1&movieTrivia=0&awards=0&moviePhotos=0&movieVideos=0&actors=1&biography=0&uniqueName=0&filmography=0&bornAndDead=0&starSign=0&actorActress=0&actorTrivia=0&similarMovies=0&adultSearch=0")
					  .then(function(res){
					    var movie = res.data.data.movies;
					    window.localStorage['movie'] =  angular.toJson(movie[0]);
					    window.location.href = "#/movie"
					  })
				},
				getUrlPoster : function(id_imdb){
				  var deferred = $q.defer();  

				  $http.jsonp("http://www.myapifilms.com/imdb/image/"+ id_imdb +"?token=" + _token + "&callback=JSON_CALLBACK")
				    .success(function (data) {
				      deferred.resolve(data);
				    });
				  return deferred.promise;
				}
			}
		});

})();
