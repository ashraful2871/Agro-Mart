import React, { useContext, useEffect, useState } from "react";
import Swal from "sweetalert2";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { FiMinus, FiPlus, FiX } from "react-icons/fi";
import toast from "react-hot-toast";
import { ThemeContext } from "../../provider/ThemeProvider";

const CartItems = ({ cart, refetch, onCartUpdate }) => {
  const {
    name,
    image,
    price,
    _id,
    stockQuantity,
    quantity: initialQuantity,
  } = cart;
  const axiosSecure = useAxiosSecure();
  const [quantity, setQuantity] = useState(initialQuantity || 1); // Initialize with cart quantity
  const [total, setTotal] = useState(price * (initialQuantity || 1));
  const { theme } = useContext(ThemeContext);

  // Function to calculate total and save in localStorage
  const calculateAndStoreTotal = (qty) => {
    const calculatedTotal = qty * price;
    setTotal(calculatedTotal);

    // Store this cart item in localStorage
    const storedCart = JSON.parse(localStorage.getItem("cartItems")) || {};
    storedCart[_id] = {
      _id,
      name,
      price,
      quantity: qty,
      total: calculatedTotal,
    };
    localStorage.setItem("cartItems", JSON.stringify(storedCart));

    if (onCartUpdate) {
      onCartUpdate();
    }
  };

  // Handle Quantity Change
  const handleQuantity = (val) => {
    if (val < 1) {
      toast.error("Minimum quantity is 1");
      setQuantity(1);
      calculateAndStoreTotal(1);
    } else if (val > stockQuantity) {
      toast.error("Exceeds available stock");
      setQuantity(stockQuantity);
      calculateAndStoreTotal(stockQuantity);
    } else {
      setQuantity(val);
      calculateAndStoreTotal(val);
    }
  };

  // Initialize total and quantity on mount from localStorage or cartData
  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem("cartItems")) || {};
    const savedItem = storedCart[_id];

    if (savedItem) {
      setQuantity(savedItem.quantity);
      setTotal(savedItem.total);
    } else {
      calculateAndStoreTotal(quantity);
    }
  }, [_id, quantity, price]);

  // Handle Delete Item
  const handleDelete = (_id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
      background: `${theme === "dark" ? "#1D232A" : "#ffff"}`,
      color: `${theme === "dark" ? "#ffff" : " #1D232A"}`,
    }).then((result) => {
      if (result.isConfirmed) {
        axiosSecure
          .delete(`/delete-cart-item/${_id}`)
          .then((res) => {
            if (res.status === 200) {
              Swal.fire({
                title: "Deleted!",
                text: "The item has been deleted from your cart.",
                icon: "success",
                background: `${theme === "dark" ? "#1D232A" : "#ffff"}`,
                color: `${theme === "dark" ? "#ffff" : " #1D232A"}`,
              });

              // Remove from localStorage
              const storedCart =
                JSON.parse(localStorage.getItem("cartItems")) || {};
              delete storedCart[_id];
              localStorage.setItem("cartItems", JSON.stringify(storedCart));

              refetch();
              if (onCartUpdate) {
                onCartUpdate();
              }
            }
          })
          .catch((error) => {
            Swal.fire({
              title: "Error",
              text: "Something went wrong while deleting the item.",
              icon: "error",
              background: `${theme === "dark" ? "#1D232A" : "#ffff"}`,
              color: `${theme === "dark" ? "#ffff" : " #1D232A"}`,
            });
            console.error("Error deleting the item:", error);
          });
      }
    });
  };

  return (
    <div className="flex items-center justify-between border-b py-4">
      <div className="w-2/5 flex items-center gap-4">
        <img src={image} alt="Item Image" className="w-10 h-10 rounded-lg" />
        <span>{name}</span>
      </div>
      <div className="w-1/5 text-center">${price}</div>
      <div className="w-1/5">
        <div className="flex justify-center items-center border rounded-full px-3 py-1 gap-2">
          <button
            onClick={() => handleQuantity(quantity - 1)}
            className="w-2 h-2 md:w-10 md:h-10"
          >
            <FiMinus />
          </button>
          <input
            type="number"
            value={quantity}
            onChange={(e) => handleQuantity(parseInt(e.target.value))}
            className="w-2 md:w-10 text-center bg-transparent"
          />
          <button
            onClick={() => handleQuantity(quantity + 1)}
            className="w-2 h-2 md:w-10 md:h-10"
          >
            <FiPlus />
          </button>
        </div>
      </div>
      <div className="w-1/5 text-center">${total.toFixed(2)}</div>
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
