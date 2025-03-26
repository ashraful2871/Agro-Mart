import React from "react";
import { IoCart } from "react-icons/io5";
import { AiOutlineHeart, AiOutlineEye, AiOutlineSync } from "react-icons/ai";
import { FaShoppingCart } from "react-icons/fa";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
const ProductsCard = ({ product }) => {
  const { image, _id, name, category, price } = product;
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
          <button className="p-2 bg-white shadow-md rounded-full">
            <AiOutlineHeart className="text-green-600 text-lg" />
          </button>
          <button className="p-2 bg-white shadow-md rounded-full">
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
            <span className="hover:text-green-600 inline-block transition-colors duration-300">
              {name}
            </span>
          </h2>
          <p className="text-green-600 text-lg font-semibold">${price}</p>
        </div>

        {/* Cart Button */}
        <button className="absolute bottom-4 right-4 bg-green-700 hover:bg-yellow-400 hover:text-black text-white  p-3 rounded-full shadow-lg z-30 transition-colors duration-300">
          <ShoppingCartOutlinedIcon className=" text-3xl " />
        </button>
      </div>
    </div>
  );
};

export default ProductsCard;
