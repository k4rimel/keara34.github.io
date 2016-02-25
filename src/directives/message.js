(function() {
    'use strict';

    angular
        .module('ngForecast')
        .directive('message', message);

    function message() {
        return {
            replace: true,
            restrict: 'EA',
            templateUrl: 'src/views/partials/home/message.html',
        };
    };
})();