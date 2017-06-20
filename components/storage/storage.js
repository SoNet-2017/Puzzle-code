/**
 * Created by giuseppegullotta on 15/06/17.
 */

'use strict';



angular.module('puzzle.storage', [
    'puzzle.storage.storageService',
    'puzzle.storage.fileUploadDirective'
])

    .value('version', '0.1');