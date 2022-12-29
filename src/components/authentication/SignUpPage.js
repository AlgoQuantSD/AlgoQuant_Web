import React from "react";
import { Authenticator, ThemeProvider } from "@aws-amplify/ui-react";
import CustomAuthTheme from "./CustomAuthTheme";
import signUpConfig from "./signUpConfig";
import components from "./authFormComponents";

const SignUpPage = () => {
  return (
    <ThemeProvider theme={CustomAuthTheme()}>
      <Authenticator
        formFields={signUpConfig}
        components={components}
        initialState="signUp"
        variation="modal"
      >
        {({ signOut, user }) => (
          <main>
            <h1>Hello {user.username}</h1>
            <button onClick={signOut}>Sign out</button>
          </main>
        )}
      </Authenticator>
    </ThemeProvider>
  );
};

export default SignUpPage;
