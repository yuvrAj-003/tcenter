/* eslint-disable react/no-unescaped-entities */
import { Link } from "react-router-dom";
import { auth, db } from "../../../Firebase/config";
import { collection, onSnapshot, query, where } from "firebase/firestore";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useContext, useState } from "react";
import myContext from "../../../Context/myContext";
import { useNavigate } from "react-router-dom";
import Loader from "../../../Components/Loader";
import toast from "react-hot-toast";
import { encode } from "html-entities";
function Login() {
  const navigate = useNavigate();
  const context = useContext(myContext);
  const { loading, setLoading } = context;

  const [userLogin, setUserLogin] = useState({
    email: "",
    password: "",
  });
  const userLoginModule = async () => {
    setLoading(true);

    if (
      userLogin.name === "" ||
      userLogin.email === "" ||
      userLogin.password === ""
    ) {
      toast.error("All Fields are required");
    }

    try {
      const users = await signInWithEmailAndPassword(
        auth,
        userLogin.email,
        userLogin.password
      );

      const q = query(
        collection(db, "user"),
        where("uid", "==", users?.user?.uid)
      );
      const data = onSnapshot(q, (QuerySnapshot) => {
        let user;
        QuerySnapshot.forEach((doc) => (user = doc.data()));
        localStorage.setItem("users", JSON.stringify(user));
        setUserLogin({
          email: "",
          password: "",
        });

        toast.success("login successful");
        setLoading(false);

        if (user.role == "user") {
          navigate("/user");
          window.location.reload(false);
        } else {
          navigate("/admin");
          window.location.reload(false);
        }

        return () => data;
      });
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
        <div className="login_Form bg-yellow-200 w-5/6 lg:w-1/4 p-6 rounded-xl shadow-md">
          {/* Top Heading  */}
          <div className="mb-5">
            <h2 className="text-center text-2xl font-bold text-black ">
              Login
            </h2>
          </div>

          {/* email  */}
          <div className="mb-3">
            <input
              type="email"
              placeholder="Email Address"
              className="shadow-md px-2 py-2 w-full rounded-md outline-none"
              onChange={(e) => {
                setUserLogin({
                  ...userLogin,
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
              className="shadow-md px-2 py-2 w-full rounded-md outline-none"
              onChange={(e) => {
                setUserLogin({
                  ...userLogin,
                  password: encode(e.target.value, {
                    mode: "nonAsciiPrintable",
                  }),
                });
              }}
            />
          </div>

          {/* login Button  */}
          <div className="mb-5">
            <button
              type="button"
              className="shadow-md bg-yellow-400 text-black hover:bg-yellow-600 w-full text-center py-2 font-bold rounded-md "
              onClick={userLoginModule}
            >
              Login
            </button>
          </div>

          <div>
            <h2 className="text-black">
              Don't Have an account{" "}
              <Link className=" text-red-500 font-bold" to={"/register"}>
                Register
              </Link>
            </h2>
          </div>
        </div>
      </div>
    </>
  );
}

export default Login;
