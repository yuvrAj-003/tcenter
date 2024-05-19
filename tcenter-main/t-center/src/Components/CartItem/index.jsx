import React, { useState } from "react";
import { Trash } from "lucide-react";
import { useCart } from "../../hooks/useCart";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { plain } from "../../Assets";
function CartItem(product) {
  const navigate = useNavigate();
  const { removeItemFromCart, sumPriceCart } = useCart();
  const [isLoaded, setIsLoaded] = useState(false);
  return (
    <div key={product.id} className="">
      <li className="flex py-6 sm:py-6 ">
        <div className="flex-shrink-0 w-24 h-24">
          <center>
            {!isLoaded && <img className="p-6" src={plain} />}

            <img
              className={`lg:w-80 ${!isLoaded && "hidden"}`}
              src={product?.imageSrc}
              alt="shirt"
              onLoad={() => {
                setIsLoaded(true);
              }}
            />
          </center>
        </div>

        <div className="ml-4 flex flex-1 flex-col justify-betweensm:ml-6">
          <div className="relative pr-9 sm:grid sm:grid-cols-2 sm:gap-x-6 sm:pr-0">
            <div>
              <div className="flex justify-between">
                <h3 className="text-sm">
                  <a href={product.href} className="font-semibold text-black">
                    {product.name}
                  </a>
                </h3>
              </div>
              <div className="mt-1 flex items-center">
                <p className="text-sm font-medium text-gray-900">
                  ₹ {product.price}
                </p>
                &nbsp; &nbsp;
                <button
                  type="button"
                  className="flex"
                  onClick={() => {
                    removeItemFromCart(product?.id);
                    toast.success("removed successfully");
                    navigate("/");
                    setTimeout(() => navigate("/cart"), 100);
                  }}
                >
                  <Trash size={12} className="text-red-500" />
                  <span className="text-xs font-medium text-red-500">
                    Remove
                  </span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </li>
    </div>
  );
}

export default CartItem;
