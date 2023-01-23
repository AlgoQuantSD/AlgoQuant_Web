import { AlgoQuant } from "algoquant/lib/AlgoQuant";

export default function initAlgoQuantApi(user) {
  try {
    const jwtToken = user?.signInUserSession?.accessToken?.jwtToken;
    return new AlgoQuant(jwtToken);
  } catch (error) {
    console.log(error);
    return null;
  }
}
