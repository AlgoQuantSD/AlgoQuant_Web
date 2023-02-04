import React, { useState } from "react";
import Chart from "react-apexcharts";

/*
Build the graph based on the data, categories and preset configurations
*/
const buildGraph = (data, categories) => {
  return {
    series: [
    {
      name: "$",
      data: data,
      color: "#00FF38",
    },
  ],
  options: {
    grid: {
      show: true
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
      categories: categories
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
      },
    },
  },
}
}

const Graph = ({getData, chartData, categories}) => {

  // Default of 1 day
  const [selectedFilter, setSelectedFilter] = useState("day");

  // Create the graph with the data and categories along with the callback to get more data
  let chart = buildGraph(chartData,categories)

  const handleFilterSelection = (filter) => {
    getData(filter)
    setSelectedFilter(filter);
    // logic to update chart data based on selected filter
  };

  return (
    <div className="relative h-96">
      <Chart
        options={chart.options}
        series={chart.series}
        type="line"
        width="100%"
        height="100%"
      />
      <div className="flex mt-4 justify-center">
        <button
          className={`py-2 px-4 text-white border-b-2 border-dark-gray hover:bg-another-gray ${
            selectedFilter === "day" ? "border-b-green active" : ""
          }`}
          onClick={() => handleFilterSelection("day")}
        >
          D
        </button>
        <button
          className={`py-2 px-4 text-white border-b-2 border-dark-gray hover:bg-another-gray ${
            selectedFilter === "five" ? "border-b-green active" : ""
          }`}
          onClick={() => handleFilterSelection("five")}
        >
          5D
        </button>
        <button
          className={`py-2 px-4 text-white border-b-2 border-dark-gray hover:bg-another-gray ${
            selectedFilter === "month" ? "border-b-green active" : ""
          }`}
          onClick={() => handleFilterSelection("month")}
        >
          M
        </button>
        <button
          className={`py-2 px-4 text-white border-b-2 border-dark-gray hover:bg-another-gray ${
            selectedFilter === "year" ? "border-b-green active" : ""
          }`}
          onClick={() => handleFilterSelection("year")}
        >
          Y
        </button>
      </div>
    </div>
  );
};

export default Graph;
