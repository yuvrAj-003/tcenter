import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useNavigate, Link } from "react-router-dom";
import { useContext } from "react";
import myContext from "../../Context/myContext";
import Loader from "../Loader";
import { auth, db } from "../../Firebase/config";
import { deleteDoc, doc } from "firebase/firestore";
import { plain } from "../../Assets";

function TotalProducts() {
  const context = useContext(myContext);
  const [isLoaded, setIsLoaded] = useState(false);

  const { loading, setLoading, getProductData } = context;

  const navigate = useNavigate();

  const handleDelete = async (item) => {
    try {
      setLoading(true);
      const itemRef = doc(db, "products", item);
      await deleteDoc(itemRef, item);
      toast.success("successfully deleted");
      setLoading(false);
    } catch (e) {
      console.log(e);
      setLoading(false);
      toast.error("Error incurred");
    }
  };

  return (
    <div>
      {/* Loading  */}
      <Loader />
      <div className="py-5 flex justify-between items-center">
        {/* text  */}
        <h1 className=" text-xl text-pink-300 font-bold">All Product</h1>
        {/* Add Product Button  */}
        <button
          className="px-5 py-2 bg-pink-50 border border-pink-100 rounded-lg"
          onClick={() => {
            navigate("/addProduct");
          }}
        >
          Add Product
        </button>
      </div>

      {/* table  */}
      <div className="w-full overflow-x-auto">
        <table className="w-full text-center border border-collapse sm:border-separate border-pink-100 text-pink-400">
          <tbody>
            <tr>
              <th
                scope="col"
                className="h-12 px-6 text-md border-l first:border-l-0 border-pink-100 text-slate-700 bg-slate-100 font-bold fontPara"
              >
                S.No.
              </th>
              <th
                scope="col"
                className="h-12 px-6 text-md font-bold fontPara border-l first:border-l-0 border-pink-100 text-slate-700 bg-slate-100"
              >
                Name
              </th>

              <th
                scope="col"
                className="h-12 px-6 text-md font-bold fontPara border-l first:border-l-0 border-pink-100 text-slate-700 bg-slate-100"
              >
                Image
              </th>

              <th
                scope="col"
                className="h-12 px-6 text-md font-bold fontPara border-l first:border-l-0 border-pink-100 text-slate-700 bg-slate-100"
              >
                Action
              </th>
              <th
                scope="col"
                className="h-12 px-6 text-md font-bold fontPara border-l first:border-l-0 border-pink-100 text-slate-700 bg-slate-100"
              >
                Action
              </th>
            </tr>

            {getProductData.map((v, i) => {
              return (
                <tr className="text-pink-300" key={i}>
                  <td className="h-12 px-6 text-md transition duration-300 border-t border-l first:border-l-0 border-pink-100 stroke-slate-500 text-slate-500 ">
                    {i + 1}
                  </td>
                  <td className="h-12 px-6 text-md transition duration-300 border-t border-l first:border-l-0 border-pink-100 stroke-slate-500 text-slate-500 first-letter:uppercase ">
                    {v.title}
                  </td>

                  <td className="py-6 h-12 px-6 text-md transition duration-300 border-t border-l first:border-l-0 border-pink-100 stroke-slate-500 text-slate-500 first-letter:uppercase ">
                    <center>
                      {!isLoaded && <img width={80} height={80} src={plain} />}

                      <img
                        width={80}
                        height={80}
                        src={v?.productImageUrl}
                        alt="shirt"
                        onLoad={() => {
                          setIsLoaded(true);
                        }}
                      />
                    </center>
                  </td>
                  <td className="h-12 px-6 text-md transition duration-300 border-t border-l first:border-l-0 border-pink-100 stroke-slate-500 text-slate-500 text-green-500 cursor-pointer ">
                    <Link to={`/editProduct/${v.id}`}>Edit</Link>
                  </td>
                  <td className="h-12 px-6 text-md transition duration-300 border-t border-l first:border-l-0 border-pink-100 stroke-slate-500 text-slate-500 text-red-500 cursor-pointer ">
                    <span onClick={() => handleDelete(v.id)}>Delete</span>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default TotalProducts;
