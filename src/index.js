import React from "react";
import App from "./App";
import "./index.css";
import { Amplify } from "aws-amplify";
import awsExports from "./components/authentication/aws-export";
import ReactDOM from "react-dom/client";
// import rootElement from "react-dom";

Amplify.configure(awsExports);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<App />);
