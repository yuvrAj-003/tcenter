import React from "react";
import Layout from "../../Components/Layout";
import HeroSection from "../../Components/HeroSection";
import Category from "../../Components/Category";
import HomePageProduct from "../../Components/HomePageProduct";
import { useContext } from "react";
import myContext from "../../Context/myContext";
// import Track from '../../Components/Track';

// import { useContext } from 'react';
// import myContext from '../../Context/myContext';
function Home() {
  const context = useContext(myContext);
  const { getProductData } = context;
  return (
    <Layout>
      <HeroSection />
      <Category />
      <HomePageProduct
        title="Top Products"
        productData={getProductData}
        limit={5}
      />
      {/* <Track /> */}
    </Layout>
  );
}

export default Home;
