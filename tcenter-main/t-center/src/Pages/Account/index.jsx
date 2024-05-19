import Layout from "../../Components/Layout";
import UserDetails from "../../Components/UserDetails";
import OrderInvoice from "../../Components/OrderInvoice";
import CustomizeOrderInvoice from "../../Components/CustomizeOrderInvoice";
const products = [
  {
    id: 1,
    name: "Nike Air Force 1 07 LV8",
    imageSrc:
      "https://static.nike.com/a/images/c_limit,w_592,f_auto/t_product_v1/54a510de-a406-41b2-8d62-7f8c587c9a7e/air-force-1-07-lv8-shoes-9KwrSk.png",
    href: "#",
    price: "₹61,999",
    color: "Orange",
    imageAlt: "Nike Air Force 1 07 LV8",
    quantity: 1,
  },
];

function Account() {
  const user = JSON.parse(localStorage.getItem("users"));
  return (
    <Layout>
      <div className=" container mx-auto px-4 py-5 lg:py-8 h-full">
        {/* Top  */}
        <UserDetails name={user?.name} email={user?.email} role={user?.role} />

        {/* bottom  */}
        <OrderInvoice products={products} />
        <CustomizeOrderInvoice />
      </div>
    </Layout>
  );
}

export default Account;
