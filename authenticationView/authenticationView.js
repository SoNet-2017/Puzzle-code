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
        $scope.elencoCitta = ["Roma", "Milano", "Messina", "Reggio Calabria", "Taranto", "Torino"];

        // ELENCO SCUOLE
        $scope.elencoScuole = [
            {codice: "Roma", scuola: "Vittorio Alfieri"},
            {codice: "Roma", scuola: "Carlo Evangelisti"},
            {codice: "Taranto", scuola: "Don Milani"},
            {codice: "Taranto", scuola: "Europa Primaria"},
            {codice: "Torino", scuola: "Italo Calvino"},
            {codice: "Torino", scuola: "Angiolo Gambaro"},
            {codice: "Milano", scuola: "Leonardo Da Vinci"},
            {codice: "Milano", scuola: "Pietro Micca"},
            {codice: "Messina", scuola: "Lombardo Radice"},
            {codice: "Messina", scuola: "Pietro Donato"},
            {codice: "Reggio Calabria", scuola: "Italo Falcomatà"},
            {codice: "Reggio Calabria", scuola: "Maria Ausiliatrice"}
        ];

        // NUMERO CLASSE
        $scope.numeriClassi = ["I", "II", "III", "IV", "V"];

        // SEZIONE CLASSE
        $scope.sezioniClassi = ["A", "B", "C", "D", "E", "F"];

        // MATERIE DISPONIBILI PER LA SCELTA
        $scope.elencoMaterie = ["Italiano", "Matematica", "Religione", "Educazione Motoria","Educazione Artistica", "Inglese" ];


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