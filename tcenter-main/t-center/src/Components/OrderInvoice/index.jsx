import { onSnapshot, doc, query, where, collection } from "firebase/firestore";
import { db, auth } from "../../Firebase/config";
import React, { useEffect, useState } from "react";
import { useContext } from "react";
import myContext from "../../Context/myContext";
import { Trash } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { plain } from "../../Assets";

function OrderInvoice() {
  const userData = JSON.parse(localStorage.getItem("users"));
  const productData = JSON.parse(localStorage.getItem("order"));

  const [isLoaded, setIsLoaded] = useState(false);

  const checkUser =
    productData && productData.some((item) => item.uid == userData.uid);
  const products = checkUser && productData;
  const navigate = useNavigate();
  return (
    <div className="bottom">
      {/* main 1 */}
      <div className="mx-auto my-4 max-w-6xl px-2 md:my-6 md:px-0">
        {/* text  */}
        <h2 className=" text-xl lg:text-2xl font-bold">Order Details</h2>

        {/* main 2 */}
        {products && (
          <div className="mt-5 flex flex-col overflow-hidden rounded-xl shadow-md md:flex-row">
            {/* right  */}
            <div className="flex-1">
              <div
                className="px-10 py-5 flex cursor-pointer"
                onClick={() => {
                  localStorage.removeItem("order");
                  navigate("/");
                  setTimeout(() => navigate("/user"), 500);
                }}
              >
                <Trash size={20} />
                &nbsp;Delete
              </div>
              <div className="p-8">
                <ul className="-my-7 divide-y divide-gray-200">
                  {products &&
                    products.map((product, index) => (
                      <li
                        key={index}
                        className="flex flex-col justify-between space-x-5 py-7 md:flex-row"
                      >
                        <div className="flex flex-1 items-stretch">
                          <div className="flex-shrink-0">
                            <center>
                              {!isLoaded && (
                                <img width={80} height={80} src={plain} />
                              )}

                              <img
                                width={80}
                                height={80}
                                src={product?.productImage}
                                alt="shirt"
                                onLoad={() => {
                                  setIsLoaded(true);
                                }}
                              />
                            </center>
                          </div>

                          <div className="ml-5 flex flex-col justify-between">
                            <div className="flex-1">
                              <p className="text-sm font-bold text-gray-900">
                                {product?.product}
                              </p>

                              <p className="text-sm font-bold text-gray-900">
                                {product?.date}
                              </p>
                              <p className="text-sm font-bold text-green-300">
                                {product && "Arriving in 1 day"}
                              </p>
                            </div>
                          </div>
                        </div>

                        <div className="ml-auto flex flex-col items-end justify-between">
                          <p className="text-right text-sm font-bold text-gray-900">
                            ₹ {product?.amount}
                          </p>
                        </div>
                      </li>
                    ))}
                </ul>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default OrderInvoice;
