(function(){
	'use strict';

	angular
		.module('ngForecast')
		.factory('Widget', WidgetFactory);

	function WidgetFactory($http, $q, $timeout) {
		var factory = {};

		factory.data = {};
		factory.key = '765f1d4652f5fd3e9e7adefc65db2b47';

		function makeRequest(url) {
      		var deferred = $q.defer();
      		$http.get(url).then(function(resp) {
  		  		deferred.resolve(resp.data);
      		});
      		return deferred.promise;
    	};
		factory.getAllCities = function(params) {
			return makeRequest('http://api.openweathermap.org/data/2.5/group?id='+params+'&units=metric&APPID='+factory.key);
		}
		factory.getCity = function(params) {
			var promise;
			if(typeof params === 'string' && isNaN(params)) {
				promise = makeRequest('http://api.openweathermap.org/data/2.5/weather?q='+params+'&units=metric&APPID='+factory.key);
			}
			else {
				promise = makeRequest('http://api.openweathermap.org/data/2.5/weather?id='+params+'&units=metric&APPID='+factory.key);
			}
			return promise;
		};

		return factory;
	}
})();