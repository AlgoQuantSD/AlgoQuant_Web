import React from "react";
import App from "./App";
import "./index.css";
import { Amplify } from "aws-amplify";
import awsExports from "./components/authentication/aws-export";
import ReactDOM from "react-dom/client";
import rootElement from "react-dom";

Amplify.configure(awsExports);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<App />, rootElement);

// import React from "react";
// import ReactDOM from "react-dom/client";
// import "./index.css";
// import App from "./App";
// import { Amplify } from "aws-amplify";
// import { Authenticator } from "@aws-amplify/ui-react";
// import awsExports from "./components/authentication/aws-export";
// Amplify.configure(awsExports);

// const root = ReactDOM.createRoot(document.getElementById("root"));
// root.render(
//   <Authenticator.Provider>
//     <React.StrictMode>
//       <App />
//     </React.StrictMode>
//   </Authenticator.Provider>
// );
