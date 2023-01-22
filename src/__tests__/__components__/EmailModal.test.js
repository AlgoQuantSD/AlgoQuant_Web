import React from "react";
import { render, fireEvent } from "@testing-library/react";
import EmailModal from "../../components/singular/Modals/EmailModal";

describe("EmailModal", () => {
  it("should render the modal when isVisible is true", () => {
    const { getByText } = render(<EmailModal emailModal={true} />);
    expect(getByText("Verify Email Address")).toBeInTheDocument();
    expect(
      getByText("Please enter the code sent to your new email address")
    ).toBeInTheDocument();
  });

  it("should not render the modal when isVisible is false", () => {
    const { queryByText } = render(<EmailModal emailModal={false} />);
    expect(queryByText("Verify Email Address")).toBeNull();
    expect(
      queryByText("Are you sure you want to delete your account?")
    ).toBeNull();
    expect(
      queryByText("Please enter the code sent to your new email address")
    ).toBeNull();
  });

  it("renders input box and placeholder correctly", () => {
    const { getByPlaceholderText } = render(<EmailModal emailModal={true} />);
    const passwordInput = getByPlaceholderText("Verification Code");
    expect(passwordInput).toBeInTheDocument();
  });

  it("renders all buttons correctly", () => {
    const { getByText } = render(<EmailModal emailModal={true} />);
    const buttonsText = ["Cancel", "Verify"];

    buttonsText.forEach((text) => {
      const button = getByText(text);
      expect(button).toBeInTheDocument();
      expect(button.tagName).toBe("BUTTON");
    });
  });

  it("should call set DeleteModal with false when clicking the cancel button", () => {
    const setEmailModal = jest.fn();
    const { getByText } = render(
      <EmailModal setEmailModal={setEmailModal} emailModal={true} />
    );
    fireEvent.click(getByText("Cancel"));
    expect(setEmailModal).toHaveBeenCalledWith(false);
  });
});
