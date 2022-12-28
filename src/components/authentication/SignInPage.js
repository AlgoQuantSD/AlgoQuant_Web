import React from "react";
import { Authenticator, ThemeProvider } from "@aws-amplify/ui-react";
import AuthFormStyle from "./AuthFormStyle";
import formFields from "./authFormStructure";
import components from "./authFormComponents";

const SignInPage = () => {
  return (
    <ThemeProvider theme={AuthFormStyle()}>
      <Authenticator
        formFields={formFields}
        components={components}
        variation="modal"
      >
        {({ signOut, user }) => (
          <main>
            <h1>Hello!! {user.username}</h1>
            <button onClick={signOut}>Sign out</button>
          </main>
        )}
      </Authenticator>
    </ThemeProvider>
  );
};

export default SignInPage;
