/**
 * Created by pamelasiclari on 02/06/17.
 */

'use strict';

angular.module('puzzle.homepageView', [
    'ngRoute',
])

    .config(['$routeProvider', function($routeProvider) {
        $routeProvider.when('/homepageView', {
            templateUrl: 'HomepageView/homepageView.html',
            controller: 'HomeCtrl',
            resolve: {
                // controller will not be loaded until $requireSignIn resolves
                // Auth refers to our $firebaseAuth wrapper in the factory below
                "currentAuth": ["Auth", function(Auth) {
                    // $requireSignIn returns a promise so the resolve waits for it to complete
                    // If the promise is rejected, it will throw a $routeChangeError (see above)
                    return Auth.$requireSignIn();
                }]

            }
        });
    }])


    .controller('HomeCtrl', ['$scope', '$rootScope', 'CommonProp', 'utenti', 'currentAuth',
        function($scope, $rootScope, CommonProp, utenti, currentAuth){

            $scope.today = new Date();

            $scope.pagina = {};
            $rootScope.pagina.pagCorrente = "homepageView";

            $scope.utenteRegistrato = {};
            //$scope.variabileTemporanea = currentAuth.uid;
            $scope.utenteRegistrato.user = CommonProp.getUserInfo(currentAuth.uid);
    }]);