(function(){
	'use strict';

	angular
		.module('ngForecast')
		.controller('MainController', MainController);

	function MainController() {
		var main = this;

		main.getClass = function (path) {
		  	if ($location.path().substr(0, path.length) === path) {
		  		console.log(path);
		    	return true;
		  	} 
		  	else {
		    	return false;
		  	}
		}
	}
})();

