/**
 * Created by giuseppegullotta on 15/06/17.
 */

'use strict';

angular.module('puzzle.spazioGenitoriView', [
    'ngRoute',
    'firebase',
    'firebase.storage'
])

    .config(['$routeProvider', function($routeProvider) {
        $routeProvider.when('/spazioGenitoriView', {
            templateUrl: 'spazioGenitori/spazioGenitoriView.html',
            controller: 'spazioGenitoriViewCTRL',
            resolve: {
                "currentAuth": ["Auth", function(Auth) {
                    return Auth.$requireSignIn();
                }]

            }
        });
    }])

    .controller('spazioGenitoriViewCTRL', ['$scope', '$rootScope', '$firebaseStorage', 'CommonProp', '$timeout', 'currentAuth', 'storeService',
        function($scope, $rootScope, $firebaseStorage, CommonProp, $timeout, currentAuth, storeService){

            $scope.pagina = {};
            $rootScope.pagina.pagCorrente = "spazioGenitoriView";

            $scope.dati = {};
            // $scope.fileDirectory = "";

            $scope.fileDirectory = {};

            $scope.uid= currentAuth.uid;
            $scope.utenteRegistrato = CommonProp.getUserInfo($scope.uid);


            var file = null;

            $scope.select = function (event) {
                file = event.files[0];
            };

            $scope.elencoFile = storeService.getAllFile();

            $scope.upload = function() {


                var citta = $scope.utenteRegistrato.citta;
                var scuolaFiglio = $scope.utenteRegistrato.figlio1.scuolaFiglio;
                var classeFiglio = $scope.utenteRegistrato.figlio1.classeFiglio;
                var sezioneFiglio = $scope.utenteRegistrato.figlio1.sezioneFiglio;

                $scope.fileDirectory = "Genitori/" + citta + "/" + scuolaFiglio + "/" + classeFiglio + sezioneFiglio + "/" +$scope.utenteRegistrato.$id;

                console.log($scope.fileDirectory);

                var storageRef = firebase.storage().ref($scope.fileDirectory + "/" + file.name);
                var storageFire = $firebaseStorage(storageRef);

                var task = storageFire.$put(file);
                task.$complete(function (snapshot) {
                    $scope.imgPath = snapshot.downloadURL;
                });
                task.$error(function (error) {
                    console.log(error);
                });

                console.log(file);
                //console.log($scope.imgPath);

                storeService.addFileGenitore($scope.dati.titolo, $scope.fileDirectory, file.type, $scope.utenteRegistrato);

            }



        }]);
