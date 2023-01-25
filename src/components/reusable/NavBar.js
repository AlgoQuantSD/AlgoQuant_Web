import { React } from "react";
import aqLogo from "../../assets/images/aq-logo.png";
import { Link } from "react-router-dom";
import { useAuthenticator } from "@aws-amplify/ui-react";

const Navbar = () => {
  const { signOut } = useAuthenticator((context) => [context.user]);

  return (
    <nav className="fixed top-0 w-full bg-dark-gray border-gray-300 shadow">
      <div className="flex justify-between items-center">
        <Link to="/" className="">
          <img src={aqLogo} className="ml-3 h-10" alt="AlgoQuant Logo" />
        </Link>
        <div className="">
          <ul className="flex flex-row p-4 bg-gray-50 rounded-lg    ">
            <li>
              <Link
                to="/profile"
                className="flex py-2 pr-4 pl-3 text-green rounded hover:bg-gray-100"
              >
                My Profile
              </Link>
            </li>
            <li>
              <button
                className="flex py-2 pr-4 pl-3 text-red rounded hover:bg-gray-100 "
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
