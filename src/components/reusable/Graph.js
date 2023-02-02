import React, { useState } from "react";
import Chart from "react-apexcharts";

const Graph = () => {
  const [selectedFilter, setSelectedFilter] = useState("month");
  const [chartData, setChartData] = useState({
    series: [
      {
        name: "$",
        data: [10, 41, 35, 51, 49, 62, 69, 91, 148],
        color: "#00FF38",
      },
    ],
    options: {
      chart: {
        height: 350,
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
        tooltip: {
          enabled: true,
          style: {
            colors: "#000",
            fontWeight: "bold",
          },
        },
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
    <div className="relative h-64">
      <Chart
        options={chartData.options}
        series={chartData.series}
        type="line"
        width="100%"
        height="100%"
      />
      <div className="flex bottom-0 left-0 right-0 mb-4">
        <button
          className={`w-full p-3 text-white bg-blue-500 hover:bg-blue-600 ${
            selectedFilter === "day" ? "active" : ""
          }`}
          onClick={() => handleFilterSelection("day")}
        >
          Day
        </button>
        <button
          className={`w-full p-3 text-white bg-blue-500 hover:bg-blue-600 ${
            selectedFilter === "month" ? "active" : ""
          }`}
          onClick={() => handleFilterSelection("month")}
        >
          Month
        </button>
        <button
          className={`w-full p-3 text-white bg-blue-500 hover:bg-blue-600 ${
            selectedFilter === "year" ? "active" : ""
          }`}
          onClick={() => handleFilterSelection("year")}
        >
          Year
        </button>
      </div>
    </div>
  );
};

export default Graph;
