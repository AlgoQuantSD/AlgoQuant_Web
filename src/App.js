import React from "react";
import { PageRouter } from "./PageRouter";
import {
  Authenticator
} from "@aws-amplify/ui-react";
import { Amplify } from "aws-amplify";
import authConfig from "./components/authentication/aws-export";
import "./App.css";

Amplify.configure({ ...authConfig, Analytics: { disabled: true } });

export default function App (){
  return (
    <Authenticator.Provider>
      <PageRouter/>
    </Authenticator.Provider>
  )
}
