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


  return (
    <ThemeProvider theme={CustomAuthTheme()}>
      <Authenticator
        formFields={signUpConfig}
        components={components}
        variation="modal"
      />
    </ThemeProvider>
  );
};

export default SignInPage;
