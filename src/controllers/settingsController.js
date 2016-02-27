(function(){
	'use strict';

	angular
		.module('ngForecast')
		.controller('SettingsController', SettingsController);

	function SettingsController($scope, $route, Storage, Widget) {
		$scope.cities = Storage.cities;
		$scope.err = false;
		$scope.label = "Enter a city name or code";
		$scope.loading = false;

		function update() {
			$scope.cities = Storage.cities;
		}
		$scope.getData = function() {
			if(Storage.get().length !== 0) {
		  		update();
			}
		};
		$scope.add = function(value) {
			$scope.loading = true;
			Widget.getCity(value).then(function(res) {
					$scope.err = false;
					var city = {};
					var prefix = 'wi wi-';
					var wCode = res.weather[0].id;
					var wDesc = res.weather[0].description;
				  	var icon = ICONS[wCode].icon;
				  	if (!(wCode > 699 && wCode < 800) && !(wCode > 899 && wCode < 1000)) {
			  	 		icon = 'day-' + icon;
				  	}
				  	icon = prefix + icon;
					city.name = res.name;
					city.temp = Math.floor(res.main.temp);
					city.id = res.id;
					city.icon = icon;
					city.desc = wDesc;
					Storage.save(city);
					update();
			}, function (res) {
				$scope.err = true;
				$scope.message = "City not found";
			}).finally(function() {
			    $scope.loading = false;
		  	});
		}
		$scope.remove = function(city) {
			Storage.remove(city);
			update();
		};
	}
})();