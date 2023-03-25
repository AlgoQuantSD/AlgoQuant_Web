import React from "react";

export const ToastContext = React.createContext({
  showToast: () => {},
  hideToast: () => {},
  toastMessage: "",
});
