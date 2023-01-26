import { React } from "react";
import aqLogo from "../../assets/images/aq-logo.png";
import { Link } from "react-router-dom";
import { useAuthenticator } from "@aws-amplify/ui-react";
import Searchbar from "./SearchBar";

const Navbar = () => {
  const { signOut } = useAuthenticator((context) => [context.user]);

  return (
    // Big nav div
    <nav className="flex top-0 bg-dark-gray border-gray-300 shadow-md">
      {/* div for logo */}
      <div className="flex flex-1 justify-between items-center bg-dark-gray">
        <Link to="/" className="">
          <img src={aqLogo} className="ml-3 h-10" alt="AlgoQuant Logo" />
        </Link>
      </div>
      {/* div for search */}
      <div className="flex flex-1 justify-center items-center ">
        <Searchbar />
      </div>
      {/* div for my profile button */}
      <div className="flex-1 flex justify-end bg-dark-gray">
        <ul className="flex flex-row p-4">
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
    </nav>
  );
};

export default Navbar;
