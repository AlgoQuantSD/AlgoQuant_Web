import "./App.css";
import { Amplify, Auth } from "aws-amplify";
import { useEffect, useMemo, useState } from "react";
import { UserContext } from "./constants/UserContext";
import authConfig from "./components/authentication/aws-export";
import { PageRouter, UnauthenticatedPageRouter } from "./PageRouter";
// import { withAuthenticator } from "@aws-amplify/ui-react";

Amplify.configure({ ...authConfig, Analytics: { disabled: true } });

function App() {
  const [userInfo, setUserInfo] = useState(null);

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
      {console.log(
        "Before userInfo " + JSON.stringify(userInfo?.attributes?.given_name)
      )}

      {userInfo ? <PageRouter /> : <UnauthenticatedPageRouter />}

      {console.log(
        "after userInfo " + JSON.stringify(userInfo?.attributes?.given_name)
      )}
    </UserContext.Provider>
  );
}

export default App;
// export default withAuthenticator(App);
