// TO-DO: Imports are commented out until routing is implemented
// import SignUpPage from "./components/authentication/SignUpPage";
// import ResetPwdPage from "./components/authentication/ResetPwdPage";

import NavBar from "./pages/NavBar";
import SideBar from "./pages/SideBar";
import SignInPage from "./components/authentication/SignInPage";
import SignUpPage from "./components/authentication/SignUpPage";
import WelcomePage from "./pages/WelcomePage";
import HomePage from "./pages/HomePage";
import BacktestingPage from "./pages/BacktestingPage";
import BacktestingResultsPage from "./pages/BacktestingResultsPage";
// import CreateBacktestPage from "./components/pages/CreateBacktestPage";
// import CreateInvestorPage from "./components/pages/CreateInvestorPage";
// import StockTickerPage from "./components/pages/StockTickerPage";
// import TransactionHistoryPage from "./components/pages/TransactionHistoryPage";
// import AccountPage from "./components/pages/AccountPage";
import "./App.css";
import { Auth } from "aws-amplify";
import { useEffect, useMemo, useState } from "react";
// import { UserContext } from "./src/constants/UserContext";

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
      {/* <SignInPage /> */}
      {/* <SignUpPage /> */}
      {/* <NavBar /> */}
      {/* <SideBar /> */}
      <WelcomePage />
      {/* <HomePage /> */}
      {/* <BacktestingPage /> */}
      {/* <BacktestingResultsPage /> */}
      {/* <CreateBacktestPage />
      <CreateInvestorPage />
      <StockTickerPage />
      <TransactionHistoryPage />
      <AccountPage /> */}
    </>
  );
}

export default App;
