import { AiFillAlert, AiOutlineClose } from "react-icons/ai";
const Banner = ({
  message = "Big news! Algoquant is a fortune 500 company! ",
}) => {
  return (
    <div className="bg-green">
      <div className="mx-auto max-w-7xl py-3 px-3 sm:px-6 lg:px-8">
        <div className="flex flex-wrap items-center justify-between">
          <div className="flex w-0 flex-1 items-center">
            <span className="flex rounded-lg bg-indigo-800 p-2">
              <AiFillAlert className="h-6 w-6 text-white" aria-hidden="true" />
            </span>
            <p className="ml-3 truncate font-medium text-white">
              <span className="md:hidden">We announced a new product!</span>
              <span className="hidden md:inline">{message}</span>
            </p>
          </div>
          <div className="order-3 mt-2 w-full flex-shrink-0 sm:order-2 sm:mt-0 sm:w-auto">
            <a
              href="#"
              className="flex items-center justify-center rounded-md   bg-faded-dark-gray hover:bg-dark-gray px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-50"
            >
              Learn more
            </a>
          </div>
          <div className="order-2 flex-shrink-0 sm:order-3 sm:ml-3">
            <button
              type="button"
              className="-mr-1 flex rounded-md p-2 hover:bg-faded-dark-gray focus:outline-none focus:ring-2 focus:ring-white sm:-mr-2"
            >
              <span className="sr-only">Dismiss</span>
              <AiOutlineClose
                className="h-6 w-6 text-white"
                aria-hidden="true"
              />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Banner;
