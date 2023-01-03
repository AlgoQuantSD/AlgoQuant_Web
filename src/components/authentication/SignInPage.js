import React from "react";
import { Authenticator, ThemeProvider } from "@aws-amplify/ui-react";
import CustomAuthTheme from "./CustomAuthTheme";
import signUpConfig from "./signUpConfig";
import components from "./authFormComponents";

const SignInPage = () => {
  return (
    <ThemeProvider theme={CustomAuthTheme()}>
      <Authenticator
        formFields={signUpConfig}
        components={components}
        variation="modal"
      ></Authenticator>
    </ThemeProvider>
  );
};

export default SignInPage;
