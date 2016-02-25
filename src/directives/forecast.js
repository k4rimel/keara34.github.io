(function() {
    'use strict';

    angular
        .module('ngForecast')
        .directive('forecast', forecast);

    function forecast() {
        return {
            replace: true,
            restrict: 'EA',
            templateUrl: 'src/views/partials/home/forecast.html',
        };
    };
})();