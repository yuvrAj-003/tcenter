import { useContext, useState } from "react";
import myContext from "../../Context/myContext";
import Loader from "../Loader";
import toast from "react-hot-toast";
import { auth, db } from "../../Firebase/config";
import { deleteDoc, doc } from "firebase/firestore";
import { plain } from "../../Assets";
function TotalOrders() {
  const context = useContext(myContext);
  const { getOrderData, setLoading } = context;
  const [isLoaded, setIsLoaded] = useState(false);

  const handleDelete = async (item) => {
    try {
      setLoading(true);
      const itemRef = doc(db, "order", item);
      await deleteDoc(itemRef, item);
      toast.success("successfully deleted");
      setLoading(false);
    } catch (e) {
      console.log(e);
      setLoading(false);
      toast.error("Error incurred");
    }
  };
  // console.log(getOrderData);
  return (
    <div>
      <Loader />
      <div>
        <div className="py-5">
          {/* text  */}
          <h1 className=" text-xl text-pink-300 font-bold">Orders</h1>
        </div>

        {/* table  */}
        <div className="w-full overflow-x-auto">
          <table className="w-full text-center border border-collapse sm:border-separate border-pink-100 text-pink-400">
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
                  {"product image"}
                </th>

                <th className="h-12 px-6 text-md transition duration-300 border-t border-l first:border-l-0 border-pink-100 stroke-slate-500 text-slate-500 text-red-500 cursor-pointer ">
                  {"address"}
                </th>

                <th className="h-12 px-6 text-md transition duration-300 border-t border-l first:border-l-0 border-pink-100 stroke-slate-500 text-slate-500 text-red-500 cursor-pointer ">
                  {"phone number"}
                </th>

                <th className="h-12 px-6 text-md transition duration-300 border-t border-l first:border-l-0 border-pink-100 stroke-slate-500 text-slate-500 text-red-500 cursor-pointer ">
                  {"time"}
                </th>

                <th className="h-12 px-6 text-md transition duration-300 border-t border-l first:border-l-0 border-pink-100 stroke-slate-500 text-slate-500 text-red-500 cursor-pointer ">
                  {"Action"}
                </th>
              </tr>

              {getOrderData.map((v, i) => (
                <tr className="text-pink-300" key={i}>
                  <td className="h-12 p-6 text-md transition duration-300 border-t border-l first:border-l-0 border-pink-100 stroke-slate-500 text-slate-500 ">
                    {i + 1}.
                  </td>
                  <td className="h-12 p-6 text-md transition duration-300 border-t border-l first:border-l-0 border-pink-100 stroke-slate-500 text-slate-500 first-letter:uppercase ">
                    {v?.name}
                  </td>
                  <td className="h-12 p-6 text-md transition duration-300 border-t border-l first:border-l-0 border-pink-100 stroke-slate-500 text-slate-500 text-red-500 cursor-pointer ">
                    {v?.product}
                  </td>

                  <td className="h-12 p-6 text-md transition duration-300 border-t border-l first:border-l-0 border-pink-100 stroke-slate-500 text-slate-500 text-red-500 cursor-pointer ">
                    <center>
                      {!isLoaded && <img width={80} height={80} src={plain} />}

                      <img
                        width={80}
                        height={80}
                        src={v?.productImage}
                        alt="shirt"
                        onLoad={() => {
                          setIsLoaded(true);
                        }}
                      />
                    </center>
                  </td>

                  <td className="h-12 p-6 text-md transition duration-300 border-t border-l first:border-l-0 border-pink-100 stroke-slate-500 text-slate-500 text-red-500 cursor-pointer ">
                    {v?.address}
                  </td>

                  <td className="h-12 p-6 text-md transition duration-300 border-t border-l first:border-l-0 border-pink-100 stroke-slate-500 text-slate-500 text-red-500 cursor-pointer ">
                    {v?.phone}
                  </td>

                  <td className="h-12 p-6 text-md transition duration-300 border-t border-l first:border-l-0 border-pink-100 stroke-slate-500 text-slate-500 text-red-500 cursor-pointer ">
                    {v?.time.toDate().toString()}
                  </td>

                  <td className="h-12 px-6 text-md transition duration-300 border-t border-l first:border-l-0 border-pink-100 stroke-slate-500 text-slate-500 text-red-500 cursor-pointer ">
                    <span
                      onClick={() => {
                        handleDelete(v?.id);
                      }}
                    >
                      Delete
                    </span>
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

export default TotalOrders;
