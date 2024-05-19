import ProductCardDisplay from "../ProductCardDisplay";
import { useContext } from "react";
import myContext from "../../Context/myContext";
import Loader from "../Loader";
// productData

function HomePageProduct({ title, productData, limit = 100 }) {
  const context = useContext(myContext);
  const { loading } = context;

  return (
    <div className="my-10 h-full">
      {/* Heading  */}
      <div>
        <h1 className=" text-center mb-5 text-2xl font-semibold">{title}</h1>
      </div>

      {/* main  */}
      <Loader />
      <section className="text-gray-600 body-font">
        <div className="container px-5 py-5 mx-auto">
          {productData.length > 0 ? (
            <div className="flex flex-wrap -m-4">
              {productData.map((item, index) => {
                return (
                  index < limit && (
                    <ProductCardDisplay
                      key={index}
                      title={item.title}
                      image={item.productImageUrl}
                      price={item.price}
                      id={item.id}
                    />
                  )
                );
              })}
            </div>
          ) : (
            <div className="flex justify-center my-5">
              <img
                className="w-20"
                src="https://cdn-icons-png.flaticon.com/128/10437/10437090.png"
                alt="img"
              />
            </div>
          )}
        </div>
      </section>
    </div>
  );
}

export default HomePageProduct;
