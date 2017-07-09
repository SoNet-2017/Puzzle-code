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
                "currentAuth": ["Auth", function(Auth) {
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

            $scope.flag = true;

            $scope.control = function(ins){

                var t = false;

                if($scope.utenteRegistrato.user.ruolo === 'GENITORE'){
                    if($scope.utenteRegistrato.user.citta === ins.citta) {
                        if($scope.utenteRegistrato.user.figlio1.classeFiglio === ins.classe &&
                            $scope.utenteRegistrato.user.figlio1.sezioneFiglio === ins.sezione &&
                            $scope.utenteRegistrato.user.figlio1.scuolaFiglio === ins.scuola){
                            t = true;
                            $scope.flag = false;
                        }
                    }
                }

                if($scope.utenteRegistrato.user.ruolo === 'INSEGNANTE'){
                    if($scope.utenteRegistrato.user.citta === ins.citta) {
                        if($scope.utenteRegistrato.user.classe === ins.classe &&
                            $scope.utenteRegistrato.user.sezione === ins.sezione &&
                            $scope.utenteRegistrato.user.scuola === ins.scuola){
                            t = true;
                            $scope.flag = false;
                        }
                    }
                }

                return t;
            }

        }]);
