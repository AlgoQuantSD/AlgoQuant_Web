import React from "react";
import { useLocation } from "react-router-dom";
import Navbar from "../reusable/NavBar";
import Sidebar from "../reusable/SideBar";
import investorPhotos from "../../assets/images/investors/InvestorPhotos";
import bot from "../../assets/images/investors/bot1.png";

const InvestorViewPage = () => {
  const location = useLocation();

  // dummy data for the table
  const profitStop = "$50";
  const lossStop = "$30";
  const stockTicker = "AAPL";
  const indicators = ["RSI", "MACD", "SMA"];

  return (
    <div className="bg-cokewhite overflow-x-auto overflow-y-auto">
      <Navbar />
      <div className="flex self-stretch">
        <Sidebar />
        <div className="sm:w-3/4 md:w-5/6 lg:w-7/8 p-5">
          <div className="flex pt-10">
            <h1 className="text-green font-bold text-5xl mb-10">
              {location.state.value.name}
            </h1>
            <button className="ml-96 absolute justify-center items-center text-white font-medium rounded-lg bg-green px-4 py-3">
              Create New Job
            </button>
          </div>
          <div className="flex h-1/4">
            <div className="flex justify-center w-1/2">
              {location.state.value.id === "investor" ? (
                <img
                  src={investorPhotos[10 % investorPhotos.length]}
                  alt=""
                  className="h-52 mt-6 mb-6"
                />
              ) : (
                <img src={bot} alt="bot" className="h-72 mt-12" />
              )}
            </div>
            <div className="justify-center w-1/2 bg-cokewhite">
              <p className="text-green text-3xl font-semibold">
                Investor Configuration
              </p>
              <table className="table-auto mt-5">
                <tbody>
                  <tr>
                    <td className="px-4 py-2 text-xl font-semibold">
                      Profit Stop:
                    </td>
                    <td className="px-4 py-2 text-lg">{profitStop}</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-2 text-xl font-semibold">
                      Loss Stop:
                    </td>
                    <td className="px-4 py-2 text-lg">{lossStop}</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-2 text-xl font-semibold">
                      Stock Ticker:
                    </td>
                    <td className="px-4 py-2 text-lg">{stockTicker}</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-2 text-xl font-semibold">
                      Indicators:
                    </td>
                    <td className="px-4 py-2 text-lg">
                      {indicators.map((indicator, index) => (
                        <div key={index} className="mb-1">
                          {indicator}
                        </div>
                      ))}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InvestorViewPage;
