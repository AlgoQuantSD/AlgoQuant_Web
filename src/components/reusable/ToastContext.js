import React from "react";

export const ToastContext = React.createContext({
  showToast: () => {},
  hideToast: () => {},
  toastMessage: "",
  isToastOpen: false,
  toastType: "success",
});
