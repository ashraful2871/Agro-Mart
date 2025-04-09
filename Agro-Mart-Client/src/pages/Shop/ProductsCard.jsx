import React, { useEffect, useState } from "react";
import { IoCart } from "react-icons/io5";
import { AiOutlineHeart, AiOutlineEye, AiOutlineSync, AiFillHeart } from "react-icons/ai";
import { FaShoppingCart } from "react-icons/fa";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import { Link } from "react-router-dom";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import useAuth from "../../hooks/useAuth";
import toast from "react-hot-toast";
import ViewModal from "./ViewModal";
import WishListModal from "./Wishlist/WishListModal";

const ProductsCard = ({ product }) => {
  const axiosSecure = useAxiosSecure();
  const user = useAuth();
  const { image, name, category, price } = product;
  const [isOpen, setIsOpen] = useState(false);
  const openModal = () => setIsOpen(true);
  const closeModal = () => setIsOpen(false);
  const [isWishListOpen, setIsWishListOpen] = useState(false);
  const [isWished, setIsWished] = useState(false);


  const addCard = async (cartProduct) => {
    const { image, _id, name, category, price } = cartProduct;
    const cardData = {
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
    const { data } = await axiosSecure.post("/add-cart", { cardData });
    console.log(data);
    if (data.insertedId) {
      toast.success("item added successfully in cart");
    }
  };

  const addWish = async (wishProduct) => {
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
      addedAt: new Date(),
    };
  
    try {
      const { data } = await axiosSecure.post("/add-wish", { wishData });
      if (data.insertedId) {
        toast.success("Item added successfully in wishlist");
        setIsWishListOpen(true);
        setIsWished(true);
      }
    } catch (error) {
      if (error.response?.status === 409) {
        toast.error("This product is already in wishlist");
      } else {
        toast.error("Something went wrong");
        console.error(error);
      }
    }
  };

  useEffect(() => {
    const checkWishlist = async () => {
      if (user?.email) {
        try {
          const res = await axiosSecure.get(`/wishlist/${user?.email}`);
          const exists = res.data.find(item => item.productId === product._id);
          setIsWished(!!exists);
        } catch (err) {
          console.error("Error checking wishlist:", err);
        }
      }
    };
  
    checkWishlist();
  }, [user?.email, product._id]);
  
  
  
  return (
    <div>
      <div className="bg-base-100 border shadow-lg rounded-2xl relative z-10 overflow-hidden">
        {/* Product Image */}
        <div className="relative rounded-t-2xl overflow-hidden">
          <img
            src={image}
            alt={name}
            className="w-full object-contain relative z-20"
          />
        </div>

        {/* Floating Icons */}
        <div className="absolute top-4 right-4 flex flex-col gap-2 z-30">
        <button
          onClick={() => addWish(product)}
          className="p-2 bg-white shadow-md rounded-full"
        >
          {isWished ? (
            <AiFillHeart className="text-red-500 text-lg" />
          ) : (
            <AiOutlineHeart className="text-green-600 text-lg" />
          )}
        </button>

          <button onClick={openModal} className="p-2 bg-white shadow-md rounded-full">
            <AiOutlineEye className="text-green-600 text-lg" />
          </button>
          <button className="p-2 bg-white shadow-md rounded-full">
            <AiOutlineSync className="text-green-600 text-lg" />
          </button>
        </div>

        {/* Product Details */}
        <div className="mt-4 p-6 py-8 space-y-2 z-20 relative">
          <p className="text-gray-400 text-sm">{category}</p>
          <h2 className="font-semibold text-xl ">
            <Link>
              {" "}
              <span className="hover:text-green-600 inline-block transition-colors duration-300">
                {name}
              </span>
            </Link>
          </h2>
          <p className="text-green-600 text-lg font-semibold">${price}</p>
        </div>

        {/* Cart Button */}

        <button
          onClick={() => addCard(product)}
          className="absolute bottom-4 right-4 bg-green-700 hover:bg-yellow-400 hover:text-black text-white  p-3 rounded-full shadow-lg z-30 transition-colors duration-300"
        >
          <ShoppingCartOutlinedIcon className="text-3xl " />
        </button>

        {/* Cart Modal */}
        <ViewModal
          isOpen={isOpen}
          closeModal={closeModal}
          product={product}
        />

        {/* WishListModal (wishlist items) */}
        <WishListModal
          isOpen={isWishListOpen}
          closeModal={() => setIsWishListOpen(false)} 
        />
      </div>
    </div>
  );
};

export default ProductsCard;
