/**
 * Created by pamelasiclari on 02/06/17.
 */

'use strict';

angular.module('puzzle.homepageView', [
    'ngRoute',
])

    .config(['$routeProvider', function($routeProvider) {
        $routeProvider.when('/homepageView', {
            templateUrl: 'HomepageView/homepageView.html',
            controller: 'HomeCtrl'
        });
    }]);

