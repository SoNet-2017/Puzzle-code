/**
 * Created by pamelasiclari on 02/06/17.
 */

'use strict';

angular.module('puzzle.profiloView', [
    'ngRoute',
])

    .config(['$routeProvider', function($routeProvider) {
        $routeProvider.when('/profiloView', {
            templateUrl: 'HomepageView/profiloView.html',
            controller: 'ProfiloCtrl'
        });
    }]);


