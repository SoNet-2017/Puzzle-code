/**
 * Created by giuseppegullotta on 09/06/17.
 */

'use strict';

angular.module('puzzle.addPostView', [
    'ngRoute'
])

    .config(['$routeProvider', function($routeProvider) {
        $routeProvider.when('/addPostView', {
            templateUrl: 'addPostView/addPostView.html',
            controller: 'addPostCTRL',
            resolve: {
                "currentAuth": ["Auth", function (Auth) {
                    return Auth.$requireSignIn();
                }]
            }
        });
    }])

    .controller('addPostCTRL', ['$scope', '$rootScope', '$firebaseArray', 'CommonProp', 'currentAuth', '$location', 'postList',
                        function($scope, $rootScope, $firebaseArray, CommonProp, currentAuth, $location, postList) {

                $rootScope.pagina = {};
                $rootScope.pagina.pagCorrente = 'addPost';

                $scope.IDLoggato = currentAuth.uid;

                var ref = firebase.database().ref().child("POST");
                $scope.articolo = $firebaseArray(ref);


                $scope.createPost = function() {

                    // AGGIUNTA NUOVO POST AL DATABASE
                    var contenuto = $scope.postTxt;

                    $scope.articolo.$add({
                        IDutente: $scope.IDLoggato,
                        contenuto: contenuto,
                        timestamp: postList.getTimestamp()
                    }).then(function (ref) {
                        console.log(ref);
                    }, function (error){
                        console.log(error);
                    });

                    $location.path("/homepageView");
                }

            }]);

