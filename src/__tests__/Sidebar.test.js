import React from "react";
import { render } from "@testing-library/react";
import Sidebar from "./Sidebar";

describe("Sidebar", () => {
  it("should render correctly", () => {
    const { container } = render(<Sidebar />);
    expect(container).toMatchSnapshot();
  });

  it("should have a list of 5 links", () => {
    const { container } = render(<Sidebar />);
    const links = container.querySelectorAll("a");
    expect(links.length).toBe(5);
  });

  it("should contain the correct link destinations", () => {
    const { container } = render(<Sidebar />);
    const linkDestinations = Array.from(container.querySelectorAll("a")).map(
      (link) => link.getAttribute("href")
    );
    expect(linkDestinations).toEqual([
      "/home",
      "/createInvestor",
      "/backtesting",
      "/history",
      "/profile",
    ]);
  });
});
