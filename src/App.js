import NavBar from "./components/NavBar";
import HomePage from "./components/HomePage";
import AuthenticationPage from "./components/AuthenticationPage";
import "./App.css";

function App() {
  return (
    <>
      <AuthenticationPage />
      <NavBar />
      <HomePage />
    </>
  );
}

export default App;
