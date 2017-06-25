/**
 * Created by giuseppegullotta on 25/06/17.
 */

angular.module('puzzle.sidebarDirettiva', [])
    .directive("sidebar", function() {
        return {
            restrict: "E",
            templateUrl: "../Puzzle-code/components/sidebar/sidebar-template.html",
            scope: {
                user: '='
            },

            link: function (scope) {

                scope.controllo = function(){
                    return scope.user === 'GENITORE';
                };

                scope.menuIns = false;
                scope.menuGen = false;

                scope.showMenuIns = function(){
                    scope.menuIns = !scope.menuIns;
                };

                scope.showMenuGen = function(){
                    scope.menuGen = !scope.menuGen;
                };
            }
        }
    });