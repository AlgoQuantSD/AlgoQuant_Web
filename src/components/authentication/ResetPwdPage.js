import React from "react";
import { Authenticator, ThemeProvider } from "@aws-amplify/ui-react";
import "@aws-amplify/ui-react/styles.css";
import CustomAuthTheme from "./CustomAuthTheme";
import signUpConfig from "./signUpConfig";
import components from "./authFormComponents";

const ResetPwdPage = () => {
  return (
    <ThemeProvider theme={CustomAuthTheme()}>
      <Authenticator
        formFields={signUpConfig}
        components={components}
        initialState="resetPassword"
        variation="modal"
      ></Authenticator>
    </ThemeProvider>
  );
};

export default ResetPwdPage;
