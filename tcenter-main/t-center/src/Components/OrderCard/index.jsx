import React, { useEffect } from "react";
import { useCart } from "../../hooks/useCart";
import { useContext } from "react";
import myContext from "../../Context/myContext";
import { useNavigate } from "react-router-dom";
function OrderCard(products) {
  const navigate = useNavigate();
  const { getCartItems } = useCart();

  const context = useContext(myContext);

  let { sumPriceCart, setSumPriceCart } = context;

  const totalAmount = getCartItems()
    ? getCartItems().length > 0
      ? getCartItems().reduce(
          (total, current) => total + Number(current.price),
          0
        )
      : 0
    : 0;

  useEffect(() => {
    setSumPriceCart(totalAmount);
  }, [totalAmount]);
  return (
    <div
      aria-labelledby="summary-heading"
      className="mt-16 rounded-md bg-white lg:col-span-4 lg:mt-0 lg:p-0"
    >
      <h2
        id="summary-heading"
        className=" border-b border-gray-200 px-4 py-3 text-lg font-medium text-gray-900 sm:p-4"
      >
        Price Detials
      </h2>
      <div>
        <dl className=" space-y-1 px-2 py-4">
          <div className="flex items-center justify-between">
            <dt className="text-sm text-gray-800">
              {totalAmount} ({getCartItems() ? getCartItems().length : 0} item)
            </dt>
            <dd className="text-sm font-medium text-gray-900">
              ₹ {totalAmount}
            </dd>
          </div>
          <div className="flex items-center justify-between py-4">
            <dt className="flex text-sm text-gray-800">
              <span>Delivery Charges</span>
            </dt>
            <dd className="text-sm font-medium text-green-700">
              {products.dc == 0 ? "Free" : products.dc}
            </dd>
          </div>
          <div className="flex items-center justify-between border-y border-dashed py-4 ">
            <dt className="text-base font-medium text-gray-900">
              Total Amount
            </dt>
            <dd className="text-base font-medium text-gray-900">
              ₹ {totalAmount}
            </dd>
          </div>
        </dl>
        <div className="px-2 pb-4 font-medium text-green-700">
          <div className="flex gap-4 mb-6">
            <button
              className="w-full px-4 py-3 text-center text-black bg-yellow-400 border border-transparent hover:border-yellow-100 rounded-xl"
              onClick={() => {
                if (sumPriceCart != 0) {
                  navigate("/payment");
                } else {
                  toast.error("no items in cart");
                }
              }}
            >
              Buy now
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default OrderCard;
