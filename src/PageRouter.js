import { React } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "./components/pages/HomePage";
import WelcomePage from "./components/pages/WelcomePage";
import CreateInvestorPage from "./components/pages/CreateInvestorPage";
import BacktestingPage from "./components/pages/BacktestingPage";
import TransactionHistoryPage from "./components/pages/TransactionHistoryPage";
import ProfilePage from "./components/pages/ProfilePage";
import SignUpPage from "./components/authentication/SignInPage";
import {
  Authenticator,
  useAuthenticator,
  ThemeProvider,
} from "@aws-amplify/ui-react";
import { Navigate } from "react-router-dom";

function RequireAuth({ children }) {
  const { route } = useAuthenticator((context) => [context.route]);
  console.log(route)
  return route === "authenticated" || route === "idle" ? children : <Navigate to="/" replace />;
}

function CheckLoggedIn({ children }) {
  const { route } = useAuthenticator((context) => [context.route]);
  return route === "authenticated" ? <Navigate to="/home" replace /> : children;
}

export function PageRouter() {
  return (
    <BrowserRouter>
      <Routes>     
      <Route 
        path="/" 
        element={
        <WelcomePage />
        }/>

        <Route 
        path="/home" 
        element={
       <RequireAuth>
        <HomePage />
        </RequireAuth>
        }/>

      <Route 
        path="/createinvestor" 
        element={
       <RequireAuth>
        <CreateInvestorPage />
        </RequireAuth>
        }/>

      <Route 
        path="/backtesting" 
        element={
       <RequireAuth>
        <BacktestingPage />
        </RequireAuth>
        }/>

    <Route 
        path="/history" 
        element={
       <RequireAuth>
        <TransactionHistoryPage />
        </RequireAuth>
        }/>

    <Route 
        path="/login" 
        element={
          <CheckLoggedIn>
          <SignUpPage/>
          </CheckLoggedIn>

        }/> 
      </Routes>
    </BrowserRouter>
  );
}

