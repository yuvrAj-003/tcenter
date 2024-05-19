import React, { useEffect, useState } from "react";
import MyContext from "./myContext";

import { db } from "../Firebase/config";
import {
  collection,
  onSnapshot,
  orderBy,
  query,
  where,
} from "firebase/firestore";
import { useCart } from "../hooks/useCart";

function myState({ children }) {
  const { getCartItems } = useCart();
  const users = localStorage.getItem("users");
  const [sumPriceCart, setSumPriceCart] = useState(0);
  const [loading, setLoading] = useState(false);
  const [getCustomizedData, setCustomizedData] = useState([]);
  const [getProductData, setProductData] = useState([]);

  const [getOrderData, setOrderData] = useState([]);

  const getData = async (coll, setData) => {
    try {
      setLoading(true);
      const q = query(collection(db, coll), orderBy("time"));
      const data = onSnapshot(q, (querySnapShot) => {
        const arr = [];
        querySnapShot.forEach((doc) => {
          arr.push({ ...doc.data(), id: doc.id });
        });
        setData(arr);
        setLoading(false);
      });
      return () => data;
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    getData("products", setProductData);
    getData("order", setOrderData);
    getData("customize", setCustomizedData);
  }, []);

  useEffect(() => {
    localStorage.setItem(
      "customize",
      JSON.stringify(Object.values({ ...getCustomizedData, uid: users?.uid }))
    );
  }, [getCustomizedData]);

  return (
    <MyContext.Provider
      value={{
        loading,
        setLoading,
        getProductData,
        sumPriceCart,
        setSumPriceCart,
        getOrderData,
        getCustomizedData,
      }}
    >
      {children}
    </MyContext.Provider>
  );
}

export default myState;
