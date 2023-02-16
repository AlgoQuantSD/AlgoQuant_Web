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

const Graph = ({ getData, chartData, categories }) => {
  // Create the graph with the data and categories along with the callback to get more data
  let chart = buildGraph(chartData, categories);
  const [selectedFilter, setSelectedFilter] = useState("Today");

  const filters = {
    DAY: "Today",
    FIVE: "Past 5 days",
    MONTH: "Past month",
    YEAR: "Past Year",
  };

  const getDataWrapper = (filter) => {
    switch (filter) {
      case "Today":
        getData("D");
        break;
      case "Past 5 days":
        getData("5D");
        break;
      case "Past month":
        getData("M");
        break;
      case "Past Year":
        getData("Y");
        break;
      default:
        break;
    }
  };

  const handleFilterSelection = (filter) => {
    getDataWrapper(filter);
    setSelectedFilter(filter);
    // logic to update chart data based on selected filter
  };

  return (
    <div className="relative h-96">
      <p className="inline text-light-gray font-light"> {selectedFilter}</p>
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
