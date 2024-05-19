import Navbar from "../NavBar";
import Footer from "../Footer";
import React from "react";

function Layout({ children }) {
  return (
    <div>
      <Navbar />
      <div className="main-container">{children}</div>
      <Footer />
    </div>
  );
}

export default Layout;
