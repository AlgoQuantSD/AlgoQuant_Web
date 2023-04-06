import {React,useRef, useEffect} from "react";
import Chart from "react-apexcharts";
import { filters } from "../utils/filtersEnum";
import { createChart, ColorType } from 'lightweight-charts';

/*
Build the graph based on the data, categories and preset configurations
*/
const getGraphLines = (lines, isTrendingUp) => {

  let lineColor = "rgba(76, 175, 80, 1)";
  if (!isTrendingUp) {
    lineColor = "#FF0000";
  }

  // Create the lines for each line passed in
  let graphLines = []

  lines.forEach(

    function(line){

      // If there is a color then it should be shown
      if(line.color){
        lineColor = line.color
      }

      let series = []
      let i = 0

      line.y.forEach(
        function(yValue){
          // Get the data in a format for the line
          let unix_time = new Date(line.x[i++]).getTime() / 1000
          // This is the format required
          series.push(
            {
              'time':unix_time,
              'value': yValue
            }
          )
        }
      )
        var lineData;

        lineData = {'series':series, 'topColor': lineColor, 'bottomColor': "transparent"}
 
        graphLines.push(lineData)
    })

    return graphLines
  }

const Graph = ({ stockData, getData, lines, yValues, selectedFilter }) => {

  // conditional variable to indicate whether stock searched is trending up or down
  const isTrendingUp = stockData[0]?.priceChange >= 0;

  // String variable containing the style of what fitler is currently active
  const ACTIVE_FILTER_STYLE =
    "text-cokewhite border-b-green bg-green active hover:bg-green";

    const chartContainerRef = useRef();

    useEffect(
      () => {
        const handleResize = () => {
          chart.applyOptions({ width: chartContainerRef.current.clientWidth });
        };
  
        /*
        Create the chart
        */
        const chart = createChart(chartContainerRef.current, {
          // General Themes
          layout: {
            background: { 
              type: ColorType.Solid,
              color: "#FAFAFA"
            },
            textColor: "#1F302B"
          },
          // Disable the grids
          grid: {
            vertLines: {
                visible: false,
            },
            horzLines: {
                visible: false,
            },
          },
          
          // Make the height and width dynamic
          width: chartContainerRef.current.clientWidth,
          height: 420,

          // The time scale of the axes
          timeScale: {
            barSpacing: 3,
            fixLeftEdge: true,
            lockVisibleTimeRangeOnResize: true,
            rightBarStaysOnScroll: true,
            borderVisible: false,
            visible: true,
            timeVisible: true,
            secondsVisible: false,
          },
        });
        
        chart.timeScale().fitContent();

        // Get the actual series data for the graph
        let graphLines = getGraphLines(lines, isTrendingUp)
              
        graphLines.forEach(
          
          function(line){
            
            var newSeries;

            if( line.topColor && line.bottomColor ){
                newSeries = chart.addAreaSeries({lineColor: line.topColor, topColor: line.topColor,
                bottomColor: line.bottomColor, lineWidth: 2, });
            } else {
                newSeries = chart.addLineSeries({color: line.color,
                bottomColor: line.color, lineWidth: 2});
            }

            newSeries.setData(line.series)
          }
        )
        
        window.addEventListener('resize', handleResize);
        return () => {
          window.removeEventListener('resize', handleResize);
          chart.remove();
        };
      },

      [lines]
    );

  return (
    <div className="relative h-96">
      <div
			  ref={chartContainerRef}
		  />      {/* Conditional rendering to show the filter tabs only when selectedFilter is not null */}
      {selectedFilter !== null && (
        <div className="flex mt-7 justify-center">
          <button
            className={`py-2 px-4 text-green font-semibold hover:bg-smokewhite ${
              selectedFilter === filters.DAY
                ? ACTIVE_FILTER_STYLE
                : "border-b-2 border-b-green"
            }`}
            onClick={() => getData(filters.DAY)}
          >
            D
          </button>
          <button
            className={`py-2 px-4 text-green font-semibold hover:bg-smokewhite ${
              selectedFilter === filters.FIVE
                ? ACTIVE_FILTER_STYLE
                : "border-b-2 border-b-green"
            }`}
            onClick={() => getData(filters.FIVE)}
          >
            5D
          </button>
          <button
            className={`py-2 px-4 text-green font-semibold hover:bg-smokewhite ${
              selectedFilter === filters.MONTH
                ? ACTIVE_FILTER_STYLE
                : "border-b-2 border-b-green"
            }`}
            onClick={() => getData(filters.MONTH)}
          >
            M
          </button>
          <button
            className={`py-2 px-4 text-green font-semibold hover:bg-smokewhite ${
              selectedFilter === filters.YEAR
                ? ACTIVE_FILTER_STYLE
                : "border-b-2 border-b-green"
            }`}
            onClick={() => getData(filters.YEAR)}
          >
            Y
          </button>
        </div>
      )}
    </div>
  );
};

export default Graph;
