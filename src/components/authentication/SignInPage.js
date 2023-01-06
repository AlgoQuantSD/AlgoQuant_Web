import React from "react";
import { Authenticator, ThemeProvider } from "@aws-amplify/ui-react";
import CustomAuthTheme from "./CustomAuthTheme";
import signUpConfig from "./signUpConfig";
import components from "./authFormComponents";
import HomePage from "../pages/HomePage";

const SignInPage = () => {
  return (
    <ThemeProvider theme={CustomAuthTheme()}>
      <Authenticator
        formFields={signUpConfig}
        components={components}
        variation="modal"
      >
        <HomePage />
      </Authenticator>
    </ThemeProvider>
  );
};

export default SignInPage;
