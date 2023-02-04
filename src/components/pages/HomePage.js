import { React,useState } from "react";
import Graph from "../reusable/Graph";
import Navbar from "../reusable/NavBar";
import Sidebar from "../reusable/SideBar";

const HomePage = () => {

    // Currently hardcoded but will eventually come from API
    const [chartData, setChartData] = useState([1000,50,1])
    const [categories, setCategories] = useState([
      "Jan",
      "Feb",
      "Mar",
    ])
  
    /*
    Callback used to get more data based on the filter. Each time any of the buttons 
    are clicked this will be called to get more data. This will update the chart data which 
    will then re-render the graph
    */
    const getData = (filter) => {
     console.log("Does Nothing!")
  }

  return (
    <div className="bg-dark-gray overflow-x-auto overflow-y-auto">
      <Navbar />
      <div className="flex self-stretch">
        <Sidebar />
        <div className="sm:w-3/4 md:w-5/6 lg:w-7/8 p-5">
          <div className="flex pt-10">
            <h1 className="text-green font-bold text-5xl">Home</h1>
          </div>
          <h3 className="text-green font-bold text-2xl">Your Assets</h3>
        <Graph chartData={chartData} categories={categories} getData = {getData}/>

        </div>
      </div>
    </div>
  );
};

export default HomePage;
