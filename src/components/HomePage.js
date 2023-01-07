import React from "react";
import { Auth } from "aws-amplify";
import { data } from "autoprefixer";

const HomePage = () => {
  Auth.currentAuthenticatedUser()
    .then((user) => {
      console.log(user);
      const jwt = user.signInUserSession.idToken.jwtToken;
      console.log(jwt);
    })
    .catch((err) => {
      console.log(err);
    });
  return (
    <div className="w-gull h-screen bg-dark-gray">
      <h1 className="font-semibold text-5xl text-white text-center pt-32">
        HomePage
      </h1>
    </div>
  );
};

export default HomePage;
