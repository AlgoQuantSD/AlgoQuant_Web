import React from "react";
import ReactApexChart from "react-apexcharts";

function DonutPieChart(props) {
  const options = {
    chart: {
      type: "donut",
      height: 350,
    },
    series: props.series,
    labels: props.labels,
    colors: props.colors,
    legend: {
      position: "bottom",
      offsetY: 10,
    },
    responsive: [
      {
        breakpoint: 480,
        options: {
          chart: {
            width: 200,
          },
          legend: {
            position: "bottom",
          },
        },
      },
    ],
    tooltip: {
      y: {
        formatter: function (value) {
          return "Total Holding $" + value.toLocaleString();
        },
      },
    },
  };

  return (
    <ReactApexChart
      options={options}
      series={options.series}
      type="donut"
      height={350}
    />
  );
}

export default DonutPieChart;
