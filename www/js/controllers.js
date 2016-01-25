(function() {

angular.module('starter.controllers',[])
	
	.controller('AppCtrl', function ($scope, Appservices) {

		$scope.getMovie = function(title){
			Appservices.getMovie(title);
		}

	})


})();