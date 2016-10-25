(function () {
    'use strict';

    angular.module('d3App.directives')
            .directive('d3Bars', ['d3', function (d3) {
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
                                console.log("----------------------------");


                                svg.selectAll("*").remove();

                                var width, height, max;
                                width = d3.select(el[0])[0][0].offsetWidth - 20;
                                height = scope.data.length * 35;
                                svg.attr('height', height);

                                var xScale = d3.scale.ordinal()
                                        .domain(data.map(function (d) {
                                            return d.x;
                                        })) //barData.map(function (d){return d.x;})
                                        .rangeRoundBands([margin.left, width - margin.right], .1);

                                var yScale = d3.scale.linear()
                                        .range([height - margin.top, margin.bottom])
                                        .domain([0, d3.max(data, function (d) {
                                                return d.y
                                            })]);

                                var xAxis = d3.svg.axis()
                                        .scale(xScale)
                                        .orient("bottom")
                                        .ticks(scope.data.length);

                                var yAxis = d3.svg.axis()
                                        .scale(yScale)
                                        .orient("left")
                                        .ticks(scope.data.length);

                                svg.append('svg:g')
                                        .attr('class', 'x axis')
                                        .attr('transform', 'translate(0,' + (height - margin.bottom) + ')')
                                        .call(xAxis);

                                svg.append('svg:g')
                                        .attr('class', 'y axis')
                                        .attr('transform', 'translate(' + (margin.left) + ',0)')
                                        .call(yAxis);

                                svg.selectAll("rect")
                                        .data(data)
                                        .enter().append("rect")
                                        //.attr("class", "bar")
                                        .attr("x", function (d) {
                                            return xScale(d.x);
                                        })
                                        .attr("y", function (d) {
                                            return yScale(d.y);
                                        })
                                        .attr("height", function (d) {
                                            return height - margin.bottom - yScale(d.y);
                                        })
                                        .attr("width", xScale.rangeBand())
                                        .style("fill", "steelblue");
                            };
                        }
                    };
                }]);
}());