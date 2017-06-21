/**
 * Created by giuseppegullotta on 21/06/17.
 */
'use strict';

angular.module('puzzle.listaInsegnantiView', [
    'ngRoute'
])

    .config(['$routeProvider', function($routeProvider) {
        $routeProvider.when('/listaInsegnantiView', {
            templateUrl: 'listaInsegnantiView/listaInsegnantiView.html',
            controller: 'listaInsegnantiCTRL',
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

    .controller('listaInsegnantiCTRL', ['$scope', '$rootScope', 'CommonProp', 'currentAuth', '$firebaseObject', 'profiloEsterno',
        function($scope, $rootScope, CommonProp, currentAuth, $firebaseObject, profiloEsterno){

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
            };

            $scope.set = function(id){
                profiloEsterno.setUser(id);
            };

            $scope.controllo = function(ins){

                var t = false;

                if($scope.utenteRegistrato.user.ruolo === 'GENITORE'){
                    if($scope.utenteRegistrato.user.citta === gen.citta) {
                        if($scope.utenteRegistrato.user.figlio1.classeFiglio === ins.classeFiglio &&
                            $scope.utenteRegistrato.user.figlio1.sezioneFiglio === ins.sezioneFiglio &&
                            $scope.utenteRegistrato.user.figlio1.scuolaFiglio === ins.scuolaFiglio){
                            t = true;
                        }
                    }
                }

                if($scope.utenteRegistrato.user.ruolo === 'INSEGNANTE'){
                    if($scope.utenteRegistrato.user.citta === ins.citta) {
                        if($scope.utenteRegistrato.user.classe === ins.classe &&
                            $scope.utenteRegistrato.user.sezione === ins.sezione &&
                            $scope.utenteRegistrato.user.scuola === ins.scuola){
                            t = true;
                        }
                    }
                }

                return t;
            }

        }]);
