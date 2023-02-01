import React from "react";

const Table = ({ data, header }) => {
  return (
    <table className="table-auto w-full font-light text-white">
      <thead>
        <tr className="bg-medium-gray text-white ">
          {header.map((header) => (
            <th
              className="lg:px-5 lg:py-5 md:px-2 md:py-2 lg:font-semibold md:font-medium sm:font-light lg:text-xl md:text-md sm:text-sm"
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
            key={index}
            className={
              index % 2 === 0
                ? "bg-dark-gray align-left"
                : "bg-another-gray align-left"
            }
          >
            {header.map((header) => (
              <td className="lg:px-3 lg:py-5 md:px-2 md:py-2" key={header.key}>
                {row[header.key]}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default Table;
