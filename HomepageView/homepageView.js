/**
 * Created by pamelasiclari on 02/06/17.
 */

'use strict';

angular.module('puzzle.homepageView', [
    'ngRoute',
    'angularModalService',
    'firebase'
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


    .controller('HomeCtrl', ['$scope', '$rootScope', 'CommonProp', 'utenti', 'currentAuth', 'postList', '$firebaseObject', '$firebaseArray',
        function($scope, $rootScope, CommonProp, utenti, currentAuth, postList, $firebaseObject, $firebaseArray){




            $scope.today = new Date();

            $scope.pagina = {};
            $rootScope.pagina.pagCorrente = "homepageView";

            $scope.utenteRegistrato = {};
            $scope.utenteRegistrato.uid = currentAuth.uid;
            $scope.utenteRegistrato.user = CommonProp.getUserInfo($scope.utenteRegistrato.uid);

            $scope.tuttiGliUtenti = {};
            $scope.tuttiGliUtenti.elencoUtenti = CommonProp.getAllUser();

            $scope.post = {};
            $scope.post.listaPost = postList.getAllPost();

            $scope.variabileTemp = false;


            var ref = firebase.database().ref().child("POST");
            $scope.articolo = $firebaseArray(ref);


            $scope.createPost = function() {

                // AGGIUNTA NUOVO POST AL DATABASE
                var contenuto = $scope.postTxt;

                $scope.articolo.$add({
                    IDutente: $scope.utenteRegistrato.uid,
                    contenuto: contenuto,
                    timestamp: postList.getTimestamp()
                }).then(function (ref) {
                    // SVUOTO IL CONTENUTO DEL POST
                    $scope.postTxt = "";
                    console.log(ref);
                }, function (error){
                    console.log(error);
                });


            }

            $scope.editPost = function(id){

                var ref = firebase.database().ref().child('POST/' + id);
                $scope.editPostData = $firebaseObject(ref);

            }

            $scope.updatePost = function(id){

                var ref = firebase.database().ref().child('POST/' + id);

                ref.update({
                    contenuto: $scope.editPostData.contenuto,
                    timestamp: postList.getTimestamp()
                }).then(function(ref){
                    console.log(ref);
                }, function (error){
                    console.log(error);
                });

            };

            $scope.deletePost = function(articolo){

                $scope.postDaEliminare = articolo;

            };

            $scope.confirmDeletePost = function(deleteArticle){

                $scope.post.listaPost.$remove(deleteArticle);

            };


        }]);