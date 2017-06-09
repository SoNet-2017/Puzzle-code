'use strict';


angular.module('puzzle.loginView', [
    'ngRoute'
])

    .config(['$routeProvider', function($routeProvider) {
        $routeProvider.when('/loginView', {
            templateUrl: 'loginView/loginView.html',
            controller: 'LoginCtrl'
        });
    }])

    .controller('LoginCtrl', ['$scope', '$rootScope', 'Auth', '$location', '$log', function($scope, $rootScope, Auth, $location, $log) {

        $rootScope.pagina.pagCorrente = "loginView";

        $scope.user = {};
        $scope.auth = Auth;   // DA app.js (SE LOGIN CORRETTO)

        $scope.signIn = function() {
            $scope.firebaseUser = null;
            $scope.error = null;
            $scope.auth.$signInWithEmailAndPassword($scope.user.email, $scope.user.password).then(function(firebaseUser) {
                // login successful:
                $location.path("/homepageView");
            }).catch(function(error) {
                $scope.error = error;
                $log.error(error.message);
            });
        };
    }]);