/**
 * Created by giuseppegullotta on 08/06/17.
 */

'use strict';

angular.module('puzzle.utenti.CommonProp', [])

    .factory('CommonProp', function commonProp($firebaseArray, $firebaseObject) {

        return {
            getUserInfo: function(userId) {
                // RICHIESTA DELL'OGGETTO UTENTE PRESENTE NEL DATABASE "utenti"
                // DI FIREBASE MEDIANTE PASSAGGIO DELL'ID (IDENTIFICATORE UNIVOCO)

                var userRef = firebase.database().ref().child("utenti").child(userId);
                return $firebaseObject(userRef);
            },

            getAllUser: function(){

                // ARRAY DI TUTTI GLI UTENTI REGISTRATI NEL DATABASE
                var ref = firebase.database().ref().child("utenti");
                return $firebaseArray(ref);
            },

            setFotoProfilo: function(userId, url){

                var ref = firebase.database().ref().child("utenti").child(userId);
                //var obj = $firebaseObject(ref).update(url);

                ref.update({
                   urlFoto: url
                });



            }

        };
    });
