import NavBar from "./components/NavBar";
import HomePage from "./components/HomePage";
import SignInPage from "./components/authentication/SignInPage";
import SignUpPage from "./components/authentication/SignUpPage";
import ResetPwdPage from "./components/authentication/ResetPwdPage";
import "./App.css";

function App() {
  return (
    <>
      <ResetPwdPage />
      <NavBar />
      <HomePage />
    </>
  );
}

export default App;
