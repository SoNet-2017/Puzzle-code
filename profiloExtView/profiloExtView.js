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
        $routeProvider.when('/profiloExtView', {
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
        ['$scope', '$rootScope', 'CommonProp', 'utenti', 'profiloEsterno',
            function($scope, $rootScope, CommonProp, utenti, profiloEsterno) {

                $rootScope.pagina = {};
                $rootScope.pagina.pagCorrente = 'profiloExtUtente';


                $scope.visitatore = CommonProp.getUserInfo(profiloEsterno.getUser());

            }]);
