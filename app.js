/**
 * Created by pamelasiclari on 25/05/17.
 */

'use strict';

// Firebase
var config = {
    apiKey: "AIzaSyAi-jzphMmsIPPB-efJrfuHZUUaOsH-stg",
    authDomain: "puzzle-aa815.firebaseapp.com",
    databaseURL: "https://puzzle-aa815.firebaseio.com",
    projectId: "puzzle-aa815",
    storageBucket: "puzzle-aa815.appspot.com",
    messagingSenderId: "177936804286"
};
firebase.initializeApp(config);


// ANGULAR

angular.module('puzzle', [
    'ngRoute',
    'puzzle.loginView',
    'puzzle.authView',
    'puzzle.homepageView',
    'puzzle.authentication',
    'puzzle.utenti',
    'puzzle.profiloView',
    'puzzle.post',
    'puzzle.listaGenitoriView',
    'puzzle.listaInsegnantiView',
    'puzzle.profiloExtView',
    'puzzle.spazioGenitoriView',
    'puzzle.eventView',
    'puzzle.eventi',
    'puzzle.storage',
    'puzzle.sidebarDirettiva',
    "firebase"
])

    .config(['$locationProvider', '$routeProvider', function($locationProvider, $routeProvider) {
        $locationProvider.hashPrefix('!');
        $routeProvider.otherwise({redirectTo: '/loginView'});
    }])


    .run(["$rootScope", "$location", function($rootScope, $location) {
        $rootScope.$on("$routeChangeError", function(event, next, previous, error) {
            // We can catch the error thrown when the $requireSignIn promise is rejected
            // and redirect the user back to the home page

            if (error === "AUTH_REQUIRED") {
                $location.path("/loginView");
            }
        });
    }])

    .controller('indexCtrl', ['$scope', '$rootScope', 'Auth', 'profiloEsterno', 'CommonProp', 'utenti',
                    function($scope, $rootScope, Auth, profiloEsterno, CommonProp, utenti) {

        $rootScope.pagina = {};
        $rootScope.pagina.pagCorrente = 'loginView';

        moment.locale('it');

        $scope.controlloSidebar = function(){
            if($scope.pagina.pagCorrente !== "loginView" && $scope.pagina.pagCorrente !== "authView"){
                return true;
            } else {
                return false;
            }
        };

    }]);