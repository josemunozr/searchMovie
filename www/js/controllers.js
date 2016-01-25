(function() {

angular.module('starter.controllers',[])
	
	.controller('AppCtrl', function ($scope, Appservices, $window) {

		$scope.movie = {};
		

		$scope.getMovie = function(title){
			Appservices.getMovie(title)
				.then(function (res) {
					$scope.movie = res.data.data.movies[0];
					 
					 getLinkPoster($scope.movie)
					 
				})
		}

		function getLinkPoster(data) {
			Appservices.getUrlPoster(data.idIMDB)
				.then(function (res) {
					$scope.movie.urlPoster = res.data.data.link;
					$window.localStorage['movie'] =  angular.toJson($scope.movie);
					$window.location.href = "#/movie";
				})
				.catch(function (err) {
					console.error(err);
				});
		}

		
	})

	.controller('MovieCtrl', function ($scope, Appservices, $window) {
		var movie = JSON.parse($window.localStorage['movie']);

		$scope.poster = movie.urlPoster;
		$scope.plot = movie.simplePlot;
	});

})();