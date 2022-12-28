import React from "react";
import { Authenticator, ThemeProvider } from "@aws-amplify/ui-react";
import "@aws-amplify/ui-react/styles.css";
import AuthFormStyle from "./AuthFormStyle";
import formFields from "./authFormStructure";
import components from "./authFormComponents";

const ResetPwdPage = () => {
  return (
    <ThemeProvider theme={AuthFormStyle()}>
      <Authenticator
        formFields={formFields}
        components={components}
        initialState="resetPassword"
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

export default ResetPwdPage;
