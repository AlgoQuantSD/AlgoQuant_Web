import React from "react";
import { render, fireEvent } from "@testing-library/react";
import PasswordModal from "../../components/singular/Modals/PasswordModal";

describe("PasswordModal", () => {
  it("should render the modal when isVisible is true", () => {
    const { getByText, getAllByText } = render(
      <PasswordModal passwordModal={true} />
    );
    expect(getAllByText("Change Password").at(0)).toBeInTheDocument();
    expect(getByText("Please enter your old password")).toBeInTheDocument();
    expect(getByText("Please enter your new password")).toBeInTheDocument();
    expect(getByText("Confirm your new password")).toBeInTheDocument();
  });

  it("should not render the modal when isVisible is false", () => {
    const setPasswordModal = jest.fn();
    const { queryByText, queryAllByText } = render(
      <PasswordModal
        setPasswordModal={setPasswordModal}
        passwordModal={false}
      />
    );
    expect(queryAllByText("Change Password")).toHaveLength(0);
    expect(queryByText("Please enter your old password")).toBeNull();
    expect(queryByText("Please enter your new password")).toBeNull();
    expect(queryByText("Confirm your new password")).toBeNull();
  });

  it("renders all input boxes and placeholders correctly", () => {
    const setPasswordModal = jest.fn();
    const { getByPlaceholderText } = render(
      <PasswordModal setPasswordModal={setPasswordModal} passwordModal={true} />
    );
    const oldPassInput = getByPlaceholderText("Old Password");
    const newPassInput = getByPlaceholderText("New Password");
    const confirmPassInput = getByPlaceholderText("Confirm Password");
    expect(oldPassInput).toBeInTheDocument();
    expect(newPassInput).toBeInTheDocument();
    expect(confirmPassInput).toBeInTheDocument();
  });

  it("renders all buttons correctly", () => {
    const { getAllByText } = render(<PasswordModal passwordModal={true} />);
    const buttonsText = ["Cancel", "Change Password"];

    const buttons = getAllByText(/Cancel|Change Password/i);
    expect(buttons).toHaveLength(buttonsText.length + 1);
    buttons.forEach((button) => {
      expect(button).toBeInTheDocument();
    });
  });

  it("should call setPasswordModal with false when clicking the cancel button", () => {
    const setPasswordModal = jest.fn();
    const { getByText } = render(
      <PasswordModal setPasswordModal={setPasswordModal} passwordModal={true} />
    );
    fireEvent.click(getByText("Cancel"));
    expect(setPasswordModal).toHaveBeenCalledWith(false);
  });
});
