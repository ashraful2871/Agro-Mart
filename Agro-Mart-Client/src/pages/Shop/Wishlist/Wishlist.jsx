import React, { useContext, useEffect, useState } from "react";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import useAuth from "../../../hooks/useAuth";
import Swal from "sweetalert2";
import toast from "react-hot-toast";
import { ThemeContext } from "../../../provider/ThemeProvider";

const Wishlist = () => {
  const [wishlist, setWishlist] = useState([]);
  const axiosSecure = useAxiosSecure();
  const user = useAuth();
  const { theme } = useContext(ThemeContext);

  // Fetch wishlist data when user email is available
  useEffect(() => {
    if (user?.email) {
      axiosSecure
        .get(`/wishlist/${user?.email}`)
        .then((res) => {
          setWishlist(res.data);
        })
        .catch((err) => {
          console.error("Error fetching wishlist:", err);
        });
    }
  }, [user?.email]);

  // Handle Add to Cart and remove from wishlist
  const handleAddToCart = async (item) => {
    const { image, _id, name, category, price } = item;
    console.log(_id);

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

    try {
      // 1. Add to Cart
      const res = await axiosSecure.post("/add-cart", { cartData });

      if (res.data.insertedId) {
        // 2. If added successfully, remove from wishlist
        await axiosSecure.delete(`/wishlist/${item._id}`);
        toast.success("Moved to Cart!");

        // 3. Optimistically update UI by removing the item from the wishlist
        setWishlist((prevWishlist) =>
          prevWishlist.filter((i) => i._id !== item._id)
        );
      }
    } catch (error) {
      toast.error("Something went wrong");
      console.error(error);
    }
  };

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
        // Sending DELETE request to the backend
        axiosSecure
          .delete(`/wishlist/${_id}`)
          .then((res) => {
            if (res.status === 200) {
              Swal.fire({
                title: "Deleted!",
                text: "The item has been deleted from your wishlist.",
                icon: "success",
                background: `${theme === "dark" ? "#1D232A" : "#ffff"}`,
                color: `${theme === "dark" ? "#ffff" : " #1D232A"}`,
              });

              // Optimistically update the UI by removing the deleted item from the wishlist
              setWishlist((prevWishlist) =>
                prevWishlist.filter((item) => item._id !== _id)
              );
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

  if (!wishlist) {
    return <div>Loading...</div>;
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <h2 className="text-center text-3xl font-bold mb-10">My Wishlist</h2>

      <div className="bg-base-100 border rounded-xl overflow-hidden shadow">
        <table className="w-full table-auto min-h-40">
          <tbody>
            {wishlist?.map((item) => (
              <tr
                key={item._id}
                className="border-b last:border-b-0 hover:bg-gray-900"
              >
                {/* Image */}
                <td className="p-4 w-28">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-16 h-16 object-contain rounded-md"
                  />
                </td>

                {/* Name + Date */}
                <td className="p-4">
                  <div className="text-lg font-semibold text-base-content">
                    {item.name}
                  </div>
                  <div className="text-sm text-base-content">
                    ${item.price.toFixed(2)}
                  </div>
                  <div className="text-sm text-base-content mt-1">
                    {new Date(item.addedAt).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "short",
                      day: "numeric",
                    })}
                  </div>
                </td>

                {/* Add to Cart Button */}
                <td className="p-4 text-right">
                  <button
                    onClick={() => handleAddToCart(item)}
                    className="bg-green-700 hover:bg-yellow-300 hover:text-black text-white px-6 py-2 rounded-full font-semibold transition"
                  >
                    Add To Cart
                  </button>
                </td>

                {/* Delete Button */}
                <td className="p-4 text-right">
                  <button
                    onClick={() => handleDelete(item._id)} // Call handleDelete with the item's _id
                    className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-full font-semibold transition"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Wishlist Share Link */}
      <div className="mt-10 flex items-center gap-4">
        <span className="font-medium">Wishlist link:</span>
        <input
          type="text"
          value="https://demo2.themelexus.com"
          readOnly
          className="border px-4 py-2 rounded-full w-96"
        />
        <button className="bg-green-700 hover:bg-green-800 text-white px-6 py-2 rounded-full font-semibold transition">
          Copy
        </button>
      </div>
    </div>
  );
};

export default Wishlist;
