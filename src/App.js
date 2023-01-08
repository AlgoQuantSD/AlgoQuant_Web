import NavBar from "./components/NavBar";
import HomePage from "./components/HomePage";
import SignInPage from "./components/authentication/SignInPage";
// TO-DO: Imports are commented out until routing is implemented
// import SignUpPage from "./components/authentication/SignUpPage";
// import ResetPwdPage from "./components/authentication/ResetPwdPage";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Page1 from "./components/Page1";
import {
  Authenticator,
  useAuthenticator,
  ThemeProvider,
} from "@aws-amplify/ui-react";
import CustomAuthTheme from "./components/authentication/CustomAuthTheme";
import signUpConfig from "./components/authentication/signUpConfig";
import components from "./components/authentication/authFormComponents";

function App() {
  // Use the value of route to decide which page to render
  const { route } = useAuthenticator((context) => [context.route]);
  // const { authStatus } = useAuthenticator((context) => [context.authStatus]);

  return (
    <>
      {route === "authenticated" ? (
        <Page1 />
      ) : (
        <ThemeProvider theme={CustomAuthTheme()}>
          <Authenticator
            formFields={signUpConfig}
            components={components}
            variation="modal"
          ></Authenticator>
        </ThemeProvider>
      )}
      {/* {authStatus === "configuring" && "Loading..."}
      {authStatus !== "authenticated" ? <Authenticator /> : <HomePage />} */}

      {/* <BrowserRouter>
        {/* <Routes>
          <Route exact path="/signin">
            <SignInPage />
          </Route>
        </Routes> */}
      {/* <Routes>
          <Route path="/homepage">
            <HomePage />
          </Route>
        </Routes>
        <Routes>
          <Route path="/Page1">
            <Page1 />
          </Route>
        </Routes>
      </BrowserRouter>  */}
    </>
  );
}

export default App;
