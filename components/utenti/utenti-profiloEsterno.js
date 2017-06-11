/**
 * Created by giuseppegullotta on 11/06/17.
 */

'use strict'

angular.module('puzzle.utenti.profiloEsterno', [])

    .factory('profiloEsterno', function commonProp($firebaseArray, $firebaseObject) {

        var tempUser = null;

        return {
            setUser: function(userId) {
                tempUser = userId;
                console.log(userId);
            },

            getUser: function(){
                console.log(tempUser);
                return tempUser;
            }
        };
    });
