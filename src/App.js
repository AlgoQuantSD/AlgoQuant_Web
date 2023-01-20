import React from "react";
import { PageRouter } from "./PageRouter";
import { Authenticator } from "@aws-amplify/ui-react";
import { Amplify } from "aws-amplify";
import authConfig from "./components/authentication/aws-export";
import AlgoquantApiContext from "./ApiContext";
import { AlgoQuant } from "../node_modules/algoquant/lib/AlgoQuant";

import "./App.css";

Amplify.configure({ ...authConfig, Analytics: { disabled: true } });
const algoqant = new AlgoQuant();

export default function App() {
  return (
    <AlgoquantApiContext.Provider value={algoqant}>
      <Authenticator.Provider>
        <PageRouter />
      </Authenticator.Provider>
    </AlgoquantApiContext.Provider>
  );
}
