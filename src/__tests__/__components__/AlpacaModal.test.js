import React from "react";
import { render, fireEvent } from "@testing-library/react";
import AlpacaModal from "../../components/singular/Modals/AlpacaModal";

describe("AlpacaModal", () => {
  it("should render the modal when isVisible is true", () => {
    const { getByText } = render(<AlpacaModal alpacaModal={true} />);
    expect(getByText("Connect to PaperTrade")).toBeInTheDocument();
    expect(getByText("Please enter Alpaca API Key")).toBeInTheDocument();
    expect(getByText("Please enter Alpaca Secret Key")).toBeInTheDocument();
    expect(
      getByText("NOTE: Updating the Alpaca Key will reset your paper trading")
    ).toBeInTheDocument();
  });

  it("should not render the modal when isVisible is false", () => {
    const { queryByText } = render(<AlpacaModal alpacaModal={false} />);
    expect(queryByText("Connect to PaperTrade")).toBeNull();
    expect(queryByText("Please enter your Alpaca Key")).toBeNull();
    expect(
      queryByText("NOTE: Updating the Alpaca Key will reset your paper trading")
    ).toBeNull();
  });

  it("renders input box and placeholder correctly", () => {
    const { getByPlaceholderText } = render(<AlpacaModal alpacaModal={true} />);
    const alpacaInput = getByPlaceholderText("Alpaca Key");
    expect(alpacaInput).toBeInTheDocument();
  });

  it("renders all buttons correctly", () => {
    const { getByText } = render(<AlpacaModal alpacaModal={true} />);
    const buttonsText = ["Cancel", "Continue"];

    buttonsText.forEach((text) => {
      const button = getByText(text);
      expect(button).toBeInTheDocument();
      expect(button.tagName).toBe("BUTTON");
    });
  });

  it("should call set AlpacaModal with false when clicking the cancel button", () => {
    const setAlpacaModal = jest.fn();
    const { getByText } = render(
      <AlpacaModal setAlpacaModal={setAlpacaModal} alpacaModal={true} />
    );
    fireEvent.click(getByText("Cancel"));
    expect(setAlpacaModal).toHaveBeenCalledWith(false);
  });
});
