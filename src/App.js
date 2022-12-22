import NavBar from "./components/NavBar";
import HomePage from "./components/HomePage";
import SignInPage from "./components/SignInPage";
import SignupPage from "./components/SignUpPage";
import ResetPwdPage from "./components/ResetPwdPage";
import "./App.css";

function App() {
  return (
    <>
      <SignInPage />
      <NavBar />
      <HomePage />
    </>
  );
}

export default App;
