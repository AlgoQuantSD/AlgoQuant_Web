import React from "react";
import App from "./App";
import "./index.css";
import reportWebVitals from "./reportWebVitals";
import { Amplify } from "aws-amplify";
import awsExports from "./components/authentication/aws-export";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ReactDOM from "react-dom/client";
import rootElement from "react-dom";
import HomePage from "./components/HomePage";
import CreateInvestorPage from "./components/CreateInvestorPage";
import TransactionHistoryPage from "./components/TransactionHistoryPage";
import BacktestingPage from "./components/BacktestingPage";
import AccountPage from "./components/AccountPage";
import WelcomePage from "./components/WelcomePage";

Amplify.configure(awsExports);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<App />} />
      <Route path="/home" element={<HomePage />} />
      <Route path="/createinvestor" element={<CreateInvestorPage />} />
      <Route path="/backtesting" element={<BacktestingPage />} />
      <Route path="/history" element={<TransactionHistoryPage />} />
      <Route path="/account" element={<AccountPage />} />
    </Routes>
  </BrowserRouter>,
  rootElement
);
