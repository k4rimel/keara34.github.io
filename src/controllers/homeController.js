(function(){
	'use strict';

	angular
		.module('ngForecast')
		.controller('HomeController', HomeController);

	function HomeController($scope, $route, Storage, Widget) {
		$scope.cities = [];
		$scope.err = false;
		$scope.message = {};
		$scope.message.title = "";
		$scope.message.text = "";
		$scope.loading = false;

		function update() {
			$scope.cities = Storage.cities;
		}
		$scope.getData = function() {
			if(Storage.get().length === 0) {
				$scope.err = true;
				$scope.message.title = 'Your forecast menu is empty !';
				$scope.message.text = 'You can add cities via the <strong><a href="settings">Settings</a></strong> menu.';
			} else {
				update();
				$scope.refresh();
			}
		}
		$scope.refresh = function() {
			if(!$scope.loading) {
				$scope.loading = true;
				Storage.refresh(function(err, errMsg) {
					if(!err) {
						update();
					} else {
						$scope.err = true;
						$scope.message = errMsg;
					}
					$scope.loading = false;
				})
			}
		}
		$scope.init = function() {
			$scope.getData();
		};
	  	$scope.init();
	}
})();