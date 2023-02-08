import React from "react";

const StockTable = () => {
  const stockData = [
    {
      symbol: "AAPL",
      recentPrice: 132.23,
      open: 131.0,
      high: 133.5,
      low: 130.5,
      yearHigh: 140.0,
      yearLow: 100.0,
    },
  ];

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
              <td className="border px-4 py-2 hover:bg-another-gray">
                {stock.recentPrice}
              </td>
              <td className="border px-4 py-2 hover:bg-another-gray">
                {stock.open}
              </td>
              <td className="border px-4 py-2 hover:bg-another-gray">
                {stock.low}
              </td>
              <td className="border px-4 py-2 hover:bg-another-gray">
                {stock.high}
              </td>
              <td className="border px-4 py-2 hover:bg-another-gray">
                {stock.yearLow}
              </td>
              <td className="border px-4 py-2 hover:bg-another-gray">
                {stock.yearHigh}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default StockTable;
