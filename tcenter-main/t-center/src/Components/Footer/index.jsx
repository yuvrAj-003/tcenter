import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <div>
      {/* footer  */}
      <br />
      <br />
      <footer className="text-black body-font bg-yellow-400 fixed bottom-0 w-full mt-2">
        {/* main  */}
        <div className="container px-5 py-5 mx-auto flex items-center sm:flex-row flex-col">
          {/* logo  */}
          <a className="flex title-font font-medium items-center md:justify-start justify-center text-black">
            <span className="text-xl font-bold">T-Center</span>
          </a>
          {/* para  */}
          <p className="text-sm text-black sm:ml-4 sm:pl-4 sm:border-l-2 sm:border-black sm:py-2 sm:mt-0 mt-4">
            <Link
              to={"/"}
              className="text-black ml-1"
              rel="noopener noreferrer"
              target="_blank"
            >
              © 2024 tcenter
            </Link>
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Footer;
