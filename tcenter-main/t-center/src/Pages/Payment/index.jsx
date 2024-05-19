import React, { useState } from "react";
import toast from "react-hot-toast";
import Loader from "../../Components/Loader";
import { useContext } from "react";
import myContext from "../../Context/myContext";
import { useCart } from "../../hooks/useCart";
import { db } from "../../Firebase/config";
import { Timestamp, addDoc, collection } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import { encode } from "html-entities";

function Payment() {
  const navigate = useNavigate();
  const context = useContext(myContext);
  const { sumPriceCart, setLoading } = context;

  const { getCartItems } = useCart();

  const userData = JSON.parse(localStorage.getItem("users"));
  const [order, setOrder] = useState({
    name: "",
    address: "",
    phone: "",
    amount: "",
    products: "",
    date: "",
    time: "",
    uid: "",
  });

  const setOrderModule = async () => {
    if (order.phone.length > 10 && order.phone.length < 1) {
      toast.error("Invalid fields");
      return;
    }
    if (order.name === "" || order.address === "" || order.phone === "") {
      toast.error("Invalid fields");
      return;
    }

    setLoading(true);
    let arr = [];
    try {
      getCartItems().forEach((v, i) => {
        let orderDetails = {
          name: order.name,
          address: order.address,
          phone: order.phone,
          product: v.title,
          productImage: v.productImageUrl,
          amount: v.price,
          uid: userData?.uid,
          time: Timestamp.now(),
          date: new Date().toLocaleString("en-US", {
            month: "short",
            day: "2-digit",
            year: "numeric",
          }),
        };
        const orderReference = collection(db, "order");
        addDoc(orderReference, orderDetails);
        arr.push(orderDetails);

        setOrder({
          name: "",
          address: "",
          phone: "",
          amount: "",
          products: "",
          date: "",
          time: "",
        });
      });

      localStorage.setItem("order", JSON.stringify(arr));

      toast.success("order successfully placed");
      setLoading(false);
      navigate("/");
    } catch (error) {
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
              Buy now
            </h2>
          </div>

          {/* Name */}
          <div className="mb-3">
            <input
              type="text"
              placeholder="Full Name"
              className=" px-2 py-2 w-full rounded-md outline-none shadow-md"
              onChange={(e) => {
                setOrder({
                  ...order,
                  name: encode(e.target.value, { mode: "nonAsciiPrintable" }),
                });
              }}
            />
          </div>

          {/* Address  */}
          <div className="mb-5">
            <input
              type="text"
              placeholder="Address"
              className="shadow-md px-2 py-2 w-full rounded-md outline-none "
              onChange={(e) => {
                setOrder({
                  ...order,
                  address: encode(e.target.value, {
                    mode: "nonAsciiPrintable",
                  }),
                });
              }}
            />
          </div>

          {/* phone number */}
          <div className="mb-5">
            <input
              type="text"
              placeholder="Phone Number"
              className="shadow-md px-2 py-2 w-full rounded-md outline-none "
              onChange={(e) => {
                setOrder({
                  ...order,
                  phone: encode(e.target.value, { mode: "nonAsciiPrintable" }),
                });
              }}
            />
          </div>

          {/* Pay Button  */}
          <div className="mb-5">
            <button
              type="button"
              className="bg-yellow-400 shadow-md hover:bg-yellow-600 w-full text-black text-center py-2 font-bold rounded-md "
              onClick={setOrderModule}
            >
              Order (₹{sumPriceCart})
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default Payment;
