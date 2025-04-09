import React, { useState } from "react";
import { FiMinus, FiPlus, FiX } from "react-icons/fi";
import axios, { Axios } from "axios"; 
import Swal from "sweetalert2";

const CartItems = ({ cart, fetchCartItems }) => {
  const { _id, name, image, price } = cart;

  // Cart item delete handler with confirmation modal
  const handleDelete = async (id) => {
    // Show confirmation modal
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const response = await axios.delete(`/delete-cart-item/${id}`);
          if (response.data.success) {
            fetchCartItems(); 
            Swal.fire(
              "Deleted!",
              "Your item has been deleted from the cart.",
              "success"
            );
          } else {
            Swal.fire("Failed!", "Something went wrong.", "error");
          }
        } catch (error) {
          console.error("Error deleting the item:", error);
          Swal.fire("Error!", "Something went wrong while deleting the item.", "error");
        }
      }
    });
  };

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
        className="w-1/12 text-center text-base-content cursor-pointer"
        onClick={() => handleDelete(_id)} 
      >
        <FiX />
      </div>
    </div>
  );
};

export default CartItems;
