(function() {

angular.module('starter.controllers',[])
	
	.controller('AppCtrl', function ($scope, Appservices, $window) {

		$scope.movie = {};
		$scope.search = false;

		$scope.getMovie = function(title){
			$scope.search = true;
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
						var link = "";
						if(d.data.data){
							link = d.data.data.link ;
						}
						
						if(i == 0){
							linkPoster = link;
							links.poster = linkPoster
						}else if(i == data.length-1 && d.data.data){

							$scope.movie.trailer = "https://www.youtube.com/embed/" + d.data.data.videos[0].key;
						}else{
							linkPersons.push(link);
							links.Persons = linkPersons;
						}
					});


					$scope.movie.urlPoster = links.poster;

					links.Persons.forEach(function (l,i) {
						movie.actors[i].urlPhoto = l;
					});

					$scope.search = false;
					$window.localStorage['movie'] =  angular.toJson($scope.movie);
					$window.location.href = "#/movie";
				})
				.catch(function (err) {
					console.error(err);
				})
		}

	})

	.controller('MovieCtrl', function ($scope, Appservices, $window, $sce) {
		var movie = JSON.parse($window.localStorage['movie']);


		$scope.linkimdb = movie.urlIMDB;
		$scope.idimdb = movie.idIMDB;

		$scope.poster = movie.urlPoster;
		$scope.plot = movie.simplePlot;
		$scope.persons = movie.actors;
		$scope.video = $sce.trustAsResourceUrl(movie.trailer);


		$scope.forwardIMDb = function (url){
			$window.location.href = url;
		}

		$scope.goSearch = function(){
			$scope.search = false;
			$window.location.href = '#/'
		}

		$scope.toggleActive = false;
		$scope.favorites =  [];
		$scope.toggleActiveFavorite = function(id){

			if($scope.toggleActive){
				$scope.toggleActive = false;
				$scope.favorites.forEach(function(f,i){
					if (f.idimdb == id){
						$scope.favorites.splice(i,1);
					}
				});

			}else{
				$scope.toggleActive = true;
				$scope.favorites.push({idimdb : id});

				$scope.favorites.forEach(function(f,i){
					if (f.idimdb == id){
						$scope.favorites.splice(i,1);
						$scope.favorites.push({idimdb : id})
						return
					}
				});
			}

			console.log(JSON.stringify($scope.favorites));
			$window.localStorage.favorites = JSON.stringify($scope.favorites);
		}
	});

})();