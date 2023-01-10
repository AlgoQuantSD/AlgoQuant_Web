import React from "react";
import { render, fireEvent } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import Navbar from "../components/reusable/NavBar";
import { useAuthenticator } from "@aws-amplify/ui-react";

jest.mock("@aws-amplify/ui-react", () => ({
  useAuthenticator: jest.fn(() => ({
    signOut: jest.fn(),
  })),
}));

describe("Navbar", () => {
  it("renders correctly", () => {
    const { container } = render(
      <MemoryRouter>
        <Navbar />
      </MemoryRouter>
    );
    expect(container).toMatchSnapshot();
  });

  it("calls the signOut function when the Sign Out button is clicked", () => {
    const { getByText } = render(
      <MemoryRouter>
        <Navbar />
      </MemoryRouter>
    );
    const signOutButton = getByText("Sign Out");
    fireEvent.click(signOutButton);

    expect(useAuthenticator).toHaveBeenCalled();
    expect(useAuthenticator().signOut).toHaveBeenCalled();
  });

  it("renders My Profile link correctly", () => {
    const { getByText } = render(
      <MemoryRouter>
        <Navbar />
      </MemoryRouter>
    );
    const profileLink = getByText("My Profile");
    expect(profileLink).toBeInTheDocument();
    expect(profileLink.getAttribute("href")).toBe("/profile");
  });
});
