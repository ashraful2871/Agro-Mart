import { Dialog } from "@mui/material";
import { useEffect, useState } from "react";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import useAuth from "../../../hooks/useAuth";
import { NavLink } from "react-router-dom";
import { toast } from "react-hot-toast"; 

const WishListModal = ({ isOpen, closeModal }) => {
  const [wishlist, setWishlist] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null); 
  const axiosSecure = useAxiosSecure();
  const user = useAuth();

  // Fetch wishlist data when modal is opened
  useEffect(() => {
    if (isOpen && user?.email) {
      setLoading(true);
      setError(null); 
      axiosSecure
        .get(`/wishlist/${user?.email}`)
        .then((res) => {
          setWishlist(res.data);
          setLoading(false);
        })
        .catch((err) => {
          setError("Failed to load wishlist. Please try again.");
          setLoading(false);
          console.error("Error fetching wishlist:", err);
        });
    }
  }, [isOpen, user?.email]);

  // Handle Add to Cart and remove from wishlist
  const handleAddToCart = async (item) => {
    const cartData = {
      image: item.image,
      productId: item.productId,
      name: item.name,
      category: item.category,
      price: item.price,
      userInfo: {
        name: user?.displayName,
        email: user?.email,
      },
    };

    try {
      // 1. Add to Cart
      const res = await axiosSecure.post("/add-cart", { cardData: cartData });

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

  return (
    <Dialog open={isOpen} onClose={closeModal} fullWidth maxWidth="md">
      <div className="p-6">
        {/* Show loading spinner while fetching wishlist */}
        {loading ? (
          <div className="flex justify-center items-center py-10">
            <div className="animate-spin border-t-4 border-green-700 rounded-full w-16 h-16"></div>
          </div>
        ) : error ? (
          <div className="text-red-600 text-center">
            <p>{error}</p>
          </div>
        ) : wishlist.length === 0 ? (
          <div className="text-center text-gray-600">
            <p>Your wishlist is empty.</p>
          </div>
        ) : (
          <div className="bg-white border rounded-xl overflow-hidden shadow">
            <table className="w-full table-auto min-h-40">
              <tbody>
                {wishlist?.map((item) => (
                  <tr
                    key={item._id}
                    className="border-b last:border-b-0 hover:bg-gray-50"
                  >
                    <td className="p-4 w-28">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-16 h-16 object-contain rounded-md"
                      />
                    </td>
                    <td className="p-4">
                      <div className="text-lg font-semibold text-gray-800">
                        {item.name}
                      </div>
                      <div className="text-sm text-gray-500">
                        ${item.price.toFixed(2)}
                      </div>
                      <div className="text-sm text-gray-400 mt-1">
                        {new Date(item.addedAt).toLocaleDateString("en-US", {
                          year: "numeric",
                          month: "short",
                          day: "numeric",
                        })}
                      </div>
                    </td>
                    <td className="p-4 text-right">
                      <button
                        onClick={() => handleAddToCart(item)}
                        className="bg-green-700 hover:bg-yellow-300 hover:text-black text-white px-6 py-2 rounded-full font-semibold transition"
                      >
                        Add To Cart
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        <div className="mt-6 flex justify-between items-center">
          <div className="text-black hover:text-green-700 underline uppercase text-base">
            <NavLink to="/wish-list">Open wishlist page</NavLink>
          </div>
          <div
            onClick={closeModal}
            className="text-black hover:text-green-700 underline uppercase text-base cursor-pointer"
          >
            Continue shopping
          </div>
        </div>
      </div>
    </Dialog>
  );
};

export default WishListModal;
