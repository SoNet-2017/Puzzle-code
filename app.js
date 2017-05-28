/**
 * Created by pamelasiclari on 25/05/17.
 */
'use strict';
//1)Dichiaro dipendenza dal route
// il servizio $route
angular.module('myApp', [
    'ngRoute']);

//CONFIGURARE ROUTE PROVIDER -> E' quello che dice come vengono gestite le viste! o $routeProvider:
// esso consente di specificare tramite il when() la mappatura tra un URL relativo e un oggetto di configurazione. Questa mappatura è appunto chiamata route.
//Il metodo otherwise() consente di gestire gli eventuali URL per i quali non è stata definita una mappatura.
// Questo consente di catturare situazioni in cui l’utente inserisce un URL errato o di definire il comportamento di default.
config(['$locationProvider', '$routeProvider', function($locationProvider, $routeProvider) {
    $locationProvider.hashPrefix('!');
    $routeProvider.otherwise({redirectTo: '/loginView'});
}]);