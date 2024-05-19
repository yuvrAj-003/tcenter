import Layout from "../../Components/Layout";
import CartItem from "../../Components/CartItem";
import OrderCard from "../../Components/OrderCard";
import { useCart } from "../../hooks/useCart";

// {name, imageSrc, href , size , originalPrice, price

const Cart = () => {
  const { getCartItems } = useCart();
  const products = getCartItems();
  return (
    <Layout>
      <div className="container mx-auto px-4 max-w-7xl lg:px-0 h-full">
        <div className="mx-auto max-w-2xl py-8 lg:max-w-7xl">
          <h1 className="text-3xl text-center lg:text-left font-bold tracking-tight text-gray-900 sm:text-4xl">
            Shopping Cart
          </h1>
          <form className="mt-12 lg:grid lg:grid-cols-12 lg:items-start lg:gap-x-12 xl:gap-x-16">
            <section
              aria-labelledby="cart-heading"
              className="rounded-lg bg-white lg:col-span-8"
            >
              <h2 id="cart-heading" className="sr-only">
                Items in your shopping cart
              </h2>
              <ul role="list" className="divide-y divide-gray-200">
                {products &&
                  products.map((product, index) => (
                    <CartItem
                      key={index}
                      name={product.title}
                      imageSrc={product.productImageUrl}
                      price={product.price}
                      id={product.id}
                    />
                  ))}
              </ul>
            </section>
            {/* Order summary */}
            <OrderCard dc={0} />
          </form>
        </div>
      </div>
    </Layout>
  );
};

export default Cart;
