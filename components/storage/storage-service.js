/**
 * Created by giuseppegullotta on 15/06/17.
 */

'use strict';

angular.module('puzzle.storage.storageService', [])

    .factory('storeService', function commonProp($firebaseArray, $firebaseObject) {

        return {

            addFileGenitore: function (titolo, url, tipo, utente) {
                var ref = firebase.database().ref().child("file");
                var gen = $firebaseArray(ref);


                gen.$add({
                    titolo: titolo,
                    url: url,
                    creatore: utente.$id,
                    citta: utente.citta,
                    scuola: utente.figlio1.scuolaFiglio,
                    classe: utente.figlio1.classeFiglio,
                    sezione: utente.figlio1.sezioneFiglio,
                    tipo: tipo
                }).then(function (ref) {
                    console.log(ref);
                }, function (error){
                    console.log(error);
                });
            },

            addFileInsegnante: function (titolo, url, tipo, utente) {
                var ref = firebase.database().ref().child("file");
                var gen = $firebaseArray(ref);


                gen.$add({
                    titolo: titolo,
                    url: url,
                    creatore: utente.$id,
                    citta: utente.citta,
                    scuola: utente.scuola,
                    classe: utente.classe,
                    sezione: utente.sezione,
                    tipo: tipo
                }).then(function (ref) {
                    console.log(ref);
                }, function (error){
                    console.log(error);
                });
            },

            getAllFile: function () {

                var ref = firebase.database().ref().child("file");
                return $firebaseArray(ref);
            }


        }

    });