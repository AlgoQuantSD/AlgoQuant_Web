// TO-DO: Imports are commented out until routing is implemented
// import SignUpPage from "./components/authentication/SignUpPage";
// import ResetPwdPage from "./components/authentication/ResetPwdPage";

import NavBar from "./components/NavBar";
import SideBar from "./components/SideBar";
import HomePage from "./components/HomePage";
import SignInPage from "./components/authentication/SignInPage";
import WelcomePage from "./components/WelcomePage";
import HomePage from "./components/HomePage";
import BacktestingPage from "./components/BacktestingPage";
import BacktestingResultsPage from "./components/BacktestingResultsPage";
import CreateBacktestPage from "./components/CreateBacktestPage";
import CreateInvestorPage from "./components/CreateInvestorPage";
import StockTickerPage from "./components/StockTickerPage";
import TransactionHistoryPage from "./components/TransactionHistoryPage";
import AccountPage from "./components/AccountPage";
import "./App.css";
import { Auth } from "aws-amplify";
import { useEffect, useMemo, useState } from "react";

function App() {
  const [userInfo, setUserInfo] = useState(null);

  // Update the data in our UserContext
  const value = useMemo(
    () => ({ userInfo, setUserInfo }),
    [userInfo, setUserInfo]
  );

  // Get the logged in user info and store it
  async function getCurrentUser() {
    try {
      const user = await Auth.currentAuthenticatedUser();
      console.log("Successfully logged in as: ", user.attributes.email);
      setUserInfo(user);
    } catch (error) {
      console.log("Error getting current user: ", error);
    }
  }
  // Run the function to get the logged in user info upon opening the app
  useEffect(() => {
    getCurrentUser();
  }, []);

  return (
    <>
      <SignInPage />
      <NavBar />
      <SideBar />
      <WelcomePage />
      <HomePage />
      <BacktestingPage />
      <BacktestingResultsPage />
      <CreateBacktestPage />
      <CreateInvestorPage />
      <StockTickerPage />
      <TransactionHistoryPage />
      <AccountPage />
    </>
  );
}

export default App;
