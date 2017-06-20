/**
 * Created by giuseppegullotta on 20/06/17.
 */


'use strict';

angular.module('puzzle.storage.fileDownloadDirective', [])

    .factory('downloadService', function commonProp() {

        return {

            getFile: function () {

                // Scrittura della directory
                var dir = "";

                // Create a reference to the file we want to download
                var starsRef = storageRef.child(dir);

                // Get the download URL
                starsRef.getDownloadURL().then(function(url) {
                    // Insert url into an <img> tag to "download"
                    console.log(url);

                }).catch(function(error) {

                    // A full list of error codes is available at
                    // https://firebase.google.com/docs/storage/web/handle-errors
                    switch (error.code) {
                        case 'storage/object_not_found':
                            // File doesn't exist
                            console.log(error);
                            console.log(error.code);
                            break;

                        case 'storage/unauthorized':
                            // User doesn't have permission to access the object
                            console.log(error);
                            console.log(error.code);
                            break;

                        case 'storage/canceled':
                            // User canceled the upload
                            console.log(error);
                            console.log(error.code);
                            break;


                        case 'storage/unknown':
                            // Unknown error occurred, inspect the server response
                            console.log(error);
                            console.log(error.code);
                            break;
                    }
                });

            }

        }

    });



