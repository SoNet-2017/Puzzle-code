/**
 * Created by giuseppegullotta on 17/06/17.
 */

'use strict';

//This module defines a directive that will create a button to upload a file and create the onClick handler
angular.module('puzzle.storage.fileUploadDirective', ["firebase"])

    // .directive("fileUpload", FileUploadDirective);

/*

function FileUploadDirective() {
    return {
        restrict: "E",
        transclude: true,
        scope: {
            onChange: "="
        },
        template: '<input type="file" name="file" /><label><ng-transclude></ng-transclude></label>',
        link: function (scope, element, attrs) {
            element.bind("change", function () {
                scope.onChange(element.children()[0].files);
            });
        }
    }


}

*/

    .directive('fileModel',['$parse', function ($parse){
    return {
        restrict: 'A',
        link: function (scope, element, attrs) {
            element.bind('change', function () {
                $parse(attrs.fileModel)
                    .assign(scope, element[0].files[0]);
                scope.$apply();
            })
        }
    }
}]);