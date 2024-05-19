import React from "react";
import Layout from "../../Components/Layout";
import HomePageProduct from "../../Components/HomePageProduct";
import { useContext } from "react";
import myContext from "../../Context/myContext";
function AllProducts() {
  const context = useContext(myContext);
  const { getProductData } = context;
  return (
    <Layout>
      <HomePageProduct title="All Products" productData={getProductData} />
    </Layout>
  );
}

export default AllProducts;
