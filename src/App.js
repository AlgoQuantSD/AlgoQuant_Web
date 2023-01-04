// TO-DO: Imports are commented out until routing is implemented
// import SignUpPage from "./components/authentication/SignUpPage";
// import ResetPwdPage from "./components/authentication/ResetPwdPage";
import "./App.css";
import { Amplify, Auth } from "aws-amplify";
import { useEffect, useMemo, useState } from "react";
import { UserContext } from "./constants/UserContext";
import authConfig from "./components/authentication/aws-export";
import { PageRouter, UnauthenticatedPageRouter } from "./PageRouter";

Amplify.configure({ ...authConfig, Analytics: { disabled: true } });

function App() {
  const [userInfo, setUserInfo] = useState(null);

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
      {console.log("Before userInfo" + userInfo)}
      {userInfo ? <PageRouter /> : <UnauthenticatedPageRouter />}
      {console.log("after userInfo" + userInfo)}
    </UserContext.Provider>
  );
}

export default App;
