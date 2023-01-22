import React from "react";
import { render, fireEvent } from "@testing-library/react";
import ResetModal from "../../components/singular/Modals/ResetModal";

describe("ResetModal", () => {
  it("should render the modal when isVisible is true", () => {
    const { getByText } = render(<ResetModal resetModal={true} />);
    expect(getByText("Reset Balance")).toBeInTheDocument();
    expect(
      getByText("Are you sure you want to reset your balance?")
    ).toBeInTheDocument();
    expect(
      getByText("Please enter your Alpaca Key to confirm")
    ).toBeInTheDocument();
    expect(
      getByText(
        "NOTE: Your balance will be reset to $100,000 and all active jobs will be terminated."
      )
    ).toBeInTheDocument();
  });

  it("should not render the modal when isVisible is false", () => {
    const { queryByText } = render(<ResetModal resetModal={false} />);
    expect(queryByText("Reset Balance")).toBeNull();
    expect(
      queryByText("Are you sure you want to reset your balance?")
    ).toBeNull();
    expect(queryByText("Please enter your Alpaca Key to confirm")).toBeNull();
    expect(
      queryByText(
        "NOTE: Your balance will be reset to $100,000 and all active jobs will be terminated."
      )
    ).toBeNull();
  });

  it("renders input box and placeholder correctly", () => {
    const { getByPlaceholderText } = render(<ResetModal resetModal={true} />);
    const passwordInput = getByPlaceholderText("Alpaca Key");
    expect(passwordInput).toBeInTheDocument();
  });

  it("renders all buttons correctly", () => {
    const { getByText } = render(<ResetModal resetModal={true} />);
    const buttonsText = ["Cancel", "Continue"];

    buttonsText.forEach((text) => {
      const button = getByText(text);
      expect(button).toBeInTheDocument();
      expect(button.tagName).toBe("BUTTON");
    });
  });

  it("should call set DeleteModal with false when clicking the cancel button", () => {
    const setResetModal = jest.fn();
    const { getByText } = render(
      <ResetModal setResetModal={setResetModal} resetModal={true} />
    );
    fireEvent.click(getByText("Cancel"));
    expect(setResetModal).toHaveBeenCalledWith(false);
  });
});
