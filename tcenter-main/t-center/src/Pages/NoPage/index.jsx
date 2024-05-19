import React from "react";
import Layout from "../../Components/Layout";
function NoPage() {
  return (
    <Layout>
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
    </Layout>
  );
}

export default NoPage;
