import React from "react";
import { BsCaretDownFill, BsFillCaretUpFill } from "react-icons/bs";

const Table = ({ data, header, viewBacktest }) => {
  const hasStatus = header.some((h) => h.key === "status");
  const hasProfitLoss = header.some((h) => h.key === "profitLoss");

  return (
    <table className="table-auto w-full font-light text-black">
      <thead>
        <tr className="text-white bg-green">
          {header.map((header) => (
            <th
              className="lg:px-4 lg:py-4 md:px-2 md:py-2 lg:font-semibold md:font-medium sm:font-light lg:text-xl md:text-md sm:text-sm"
              key={header.key}
            >
              {header.title}
            </th>
          ))}
        </tr>
      </thead>
      <tbody className="border border-another-gray border-opacity-30 text-center lg:font-normal sm:font-thin">
        {data.map((row, index) => (
          <tr
            className={`${
              index % 2 === 0 ? "bg-smokewhite" : "bg-faded-white"
            } align-left ${
              hasStatus && row.status === "completed"
                ? "hover:bg-light-gray"
                : ""
            }`}
            onClick={() =>
              hasStatus && row.status === "completed"
                ? viewBacktest(row)
                : console.log(row)
            }
          >
            {header.map((header) => (
              <td className="lg:px-3 lg:py-5 md:px-2 md:py-2" key={header.key}>
                <div className="flex items-center justify-center">
                  {header.key === "profitLoss" && hasProfitLoss ? (
                    <>
                      {row[header.key]}%
                      {row.profitLoss >= 0 ? (
                        <BsFillCaretUpFill className="ml-2 self-center text-md text-bright-green" />
                      ) : (
                        <BsCaretDownFill className="ml-2 self-center text-md text-red" />
                      )}
                    </>
                  ) : (
                    row[header.key]
                  )}
                </div>
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default Table;
