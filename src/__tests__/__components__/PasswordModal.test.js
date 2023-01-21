import React from "react";
import { render, fireEvent } from "@testing-library/react";
// import { BrowserRouter } from "react-router-dom";
import PasswordModal from "../../components/singular/Modals/PasswordModal";
import { BrowserRouter } from "react-router-dom";

describe("PasswordModal", () => {
  it("should render the modal when isVisible is true", () => {
    const setPasswordModal = jest.fn();
    const { getByText } = render(
      <PasswordModal setPasswordModal={setPasswordModal} passwordModal={true} />
    );
    expect(getByText("Change Password")).toBeInTheDocument();
    expect(getByText("Please enter your old password")).toBeInTheDocument();
    expect(getByText("Please enter your new password")).toBeInTheDocument();
    expect(getByText("Confirm your new password")).toBeInTheDocument();
    expect(getByText("Cancel")).toBeInTheDocument();
    expect(getByText("Save Changes")).toBeInTheDocument();
  });

  it("should not render the modal when isVisible is false", () => {
    const setPasswordModal = jest.fn();
    const { queryByText } = render(
      <PasswordModal
        setPasswordModal={setPasswordModal}
        passwordModal={false}
      />
    );
    expect(queryByText("Change Password")).toBeNull();
    expect(queryByText("Please enter your old password")).toBeNull();
    expect(queryByText("Please enter your new password")).toBeNull();
    expect(queryByText("Confirm your new password")).toBeNull();
    expect(queryByText("Cancel")).toBeNull();
    expect(queryByText("Save Changes")).toBeNull();
  });

  // it("renders all buttons and input boxes", () => {
  //   const { getByText } = render (
  //     <PasswordModal setPasswordModal={setPasswordModal} passwordModal={true} />
  //   );

  // });
  it("should call setPasswordModal with false when clicking the cancel button", () => {
    const setPasswordModal = jest.fn();
    const { getByText } = render(
      <PasswordModal setPasswordModal={setPasswordModal} passwordModal={true} />
    );
    fireEvent.click(getByText("Cancel"));
    expect(setPasswordModal).toHaveBeenCalledWith(false);
  });
});
