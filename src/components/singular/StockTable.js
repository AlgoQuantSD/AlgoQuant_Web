import React from "react";

const StockTable = ({ stockData }) => {
  return (
    <div className="mt-24 w-full">
      <h2 className="text-white font-medium text-4xl mt-2">Stock Data</h2>
      <table className="mt-4 table-auto text-center text-white mx-auto">
        <thead className="bg-dark-gray text-white">
          <tr>
            <th className="font-light px-4 py-2">Recent Price</th>
            <th className="font-light px-4 py-2">Open</th>
            <th className="font-light px-4 py-2">Low</th>
            <th className="font-light px-4 py-2">High</th>
            <th className="font-light px-4 py-2">Year Low</th>
            <th className="font-light px-4 py-2">Year High</th>
          </tr>
        </thead>
        <tbody className="justify-center">
          {stockData.map((stock) => (
            <tr key={stock.symbol} className="border-hidden">
              <td className="border px-4 py-2">${stock.recentPrice}</td>
              <td className="border px-4 py-2">${stock.open}</td>
              <td className="border px-4 py-2">${stock.low}</td>
              <td className="border px-4 py-2">${stock.high}</td>
              <td className="border px-4 py-2">${stock.yearLow}</td>
              <td className="border px-4 py-2">${stock.yearHigh}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default StockTable;
