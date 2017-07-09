/**
 * Created by giuseppegullotta on 20/06/17.
 */


'use strict';

angular.module('puzzle.storage.fileDownloadDirective', [])

    .factory('downloadService', function commonProp() {

        return {

            getFile: function () {

                // DIRECTORY
                var dir = "";

                // CREAZIONE RIFERIMENTO
                var starsRef = storageRef.child(dir);

                // URL
                starsRef.getDownloadURL().then(function(url) {
                    // Insert url into an <img> tag to "download"
                    console.log(url);

                }).catch(function(error) {

                    switch (error.code) {
                        case 'storage/object_not_found':
                            // FILE NON TROVATO
                            console.log(error);
                            console.log(error.code);
                            break;

                        case 'storage/unauthorized':
                            // L'UTENTE NON L'AUTORIZZAZIONE
                            console.log(error);
                            console.log(error.code);
                            break;

                        case 'storage/canceled':
                            // UTENTE HA CANCELLATO L'UPLOAD
                            console.log(error);
                            console.log(error.code);
                            break;


                        case 'storage/unknown':
                            // ERRORE GENERICO
                            console.log(error);
                            console.log(error.code);
                            break;
                    }
                });

            }

        }

    });



