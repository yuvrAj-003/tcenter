import React, { useEffect, useState } from "react";
import UserDetails from "../../Components/UserDetails";
import AdminTab from "../../Components/Admin/AdminTab";

import { ShoppingCart, List, Shirt } from "lucide-react";
import { Tabs, TabList, Tab, TabPanel } from "react-tabs";

import { Link } from "react-router-dom";

import TotalProducts from "../../Components/Admin/TotalProducts";
import TotalOrders from "../../Components/Admin/TotalOrders";
import CustomizeOrders from "../../Components/Admin/CustomizeOrders";

function Admin() {
  const user = JSON.parse(localStorage.getItem("users"));

  return (
    <div className="p-5">
      <Link
        onClick={() => {
          localStorage.removeItem("users");
          toast.success("logout successful");
        }}
        to={"/"}
        className="flex w-full justify-end"
      >
        <button
          type="button"
          className="shadow-md inline-block px-4 bg-yellow-400 text-black hover:bg-yellow-600 text-center py-2 font-bold rounded-md "
        >
          Sign Out
        </button>
      </Link>
      <br />
      <UserDetails name={user?.name} email={user?.email} role={user?.role} />
      <br />
      <Tabs>
        <TabList className="flex">
          <Tab className="w-full">
            <AdminTab>
              <ShoppingCart />
              <h1>Total Products</h1>
            </AdminTab>
          </Tab>
          <Tab className="ms-3 w-full">
            <AdminTab>
              <List />
              <h1>Orders</h1>
            </AdminTab>
          </Tab>
          <Tab className="ms-3 w-full">
            <AdminTab>
              <Shirt />
              <h1>Customized Orders</h1>
            </AdminTab>
          </Tab>
        </TabList>

        <TabPanel>
          <TotalProducts />
        </TabPanel>

        <TabPanel>
          <TotalOrders />
        </TabPanel>
        <TabPanel>
          <CustomizeOrders />
        </TabPanel>
      </Tabs>
    </div>
  );
}

export default Admin;
