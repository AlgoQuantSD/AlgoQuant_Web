import React from "react";
import { render, fireEvent } from "@testing-library/react";
import PhoneModal from "../../components/singular/Modals/PhoneModal";

describe("PhoneModal", () => {
  it("should render the modal when isVisible is true", () => {
    const { getByText } = render(<PhoneModal phoneModal={true} />);
    expect(getByText("Verify Phone Number")).toBeInTheDocument();
    expect(
      getByText("Please enter the code sent to your new phone number")
    ).toBeInTheDocument();
  });

  it("should not render the modal when isVisible is false", () => {
    const { queryByText } = render(<PhoneModal phoneModal={false} />);
    expect(queryByText("Verify Phone Number")).toBeNull();
    expect(
      queryByText("Are you sure you want to delete your account?")
    ).toBeNull();
    expect(
      queryByText("Please enter the code sent to your new phone number")
    ).toBeNull();
  });

  it("renders input box and placeholder correctly", () => {
    const { getByPlaceholderText } = render(<PhoneModal phoneModal={true} />);
    const passwordInput = getByPlaceholderText("Verification Code");
    expect(passwordInput).toBeInTheDocument();
  });

  it("renders all buttons correctly", () => {
    const { getByText } = render(<PhoneModal phoneModal={true} />);
    const buttonsText = ["Cancel", "Verify"];

    buttonsText.forEach((text) => {
      const button = getByText(text);
      expect(button).toBeInTheDocument();
      expect(button.tagName).toBe("BUTTON");
    });
  });

  it("should call set DeleteModal with false when clicking the cancel button", () => {
    const setPhoneModal = jest.fn();
    const { getByText } = render(
      <PhoneModal setPhoneModal={setPhoneModal} phoneModal={true} />
    );
    fireEvent.click(getByText("Cancel"));
    expect(setPhoneModal).toHaveBeenCalledWith(false);
  });
});
