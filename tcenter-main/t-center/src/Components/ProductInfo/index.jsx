import React, { useEffect, useState } from "react";
import { scrollUp } from "../../hooks/useScroll";
import { getDoc, doc } from "firebase/firestore";
import { db } from "../../Firebase/config";
import { useParams } from "react-router-dom";
import { plain } from "../../Assets";
import { useContext } from "react";
import myContext from "../../Context/myContext";
import Loader from "../Loader";
import { useCart } from "../../hooks/useCart";
import toast from "react-hot-toast";
function ProductInfo() {
  scrollUp();

  const { addItemToCart } = useCart();
  const context = useContext(myContext);

  const { setLoading } = context;
  const [productData, setProductData] = useState({});
  const [isLoaded, setIsLoaded] = useState(false);
  const { id } = useParams();

  const getData = async () => {
    setLoading(true);
    const productRef = doc(db, "products", id);
    const docSnap = await getDoc(productRef);

    const data = docSnap.data();
    setProductData(data);
    setLoading(false);
  };

  const userData = JSON.parse(localStorage.getItem("users"));
  useEffect(() => {
    getData();
  }, []);
  return (
    <section className="py-5 lg:py-16 font-poppins dark:bg-gray-800 h-full">
      <Loader />
      {productData !== undefined ? (
        <div className="max-w-6xl px-4 mx-auto">
          <div className="flex flex-wrap mb-24 -mx-4">
            <div className="w-full px-4 mb-8 md:w-1/2 md:mb-0">
              <div className="">
                <div className="">
                  {!isLoaded && (
                    <img className="w-full rounded-lg" src={plain} />
                  )}
                  <img
                    className="w-full rounded-lg"
                    src={productData?.productImageUrl}
                    alt=""
                    onLoad={() => {
                      setIsLoaded(true);
                    }}
                  />
                </div>
              </div>
            </div>
            <div className="w-full px-4 md:w-1/2">
              <div className="lg:pl-20 h-full flex flex-col">
                <div className="mb-6">
                  <h2 className="max-w-xl mb-6 text-xl font-semibold leading-loose tracking-wide text-gray-700 md:text-2xl dark:text-gray-300">
                    {productData?.title}
                  </h2>

                  <p className="inline-block text-2xl font-semibold text-gray-700 dark:text-gray-400 ">
                    <span>Rs.{productData?.price}</span>
                  </p>
                </div>
                <div>
                  <h2 className="mb-2 text-lg font-bold text-gray-700 dark:text-gray-400">
                    Description :
                  </h2>
                  <p>{productData?.description}</p>
                </div>

                <br />
                <br />
                <div className="flex flex-wrap items-center mb-6">
                  <button
                    className="w-full px-4 py-3 text-center text-black bg-yellow-300 border hover:bg-yellow-400 hover:text-gray-100 rounded-xl"
                    onClick={() => {
                      try {
                        addItemToCart({
                          ...productData,
                          uid: userData?.uid,
                          id: id,
                        });
                        toast.success("Added to cart");
                      } catch (e) {
                        toast.error(e.message);
                      }
                    }}
                  >
                    Add to cart
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="flex flex-col justify-center my-5 h-full items-center">
          <img
            className="w-30 h-[100px]"
            src="https://cdn-icons-png.flaticon.com/128/10437/10437090.png"
            alt="img"
          />
          <br />
          <br />
          <h1 className="text-xl font-bold">No Page Found</h1>
        </div>
      )}
    </section>
  );
}

export default ProductInfo;
