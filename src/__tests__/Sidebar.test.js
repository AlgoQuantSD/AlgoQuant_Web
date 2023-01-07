import React from "react";
import { render, fireEvent } from "@testing-library/react";
import Sidebar from "../components/SideBar";
import { MemoryRouter } from "react-router-dom";

describe("Sidebar", () => {
  it("renders all links correctly", () => {
    const { getByText } = render(
      <MemoryRouter>
        <Sidebar />
      </MemoryRouter>
    );
    const homeLink = getByText("Home");
    expect(homeLink).toBeInTheDocument();
    const createInvestorLink = getByText("Create Investor");
    expect(createInvestorLink).toBeInTheDocument();
    const backtestingLink = getByText("Back Testing");
    expect(backtestingLink).toBeInTheDocument();
    const historyLink = getByText("Transaction History");
    expect(historyLink).toBeInTheDocument();
    const profileLink = getByText("My Profile");
    expect(profileLink).toBeInTheDocument();
  });
  it("navigates to the correct pages when links are clicked", () => {
    const { getByText } = render(
      <MemoryRouter initialEntries={["/home"]}>
        <Sidebar />
      </MemoryRouter>
    );
    const createInvestorLink = getByText("Create Investor");
    fireEvent.click(createInvestorLink);
    expect(createInvestorLink.getAttribute("href")).toBe("/createInvestor");
    const backtestingLink = getByText("Back Testing");
    fireEvent.click(backtestingLink);
    expect(backtestingLink.getAttribute("href")).toBe("/backtesting");
    const historyLink = getByText("Transaction History");
    fireEvent.click(historyLink);
    expect(historyLink.getAttribute("href")).toBe("/history");
    const profileLink = getByText("My Profile");
    fireEvent.click(profileLink);
    expect(profileLink.getAttribute("href")).toBe("/profile");
  });
});
