import React, { useEffect, useState } from "react";
import { Trash } from "lucide-react";
import { plain } from "../../Assets";
import Loader from "../Loader";
import { useNavigate } from "react-router-dom";
function CustomizeOrderInvoice() {
  const navigate = useNavigate();
  const [isLoaded, setIsLoaded] = useState(false);
  const [getCustomizedData, setCustomizedData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const userData = JSON.parse(localStorage.getItem("users"));
        const customizeData =
          JSON.parse(localStorage.getItem("customize")) &&
          JSON.parse(localStorage.getItem("customize")).filter(
            (item) => item != null
          );
        const checkCustomizedData =
          customizeData &&
          customizeData.length > 0 &&
          customizeData.some((item) => item.uid === userData.uid);
        if (checkCustomizedData) {
          setCustomizedData(customizeData);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="mx-auto my-4 max-w-6xl px-2 md:my-6 md:px-0">
      <Loader />
      <div>
        <div className="py-5 flex justify-between">
          {/* text  */}
          <h1 className=" text-xl text-black font-bold">Customized Order</h1>
        </div>

        {/* table  */}
        <div className="w-full overflow-x-auto">
          <table className="w-full border border-collapse sm:border-separate border-pink-100 text-pink-400 text-center">
            <tbody>
              <tr className="text-pink-300">
                <th className="h-12 px-6 text-md transition duration-300 border-t border-l first:border-l-0 border-pink-100 stroke-slate-500 text-slate-500 ">
                  {"s.no"}
                </th>
                <th className="h-12 px-6 text-md transition duration-300 border-t border-l first:border-l-0 border-pink-100 stroke-slate-500 text-slate-500 first-letter:uppercase ">
                  {"name"}
                </th>
                <th className="h-12 px-6 text-md transition duration-300 border-t border-l first:border-l-0 border-pink-100 stroke-slate-500 text-slate-500 text-red-500 cursor-pointer ">
                  {"product name"}
                </th>

                <th className="h-12 px-6 text-md transition duration-300 border-t border-l first:border-l-0 border-pink-100 stroke-slate-500 text-slate-500 text-red-500 cursor-pointer ">
                  {"print image"}
                </th>

                {/* <th className="h-12 px-6 text-md transition duration-300 border-t border-l first:border-l-0 border-pink-100 stroke-slate-500 text-slate-500 text-red-500 cursor-pointer ">
                  {"product view link"}
                </th> */}

                <th className="h-12 px-6 text-md transition duration-300 border-t border-l first:border-l-0 border-pink-100 stroke-slate-500 text-slate-500 text-red-500 cursor-pointer ">
                  {"address"}
                </th>

                <th className="h-12 px-6 text-md transition duration-300 border-t border-l first:border-l-0 border-pink-100 stroke-slate-500 text-slate-500 text-red-500 cursor-pointer ">
                  {"phone number"}
                </th>

                <th className="h-12 px-6 text-md transition duration-300 border-t border-l first:border-l-0 border-pink-100 stroke-slate-500 text-slate-500 text-red-500 cursor-pointer ">
                  {"status"}
                </th>
              </tr>

              {getCustomizedData &&
                getCustomizedData.map((v, i) => (
                  <tr className="text-pink-300" key={i}>
                    <td className="h-12 p-6 text-md transition duration-300 border-t border-l first:border-l-0 border-pink-100 stroke-slate-500 text-slate-500 ">
                      {i + 1}.
                    </td>
                    <td className="h-12 p-6 text-md transition duration-300 border-t border-l first:border-l-0 border-pink-100 stroke-slate-500 text-slate-500 first-letter:uppercase ">
                      {v?.name}
                    </td>
                    <td className="h-12 p-6 text-md transition duration-300 border-t border-l first:border-l-0 border-pink-100 stroke-slate-500 text-slate-500 text-red-500 cursor-pointer ">
                      <a href={`http://localhost:5174/view/${v?.id}`}>
                        {v?.product}
                      </a>
                    </td>

                    <td className="h-12 p-6 text-md transition duration-300 border-t border-l first:border-l-0 border-pink-100 stroke-slate-500 text-slate-500 text-red-500 cursor-pointer ">
                      <center>
                        {!isLoaded && (
                          <img width={80} height={80} src={plain} />
                        )}

                        <img
                          width={80}
                          height={80}
                          src={v?.productPrint}
                          alt="shirt"
                          onLoad={() => {
                            setIsLoaded(true);
                          }}
                        />
                      </center>
                    </td>

                    {/* <td className="h-12 p-6 text-md transition duration-300 border-t border-l first:border-l-0 border-pink-100 stroke-slate-500 text-slate-500 text-red-500 cursor-pointer ">
                      <a href={`http://localhost:5174/view/${v?.id}`}>view</a>
                    </td> */}

                    <td className="h-12 p-6 text-md transition duration-300 border-t border-l first:border-l-0 border-pink-100 stroke-slate-500 text-slate-500 text-red-500 cursor-pointer ">
                      {v?.address}
                    </td>

                    <td className="h-12 p-6 text-md transition duration-300 border-t border-l first:border-l-0 border-pink-100 stroke-slate-500 text-slate-500 text-red-500 cursor-pointer ">
                      {v?.phone}
                    </td>

                    <td className="h-12 p-6 text-md transition duration-300 border-t border-l first:border-l-0 border-pink-100 stroke-slate-500 text-slate-500 text-green-500 cursor-pointer ">
                      {getCustomizedData && "Ariving in 2 days"}
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default CustomizeOrderInvoice;
