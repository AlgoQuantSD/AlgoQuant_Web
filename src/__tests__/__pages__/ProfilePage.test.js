import { render } from "@testing-library/react";
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
  it("renders the input boxes and placeholders correctly", () => {
    const { getByPlaceholderText } = render(
      <BrowserRouter>
        <ProfilePage />
      </BrowserRouter>
    );
    const firstNameInput = getByPlaceholderText("John");
    const lastNameInput = getByPlaceholderText("Doe");
    const emailInput = getByPlaceholderText("johndoe@example.com");
    const phoneInput = getByPlaceholderText("+14071234567");
    expect(firstNameInput).toBeInTheDocument();
    expect(lastNameInput).toBeInTheDocument();
    expect(emailInput).toBeInTheDocument();
  });
  it("renders the user's information", () => {
    const { getByTestId } = render(
      <BrowserRouter>
        <ProfilePage />
      </BrowserRouter>
    );
    const userInitialsText = getByTestId("user-initials");
    expect(userInitialsText.innerHTML).toEqual("JD");

    const userFullNameText = getByTestId("user-name");
    expect(userFullNameText.innerHTML).toEqual("John Doe");

    const userTotalBalance = getByTestId("total-balance");
    expect(userTotalBalance.innerHTML).toEqual("$57,901.34");
  });
});
