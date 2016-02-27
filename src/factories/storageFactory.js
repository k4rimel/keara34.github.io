(function(){
	'use strict';

	angular
		.module('ngForecast')
		.factory('Storage', StorageFactory);

	function StorageFactory(Widget,$http, $q, $window, $rootScope) {
		var factory = {};

		factory.cities = [];
		angular.element($window).on('storage', function(event) {
		    if (event.key === 'cities') {
		      	$rootScope.$apply();
		    }
	  	});
    	function setData(val) {
      		$window.localStorage && $window.localStorage.setItem('cities', val);
  			return this;
	    };
    	function getData() {
			return $window.localStorage && $window.localStorage.getItem('cities');
	    };
		function getFromLS() {
			if(!JSON.parse(getData())) {
				setData('[]');
			}
			var dataTab = JSON.parse(getData());
			factory.cities = dataTab;
		}
		function saveToLS() {
			if(!JSON.parse(getData())) {
				setData('[]');
			}
			var dataTab = JSON.parse(getData());
			dataTab = factory.cities;
			setData(JSON.stringify(dataTab));
		};
		function hasDuplicate(city) {
			var flag = false;
			for (var i = 0; i < factory.cities.length; i++) {
				if(factory.cities[i].id === city.id) {
					flag = true;
				}
			}
			return flag;
		}
		factory.get = function() {
			getFromLS();
			return factory.cities;
		};
		factory.save = function(city) {
			if(!hasDuplicate(city)) {
				factory.cities.push(city);
				saveToLS();
			} 
		};
		factory.refresh = function(cb) {
			var idsTab = [];
			for (var i = 0; i < factory.cities.length; i++) {
				idsTab.push(factory.cities[i].id);
			}
			Widget.getAllCities(idsTab.join(",")).then(function(res) {
				var updatedCities = [];
				var error = false;
				for (var i = 0; i < res.cnt; i++) {
					var city = {};
					var prefix = 'wi wi-';
					var wCode = res.list[i].weather[0].id;
				  	var icon = ICONS[wCode].icon;
				  	if (!(wCode > 699 && wCode < 800) && !(wCode > 899 && wCode < 1000)) {
			  	 		icon = 'day-' + icon;
				  	}
				  	icon = prefix + icon;
					city.temp = Math.floor(res.list[i].main.temp);
					city.icon = icon;
					city.desc = res.list[i].weather[0].description;
					city.name = res.list[i].name;
					city.id = res.list[i].id;
					updatedCities.push(city);
				}
				factory.cities = updatedCities;
				cb(false);
				saveToLS();
			}, function (res) {
				error = true;
				cb(error, res.statusText);
			}).finally(function(res) {
			    cb(error);
		  	});
		}
		factory.remove = function(city) {
			var factoryCities = factory.cities;
			for (var i = 0; i < factoryCities.length; i++) {
				if(factoryCities[i].id === city.id) {
					factoryCities.splice(i, 1);
				}
			}
			saveToLS();
		};
		return factory;
	}
})();