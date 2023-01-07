import React from "react";
import { render, fireEvent } from "@testing-library/react";
import Navbar from "../components/NavBar";
import { MemoryRouter } from "react-router-dom";
import { UserContext } from "../constants/UserContext";
import { Auth } from "aws-amplify";

jest.mock("aws-amplify", () => ({
  Auth: {
    signOut: jest.fn(),
  },
}));

describe("Navbar", () => {
  it('navigates to the profile page when the "My Profile" link is clicked', () => {
    const { getByText } = render(
      <MemoryRouter initialEntries={["/"]}>
        <UserContext.Provider value={{ setUserInfo: jest.fn() }}>
          <Navbar />
        </UserContext.Provider>
      </MemoryRouter>
    );
    const profileLink = getByText("My Profile");
    fireEvent.click(profileLink);
    expect(profileLink.getAttribute("href")).toBe("/profile");
  });

  it('should sign out when the "Sign Out" button is clicked', () => {
    const mockSignOut = jest.fn();
    const { getByText } = render(<Navbar signOut={mockSignOut} />);
    const signOutButton = getByText("Sign Out");

    fireEvent.click(signOutButton);

    expect(mockSignOut).toHaveBeenCalled();
  });
  it('signs out and navigates to the home page when the "Sign Out" button is clicked', () => {
    const { getByText } = render(
      <MemoryRouter initialEntries={["/"]}>
        <UserContext.Provider value={{ setUserInfo: jest.fn() }}>
          <Navbar />
        </UserContext.Provider>
      </MemoryRouter>
    );
    const signOutButton = getByText("Sign Out");
    fireEvent.click(signOutButton);
    expect(Auth.signOut).toHaveBeenCalled();
  });
});
