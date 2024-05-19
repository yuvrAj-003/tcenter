import React from "react";
import { useContext } from "react";
import { useParams } from "react-router-dom";
import myContext from "../../Context/myContext";
import HomePageProduct from "../../Components/HomePageProduct";
import { scrollUp } from "../../hooks/useScroll";

import Layout from "../../Components/Layout";
function SearchProducts() {
  scrollUp();
  let { items } = useParams();
  let context = useContext(myContext);
  const { getProductData } = context;
  const filteredData = getProductData
    .filter((obj) => {
      return (
        obj.title.toLowerCase().includes(items.toLowerCase()) ||
        obj.category.toLowerCase().includes(items.toLowerCase()) ||
        obj.price.toLowerCase().includes(items.toLowerCase())
      );
    })
    .slice(0, 8);
  return (
    <Layout>
      <HomePageProduct title="search results" productData={filteredData} />;
    </Layout>
  );
}

export default SearchProducts;
