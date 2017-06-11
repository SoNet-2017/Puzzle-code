/**
 * Created by lilia on 06/06/2017.
 */

'use strict';

angular.module('puzzle.listaGenitoriView', [
    'ngRoute',
    'angularModalService',
    'firebase'
])

    .config(['$routeProvider', function($routeProvider) {
        $routeProvider.when('/listaGenitoriView', {
            templateUrl: 'listaGenitoriView/listaGenitoriView.html',
            controller: 'listaGenitoriCTRL',
            resolve: {
                // controller will not be loaded until $requireSignIn resolves
                // Auth refers to our $firebaseAuth wrapper in the factory below
                "currentAuth": ["Auth", function(Auth) {
                    // $requireSignIn returns a promise so the resolve waits for it to complete
                    // If the promise is rejected, it will throw a $routeChangeError (see above)
                    return Auth.$requireSignIn();
                }]

            }
        });
    }])

    .controller('listaGenitoriCTRL', ['$scope', '$rootScope', 'CommonProp', 'currentAuth', '$firebaseObject',
                            function($scope, $rootScope, CommonProp, currentAuth, $firebaseObject){

            $scope.pagina = {};
            $rootScope.pagina.pagCorrente = "listaGenitoriView";

            $scope.tuttiGliUtenti = {};
            $scope.tuttiGliUtenti.elencoUtenti = CommonProp.getAllUser();

            $scope.utenteRegistrato = {};
            $scope.utenteRegistrato.uid = currentAuth.uid;
            $scope.utenteRegistrato.user = CommonProp.getUserInfo($scope.utenteRegistrato.uid);

            $scope.contattaUtente = function(id){

                var ref = firebase.database().ref().child('utenti').child(id);
                console.log(id);
                $scope.contUtente = $firebaseObject(ref);
            }

        }]);

