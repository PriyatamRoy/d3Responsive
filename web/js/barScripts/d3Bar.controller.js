(function () {
    'use strict';
    angular.module('d3App.controllers')
            .controller('d3BarController', ['$scope', function ($scope) {
                    $scope.title = "Bar Chart Using AngularJS with D3.";
                    $scope.barData = [{
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
                        }, {
                            x: 60,
                            y: 105
                        }, {
                            x: 30,
                            y: 95
                        }, {
                            x: 70,
                            y: 80
                        }, {
                            x: 120,
                            y: 50
                        }];
                }]);
}());