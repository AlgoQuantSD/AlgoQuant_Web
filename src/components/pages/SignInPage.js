import React from "react";
import { Authenticator, ThemeProvider } from "@aws-amplify/ui-react";
import CustomAuthTheme from "../authentication/CustomAuthTheme";
import signUpConfig from "../authentication/SignUpConfig";
import components from "../authentication/AuthFormComponents";

const SignInPage = () => {
  return (
    <ThemeProvider theme={CustomAuthTheme()}>
      <div className="grid grid-cols-2 gap-4 bg-green">
        <div
          className="bg-gray-100 p-4 text-8xl font-bold text-cokewhite font-semibold py-2 px-4 rounded-full"
          style={{
            height: "100vh",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          Trade to your{<br />}comfort.
        </div>
        <div
          className="bg-gray-200 p-4 "
          style={{
            height: "100vh",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Authenticator
            formFields={signUpConfig}
            components={components}
            initialState="signIn"
          />
        </div>
      </div>
    </ThemeProvider>
  );
};

export default SignInPage;
