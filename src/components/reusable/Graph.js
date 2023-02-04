import React, { useState } from "react";
import Chart from "react-apexcharts";

const Graph = () => {
  const [selectedFilter, setSelectedFilter] = useState("day");
  const [chartData, setChartData] = useState({
    series: [
      {
        name: "$",
        data: [10, 41, 35, 51, 49, 62, 69, 91, 1000],
        color: "#00FF38",
      },
    ],
    options: {
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
        categories: [
          "Jan",
          "Feb",
          "Mar",
          "Apr",
          "May",
          "Jun",
          "Jul",
          "Aug",
          "Sep",
        ],
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
  });

  const handleFilterSelection = (filter) => {
    setSelectedFilter(filter);
    // logic to update chart data based on selected filter
  };

  return (
    <div className="relative h-96">
      <Chart
        options={chartData.options}
        series={chartData.series}
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
