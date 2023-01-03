import NavBar from "./components/NavBar";
import HomePage from "./components/HomePage";
import SignInPage from "./components/authentication/SignInPage";
// TO-DO: Imports are commented out until routing is implemented
// import SignUpPage from "./components/authentication/SignUpPage";
// import ResetPwdPage from "./components/authentication/ResetPwdPage";
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
