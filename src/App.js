import NavBar from "./components/NavBar";
import HomePage from "./components/HomePage";
import "./App.css";
import { withAuthenticator, Button, Heading } from "@aws-amplify/ui-react";
import "@aws-amplify/ui-react/styles.css";

function App({ signOut, user }) {
  return (
    <>
      <Heading level={1}>Hello {user.username}</Heading>
      <Button onClick={signOut}>Sign out</Button>
      <h2>Amplify Todos</h2>
      <NavBar />
      <HomePage />
    </>
  );
}

export default withAuthenticator(App);
