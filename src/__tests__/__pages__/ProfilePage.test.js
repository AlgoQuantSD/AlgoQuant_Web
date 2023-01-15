import { render, screen, fireEvent } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import ProfilePage from "../../components/pages/ProfilePage";

describe("ProfilePage", () => {
  it("should render", () => {
    const { container } = render(
      <BrowserRouter>
        <ProfilePage />
      </BrowserRouter>
    );
    expect(container).toMatchSnapshot();
  });
  it("renders all buttons", () => {
    const { getByText } = render(
      <BrowserRouter>
        <ProfilePage />
      </BrowserRouter>
    );
    const buttonsText = [
      "Reset balance",
      "Save changes",
      "Sign out",
      "Change password",
      "Update Alpaca Key",
      "Delete account",
    ];

    buttonsText.forEach((text) => {
      const button = getByText(text);
      expect(button).toBeInTheDocument();
      expect(button.tagName).toBe("BUTTON");
    });
  });
});
