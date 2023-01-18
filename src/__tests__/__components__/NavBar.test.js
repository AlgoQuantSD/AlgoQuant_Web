import { render } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import Navbar from "../../components/reusable/NavBar";
describe("Navbar", () => {
  it("displays the AlgoQuant logo", () => {
    const { getByAltText } = render(
      <MemoryRouter>
        <Navbar />
      </MemoryRouter>
    );
    const logo = getByAltText("AlgoQuant Logo");
    expect(logo).toBeInTheDocument();
  });
  it("displays a 'My Profile' link", () => {
    const { getByText } = render(
      <MemoryRouter>
        <Navbar />
      </MemoryRouter>
    );
    const profileLink = getByText("My Profile");
    expect(profileLink).toBeInTheDocument();
    expect(profileLink.getAttribute("href")).toBe("/profile");
  });

  it("displays a 'Sign Out' button", () => {
    const { getByText } = render(
      <MemoryRouter>
        <Navbar />
      </MemoryRouter>
    );
    const signOutButton = getByText("Sign Out");
    expect(signOutButton).toBeInTheDocument();
    expect(signOutButton.tagName).toBe("BUTTON");
  });
});
