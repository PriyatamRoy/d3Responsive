(function () {
    'use strict';

    angular.module('d3App.directives')
            .directive('d3Pie', ['d3', function (d3) {
                    return {
                        restrict: 'EA',
                        scope: {
                            data: "="
                        },
                        link: function (scope, el, attr) {
                            //your code for chart.
                            console.log(angular.element(window)[0]);


                            var svg = d3.select(el[0])
                                    .append("svg")
                                    .attr("width", "100%");

                            var margin = {
                                top: 20,
                                right: 20,
                                bottom: 20,
                                left: 50
                            };

                            // on window resize, re-render d3 canvas
                            window.onresize = function () {
                                return scope.$apply();
                            };
                            scope.$watch(function () {
                                console.log("innerWidth: " + angular.element(window)[0].innerWidth);
                                return angular.element(window)[0].innerWidth;
                            }, function () {
                                return scope.render(scope.data);
                            }
                            );


                            scope.render = function (data) {
                                console.log("render(): " + data);
                                console.log("----------------------------");
                                console.log(d3.select(el[0]));

                                svg.selectAll("*").remove();



                                var width = 360;
                                var height = 360;
                                var radius = Math.min(width, height) / 2;
                                var color = d3.scale.ordinal(d3.schemeCategory20b);

                                svg.attr('width', width)
                                        .attr('height', height);

                                svg.append('svg:g')
                                        .attr('transform', 'translate(' + (width / 2) + ',' + (height / 2) + ')');

                                var arc = d3.svg.arc()
                                        .innerRadius(0)
                                        .outerRadius(radius);

                                var pie = d3.layout.pie()
                                        .value(function (d) {
                                            return d.count;
                                        })
                                        .sort(null);

                                svg.selectAll('path')
                                        .data(pie(scope.data))
                                        .enter()
                                        .append('path')
                                        .attr('d', arc)
                                        .attr('fill', function (d, i) {
                                            console.log("--->"+color(d.data.label));
                                            return color(d.data.label);
                                        });

                            };
                        }
                    };
                }]);
}());