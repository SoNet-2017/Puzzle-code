/**
 * Created by giuseppegullotta on 04/06/17.
 */

'use strict';

// SERVIZIO IMPLEMENTAZIONE STATO UTENTE
// SALVATAGGIO INFO E PRIMA REGISTRAZIONE

angular.module('puzzle.utenti.utentiService', [])

    .factory('utenti', ['$firebaseAuth', function($firebaseAuth){

        var utenteLoggato = "";
        var auth = $firebaseAuth();

        return {

            logoutUser: function(){
                auth.$signOut();
                console.log("Utente disconnesso");
                utenteLoggato = "";
                $rootScope.flag = true;

            },


            registerLogin: function (userId, email) {

                // AGGIUNTA UTENTE A ELENCO UTENTI
                var ref = firebase.database().ref().child("utenti").child(userId);



                ref.update({
                    email: email,
                    logged: true
                });
            },


            registerNewUserInfoGENITORE: function (userId, nome, cognome, email, ruolo, citta, nomeFiglio,
                                                   cognomeFiglio, scuolaFiglio, classeFiglio, sezioneFiglio, sesso) {

                // AGGIUNTA NUOVO UTENTE AL DATABASE
                var ref = firebase.database().ref().child("utenti").child(userId);
                var refFiglio1 = firebase.database().ref().child("utenti").child(userId).child("figlio1");

                ref.set({
                    ID: userId,
                    nome: nome,
                    cognome: cognome,
                    email: email,
                    citta: citta,
                    ruolo: ruolo,
                    sesso: sesso,
                    urlFoto: 'no'
                });

                refFiglio1.set({
                    nomeFiglio: nomeFiglio,
                    cognomeFiglio: cognomeFiglio,
                    scuolaFiglio: scuolaFiglio,
                    classeFiglio: classeFiglio,
                    sezioneFiglio: sezioneFiglio
                });



            },

            registerNewUserInfoINSEGNANTE: function (userId, nome, cognome, email, ruolo, citta,
                                                     scuolaFiglio, classeFiglio, sezioneFiglio, materia, sesso) {

                // AGGIUNTA NUOVO UTENTE AL DATABASE
                var ref = firebase.database().ref().child("utenti").child(userId);

                ref.set({
                    ID: userId,
                    nome: nome,
                    cognome: cognome,
                    email: email,
                    citta: citta,
                    ruolo: ruolo,
                    scuola: scuolaFiglio,
                    classe: classeFiglio,
                    sezione: sezioneFiglio,
                    materia: materia,
                    sesso: sesso,
                    urlFoto: 'no'
                });


            }


        };
    }]);
