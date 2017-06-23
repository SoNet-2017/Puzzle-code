/**
 * Created by giuseppegullotta on 12/06/17.
 */

angular.module('puzzle.eventi.eventiDirettiva', [])
    .directive("calendar", function(eventiService, $filter) {
        return {
            restrict: "E",
            templateUrl: "../Puzzle-code/eventView/template/calendar.html",
            scope: {
                selected: "=",
                t: "=",
                elencoEventi: "="
            },

            link: function(scope) {

                    scope.selected = _removeTime(scope.selected || moment());
                    scope.month = scope.selected.clone();

                    var start = scope.selected.clone();
                    start.date(1);
                    _removeTime(start.day(0));

                    _buildMonth(scope, start, scope.month);

                    scope.select = function (day) {
                        console.log("DAY.DATE " + day.date.format('DD'));
                        console.log("MOMENT: " +  moment().format("DD"));

                        if(day.date.format('MM-DD') >=  moment().format("MM-DD")) {

                                scope.selected = day.date;
                        }

                    };

                    scope.next = function () {
                        var next = scope.month.clone();
                        _removeTime(next.month(next.month() + 1)).date(1);
                        scope.month.month(scope.month.month() + 1);
                        _buildMonth(scope, next, scope.month);
                    };

                    scope.previous = function () {
                        var previous = scope.month.clone();
                        _removeTime(previous.month(previous.month() - 1).date(1));
                        scope.month.month(scope.month.month() - 1);
                        _buildMonth(scope, previous, scope.month);
                    };

                    scope.isPast = function () {

                        if (scope.month.month() < moment().format("MM")) {
                            return false;
                        } else {
                            return true;
                        }
                    };



                    var tuttiGliEventi = eventiService.getAllEvent();

                    scope.controlloEventoCASA = function (evento) {

                        var found = $filter('filter')(tuttiGliEventi, {giorno: evento.date.format('DD/MM/YYYY'), tipo: 'CASA'});

                        if (found.length) {
                            return true;
                        } else {
                            return false;
                        }
                    };

                scope.controlloEventoSCUOLA = function (evento) {

                    var found = $filter('filter')(tuttiGliEventi, {giorno: evento.date.format('DD/MM/YYYY'), tipo: 'SCUOLA'});

                    if (found.length) {
                        return true;
                    } else {
                        return false;
                    }
                };

                scope.controlloEventoEXTRA = function (evento) {

                    var found = $filter('filter')(tuttiGliEventi, {giorno: evento.date.format('DD/MM/YYYY'), tipo: 'EXTRA'});

                    if (found.length) {
                        return true;
                    } else {
                        return false;
                    }
                }
            }
        };


        function _removeTime(date) {
            return date.day(0).hour(0).minute(0).second(0).millisecond(0);
        }

        function _buildMonth(scope, start, month) {
            scope.weeks = [];
            var done = false, date = start.clone(), monthIndex = date.month(), count = 0;
            while (!done) {
                scope.weeks.push({ days: _buildWeek(date.clone(), month) });
                date.add(1, "w");
                done = count++ > 2 && monthIndex !== date.month();
                monthIndex = date.month();
            }
        }

        function _buildWeek(date, month) {
            var days = [];

            for (var i = 0; i < 7; i++) {

                days.push({
                        name: date.format("dd").substring(0, 1),
                        number: date.date(),
                        isCurrentMonth: date.month() === month.month(),
                        isYesterday: date.date() < moment().format("DD") && date.month() < moment().format("MM"),
                        isToday: date.isSame(new Date(), "day"),
                        date: date
                    });



                //console.log(date.month());


                console.log();

                date = date.clone();
                date.add(1, "d");
            }
            return days;
        }
    });