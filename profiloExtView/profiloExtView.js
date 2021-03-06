/**
 * Created by giuseppegullotta on 11/06/17.
 */
/**
 * Created by giuseppegullotta on 07/06/17.
 */

'use strict';

angular.module('puzzle.profiloExtView', [
    'ngRoute'
])

    .config(['$routeProvider', function($routeProvider) {
        $routeProvider.when('/profiloExtView/:userID', {
            templateUrl: 'ProfiloExtView/profiloExtView.html',
            controller: 'ProfiloExtCtrl',
            resolve: {
                "currentAuth": ["Auth", function (Auth) {
                    return Auth.$requireSignIn();
                }]
            }
        });
    }])

    .controller('ProfiloExtCtrl',
        ['$scope', '$rootScope', 'CommonProp', 'utenti', 'profiloEsterno', 'storeService', '$routeParams',
            function($scope, $rootScope, CommonProp, utenti, profiloEsterno, storeService, $routeParams) {

                $rootScope.pagina = {};
                $rootScope.pagina.pagCorrente = 'profiloExtUtente';

                $scope.visitatore = CommonProp.getUserInfo($routeParams.userID);

                $scope.elencoFile = storeService.getAllFile();

                $scope.isOther = true;
                $scope.flag = true;

                $scope.immagine = function(tipo) {

                    $scope.flag = false;

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


            }]);
