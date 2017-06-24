/**
 * Created by giuseppegullotta on 07/06/17.
 */

'use strict';

angular.module('puzzle.profiloView', [
    'ngRoute',
    'firebase',
    'firebase.storage'
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
        ['$scope', '$rootScope', 'CommonProp', 'utenti', 'currentAuth', '$firebaseAuth', '$location', 'storeService', '$firebaseStorage', '$timeout',
            function($scope, $rootScope, CommonProp, utenti, currentAuth, $firebaseAuth, $location, storeService, $firebaseStorage, $timeout) {

                $rootScope.pagina = {};
                $rootScope.pagina.pagCorrente = 'profiloUtente';

                // ID UTENTE LOGGATO
                $scope.IDLoggato = currentAuth.uid;

                // DATI UTENTE LOGGATO
                $scope.utenteRegistrato = {};
                $scope.utenteRegistrato.user = CommonProp.getUserInfo($scope.IDLoggato);


                $scope.elencoFile = storeService.getAllFile();

                var file = null;

                $scope.select = function (event) {
                    file = event.files[0];
                };

                $scope.upload = function() {


                    var citta = $scope.utenteRegistrato.user.citta;
                    var scuola = $scope.utenteRegistrato.user.scuola;
                    var classe = $scope.utenteRegistrato.user.classe;
                    var sezione = $scope.utenteRegistrato.user.sezione;

                    $scope.fileDirectory = "Insegnanti/" + citta + "/" + scuola + "/" + classe + sezione + "/" + $scope.IDLoggato;

                    console.log($scope.fileDirectory);

                    var storageRef = firebase.storage().ref($scope.fileDirectory + "/" + file.name);
                    var storageFire = $firebaseStorage(storageRef);

                    var task = storageFire.$put(file);

                    task.$error(function (error) {
                        console.log(error);
                    });

                    task.$complete(function (snapshot) {
                        console.log(file);
                        $scope.imgPath = snapshot.downloadURL;
                        storeService.addFileInsegnante($scope.dati.titolo, $scope.imgPath, file.type, $scope.utenteRegistrato.user, file.name);
                        console.log("FILE CARICATO CON SUCCESSO:");
                        console.log(file.name);
                        console.log("----------------------------");


                    });
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


                    var citta = $scope.utenteRegistrato.user.citta;
                    var scuola = $scope.utenteRegistrato.user.scuola;
                    var classe = $scope.utenteRegistrato.user.classe;
                    var sezione = $scope.utenteRegistrato.user.sezione;

                    $scope.fileDirectory = "Insegnanti/" + citta + "/" + scuola + "/" + classe + sezione + "/" + $scope.IDLoggato;

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


                $scope.flagFoto = false;

                $scope.uploadFoto = function() {

                    $scope.fileDirectory = "FotoProfilo/" ;


                    console.log($scope.fileDirectory);
                    console.log("formato: " + file.name.split('.').pop());

                    if(file.name.split('.').pop() === 'jpeg' || file.name.split('.').pop() === 'jpg') {

                        $scope.flagFoto = false;

                        var storageRef = firebase.storage().ref($scope.fileDirectory + "/" + $scope.utenteRegistrato.user.$id + "." + file.name.split('.').pop());
                        var storageFire = $firebaseStorage(storageRef);

                        var task = storageFire.$put(file);

                        task.$error(function (error) {
                            console.log(error);
                        });

                        task.$complete(function (snapshot) {
                            console.log(file);
                            $scope.imgPath = snapshot.downloadURL;
                            console.log($scope.utenteRegistrato.user.urlFoto);
                            if($scope.utenteRegistrato.user.urlFoto === "no") {
                                console.log("entrato");
                                CommonProp.setFotoProfilo($scope.IDLoggato, $scope.imgPath);
                            }
                            console.log("FILE CARICATO CON SUCCESSO:");
                            location.reload();

                        });

                    } else {
                        $scope.flagFoto = true;
                    }
                    //console.log($scope.imgPath);
                };


            }]);

