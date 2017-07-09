/**
 * Created by giuseppegullotta on 03/06/17.
 */
'use strict';

angular.module('puzzle.authentication.authenticationService', [])

    .factory('Auth', ["$firebaseAuth", function($firebaseAuth) {

        return $firebaseAuth();

    }]);