import React from "react";

function AdminTab({ children, style }) {
  return (
    <div
      className={`h-48 text-center flex flex-col justify-center items-center rounded-xl bg-yellow-300 shadow-md hover:bg-yellow-200 cursor-pointer ${style}`}
    >
      {children}
    </div>
  );
}

export default AdminTab;
