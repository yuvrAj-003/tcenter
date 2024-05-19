/* eslint-disable react/no-unescaped-entities */
import Loader from "../../../Components/Loader";
import { useState } from "react";
import { Link } from "react-router-dom";

import { auth, db } from "../../../Firebase/config";
import { Timestamp, addDoc, collection } from "firebase/firestore";

import { createUserWithEmailAndPassword } from "firebase/auth";
import toast from "react-hot-toast";

import { useContext } from "react";
import myContext from "../../../Context/myContext";

import { useNavigate } from "react-router-dom";

import { encode } from "html-entities";
function Register() {
  const navigate = useNavigate();

  const context = useContext(myContext);
  const { loading, setLoading } = context;

  const [userSignup, setUserSignup] = useState({
    name: "",
    email: "",
    password: "",
    role: "user",
  });

  const userSignUpModule = async () => {
    if (
      userSignup.name === "" ||
      userSignup.email === "" ||
      userSignup.password === ""
    ) {
      toast.error("All Fields are required");
    }

    setLoading(true);

    try {
      const users = await createUserWithEmailAndPassword(
        auth,
        userSignup.email,
        userSignup.password
      );
      const user = {
        name: userSignup.name,
        email: users.user.email,
        uid: users.user.uid,
        role: userSignup.role,
        time: Timestamp.now(),
        date: new Date().toLocaleString("en-US", {
          month: "short",
          day: "2-digit",
          year: "numeric",
        }),
      };
      const userReference = collection(db, "user");
      addDoc(userReference, user);
      localStorage.setItem("users", JSON.stringify(user));
      setUserSignup({
        name: "",
        email: "",
        password: "",
      });

      toast.success("sign up successfully");
      setLoading(false);
      navigate("/");
    } catch (e) {
      toast.error("error incurred");
      setLoading(false);
      console.log(error);
    }
  };

  return (
    <>
      <Loader />
      <div className="flex justify-center items-center h-screen">
        {/* Login Form  */}
        <div className="login_Form bg-yellow-200 w-5/6 lg:w-1/4 lg:px-8 p-6 rounded-xl shadow-md">
          {/* Top Heading  */}
          <div className="mb-5">
            <h2 className="text-center text-2xl font-bold text-black ">
              Signup
            </h2>
          </div>

          {/* Input One  */}
          <div className="mb-3">
            <input
              type="text"
              placeholder="Full Name"
              className=" px-2 py-2 w-full rounded-md outline-none shadow-md"
              onChange={(e) => {
                setUserSignup({
                  ...userSignup,
                  name: encode(e.target.value, { mode: "nonAsciiPrintable" }),
                });
              }}
            />
          </div>

          {/* email  */}
          <div className="mb-3">
            <input
              type="email"
              placeholder="Email Address"
              className="shadow-md px-2 py-2 w-full rounded-md outline-none"
              onChange={(e) => {
                setUserSignup({
                  ...userSignup,
                  email: encode(e.target.value, { mode: "nonAsciiPrintable" }),
                });
              }}
            />
          </div>

          {/* password  */}
          <div className="mb-5">
            <input
              type="password"
              placeholder="Password"
              className="shadow-md px-2 py-2 w-full rounded-md outline-none "
              onChange={(e) => {
                setUserSignup({
                  ...userSignup,
                  password: encode(e.target.value, {
                    mode: "nonAsciiPrintable",
                  }),
                });
              }}
            />
          </div>

          {/* Register Button  */}
          <div className="mb-5">
            <button
              type="button"
              className="bg-yellow-400 shadow-md hover:bg-yellow-600 w-full text-black text-center py-2 font-bold rounded-md "
              onClick={userSignUpModule}
            >
              Register
            </button>
          </div>

          <div>
            <h2 className="text-black">
              Have an account{" "}
              <Link className=" text-pink-500 font-bold" to={"/login"}>
                Login
              </Link>
            </h2>
          </div>
        </div>
      </div>
    </>
  );
}

export default Register;
