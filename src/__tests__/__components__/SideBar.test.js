import { render, screen, fireEvent } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import Sidebar from "../../components/reusable/SideBar";

describe("Sidebar", () => {
  it("should render correctly", () => {
    const { container } = render(
      <BrowserRouter>
        <Sidebar />
      </BrowserRouter>
    );
    expect(container).toMatchSnapshot();
  });
  it("displays the correct number of links", () => {
    render(
      <BrowserRouter>
        <Sidebar />
      </BrowserRouter>
    );
    const links = screen.getAllByRole("link");
    expect(links).toHaveLength(5);
  });

  it("displays the correct link names", () => {
    render(
      <BrowserRouter>
        <Sidebar />
      </BrowserRouter>
    );
    const links = [
      "Home",
      "Create Investor",
      "Back Testing",
      "Transaction History",
      "My Profile",
    ];
    links.forEach((link) => {
      expect(screen.getByRole("link", { name: link })).toBeInTheDocument();
    });
  });
  it("routes the user to the correct corresponding link", () => {
    const { getByRole } = render(
      <BrowserRouter initialEntries={["/"]}>
        <Sidebar />
      </BrowserRouter>
    );
    const homeLink = getByRole("link", { name: "Home" });
    fireEvent.click(homeLink);
    expect(window.location.pathname).toBe("/home");

    const createInvestorLink = getByRole("link", { name: "Create Investor" });
    fireEvent.click(createInvestorLink);
    expect(window.location.pathname).toBe("/createInvestor");

    const backTestingLink = getByRole("link", { name: "Back Testing" });
    fireEvent.click(backTestingLink);
    expect(window.location.pathname).toBe("/backtesting");

    const historyLink = getByRole("link", { name: "Transaction History" });
    fireEvent.click(historyLink);
    expect(window.location.pathname).toBe("/history");

    const profileLink = getByRole("link", { name: "My Profile" });
    fireEvent.click(profileLink);
    expect(window.location.pathname).toBe("/profile");
  });
});
