import React from "react";
import Chart from "react-apexcharts";

/*
Build the graph based on the data, categories and preset configurations
*/
const buildGraph = (data, categories, isTrendingUp) => {
  let lineColor = "#00FF33";
  if (!isTrendingUp) {
    lineColor = "#FF0000";
  }
  return {
    series: [
      {
        name: "$",
        data: data,
        color: lineColor,
      },
    ],
    options: {
      grid: {
        show: true,
      },
      chart: {
        height: 320,
        type: "line",
        zoom: {
          enabled: false,
        },
        toolbar: {
          show: false,
        },
      },
      dataLabels: {
        enabled: false,
      },
      stroke: {
        curve: "straight",
      },
      xaxis: {
        markers: {
          size: 0,
        },
        crosshairs: {
          show: false,
        },
        tooltip: false,
        labels: {
          style: {
            colors: "#fff",
          },
        },
        categories: categories,
        tickAmount: 10,
      },
      yaxis: {
        markers: {
          size: 0,
        },
        crosshairs: {
          show: false,
        },
        tooltip: false,
        labels: {
          style: {
            colors: "#fff",
          },
          formatter: function (value) {
            return value.toFixed(2); // Set the label value to have a maximum of 2 decimal points
          },
        },
      },
    },
  };
};

const Graph = ({ chartData, categories, isTrendingUp }) => {
  // Default of 1 day

  // Create the graph with the data and categories along with the callback to get more data
  let chart = buildGraph(chartData, categories, isTrendingUp);

  return (
    <div className="relative h-96">
      <Chart
        options={chart.options}
        series={chart.series}
        type="line"
        width="100%"
        height="100%"
      />
    </div>
  );
};

export default Graph;
