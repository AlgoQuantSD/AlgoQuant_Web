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
        {/* {({ signOut, user }) => (
          <main>
            <h1>Hello!! {user.username}</h1>
            <button onClick={signOut}>Sign out</button>
          </main>
        )} */}
        <HomePage />
      </Authenticator>
    </ThemeProvider>
  );
};

export default SignInPage;
