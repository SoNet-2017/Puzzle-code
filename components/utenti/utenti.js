/**
 * Created by giuseppegullotta on 04/06/17.
 */

'use strict';

// utentiService --> RegistrazioneNuovoUtente, LogIn, LogOut

angular.module('puzzle.utenti', [
    'puzzle.utenti.utentiService',
    'puzzle.utenti.CommonProp'
])

    .value('version', '0.1');