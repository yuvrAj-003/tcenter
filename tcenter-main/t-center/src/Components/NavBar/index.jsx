import React from "react";
import { Link } from "react-router-dom";

import { User, ShoppingCart } from "lucide-react";

import { Collapse, Typography, IconButton } from "@material-tailwind/react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import Search from "../Search";
import toast from "react-hot-toast";
import { tcenter_logo } from "../../Assets";

function NavList() {
  const user = JSON.parse(localStorage.getItem("users"));
  return (
    <ul className="my-2 flex flex-col gap-2 lg:mb-0 lg:mt-0 lg:flex-row lg:items-center lg:gap-6">
      <Typography
        as="li"
        variant="small"
        color="blue-gray"
        className="p-1 font-bold"
      >
        <Search />
      </Typography>
      <Typography
        as="li"
        variant="small"
        color="blue-gray"
        className="p-1 font-bold"
      >
        <Link to={"/"}>Home</Link>
      </Typography>
      <Typography
        as="li"
        variant="small"
        color="blue-gray"
        className="p-1 font-bold"
      >
        <Link to={"/allproducts"}>Products</Link>
      </Typography>
      <Typography
        as="li"
        variant="small"
        color="blue-gray"
        className="p-1 font-bold"
      >
        <Link to={`http://localhost:5174/${user?.uid}`}>Customize</Link>
      </Typography>

      {!user && (
        <Typography
          as="li"
          variant="small"
          color="blue-gray"
          className="p-1 font-bold"
        >
          <Link to={"/register"} className="flex items-center">
            Sign up
          </Link>
        </Typography>
      )}

      {user && (
        <Typography
          as="li"
          variant="small"
          color="blue-gray"
          className="p-1 font-bold"
        >
          <Link
            onClick={() => {
              localStorage.removeItem("users");
              toast.success("logout successful");
            }}
            to={"/login"}
            className="flex items-center"
          >
            Sign out
          </Link>
        </Typography>
      )}

      <Typography
        as="li"
        variant="small"
        color="blue-gray"
        className="p-1 font-bold"
      >
        <Link to={"/cart"} className="flex items-center">
          <ShoppingCart /> <p className="lg:hidden ms-3">Cart</p>
        </Link>
      </Typography>

      {user && (
        <Typography
          as="li"
          variant="small"
          color="blue-gray"
          className="p-1 font-bold"
        >
          <Link
            to={user?.role == "user" ? "/user" : "/admin"}
            className="flex items-center"
          >
            <User />
            <p className="lg:hidden ms-3">Account</p>
          </Link>
        </Typography>
      )}
    </ul>
  );
}

function NavBar() {
  const [openNav, setOpenNav] = React.useState(false);

  const handleWindowResize = () =>
    window.innerWidth >= 960 && setOpenNav(false);

  React.useEffect(() => {
    window.addEventListener("resize", handleWindowResize);

    return () => {
      window.removeEventListener("resize", handleWindowResize);
    };
  }, []);

  return (
    <nav className="w-full shadow-md px-10 bg-yellow-400">
      <div className="flex items-center justify-between text-blue-gray-900">
        <Typography
          as="a"
          href="#"
          variant="h6"
          className="mr-4 cursor-pointer py-1.5 flex items-center"
        >
          <img src={tcenter_logo} width={50} height={50} />
          <p>T-CENTER</p>
        </Typography>
        <div className="hidden lg:block">
          <NavList />
        </div>
        <IconButton
          variant="text"
          className="ml-auto h-6 w-6 text-inherit hover:bg-transparent focus:bg-transparent active:bg-transparent lg:hidden"
          ripple={false}
          onClick={() => setOpenNav(!openNav)}
        >
          {openNav ? (
            <XMarkIcon className="h-6 w-6" strokeWidth={2} />
          ) : (
            <Bars3Icon className="h-6 w-6" strokeWidth={2} />
          )}
        </IconButton>
      </div>
      <Collapse open={openNav}>
        <NavList />
      </Collapse>
    </nav>
  );
}

export default NavBar;
