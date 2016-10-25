(function () {
    'use strict';
    angular.module('d3App.controllers')
            .controller('d3LineController', ['$scope', function ($scope) {
                    $scope.title = "Line Chart Using AngularJS with D3.";
                    $scope.lineData = [{
                            x: 1,
                            y: 5
                        }, {
                            x: 20,
                            y: 20
                        }, {
                            x: 40,
                            y: 10
                        }, {
                            x: 60,
                            y: 40
                        }, {
                            x: 80,
                            y: 5
                        }, {
                            x: 100,
                            y: 60
                        }];
                }]);
}());