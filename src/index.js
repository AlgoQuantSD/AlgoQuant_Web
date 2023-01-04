import React from "react";
import App from "./App";
import "./index.css";
import reportWebVitals from "./reportWebVitals";
import { Amplify } from "aws-amplify";
import awsExports from "./components/authentication/aws-export";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ReactDOM from "react-dom/client";
import rootElement from "react-dom";
import HomePage from "./pages/HomePage";
import CreateInvestorPage from "./pages/CreateInvestorPage";
import TransactionHistoryPage from "./pages/TransactionHistoryPage";
import BacktestingPage from "./pages/BacktestingPage";
import AccountPage from "./pages/AccountPage";
import WelcomePage from "./pages/WelcomePage";
import SignInPage from "./components/authentication/SignInPage";

Amplify.configure(awsExports);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <BrowserRouter>
    <Routes>
      {/* <Route path="/" element={<App />} /> */}
      <Route path="/" element={<WelcomePage />} />
      <Route path="/home" element={<HomePage />} />
      <Route path="/createinvestor" element={<CreateInvestorPage />} />
      <Route path="/backtesting" element={<BacktestingPage />} />
      <Route path="/history" element={<TransactionHistoryPage />} />
      <Route path="/account" element={<AccountPage />} />
      <Route path="/login" element={<SignInPage />} />
    </Routes>
  </BrowserRouter>,
  rootElement
);
