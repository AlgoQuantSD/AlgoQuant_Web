import { React } from "react";
import { useAuthenticator } from "@aws-amplify/ui-react";
import { Link } from "react-router-dom";
import aqLogo from "../../assets/images/aq-logo.png";
import Searchbar from "./SearchBar";

const Navbar = () => {
  const { signOut } = useAuthenticator((context) => [context.user]);

  return (
    // Big nav div
    <nav className="flex top-0 bg-cokewhite border-gray-300 shadow-sm">
      {/* div for logo */}
      <div className="flex flex-1 items-center bg-cokewhite">
        <Link to="/">
          <img src={aqLogo} className="ml-3 h-10" alt="AlgoQuant Logo" />
        </Link>
      </div>
      {/* div for search */}
      <div className="flex items-center">
        <Searchbar />
      </div>
      {/* div for my profile button */}
      <div className="flex-1 flex justify-end bg-cokewhite">
        <ul className="flex flex-row p-4">
          <li>
            <Link
              to="/profile"
              className="flex mx-auto py-2 px-5 text-cokewhite rounded-full bg-green hover:bg-gray-100"
            >
              My Profile
            </Link>
          </li>
          <li>
            <button
              className="flex mx-auto py-2 px-5 text-red rounded"
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
