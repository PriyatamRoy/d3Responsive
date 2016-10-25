(function () {
    'use strict';
    angular.module('d3App.controllers')
            .controller('d3PieController', ['$scope', function ($scope) {
                    $scope.title = "Pie Chart Using AngularJS with D3.";
                    $scope.pieData = [
                        {label: 'Abulia', count: 10},
                        {label: 'Betelgeuse', count: 20},
                        {label: 'Cantaloupe', count: 30},
                        {label: 'Dijkstra', count: 40}
                    ];
                }]);
}());