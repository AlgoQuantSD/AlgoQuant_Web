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
  it("routes the user to the correct page", () => {
    const { getByRole } = render(
      <BrowserRouter initialEntries={["/"]}>
        <Sidebar />
      </BrowserRouter>
    );

    const links = [
      { name: "Home", path: "/home" },
      { name: "Create Investor", path: "/createInvestor" },
      { name: "Back Testing", path: "/backtesting" },
      { name: "Transaction History", path: "/history" },
      { name: "My Profile", path: "/profile" },
    ];

    links.forEach(({ name, path }) => {
      const link = getByRole("link", { name });
      fireEvent.click(link);
      expect(window.location.pathname).toBe(path);
    });
  });
});
