'use strict'

angular.module('puzzle.authView', ['ngRoute'])

    .config(['$routeProvider', function($routeProvider) {
        $routeProvider.when('/authView', {
            templateUrl: 'authenticationView/authenticationView.html',
            controller: 'AuthCtrl'
        });
    }])

    .controller('AuthCtrl', ['$scope', '$rootScope', 'Auth', 'utenti', '$location', function($scope, $rootScope, Auth, utenti, $location) {

        // ELENCO CITTA'
        $scope.elencoCitta = ["Roma", "Milano", "Napoli", "Palermo", "Taranto", "Torino"];

        // ELENCO SCUOLE
        $scope.elencoScuole = [
            {codice: "Roma", scuola: "Leonardo Da Vinci"},
            {codice: "Roma", scuola: "Antonio Pacinotti"},
            {codice: "Roma", scuola: "Galileo Galilei"},
            {codice: "Taranto", scuola: "Eugenio Ferraris"},
            {codice: "Taranto", scuola: "Scuola Taranto 2"},
            {codice: "Torino", scuola: "Alessandro Volta"},
            {codice: "Milano", scuola: "Scuola Milano 1"},
            {codice: "Milano", scuola: "Scuola Milano 2"},
            {codice: "Milano", scuola: "Scuola Milano 3"},
            {codice: "Napoli", scuola: "Scuola Napoli 1"},
            {codice: "Napoli", scuola: "Scuola Napoli 2"},
            {codice: "Palermo", scuola: "Scuola Palermo 1"},
            {codice: "Palermo", scuola: "Scuola Palermo 2"}
        ];

        // NUMERO CLASSE
        $scope.numeriClassi = ["I", "II", "III", "IV", "V"];

        // SEZIONE CLASSE
        $scope.sezioniClassi = ["A", "B", "C", "D", "E", "F", "G", "H", "I"];

        // MATERIE DISPONIBILI PER LA SCELTA
        $scope.elencoMaterie = ["Italiano", "Storia", "Geografia", "Matematica", "Scienze", "Religione", "Educazione Motoria"];


        $scope.user = {};

        $scope.signUp = function () {
            //check if the second password is equal to the first one
            if ($scope.user.password != '' && $scope.user.password === $scope.user.password2) {
                //create a new user with specified email and password
                Auth.$createUserWithEmailAndPassword($scope.user.email, $scope.user.password)
                    .then(function (firebaseUser) {
                        Auth.$signInWithEmailAndPassword($scope.user.email, $scope.user.password).then(function (internalFirebaseUser) {
                            var userId = internalFirebaseUser.uid;

                            // Registazione GENITORE
                            if ($scope.user.ruolo === 'GENITORE') {
                                utenti.registerNewUserInfoGENITORE(userId, $scope.user.nome, $scope.user.cognome, $scope.user.email, $scope.user.ruolo,
                                    $scope.user.citta, $scope.user.nomeFiglio, $scope.user.cognomeFiglio,
                                    $scope.user.scuola, $scope.user.fasciaClasse, $scope.user.sezioneClasse);
                            }

                            // Registazione INSEGNANTE
                            if ($scope.user.ruolo === 'INSEGNANTE') {
                                utenti.registerNewUserInfoINSEGNANTE(userId, $scope.user.nome, $scope.user.cognome, $scope.user.email, $scope.user.ruolo,
                                    $scope.user.citta, $scope.user.scuola, $scope.user.fasciaClasse, $scope.user.sezioneClasse, $scope.user.materia);
                            }

                            // LOGIN
                            utenti.registerLogin(userId, $scope.user.email);
                            // LOGIN ESEGUITO: Reindirizzamento alla HomepageView
                            $location.path("/homepageView");

                        }).catch(function (error) {
                            $scope.error = error;
                            console.log(error.message);
                        });
                    }).catch(function (error) {
                    $scope.error = error;
                    console.log(error.message);
                });
            }
        };


        // FUNZIONI RELATIVO ALLO SCORRERE DEGLI STEP DI REGISTRAZIONE
        $rootScope.step = {};
        $rootScope.step.vistaCorrente = 0;

        $scope.stepUp = function(){
            $rootScope.step.vistaCorrente = $rootScope.step.vistaCorrente + 1;
        };

        $scope.stepDown = function(){
            $rootScope.step.vistaCorrente = $rootScope.step.vistaCorrente - 1;
        };

    }]);