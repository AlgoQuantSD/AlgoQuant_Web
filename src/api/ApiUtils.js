import { AlgoQuant } from "algoquant/lib/AlgoQuant";
import { Auth } from "aws-amplify";
// This function is a helper function that is used to create and initialize the the Algoquant object from algoquant SDK.
// Param: User: amplify user object from user context
function initAlgoQuantApi(user) {
  const jwtToken = user?.signInUserSession?.accessToken?.jwtToken;
  return new AlgoQuant(jwtToken);
}

async function IsValidToken(token) {
  try {
    const session = await Auth.currentSession();
    const accessTokenExpiration = session.getAccessToken().getExpiration();
    const idTokenExpiration = session.getIdToken().getExpiration();

    if (accessTokenExpiration < Date.now() || idTokenExpiration < Date.now()) {
      return true;
    } else {
      return false;
    }
  } catch (err) {
    console.log(err);
  }
}

export { initAlgoQuantApi, IsValidToken };
