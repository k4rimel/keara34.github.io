(function() {
    'use strict';

    angular
    	.module('ngForecast')
     	.filter('myDateFormat', myDateFormat);

 	function myDateFormat($filter) {
   	  	return function(input)
   	  	{
	  	 	if(input == null){ return ""; } 
	  	 	var _date = $filter('date')(new Date(input), 'yyyy');
	  	 	return _date.toUpperCase();
   	  	};
 	}
})();	


