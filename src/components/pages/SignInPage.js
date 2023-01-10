import React from "react";
import { Authenticator, ThemeProvider } from "@aws-amplify/ui-react";
import CustomAuthTheme from "../authentication/CustomAuthTheme";
import SignUpConfig from "../authentication/signUpConfig";
import components from "../authentication/authFormComponents";

const SignInPage = () => {
  return (
    <ThemeProvider theme={CustomAuthTheme()}>
      <Authenticator
        formFields={SignUpConfig}
        components={components}
        initialState="signIn"
        variation="modal"
      />
    </ThemeProvider>
  );
};

export default SignInPage;
