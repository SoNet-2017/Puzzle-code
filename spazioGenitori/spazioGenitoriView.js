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

            $scope.uid = currentAuth.uid;
            $scope.utenteRegistrato = CommonProp.getUserInfo($scope.uid);

            $scope.elencoUtenti = CommonProp.getAllUser();

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

                $scope.fileDirectory = "Genitori/" + citta + "/" + scuolaFiglio + "/" + classeFiglio + sezioneFiglio + "/" + $scope.utenteRegistrato.$id;

                console.log($scope.fileDirectory);

                var storageRef = firebase.storage().ref($scope.fileDirectory + "/" + file.name);
                var storageFire = $firebaseStorage(storageRef);

                var task = storageFire.$put(file);

                task.$error(function (error) {
                    console.log(error);
                });

                task.$complete(function (snapshot) {
                    $scope.imgPath = snapshot.downloadURL;
                    console.log("-------------------------");
                    storeService.addFileGenitore($scope.dati.titolo, $scope.imgPath, file.type, $scope.utenteRegistrato, file.name);
                    console.log("post-addFileGenitore");

                });

                console.log(file);
                //console.log($scope.imgPath);
            };


            $scope.isOther = true;

            $scope.immagine = function(tipo) {

                if (tipo === 'image/jpeg' || tipo === 'image/jpg' || tipo === 'image/png') {
                    $scope.isOther = false;
                    return "img";
                }

                if (tipo === 'application/pdf' || tipo === 'text/rtf' || tipo === 'text/doc' || tipo === 'text/docx') {
                    return "pdf";
                }

                if (tipo === 'application/zip') {
                    return "zip";
                }

                if (tipo === 'audio/mp3' || tipo === 'audio/wav' || tipo === 'audio/wma' || tipo === 'audio/ogg' || tipo === 'audio/m4a') {
                    return "music";
                }

                if (tipo === 'video/mp4' || tipo === 'video/mov' || tipo === 'video/wmv') {
                    return "video";
                }

                return "other";

            };


            $scope.deleteFile = function(articolo){

                $scope.fileDaEliminare = articolo;

            };

            $scope.confirmDeleteFile = function(deleteFile){


                var citta = $scope.utenteRegistrato.citta;
                var scuolaFiglio = $scope.utenteRegistrato.figlio1.scuolaFiglio;
                var classeFiglio = $scope.utenteRegistrato.figlio1.classeFiglio;
                var sezioneFiglio = $scope.utenteRegistrato.figlio1.sezioneFiglio;

                $scope.fileDirectory = "Genitori/" + citta + "/" + scuolaFiglio + "/" + classeFiglio + sezioneFiglio + "/" + $scope.utenteRegistrato.$id;

                // Create a reference to the file to delete
                var storageRef = firebase.storage().ref($scope.fileDirectory + "/" + deleteFile.nomeOriginale);
                var storageFire = $firebaseStorage(storageRef);

                // Delete the file
                storageFire.$delete().then(function() {
                    // File deleted successfully
                    console.log("File Cancellato dallo Storage con Successo!");
                    $scope.elencoFile.$remove(deleteFile);
                }).catch(function(error) {
                    // Uh-oh, an error occurred!
                    console.log(error + " ERRORE! File non cancellato!");
                    console.log(deleteFile);
                });

            };

            $scope.controllo = function(gen){

                var t = false;

                if($scope.utenteRegistrato.ruolo === 'GENITORE'){
                    if($scope.utenteRegistrato.citta === gen.citta) {
                        if($scope.utenteRegistrato.figlio1.classeFiglio === gen.figlio1.classeFiglio &&
                            $scope.utenteRegistrato.figlio1.sezioneFiglio === gen.figlio1.sezioneFiglio &&
                            $scope.utenteRegistrato.figlio1.scuolaFiglio === gen.figlio1.scuolaFiglio){
                            t = true;
                            $scope.flag = false;
                        }
                    }
                }

                if($scope.utenteRegistrato.ruolo === 'INSEGNANTE'){
                    if($scope.utenteRegistrato.citta === gen.citta) {
                        if($scope.utenteRegistrato.classe === gen.figlio1.classeFiglio &&
                            $scope.utenteRegistrato.sezione === gen.figlio1.sezioneFiglio &&
                            $scope.utenteRegistrato.scuola === gen.figlio1.scuolaFiglio){
                            t = true;
                            $scope.flag = false;
                        }
                    }
                }

                return t;
            }








        }]);
