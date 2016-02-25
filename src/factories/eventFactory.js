(function(){
	'use strict';

	angular
		.module('ngForecast')
		.factory('eventManager', ['$rootScope', eventFactory]);

	function eventFactory($rootScope) {
		return {
			publishToParents: function(e, args) {
				$rootScope.$emit(e, args);
			},
			publishToChildren: function(e, args) {
				$rootScope.$broadcast(e, args);
			},
			subscribe: function(e, listener) {
				$rootScope.$on(e, listener);
			}
		};
	}
})();