import { Timestamp, addDoc, doc, updateDoc } from "firebase/firestore";
import { useContext, useState } from "react";
import toast from "react-hot-toast";
import { db, storage } from "../../Firebase/config";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { useNavigate } from "react-router";
import Loader from "../../Components/Loader";
import myContext from "../../Context/myContext";
import { v4 } from "uuid";
import { Image } from "lucide-react";
import { encode } from "html-entities";
import { useParams } from "react-router-dom";

const categoryList = [
  {
    name: "graphic",
  },
  {
    name: "plain",
  },
  {
    name: "stripped",
  },
  {
    name: "tie dye",
  },
];

function EditProduct() {
  const context = useContext(myContext);
  const { loading, setLoading } = context;

  const { id } = useParams();

  // navigate
  const navigate = useNavigate();

  // product state
  const [product, setProduct] = useState({
    title: "",
    price: "",
    productImageUrl: "",
    category: "",
    description: "",
    quantity: 1,
    time: Timestamp.now(),
    date: new Date().toLocaleString("en-US", {
      month: "short",
      day: "2-digit",
      year: "numeric",
    }),
  });

  // file upload function
  const [fileUpload, setFileUpload] = useState(null);
  const setImage = (e) => {
    setLoading(true);
    const imageUpload = e.target.files[0];
    if (imageUpload == null) return;
    const imageRef = ref(storage, `images/${imageUpload.name + v4()}`);
    uploadBytes(imageRef, imageUpload)
      .then((q) => {
        // return download url
        return getDownloadURL(q.ref);
      })
      .then((dURL) => {
        // store download url
        setProduct({
          ...product,
          productImageUrl: dURL,
        });
        toast.success(`Image uploaded successfully`);
        setFileUpload(e.target.files[0]);
        setLoading(false);
      })
      .catch((e) => {
        toast.error(e.message);
      });
  };

  // Add Product Function
  const editProductFunction = async () => {
    setLoading(true);
    if (
      product.title == "" ||
      product.price == "" ||
      product.productImageUrl == "" ||
      null ||
      product.category == "" ||
      product.description == ""
    ) {
      return toast.error("all fields are required");
    }

    try {
      setLoading(true);
      const productRef = doc(db, "products", id);
      await updateDoc(productRef, product);
      toast.success("Edit product successfully");
      navigate("/admin");
    } catch (error) {
      console.log(error);
      setLoading(false);
      toast.error("Edit product failed");
    }
  };
  return (
    <div>
      <Loader />
      <div className="flex justify-center items-center h-screen">
        {/* Edit Form  */}
        <div className="login_Form bg-yellow-200 px-8 py-6 rounded-xl shadow-md w-[90vw] lg:w-96">
          {/* Top Heading  */}
          <div className="mb-5">
            <h2 className="text-center text-2xl font-bold text-black-500 ">
              Edit Product
            </h2>
          </div>

          {/* title  */}
          <div className="mb-3">
            <input
              type="text"
              name="title"
              value={product.title}
              onChange={(e) => {
                setProduct({
                  ...product,
                  title: encode(e.target.value, { mode: "nonAsciiPrintable" }),
                });
              }}
              placeholder="Product Title"
              className="bg-white shadow-md px-2 py-2 w-full rounded-md outline-none placeholder-grey-300"
            />
          </div>

          {/* price */}
          <div className="mb-3">
            <input
              type="number"
              name="price"
              value={product.price}
              onChange={(e) => {
                setProduct({
                  ...product,
                  price: encode(e.target.value, { mode: "nonAsciiPrintable" }),
                });
              }}
              placeholder="Product Price"
              className="bg-white shadow-md px-2 py-2 w-full rounded-md outline-none placeholder-grey-300"
            />
          </div>

          {/* file upload */}
          <div className="mb-3 w-full">
            <label
              htmlFor="fileUpload"
              className="bg-white text-gray-500 shadow-md px-2 py-2 rounded-md outline-none placeholder-grey-300 w-full cursor-pointer flex items-center"
            >
              <Image size={20} />
              &nbsp;{fileUpload ? `${fileUpload.name}` : "Choose Product Image"}
            </label>
            <input
              id="fileUpload"
              type="file"
              name="productImageUrl"
              accept="image/*"
              onChange={setImage}
              hidden
            />
          </div>

          {/* category  */}
          <div className="mb-3">
            <select
              value={product.category}
              onChange={(e) => {
                setProduct({
                  ...product,
                  category: encode(e.target.value, {
                    mode: "nonAsciiPrintable",
                  }),
                });
              }}
              className="w-full px-1 py-2 text-black bg-white shadow-md rounded-md outline-none  "
            >
              <option disabled>Select Product Category</option>
              {categoryList.map((value, index) => {
                const { name } = value;
                return (
                  <option
                    className=" first-letter:uppercase"
                    key={index}
                    value={name}
                  >
                    {name}
                  </option>
                );
              })}
            </select>
          </div>

          {/* description */}
          <div className="mb-3">
            <textarea
              value={product.description}
              onChange={(e) => {
                setProduct({
                  ...product,
                  description: encode(e.target.value, {
                    mode: "nonAsciiPrintable",
                  }),
                });
              }}
              name="description"
              placeholder="Product Description"
              rows="5"
              className=" w-full px-2 py-1 text-black bg-white shadow-md rounded-md outline-none"
            ></textarea>
          </div>

          {/* Add Product Button  */}
          <div className="mb-3">
            <button
              onClick={editProductFunction}
              type="button"
              className="bg-yellow-400 hover:bg-yellow-600 shadow-md w-full text-black text-center py-2 font-bold rounded-md "
            >
              Edit Product
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default EditProduct;
