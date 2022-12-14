import { React } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useAuthenticator } from "@aws-amplify/ui-react";
import HomePage from "./components/pages/HomePage";
import WelcomePage from "./components/pages/WelcomePage";
import CreateInvestorPage from "./components/pages/CreateInvestorPage";
import BacktestingPage from "./components/pages/BacktestingPage";
import TransactionHistoryPage from "./components/pages/TransactionHistoryPage";
import ProfilePage from "./components/pages/ProfilePage";
import SignInPage from "./components/pages/SignInPage";

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
  return (
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
          path="/backtesting"
          element={
            <RequireAuth>
              <BacktestingPage />
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
          path="/login"
          element={
            <ProtectLogin>
              <SignInPage />
            </ProtectLogin>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}
