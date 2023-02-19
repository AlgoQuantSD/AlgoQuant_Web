import React from "react";
import Chart from "react-apexcharts";
import { filters } from "../utils/filtersEnum";

/*
Build the graph based on the data, categories and preset configurations
*/
const buildGraph = (data, categories, isTrendingUp) => {
  let lineColor = "#1F302B";
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
        background: "#F0F0F0",
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
            colors: "#1F302B",
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
            colors: "#1F302B",
          },
          formatter: function (value) {
            return value.toFixed(2); // Set the label value to have a maximum of 2 decimal points
          },
        },
      },
    },
  };
};

const Graph = ({ stockData, getData, xValues, yValues, selectedFilter }) => {
  // conditional variable to indicate whether stock searched is trending up or down
  const isTrendingUp = stockData[0].priceChange >= 0;
  // Create the graph with the data and categories along with the callback to get more data
  let chart = buildGraph(xValues, yValues, isTrendingUp);
  // String variable containing the style of what fitler is currently active
  const ACTIVE_FILTER_STYLE =
    "text-cokewhite border-b-green bg-green active hover:bg-green";

  return (
    <div className="relative h-96">
      <Chart
        options={chart.options}
        series={chart.series}
        type="line"
        width="100%"
        height="100%"
        className="shadow-md"
      />
      {/* Tabs for users to interact with and fetch different data based on provided timeframes */}
      <div className="flex mt-4 justify-center">
        <button
          className={`py-2 px-4 text-green font-semibold hover:bg-smokewhite ${
            selectedFilter === filters.DAY ? ACTIVE_FILTER_STYLE : ""
          }`}
          onClick={() => getData(filters.DAY)}
        >
          D
        </button>
        <button
          className={`py-2 px-4 text-green font-semibold hover:bg-smokewhite ${
            selectedFilter === filters.FIVE ? ACTIVE_FILTER_STYLE : ""
          }`}
          onClick={() => getData(filters.FIVE)}
        >
          5D
        </button>
        <button
          className={`py-2 px-4 text-green font-semibold hover:bg-smokewhite ${
            selectedFilter === filters.MONTH ? ACTIVE_FILTER_STYLE : ""
          }`}
          onClick={() => getData(filters.MONTH)}
        >
          M
        </button>
        <button
          className={`py-2 px-4 text-green font-semibold hover:bg-smokewhite ${
            selectedFilter === filters.YEAR ? ACTIVE_FILTER_STYLE : ""
          }`}
          onClick={() => getData(filters.YEAR)}
        >
          Y
        </button>
      </div>
    </div>
  );
};

export default Graph;
