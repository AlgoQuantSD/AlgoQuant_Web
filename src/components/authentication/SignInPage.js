import { React, useContext, useEffect, useCallback } from "react";
import {
  Authenticator,
  useAuthenticator,
  ThemeProvider,
} from "@aws-amplify/ui-react";
import { useNavigate } from "react-router-dom";
import CustomAuthTheme from "./CustomAuthTheme";
import signUpConfig from "./signUpConfig";
import components from "./authFormComponents";
import HomePage from "../pages/HomePage";
import { UserContext } from "../../constants/UserContext";
import Navbar from "../NavBar";
import Sidebar from "../SideBar";
import { Auth } from "aws-amplify";

const SignInPage = () => {
  const navigate = useNavigate();
  const { userInfo } = useContext(UserContext);
  // const { route } = useAuthenticator((context) => [context.route]);

  const handleAuthStateChange = useCallback(
    (state) => {
      if (state === "signedIn") {
        navigate("/home");
      }
    },
    [navigate]
  );

  useEffect(() => {
    console.log("User info updated");
  }, [userInfo]);

  return (
    <ThemeProvider theme={CustomAuthTheme()}>
      <Authenticator
        formFields={signUpConfig}
        components={components}
        variation="modal"
        onStateChange={handleAuthStateChange}
      >
        <div className="w-gull h-screen bg-dark-gray">
          <Navbar />
          <Sidebar />
          <h1 className="font-semibold text-5xl text-white text-center pt-32">
            SignInPage
          </h1>
          <p className="text-white text-center">
            {JSON.stringify(userInfo?.attributes?.given_name)}
          </p>
        </div>
        <HomePage />
      </Authenticator>
    </ThemeProvider>
  );
};

export default SignInPage;
