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
  };
};

const filters = {
  DAY: "day",
  FIVE: "five",
  MONTH: "month",
  YEAR: "year",
};

const Graph = ({ getData, chartData, categories }) => {
  // Default of 1 day
  const [selectedFilter, setSelectedFilter] = useState("day");

  // Create the graph with the data and categories along with the callback to get more data
  let chart = buildGraph(chartData, categories);

  const handleFilterSelection = (filter) => {
    getData(filter);
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
          className={`py-2 px-4 text-white font-semibold border-b-2 border-dark-gray hover:bg-another-gray ${
            selectedFilter === filters.DAY ? "border-b-green active" : ""
          }`}
          onClick={() => handleFilterSelection(filters.DAY)}
        >
          D
        </button>
        <button
          className={`py-2 px-4 text-white font-semibold border-b-2 border-dark-gray hover:bg-another-gray ${
            selectedFilter === filters.FIVE ? "border-b-green active" : ""
          }`}
          onClick={() => handleFilterSelection(filters.FIVE)}
        >
          5D
        </button>
        <button
          className={`py-2 px-4 text-white font-semibold border-b-2 border-dark-gray hover:bg-another-gray ${
            selectedFilter === filters.MONTH ? "border-b-green active" : ""
          }`}
          onClick={() => handleFilterSelection(filters.MONTH)}
        >
          M
        </button>
        <button
          className={`py-2 px-4 text-white font-semibold border-b-2 border-dark-gray hover:bg-another-gray ${
            selectedFilter === filters.YEAR ? "border-b-green active" : ""
          }`}
          onClick={() => handleFilterSelection(filters.YEAR)}
        >
          Y
        </button>
      </div>
    </div>
  );
};

export default Graph;
