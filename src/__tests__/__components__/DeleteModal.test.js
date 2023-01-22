import React from "react";
import { render, fireEvent } from "@testing-library/react";
import DeleteModal from "../../components/singular/Modals/DeleteModal";

describe("DeleteModal", () => {
  it("should render the modal when isVisible is true", () => {
    const { getByText } = render(<DeleteModal deleteModal={true} />);
    expect(getByText("Delete Account")).toBeInTheDocument();
    expect(
      getByText("Are you sure you want to delete your account?")
    ).toBeInTheDocument();
    expect(
      getByText("Please enter your password to confirm.")
    ).toBeInTheDocument();
    expect(
      getByText(
        "NOTE: You will not be able to recover your account upon deletion."
      )
    ).toBeInTheDocument();
  });

  it("should not render the modal when isVisible is false", () => {
    const { queryByText } = render(<DeleteModal deleteModal={false} />);
    expect(queryByText("Delete Account")).toBeNull();
    expect(
      queryByText("Are you sure you want to delete your account?")
    ).toBeNull();
    expect(queryByText("Please enter your password to confirm.")).toBeNull();
    expect(
      queryByText(
        "NOTE: You will not be able to recover your account upon deletion."
      )
    ).toBeNull();
  });

  it("renders input box and placeholder correctly", () => {
    const { getByPlaceholderText } = render(<DeleteModal deleteModal={true} />);
    const passwordInput = getByPlaceholderText("Password");
    expect(passwordInput).toBeInTheDocument();
  });

  it("renders all buttons correctly", () => {
    const { getByText } = render(<DeleteModal deleteModal={true} />);
    const buttonsText = ["Cancel", "Delete"];

    buttonsText.forEach((text) => {
      const button = getByText(text);
      expect(button).toBeInTheDocument();
      expect(button.tagName).toBe("BUTTON");
    });
  });

  it("should call set DeleteModal with false when clicking the cancel button", () => {
    const setDeleteModal = jest.fn();
    const { getByText } = render(
      <DeleteModal setDeleteModal={setDeleteModal} deleteModal={true} />
    );
    fireEvent.click(getByText("Cancel"));
    expect(setDeleteModal).toHaveBeenCalledWith(false);
  });
});
