import React from "react";
import { useEffect, useMemo, useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { PageRouter, UnauthenticatedPageRouter } from "./PageRouter";
import { UserContext } from "./constants/UserContext";
import {
  Authenticator,
  useAuthenticator,
  ThemeProvider,
} from "@aws-amplify/ui-react";
import CustomAuthTheme from "./components/authentication/CustomAuthTheme";
import { Amplify, Auth } from "aws-amplify";
import signUpConfig from "./components/authentication/signUpConfig";
import authConfig from "./components/authentication/aws-export";
import components from "./components/authentication/authFormComponents";
import HomePage from "./components/pages/HomePage";
import NavBar from "./components/NavBar";
import SignInPage from "./components/authentication/SignInPage";
import "./App.css";
import WelcomePage from "./components/pages/WelcomePage";

Amplify.configure({ ...authConfig, Analytics: { disabled: true } });

function App() {
  const [userInfo, setUserInfo] = useState(null);
  // const { route } = useAuthenticator((context) => [context.route]);

  console.log("userInfo" + JSON.stringify(userInfo?.attributes?.given_name));

  // Update the data in our UserContext
  const value = useMemo(
    () => ({ userInfo, setUserInfo }),
    [userInfo, setUserInfo]
  );

  // Get the logged in user info and store it
  async function getCurrentUser() {
    try {
      const user = await Auth.currentAuthenticatedUser();
      console.log("Successfully logged in as: ", user.attributes.email);
      setUserInfo(user);
      // Once the user has successfully logged in, reroute to homepage
    } catch (error) {
      console.log("Error getting current user: ", error);
    }
  }

  // Run the function to get the logged in user info upon opening the app
  useEffect(() => {
    getCurrentUser();
  }, []);

  return (
    <UserContext.Provider value={value}>
      {/* {console.log(
        "Before userInfo " + JSON.stringify(userInfo?.attributes?.given_name)
      )} */}

      {userInfo ? <PageRouter /> : <UnauthenticatedPageRouter />}

      {/* {route === "authenticated" ? (
        <HomePage />
      ) : (
        <ThemeProvider theme={CustomAuthTheme()}>
          <Authenticator
            formFields={signUpConfig}
            components={components}
            variation="modal"
          ></Authenticator>
        </ThemeProvider>
      )} */}

      {/* {console.log(
        "after userInfo " + JSON.stringify(userInfo?.attributes?.given_name)
      )} */}
    </UserContext.Provider>

    // <>
    //   {route === "authenticated" ? (
    //     <WelcomePage />
    //   ) : (
    //     <ThemeProvider theme={CustomAuthTheme()}>
    //       <Authenticator
    //         formFields={signUpConfig}
    //         components={components}
    //         variation="modal"
    //       ></Authenticator>
    //     </ThemeProvider>
    //   )}
    // </>
  );
}

export default App;
