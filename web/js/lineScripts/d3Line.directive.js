(function () {
    'use strict';

    angular.module('d3App.directives')
            .directive('d3Lines', ['d3', function (d3) {
                    return {
                        restrict: 'EA',
                        scope: {
                            data: "="
                        },
                        link: function (scope, el, attr) {

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

                                // setup variables
                                var width, height, max;
                                width = d3.select(el[0])[0][0].offsetWidth - 20;
                                height = scope.data.length * 35;
                                svg.attr('height', height);

                                var xScale = d3.scale.linear()
                                        .range([margin.left, width - margin.right])
                                        .domain([d3.min(scope.data, function (d) {
                                                return d.x;
                                            }), d3.max(scope.data, function (d) {
                                                return d.x;
                                            })]);

                                var yScale = d3.scale.linear()
                                        .range([height - margin.top, margin.bottom])
                                        .domain([d3.min(scope.data, function (d) {
                                                return d.y
                                            }), d3.max(scope.data, function (d) {
                                                return d.y
                                            })]);


                                var xAxis = d3.svg.axis()
                                        .orient("bottom")
                                        .scale(xScale)
                                        .ticks(scope.data.length);

                                var yAxis = d3.svg.axis()
                                        .orient("left")
                                        .scale(yScale)
                                        .ticks(scope.data.length);

                                svg.append('svg:g')
                                        .attr('class', 'x axis')
                                        .attr('transform', 'translate(0,' + (height - margin.bottom) + ')')
                                        .call(xAxis);

                                svg.append('svg:g')
                                        .attr('class', 'y axis')
                                        .attr('transform', 'translate(' + (margin.left) + ',0)')
                                        .call(yAxis);

                                var lineFunc = d3.svg.line()
                                        .x(function (d) {
                                            return xScale(d.x);
                                        })
                                        .y(function (d) {
                                            return yScale(d.y);
                                        });

                                svg.append('svg:path')
                                        .attr('d', lineFunc(scope.data))
                                        .attr('stroke', 'blue')
                                        .attr('stroke-width', 2)
                                        .attr('fill', 'none');

                            };
                        }
                    };
                }]);
}());