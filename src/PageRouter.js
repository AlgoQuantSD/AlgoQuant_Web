import { React, useState } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useAuthenticator } from "@aws-amplify/ui-react";

import HomePage from "./components/pages/HomePage";
import WelcomePage from "./components/pages/WelcomePage";
import CreateInvestorPage from "./components/pages/CreateInvestorPage";
import BacktestingPage from "./components/pages/BacktestingPage";
import BacktestingResultsPage from "./components/pages/BacktestingResultsPage";
import TransactionHistoryPage from "./components/pages/TransactionHistoryPage";
import ProfilePage from "./components/pages/ProfilePage";
import SignInPage from "./components/pages/SignInPage";
import SearchResultsPage from "./components/pages/SearchResultsPage";
import JobViewPage from "./components/pages/JobViewPage";
import InvestorViewPage from "./components/pages/InvestorViewPage";
import CreateAlgorithmicPage from "./components/pages/CreateAlgorithmicPage";
import CreateAIPage from "./components/pages/CreateAIPage";
import InvestorConfirmationPage from "./components/pages/InvestorConfirmationPage";
import AIConfirmationPage from "./components/pages/AIConfirmationPage";
import CreateBacktestPage from "./components/pages/CreateBacktestPage";
import MobileLoginPage from "./components/pages/MobileLoginPage";
import AlgoquantApiContext from "./api/ApiContext";
import initAlgoQuantApi from "../src/api/ApiUtils";
import { ToastContext } from "./components/reusable/ToastContext";
/*
This Component is used to wrap each Route and ensure that they cannot 
be acessed unless the user is authenticated. If the user is authenticated
then they will be navigated to the requested page otherwise they will be sent
to the welcome page
*/
function RequireAuth({ children }) {
  const { route } = useAuthenticator((context) => [context.route]);
  return route === "authenticated" || route === "idle" ? (
    children
  ) : (
    <Navigate to="/" replace />
  );
}

/*
This Component is used to protect the login page. The user should not be able 
to acesss the login page if they are already authenticated. In the case that they 
are authenticated then they will be directed to the home page. 
*/
function ProtectLogin({ children }) {
  const { route } = useAuthenticator((context) => [context.route]);
  return route === "authenticated" ? <Navigate to="/home" replace /> : children;
}

export function PageRouter() {
  // get logged in user information from amplify's context
  const { user } = useAuthenticator((context) => [context.user]);

  // Declare algoquant variable and attempt to initialize it passing in the user for authorization.
  // This object is used to access all the api request code from the algoquant sdk
  let algoquant = undefined;
  try {
    algoquant = initAlgoQuantApi(user);
  } catch (err) {
    // TO-DO: handle this error and show error on screen
    console.log(err);
  }

  const [isToastOpen, setIsToastOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const [toastType, setToastType] = useState();

  const showToast = (message, type = "") => {
    setIsToastOpen(true);
    setToastMessage(message);
    setToastType(type);
  };

  const hideToast = () => {
    setIsToastOpen(false);
  };

  return (
    // Context Provider to make the algoquant object global for child components of this Provider
    <AlgoquantApiContext.Provider value={algoquant}>
      <ToastContext.Provider
        value={{
          showToast: showToast,
          hideToast: hideToast,
          toastMessage,
          isToastOpen,
          toastType,
        }}
      >
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<WelcomePage />} />
            <Route
              path="/home"
              element={
                <RequireAuth>
                  <HomePage />
                </RequireAuth>
              }
            />
            <Route
              path="/createinvestor"
              element={
                <RequireAuth>
                  <CreateInvestorPage />
                </RequireAuth>
              }
            />
            <Route
              path="/createalgo"
              element={
                <RequireAuth>
                  <CreateAlgorithmicPage />
                </RequireAuth>
              }
            />
            <Route
              path="/createai"
              element={
                <RequireAuth>
                  <CreateAIPage />
                </RequireAuth>
              }
            />
            <Route
              path="/confirmation"
              element={
                <RequireAuth>
                  <InvestorConfirmationPage />
                </RequireAuth>
              }
            />
            <Route
              path="/aiconfirmation"
              element={
                <RequireAuth>
                  <AIConfirmationPage />
                </RequireAuth>
              }
            />
            <Route
              path="/job"
              element={
                <RequireAuth>
                  <JobViewPage />
                </RequireAuth>
              }
            />
            <Route
              path="/investor"
              element={
                <RequireAuth>
                  <InvestorViewPage />
                </RequireAuth>
              }
            />
            <Route
              path="/backtesting"
              element={
                <RequireAuth>
                  <BacktestingPage />
                </RequireAuth>
              }
            />
            <Route
              path="/createbacktest"
              element={
                <RequireAuth>
                  <CreateBacktestPage />
                </RequireAuth>
              }
            />
            <Route
              path="/backtestresults"
              element={
                <RequireAuth>
                  <BacktestingResultsPage />
                </RequireAuth>
              }
            />
            <Route
              path="/history"
              element={
                <RequireAuth>
                  <TransactionHistoryPage />
                </RequireAuth>
              }
            />
            <Route
              path="/profile"
              element={
                <RequireAuth>
                  <ProfilePage />
                </RequireAuth>
              }
            />
            <Route
              path="/search"
              element={
                <RequireAuth>
                  <SearchResultsPage />
                </RequireAuth>
              }
            />
            <Route
              path="/login"
              element={
                <ProtectLogin>
                  <SignInPage />
                </ProtectLogin>
              }
            />
            <Route path="/mobileLogin" element={<MobileLoginPage />} />
          </Routes>
        </BrowserRouter>
      </ToastContext.Provider>
    </AlgoquantApiContext.Provider>
  );
}
