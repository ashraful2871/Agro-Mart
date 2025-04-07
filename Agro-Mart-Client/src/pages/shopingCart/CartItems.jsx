import React from "react";
import { FiMinus, FiPlus, FiX } from "react-icons/fi";

const CartItems = ({ cart }) => {
  const { name, image, price } = cart;
  return (
    <div className="flex items-center justify-between border-b py-4">
      <div className="w-2/5 flex items-center gap-4">
        <img
          src={image}
          alt="Green Capsicum"
          className="w-16 h-16 rounded-lg"
        />
        <span>{name}</span>
      </div>
      <div className="w-1/5 text-center">{price}</div>
      <div className="w-1/5">
        <div className="flex justify-center items-center border rounded-full px-3 py-1 gap-2">
          <button>
            <FiMinus />
          </button>
          <span>5</span>
          <button>
            <FiPlus />
          </button>
        </div>
      </div>
      <div className="w-1/5 text-center">{price}</div>
      <div
        className="w-1/12 text-center text-base-content
             cursor-pointer"
      >
        <FiX />
      </div>
    </div>
  );
};

export default CartItems;
