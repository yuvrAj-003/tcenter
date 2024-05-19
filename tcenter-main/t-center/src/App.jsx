import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import React from "react";
import Home from "./Pages/Home";
import NoPage from "./Pages/NoPage";
import Product from "./Pages/Product";
import Cart from "./Pages/Cart";
import AllProducts from "./Pages/AllProducts";
import Login from "./Pages/Registration/Login";
import Register from "./Pages/Registration/Register";
import Account from "./Pages/Account";
import Admin from "./Pages/Admin";
import AddProduct from "./Pages/Admin/AddProduct";
import EditProduct from "./Pages/Admin/EditProduct";
import MyState from "./Context/myState";
import { Toaster } from "react-hot-toast";
import Payment from "./Pages/Payment";
import SearchProducts from "./Pages/SearchProducts";
import ProtectedRouteAdmin from "./Components/ProtectedRoute/ProtectedRouteAdmin";
import ProtectedRouteUser from "./Components/ProtectedRoute/ProtectedRouteUser";

function App() {
  return (
    <MyState>
      <Router>
        <Routes>
          {/* all  */}
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/" element={<Home />} />
          <Route path="/*" element={<NoPage />} />
          <Route path="/allproducts" element={<AllProducts />} />
          <Route path="/search/:items" element={<SearchProducts />} />
          <Route path="/product/:id" element={<Product />} />

          {/* users  */}
          <Route
            path="/cart"
            element={
              <ProtectedRouteUser>
                <Cart />
              </ProtectedRouteUser>
            }
          />

          <Route
            path="/payment"
            element={
              <ProtectedRouteUser>
                <Payment />
              </ProtectedRouteUser>
            }
          />

          <Route
            path="/user"
            element={
              <ProtectedRouteUser>
                <Account />
              </ProtectedRouteUser>
            }
          />

          {/* admin */}
          <Route
            path="/admin"
            element={
              <ProtectedRouteAdmin>
                <Admin />
              </ProtectedRouteAdmin>
            }
          />

          <Route
            path="/addProduct"
            element={
              <ProtectedRouteAdmin>
                <AddProduct />
              </ProtectedRouteAdmin>
            }
          />
          <Route
            path="/editProduct/:id"
            element={
              <ProtectedRouteAdmin>
                <EditProduct />
              </ProtectedRouteAdmin>
            }
          />
        </Routes>
      </Router>
      <Toaster />
    </MyState>
  );
}

export default App;
