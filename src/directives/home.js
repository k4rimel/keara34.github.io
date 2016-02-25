(function() {
    'use strict';

    angular
        .module('ngForecast')
        .directive('home', home);

    function home() {
        return {
            replace: true,
            restrict: 'EA',
            templateUrl: 'src/views/partials/home/home.html',
        };
    };
})();