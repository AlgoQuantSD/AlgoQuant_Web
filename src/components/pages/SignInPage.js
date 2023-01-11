import React from "react";
import { Authenticator, ThemeProvider } from "@aws-amplify/ui-react";
import CustomAuthTheme from "../authentication/CustomAuthTheme";
import signUpConfig from "../authentication/SignUpConfig";
import components from "../authentication/AuthFormComponents";

const SignInPage = () => {
  return (
    <ThemeProvider theme={CustomAuthTheme()}>
      <Authenticator
        formFields={signUpConfig}
        components={components}
        initialState="signIn"
        variation="modal"
      />
    </ThemeProvider>
  );
};

export default SignInPage;
