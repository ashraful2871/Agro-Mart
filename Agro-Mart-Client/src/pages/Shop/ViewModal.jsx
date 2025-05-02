import { Dialog, Transition } from "@headlessui/react";
import { Fragment, useContext, useState } from "react";
import toast from "react-hot-toast";
import { AiOutlineHeart } from "react-icons/ai";
import { FaFacebookF, FaTwitter, FaPinterestP, FaStar } from "react-icons/fa";
import useAuth from "../../hooks/useAuth";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { ThemeContext } from "../../provider/ThemeProvider";
import ProductPrice from "../../components/ProductPrice/ProductPrice";

const ViewModal = ({ isOpen, closeModal, product }) => {
  const user = useAuth();
  const axiosSecure = useAxiosSecure();
  const { theme } = useContext(ThemeContext);
  
  const {
    name,
    price,
    image,
    category,
    description,
    stockQuantity,
    discount = 64,
    oldPrice = 48,
    tags = ["Vegetables", "Healthy", "Chinese", "Green Cabbage"],
    brand = "Farmway",
  } = product;

  const [quantity, setQuantity] = useState(1);
  const [selectedImage, setSelectedImage] = useState(image);

  const handleQuantity = (val) => {
    if (val < 1) {
      toast.error("Minimum quantity is 1");
      setQuantity(1);
    } else if (val > stockQuantity) {
      toast.error("Exceeds available stock");
      setQuantity(stockQuantity);
    } else {
      setQuantity(val);
    }
  };

  const addCard = async (cartProduct) => {
    try {
      const { image, _id, name, category, price } = cartProduct;
      const cartData = {
        image,
        productId: _id,
        name,
        category,
        price,
        userInfo: {
          name: user?.displayName,
          email: user?.email,
        },
      };
      const { data } = await axiosSecure.post("/add-cart", { cartData });
      if (data.insertedId) {
        toast.success("Item added successfully to cart");
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to add item to cart");
    }
  };  

  const addWish = async (wishProduct) => {
    try {
      const { image, _id, name, category, price } = wishProduct;
      const wishData = {
        image,
        productId: _id,
        name,
        category,
        price,
        userInfo: {
          name: user?.displayName,
          email: user?.email,
        },
      };
      const { data } = await axiosSecure.post("/add-wish", { wishData });
      if (data.insertedId) {
        toast.success("Item added successfully to wishlist");
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to add item to wishlist");
    }
  };
  
  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-50" onClose={closeModal}>
        <div className="fixed inset-0 bg-black/30 " />

        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex items-center justify-center min-h-full p-4">
            <Dialog.Panel className="w-full max-w-5xl transform overflow-hidden rounded-2xl bg-base-100 p-4 sm:p-6 shadow-xl transition-all">
              <div className="flex flex-col md:grid md:grid-cols-2 gap-6 sm:gap-10">
                {/* Left side gallery */}
                <div className="w-full">
                  <img
                    src={selectedImage}
                    alt={name}
                    className="rounded-lg w-full h-64 sm:h-80 object-contain"
                  />
                </div>

                {/* Right side content */}
                <div className="space-y-3">
                  <h2 className={` ${theme === "dark" ? "text-white" : "text-gray-800"} text-xl sm:text-2xl font-bold text-gray-800`}>
                    {name}
                  </h2>

                  <div className="flex flex-wrap items-center gap-2 text-yellow-500">
                    {[...Array(4)].map((_, i) => (
                      <FaStar key={i} />
                    ))}
                    <span className={`${theme === "dark" ? "text-gray-300" : "text-gray-600"} text-sm ml-2`}>
                      4 Review • SKU: 251,594
                    </span>
                  </div>

                  <div className="flex flex-wrap items-center gap-3">
                    <span className="text-xl font-bold text-green-600">
                    <ProductPrice amount={price} />
                    </span>
                    <span className={`${theme === "dark" ? "text-gray-300" : "text-gray-600"} line-through`}>
                      ${oldPrice}
                    </span>
                    <span className="text-sm bg-red-100 text-red-600 px-2 py-1 rounded">
                      -{discount}% Off
                    </span>
                  </div>

                  <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4">
                    <div className="flex items-center gap-2">
                      <span className="font-semibold">Brand:</span>
                      <img
                        src="https://i.ibb.co/MZkPq3r/farmway.png"
                        alt="brand"
                        className="h-6"
                      />
                    </div>

                    <div className="flex gap-3 text-green-700 items-center">
                      <span className="font-semibold">Share:</span>
                      <FaFacebookF className="cursor-pointer hover:text-blue-600" />
                      <FaTwitter className="cursor-pointer hover:text-sky-500" />
                      <FaPinterestP className="cursor-pointer hover:text-red-500" />
                    </div>
                  </div>

                  <p className={`${theme === "dark" ? "text-gray-300" : "text-gray-600"} text-sm `}>{description}</p>

                  {/* Quantity selector and buttons */}
                  <div className=" grid grid-cols-1 md:grid-cols-2 sm:items-center gap-4 mt-4">
                    {/* <div className="flex items-center gap-2 border rounded-full px-3 py-1">
                      <button
                        onClick={() => handleQuantity(quantity - 1)}
                        className="w-8 h-8 rounded-full bg-green-100 text-lg text-black"
                      >
                        -
                      </button>
                      <input
                        type="number"
                        value={quantity}
                        onChange={(e) =>
                          handleQuantity(parseInt(e.target.value))
                        }
                        className={`${theme === "dark" ? "bg-transparent text-white" : "text-black"} w-12 text-center outline-none`}
                      />
                      <button
                        onClick={() => handleQuantity(quantity + 1)}
                        className="w-8 h-8 rounded-full bg-green-100 text-lg text-black"
                      >
                        +
                      </button>
                    </div> */}

                    <button
                      onClick={() => addCard(product)}
                      className="flex-1 sm:w-auto px-6 py-2 bg-green-600 text-white rounded-full hover:bg-green-700 transition"
                    >
                      Add to Cart
                    </button>

                    <button
                      onClick={() => addWish(product)}
                      className="p-2 bg-green-100 rounded-full"
                    >
                      <AiOutlineHeart className="text-green-600 text-lg mx-auto" />
                    </button>
                  </div>

                  {/* Tags and category */}
                  <div className={`${theme === "dark" ? "text-gray-300" : "text-gray-600"} text-sm space-y-1 mt-4`}>
                    <p>
                      <strong>Category:</strong> {category}
                    </p>
                    <p className="flex flex-wrap gap-2">
                      <strong>Tags:</strong>{" "}
                      {tags.map((tag, i) => (
                        <span key={i} className="text-green-600">
                          {tag}
                        </span>
                      ))}
                    </p>
                  </div>
                </div>
              </div>
            </Dialog.Panel>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
};

export default ViewModal;
