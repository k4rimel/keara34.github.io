(function(){
	'use strict';

	angular
		.module('ngForecast')
		.factory('Widget', WidgetFactory);

	function WidgetFactory($http, $q) {
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

		factory.getCity = function(value) {
			//todo : test if http 200 code and errors

			var req;
			// api calls
			if(typeof value === 'string' && isNaN(value)) {
				req = makeRequest('http://api.openweathermap.org/data/2.5/weather?q='+value+'&units=metric&APPID='+factory.key);
			}
			else {
				req = makeRequest('http://api.openweathermap.org/data/2.5/weather?id='+value+'&units=metric&APPID='+factory.key);
			}
			return req;
		};

		return factory;
	}
})();