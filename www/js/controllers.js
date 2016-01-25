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

		function getLinkPoster(movie) {

			var linkPoster = "";
			var linkPersons = [];
			var links = {};

			Appservices.getAllPoster(movie)
				.then(function (data) {
					data.forEach(function (d,i) {
						var link = d.data.data.link;
						if(i == 0){
							linkPoster = link;
							links.poster = linkPoster
						}else{
							linkPersons.push(link);
							links.Persons = linkPersons;
						}
					});


					$scope.movie.urlPoster = links.poster;

					links.Persons.forEach(function (l,i) {
						movie.actors[i].urlPhoto = l;
					});


					$window.localStorage['movie'] =  angular.toJson($scope.movie);
					$window.location.href = "#/movie";
				})
				.catch(function (err) {
					console.error(err);
				})
		}

		
	})

	.controller('MovieCtrl', function ($scope, Appservices, $window) {
		var movie = JSON.parse($window.localStorage['movie']);

		$scope.video = "http://www.youtube.com/embed/dFVxGRekRSg";
		$scope.poster = movie.urlPoster;
		$scope.plot = movie.simplePlot;
		$scope.persons = movie.actors;
	});

})();