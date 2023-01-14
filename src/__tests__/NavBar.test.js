import { render, fireEvent } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import Navbar from "../components/reusable/NavBar";

describe("Navbar", () => {
  window.URL.createObjectURL = jest.fn();

  afterEach(() => {
    window.URL.createObjectURL.mockReset();
  });

  jest.mock("@aws-amplify/ui-react", () => {
    return {
      useAuthenticator: jest.fn(() => {
        return {
          signOut: jest.fn(),
        };
      }),
    };
  });

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

  it("calls the 'signOut' function when the 'Sign Out' button is clicked", () => {
    window.URL.createObjectURL = jest.fn(() => "Sign Out");
    const signOut = jest.fn();
    const { getByText } = render(
      <MemoryRouter>
        <Navbar signOut={signOut} />
      </MemoryRouter>
    );
    const signOutButton = getByText("Sign Out");
    fireEvent.click(signOutButton);
    expect(signOut).toHaveBeenCalled();
  });
});
