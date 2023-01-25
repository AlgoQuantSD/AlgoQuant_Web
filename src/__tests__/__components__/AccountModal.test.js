import React from "react";
import { render, fireEvent } from "@testing-library/react";
import AccountModal from "../../components/singular/Modals/AccountModal";

describe("AccountModal", () => {
  it("should render the modal when isVisible is true", () => {
    const { getByText } = render(<AccountModal accountModal={true} />);
    expect(getByText("Please provide your Alpaca Keys")).toBeInTheDocument();
    expect(getByText("Please enter Alpaca API Key")).toBeInTheDocument();
    expect(getByText("Please enter Alpaca Secret Key")).toBeInTheDocument();
    expect(
      getByText(
        "NOTE: Connecting to Alpaca will terminate any progress with your simulated account"
      )
    ).toBeInTheDocument();
  });

  it("should not render the modal when isVisible is false", () => {
    const { queryByText } = render(<AccountModal accountModal={false} />);
    expect(queryByText("Connect to PaperTrade")).toBeNull();
    expect(queryByText("Please enter your Alpaca Key")).toBeNull();
    expect(
      queryByText("NOTE: Updating the Alpaca Key will reset your paper trading")
    ).toBeNull();
  });

  it("renders input box and placeholder correctly", () => {
    const { getByPlaceholderText } = render(
      <AccountModal accountModal={true} />
    );
    const alpacaInput = getByPlaceholderText("Alpaca Key");
    const secretInput = getByPlaceholderText("Secret Key");
    expect(alpacaInput).toBeInTheDocument();
    expect(secretInput).toBeInTheDocument();
  });

  it("renders all buttons correctly", () => {
    const { getByText } = render(<AccountModal accountModal={true} />);
    const buttonsText = ["Cancel", "Continue"];

    buttonsText.forEach((text) => {
      const button = getByText(text);
      expect(button).toBeInTheDocument();
      expect(button.tagName).toBe("BUTTON");
    });
  });

  it("should call set AlpacaModal with false when clicking the cancel button", () => {
    const setAccountModal = jest.fn();
    const { getByText } = render(
      <AccountModal setAccountModal={setAccountModal} accountModal={true} />
    );
    fireEvent.click(getByText("Cancel"));
    expect(setAccountModal).toHaveBeenCalledWith(false);
  });
});
