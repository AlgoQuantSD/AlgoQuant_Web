import {React,useState} from "react";
import Navbar from "../reusable/NavBar";
import Sidebar from "../reusable/SideBar";
import Graph from "../reusable/Graph";
import { useLocation } from "react-router-dom";


const SearchResultsPage = () => {
  const location = useLocation();

  // Currently hardcoded but will eventually come from API
  const [chartData, setChartData] = useState([10, 41, 35, 51, 49, 62, 69, 91, 1000])
  const [categories, setCategories] = useState([
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
  ])

  /*
  Callback used to get more data based on the filter. Each time any of the buttons 
  are clicked this will be called to get more data. This will update the chart data which 
  will then re-render the graph
  */
  const getData = (filter) => {
    if(filter === "year") {
      setChartData([])
    } else {
    setChartData(chartData.concat(chartData))
    setCategories(categories.concat(categories))
    console.log('Request filter: ' + filter)
    }
  }

  // Should initial get all the data for the day time frame
  //useEffect(() => {
  //  getData("day")
  //})

  return (
    <div className="bg-dark-gray overflow-x-auto overflow-y-auto">
      <Navbar />
      <div className="flex self-stretch">
        <Sidebar />
        <div className="sm:w-3/4 md:w-5/6 lg:w-7/8 pl-5">
          <div className="pt-10">
            <h1 className="text-white font-bold text-6xl">
              {location.state.value}
            </h1>
            <h2 className="text-white font-semibold text-4xl mt-2">$138.08</h2>
            <p className="text-bright-green font-medium text-md mt-2">
              +$4.61 (+3.22%)
              <p className="inline text-light-gray font-light"> Today</p>
            </p>
          </div>
          {/* <div className="flex"></div> */}
          <div className="w-11/12 h-4/5 mx-auto my-10">
            <Graph 
            chartData={chartData}
            categories={categories}
            getData={getData}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchResultsPage;
