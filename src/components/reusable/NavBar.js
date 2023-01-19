import { React, useState } from "react";
import aqLogo from "../../assets/images/aq-logo.png";
import { Link } from "react-router-dom";
import { useAuthenticator } from "@aws-amplify/ui-react";
import { AlgoQuant } from "algoquant/lib/AlgoQuant";
const Navbar = () => {
  const { user, signOut } = useAuthenticator((context) => [context.user]);

  const [balance, setBalance] = useState(0);

  const AlgoQuantObj = new AlgoQuant();
  AlgoQuantObj.getUser(user?.signInUserSession?.accessToken?.jwtToken).then(
    (resp) => {
      console.log(resp);
      setBalance(resp.data.buying_power);
    }
  );
  return (
    <nav className="fixed top-0 w-full z-50 px-4 py-2 bg-dark-gray border-gray-300 shadow">
      <div className="container flex flex-wrap justify-between items-center mx-auto">
        <Link to="/" className="flex items-center">
          <img src={aqLogo} className="mr-3 h-6 sm:h-9" alt="AlgoQuant Logo" />
        </Link>
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
            <li>
              <a>{balance}</a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
