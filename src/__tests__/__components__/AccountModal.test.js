import React from "react";
import { render, fireEvent, getByTestId } from "@testing-library/react";
import AccountModal from "../../components/singular/Modals/AccountModal";

describe("AccountModal", () => {
  it("should render the reset alpaca modal when the type is set to reset_alpaca", () => {
    const accountModal = {
      type: "reset_alpaca",
      visible: true,
    };

    const { getByText } = render(
      <AccountModal
        handleAccountModals={() => {}}
        accountModal={accountModal}
      />
    );
    expect(
      getByText("Resetting Balance requires new Alpaca Keys")
    ).toBeInTheDocument();
    expect(getByText("Please enter Alpaca API Key")).toBeInTheDocument();
    expect(getByText("Please enter Alpaca Secret Key")).toBeInTheDocument();
  });

  it("should not render the modal when the visible prop is set to false", () => {
    const accountModal = {
      type: "reset_alpaca",
      visible: false,
    };
    const { queryByText } = render(
      <AccountModal
        handleAccountModals={() => {}}
        accountModal={accountModal}
      />
    );
    expect(
      queryByText("Resetting Balance requires new Alpaca Keys")
    ).toBeNull();
    expect(queryByText("Please enter Alpaca API Key")).toBeNull();
    expect(queryByText("Please enter Alpaca Secret Key")).toBeNull();
  });

  it("should call handleAccountModals when clicking the cancel button", () => {
    const handleAccountModals = jest.fn();
    const accountModal = {
      type: "reset_alpaca",
      visible: true,
    };
    const { getByText } = render(
      <AccountModal
        handleAccountModals={handleAccountModals}
        accountModal={accountModal}
      />
    );
    fireEvent.click(getByText("Cancel"));
    expect(handleAccountModals).toHaveBeenCalled();
  });
  it("should update alpacaKey state when input value changes", () => {
    const accountModal = {
      type: "reset_alpaca",
      visible: true,
    };
    const { getByPlaceholderText } = render(
      <AccountModal
        handleAccountModals={() => {}}
        accountModal={accountModal}
      />
    );
    const alpacaInput = getByPlaceholderText("Alpaca Key");
    fireEvent.change(alpacaInput, { target: { value: "test-key" } });
    expect(alpacaInput.value).toBe("test-key");
  });
});
