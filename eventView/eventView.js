/**
 * Created by giuseppegullotta on 12/06/17.
 */
'use strict';

angular.module('puzzle.eventView', [
    'ngRoute',
    'ngMaterial',
    'ui.bootstrap',
    'angularModalService'
])


    .config(['$routeProvider', function($routeProvider) {
        $routeProvider.when('/eventView', {
            templateUrl: 'eventView/eventView.html',
            controller: 'eventViewCTRL',
            resolve: {
                // controller will not be loaded until $requireSignIn resolves
                // Auth refers to our $firebaseAuth wrapper in the factory below
                "currentAuth": ["Auth", function (Auth) {
                    // $requireSignIn returns a promise so the resolve waits for it to complete
                    // If the promise is rejected, it will throw a $routeChangeError (see above)
                    return Auth.$requireSignIn();
                }]

            }
        });
    }])



    .controller('eventViewCTRL', ['$scope', '$rootScope', '$filter', 'currentAuth', '$firebaseObject', '$firebaseArray', 'CommonProp', 'eventiService',
        function($scope, $rootScope, $filter, currentAuth, $firebaseObject, $firebaseArray, CommonProp, eventiService){


            $rootScope.pagina = {};
            $rootScope.pagina.pagCorrente = 'eventView';


                // ---- PER DATAPICKER -----
                $scope.myDate = new Date();

                $scope.minimoDate = new Date(
                    $scope.myDate.getFullYear(),
                    $scope.myDate.getMonth(),
                    $scope.myDate.getDate()
                );

                $scope.maxDate = new Date(
                    $scope.myDate.getFullYear(),
                    $scope.myDate.getMonth() + 5,
                    $scope.myDate.getDate()
                );

                $scope.onlyWeekendsPredicate = function(date) {
                    var day = date.getDay();
                    return day === 0 || day === 6;
                };

                this.isOpen = false;
                // -------------------------

                // ---- PER TIMEPICKER -----
                $scope.oraInizio = new Date();
                $scope.oraFine = new Date();

                $scope.hstep = 1;
                $scope.mstep = 1;
                // -------------------------

                // ---- PER TABS -----
                $scope.tabs = [
                    { title:'CASA', content:'CASA' },
                    { title:'SCUOLA', content:'SCUOLA', disabled: true },
                    { title:'EXTRA', content:'EXTRA', disabled: true }
                ];

                $scope.model = {
                    name: 'Tabs'
                };
                // -------------------------

            $scope.day = moment();



            $scope.tuttiGliEventi = {};
            $scope.tuttiGliEventi.elencoutenti = CommonProp.getAllUser();
            $scope.tuttiGliEventi.elencoEventi = eventiService.getAllEvent();

            $scope.utenteRegistrato = CommonProp.getUserInfo(currentAuth.uid);

            $scope.event = {};

            $scope.creaEvento = function() {

                $scope.event.oraI = $filter('date')($scope.oraInizio, 'H:mm', 'CET');
                $scope.event.oraF = $filter('date')($scope.oraFine, 'H:mm', 'CET');
                eventiService.creaNuovoEvento($scope.event, $filter('date')($scope.myDate, 'dd/MM/yyyy', 'CET'), currentAuth.uid);
                //console.log($scope.event);


            };

            $scope.servizio = eventiService;

            $scope.eventoSelezionato = {};

            $scope.viewEvento = function(id) {
                $scope.eventoSelezionato = eventiService.getEventInfo(id);
                console.log($scope.day);
            };


            $scope.sezione = 'CASA';

            $scope.selezioneTab = function(stringa) {
                console.log(stringa);
                $scope.sezione = stringa;
            };

            $scope.t = {};

            $scope.getUtente = function (utente) {
                return true;
            }





    }]);

