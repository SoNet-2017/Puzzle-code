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

        $scope.flagEmailNonValida = false;
        $scope.flagPasswordNonValida = false;

        $scope.signIn = function() {
            $scope.firebaseUser = null;
            $scope.error = null;
            $scope.auth.$signInWithEmailAndPassword($scope.user.email, $scope.user.password).then(function(firebaseUser) {
                // login successful:

                $location.path("/homepageView");
            }).catch(function(error) {
                if(error.message === 'The password is invalid or the user does not have a password.') {
                    console.log("ERRORE! Password non valida");
                    $scope.flagPasswordNonValida = true;
                    $scope.flagEmailNonValida = false;
                }
                if(error.message === 'There is no user record corresponding to this identifier. The user may have been deleted.' ||
                   error.message === 'The email address is badly formatted.') {
                    console.log("ERRORE! Email non valida");
                    $scope.flagPasswordNonValida = false;
                    $scope.flagEmailNonValida = true;
                }
            });
        };
    }]);