import React, { useState } from "react";
import { encode } from "html-entities";

import { useNavigate } from "react-router-dom";

import { useContext } from "react";
import myContext from "../../Context/myContext";

function Search() {
  const context = useContext(myContext);
  const { getProductData } = context;
  const navigate = useNavigate();

  const [search, setSearch] = useState("");

  // getProductData.forEach((v) => {
  //   setSearchData((prev) => setSearchData([...prev, v]));
  // });
  const filteredData = getProductData
    .filter((obj) => {
      return (
        obj.title.toLowerCase().includes(search.toLowerCase()) ||
        obj.price.toLowerCase().includes(search.toLowerCase())
      );
    })
    .slice(0, 8);

  return (
    <div className="search w-full lg::w-fit relative">
      <input
        label="Search"
        placeholder="Search"
        className="w-full search-input h-8 rounded-md px-3 shadow-md outline-black"
        onChange={(e) =>
          setSearch(encode(e.target.value, { mode: "nonAsciiPrintable" }))
        }
        onKeyDown={(e) => {
          e.key == "Enter" && navigate(`/search/${e.target.value}`);
        }}
      />
      {search && (
        <div className="h-72 z-10 w-full bg-white rounded-sm shadow-md absolute px-1 overflow-y-auto overflow-x-hidden">
          {filteredData.length > 0 ? (
            <div className="box-border">
              {filteredData.map((item, index) => (
                <div
                  key={index}
                  className="m-3 flex  justify-between items-center cursor-pointer hover:opacity-70 transition-all duration-75"
                  onClick={() => {
                    navigate(`/search/${item.title}`);
                  }}
                >
                  <p className="px-2">{item.title}</p>
                  <p className="px-2">₹ {item.price}</p>
                </div>
              ))}
            </div>
          ) : (
            <div className="flex justify-center my-5">
              <img
                className="w-20"
                src="https://cdn-icons-png.flaticon.com/128/10437/10437090.png"
                alt="img"
              />
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default Search;
