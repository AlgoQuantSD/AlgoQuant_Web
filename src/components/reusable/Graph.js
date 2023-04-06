import {React,useRef, useEffect} from "react";
import { filters } from "../utils/filtersEnum";
import { createChart, ColorType } from 'lightweight-charts';

/*
This will build the different graph lines to pass to the graph
*/
const getGraphLines = (lines, isTrendingUp) => {

  // Determine if the graph should be red or green dependeont on the trend
  let lineColor = "#4CAF50";
  if (!isTrendingUp) {
    lineColor = "#FF0000";
  }

  let graphLines = []

  lines.forEach(

    function(line){

      // Check if there is a color specified for this line, if so assign it
      if(line.color){
        lineColor = line.color
      }

      // See if the is a specific bottom color otherwise use white
      var bottomColor;
      if (line.bottomColor){
        bottomColor = line.bottomColor
      } else {
        bottomColor = "#FFFFFF"
      }

      let series = []
      let i = 0

      // Create the series based on each y value
      line.y.forEach(
        function(yValue){
          // Subtracting 14400 is a hacky way to get the time to EST time so its clearer for the demo
          let unix_time = new Date(parseInt(line.x[i++] - 14400)).getTime()
          series.push(
            {'time':unix_time, 'value': yValue}
          )
        }
      )
      let lineData = {'series':series, 'topColor': lineColor, 'bottomColor': bottomColor}
      graphLines.push(lineData)
    })

    return graphLines
  }

const Graph = ({ stockData, getData, lines, selectedFilter }) => {

  // String variable containing the style of what fitler is currently active
  const ACTIVE_FILTER_STYLE =
    "text-cokewhite border-b-green bg-green active hover:bg-green";

    const chartContainerRef = useRef();

    useEffect(
      () => {

        const handleResize = () => {
          chart.applyOptions({ width: chartContainerRef.current.clientWidth });
        };
  
        const chart = createChart(chartContainerRef.current, {

          layout: {
            background: { 
              type: ColorType.Solid,
              color: "#FAFAFA"
            },
            textColor: "#1F302B",
            fontSize: 14,
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
          
          width: chartContainerRef.current.clientWidth,
          height: 420,

          // The time scale of the axes
          timeScale: {
            barSpacing: 2,
            fixLeftEdge: false,
            lockVisibleTimeRangeOnResize: true,
            rightBarStaysOnScroll: true,
            borderVisible: false,
            visible: true,
            timeVisible: true,
            secondsVisible: false  
          },

          rightPriceScale: {
            borderVisible:false
          }
        });
        
        chart.timeScale().fitContent();

        // Get the actual series data for the graph
        let graphLines = getGraphLines(lines, stockData[0]?.priceChange >= 0)
         
        graphLines.forEach(    
          function(line){
            let newSeries = chart.addAreaSeries({
              lineColor: line.topColor,
              topColor: line.topColor,
              bottomColor: line.bottomColor,
              lineWidth: 2
            });
            newSeries.setData(line.series)
          }
        )
        
        // Required event listeners for the scrolling to work properly
        window.addEventListener('resize', handleResize);
        return () => {
          window.removeEventListener('resize', handleResize);
          chart.remove();
        };
      },
      [lines, stockData]
    );

  return (
    <div className="relative h-96">
      <div
			  ref={chartContainerRef}
		  />      
      {/* Conditional rendering to show the filter tabs only when selectedFilter is not null */}
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
