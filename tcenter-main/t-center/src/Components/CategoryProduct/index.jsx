import React from "react";
import { useNavigate } from "react-router-dom";
function CategoryProduct({ index, img, name }) {
  const navigate = useNavigate();
  return (
    <div className="flex flex-col items-center">
      <div
        className="w-16 h-16 lg:w-24 lg:h-24 max-w-xs rounded-full  bg-yellow-400 transition-all hover:bg-yellow-400 cursor-pointer mb-1 flex items-center justify-center"
        onClick={() => {
          navigate(`/search/${name}`);
        }}
      >
        <img src={img} className="w-16 h-16 lg:w-16 lg:h-16" />
      </div>
      <p className="text-xs font-bold text-center w-fit">{name}</p>
    </div>
  );
}

export default CategoryProduct;
