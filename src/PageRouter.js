import { React } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "./components/pages/HomePage";
import WelcomePage from "./components/pages/WelcomePage";
import CreateInvestorPage from "./components/pages/CreateInvestorPage";
import BacktestingPage from "./components/pages/BacktestingPage";
import TransactionHistoryPage from "./components/pages/TransactionHistoryPage";
import AccountPage from "./components/pages/AccountPage";
import SignInPage from "./components/authentication/SignInPage";

export function PageRouter() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<WelcomePage />} />
        <Route path="/home" element={<HomePage />} />
        <Route path="/createinvestor" element={<CreateInvestorPage />} />
        <Route path="/backtesting" element={<BacktestingPage />} />
        <Route path="/history" element={<TransactionHistoryPage />} />
        <Route path="/account" element={<AccountPage />} />
        <Route path="/login" element={<SignInPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export function UnauthenticatedPageRouter() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<WelcomePage />} />
        <Route path="/login" element={<SignInPage />} />
      </Routes>
    </BrowserRouter>
  );
}
