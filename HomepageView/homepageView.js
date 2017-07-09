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
                "currentAuth": ["Auth", function(Auth) {
                    return Auth.$requireSignIn();
                }]

            }
        });
    }])


    .controller('HomeCtrl', ['$scope', '$rootScope', 'CommonProp', 'utenti', 'currentAuth', 'postList', '$firebaseObject', '$firebaseArray', 'profiloEsterno',
        function($scope, $rootScope, CommonProp, utenti, currentAuth, postList, $firebaseObject, $firebaseArray, profiloEsterno){




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

            $scope.set = function(id){
                profiloEsterno.setUser(id);
            };


            $scope.flag = true;

            $scope.controllo = function(gen){

                var t = false;

                if($scope.utenteRegistrato.user.ruolo === 'GENITORE'){
                    if($scope.utenteRegistrato.user.citta === gen.citta) {
                        if($scope.utenteRegistrato.user.figlio1.classeFiglio === gen.classe &&
                            $scope.utenteRegistrato.user.figlio1.sezioneFiglio === gen.sezione &&
                            $scope.utenteRegistrato.user.figlio1.scuolaFiglio === gen.scuola){
                            t = true;
                            $scope.flag = false;
                        }
                    }
                }

                if($scope.utenteRegistrato.user.ruolo === 'INSEGNANTE'){
                    if($scope.utenteRegistrato.user.citta === gen.citta) {
                        if($scope.utenteRegistrato.user.classe === gen.classe &&
                            $scope.utenteRegistrato.user.sezione === gen.sezione &&
                            $scope.utenteRegistrato.user.scuola === gen.scuola){
                            t = true;
                            $scope.flag = false;
                        }
                    }
                }

                return t;
            }

        }]);