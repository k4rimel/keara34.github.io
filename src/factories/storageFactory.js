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
				console.log(city);
				saveToLS();
			} 
		};
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