(function() {
    'use strict';

    angular
        .module('ngForecast')
        .directive('toolbar', toolbar);

    function toolbar() {
        return {
            replace: true,
            restrict: 'EA',
            templateUrl: 'src/views/partials/home/toolbar.html',
        };
    };
})();