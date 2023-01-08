import NavBar from "./components/NavBar";
import HomePage from "./components/HomePage";
import SignInPage from "./components/authentication/SignInPage";
// TO-DO: Imports are commented out until routing is implemented
// import SignUpPage from "./components/authentication/SignUpPage";
// import ResetPwdPage from "./components/authentication/ResetPwdPage";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Page1 from "./components/Page1";

function App() {
  return (
    <>
      <SignInPage />

      <BrowserRouter>
        {/* <Routes>
          <Route exact path="/signin">
            <SignInPage />
          </Route>
        </Routes> */}
        <Routes>
          <Route exact path="/homepage">
            <HomePage />
          </Route>
        </Routes>
        <Routes>
          <Route exact path="/Page1">
            <Page1 />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
