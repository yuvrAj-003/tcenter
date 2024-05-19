import React, { useState } from "react";
import state from "../config/store";
import { useSnapshot } from "valtio";
import { db } from "../config/config";
import { Timestamp, collection, addDoc, updateDoc } from "firebase/firestore";
import { encode } from "html-entities";
function Payment() {
  const snap = useSnapshot(state);

  const userData = JSON.parse(localStorage.getItem("userId"));
  const [customizeInfo, setCustomizeInfo] = useState({
    name: "",
    phone: "",
    address: "",
  });

  const orderNow = async () => {
    if (
      customizeInfo.name === "" ||
      customizeInfo.phone === "" ||
      customizeInfo.phone.length != 10 ||
      customizeInfo.address === ""
    ) {
      state.error = { exists: true, name: "invalid fields" };
      setTimeout(() => {
        state.error.exists = false;
      }, 500);
      console.log(customizeInfo.phone.length);
      return;
    }
    state.isLoading = true;
    try {
      let customizeDetails = {
        name: customizeInfo.name,
        phone: customizeInfo.phone,
        address: customizeInfo.address,
        productPrint: snap.texture,
        texture: snap.texture,
        color: snap.color,
        uid: userData.uid,
        rotation: snap.rotation.join(" "),
        position: snap.position.join(" "),
        range: snap.range.join(" "),
        time: Timestamp.now(),
        price: "5999",
        product:
          "Customized item " +
          new Date().toLocaleString("en-US", {
            month: "short",
            day: "2-digit",
            year: "numeric",
          }),
        date: new Date().toLocaleString("en-US", {
          month: "short",
          day: "2-digit",
          year: "numeric",
        }),
      };
      const customizeReference = collection(db, "customize");
      state.success = { exists: true, name: "Order placed" };
      await addDoc(customizeReference, customizeDetails);

      setCustomizeInfo({
        name: "",
        phone: "",
        address: "",
      });
      state.isLoading = false;
      window.location.href = "http://localhost:5173/user";
      // navigate("/");
    } catch (error) {
      state.isLoading = false;
      console.log(error);
    }
  };
  return (
    <div className="flex justify-center items-center h-screen">
      {/* Login Form  */}
      <div className="login_Form bg-yellow-200 w-5/6 lg:w-1/4 lg:px-8 p-6 rounded-xl shadow-md">
        {/* Top Heading  */}
        <div className="mb-5">
          <h2 className="text-center text-2xl font-bold text-black ">
            Order Now
          </h2>
        </div>

        {/* Name */}
        <div className="mb-3">
          <input
            type="text"
            placeholder="Full Name"
            className=" px-2 py-2 w-full rounded-md outline-none shadow-md"
            onChange={(e) => {
              setCustomizeInfo({
                ...customizeInfo,
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
              setCustomizeInfo({
                ...customizeInfo,
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
              setCustomizeInfo({
                ...customizeInfo,
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
            onClick={orderNow}
          >
            Order Now (₹5999)
          </button>
        </div>
      </div>
    </div>
  );
}

export default Payment;
