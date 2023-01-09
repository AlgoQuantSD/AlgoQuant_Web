import { React, useContext } from "react";
import aqLogo from "../assets/images/aqLogo.png";
import { Link, useNavigate } from "react-router-dom";
import { Auth } from "aws-amplify";
import { UserContext } from "../constants/UserContext";
import {
  Authenticator,
  useAuthenticator,
  ThemeProvider,
} from "@aws-amplify/ui-react";


const Navbar = () => {
  const navigate = useNavigate();
  const {  signOut } = useAuthenticator((context) => [context.user]);



  return (
    <nav className="fixed top-0 w-full z-50 px-4 py-2 bg-dark-gray border-gray-300 shadow">
      <div className="container flex flex-wrap justify-between items-center mx-auto">
        <a href="http://localhost:3000/" className="flex items-center">
          <img src={aqLogo} className="mr-3 h-6 sm:h-9" alt="AlgoQuant Logo" />
        </a>
        <div className="hidden w-full md:block md:w-auto" id="navbar-default">
          <ul className="flex flex-col p-4 mt-4 bg-gray-50 rounded-lg border border-gray-100 md:flex-row md:space-x-8 md:mt-0 md:text-sm md:font-medium md:border-0 dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
            <li>
              <Link
                to="/profile"
                className="block py-2 pr-4 pl-3 text-green rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-green-700 md:p-0 dark:text-gray-400 md:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-black md:dark:hover:bg-transparent"
              >
                My Profile
              </Link>
            </li>
            <li>
              <button
                className="block py-2 pr-4 pl-3 text-red rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-green-700 md:p-0 dark:text-gray-400 md:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-black md:dark:hover:bg-transparent"
                onClick={signOut}
              >
                Sign Out
              </button>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
