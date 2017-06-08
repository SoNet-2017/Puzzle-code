/**
 * Created by giuseppegullotta on 07/06/17.
 */

'use strict';

angular.module('puzzle.profiloView', [
    'ngRoute'
])

    .config(['$routeProvider', function($routeProvider) {
        $routeProvider.when('/profiloView', {
            templateUrl: 'ProfiloView/profiloView.html',
            controller: 'ProfiloCtrl',
            resolve: {
                "currentAuth": ["Auth", function (Auth) {
                    return Auth.$requireSignIn();
                }]
            }
        });
    }])

    .controller('ProfiloCtrl',
        ['$scope', '$rootScope', 'CommonProp', 'utenti', 'currentAuth', '$firebaseAuth', '$location',
            function($scope, $rootScope, CommonProp, utenti, currentAuth, $firebaseAuth, $location) {

                $rootScope.pagina = {};
                $rootScope.pagina.pagCorrente = 'profiloUtente';

                // ID UTENTE LOGGATO
                $scope.IDLoggato = currentAuth.uid;

                // DATI UTENTE LOGGATO
                $scope.utenteRegistrato = {};
                $scope.utenteRegistrato.user = CommonProp.getUserInfo($scope.IDLoggato);

            }]);

