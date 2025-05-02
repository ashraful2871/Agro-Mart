import { Dialog } from "@mui/material";
import { useContext, useEffect, useState } from "react";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import useAuth from "../../../hooks/useAuth";
import { NavLink } from "react-router-dom";
import { toast } from "react-hot-toast";
import { ThemeContext } from "../../../provider/ThemeProvider";
import ProductPrice from "../../../components/ProductPrice/ProductPrice";

const WishListModal = ({ isOpen, closeModal }) => {
  const [wishlist, setWishlist] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const axiosSecure = useAxiosSecure();
  const { theme } = useContext(ThemeContext);
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
    const { image, _id, name, category, price, productId } = item;

    const cartData = {
      image,
      productId,
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
      toast.error(error?.response?.data?.message);
      // console.error(error?.response?.data?.message);
    }
  };

  return (
    <Dialog open={isOpen} onClose={closeModal} fullWidth maxWidth="md">
      <div className="p-4 sm:p-6 bg-base-100">
        {/* Loading Spinner */}
        {loading ? (
          <div className="flex justify-center items-center py-10">
            <div className="animate-spin border-t-4 border-green-700 rounded-full w-16 h-16"></div>
          </div>
        ) : error ? (
          <div className="text-red-600 text-center">
            <p>{error}</p>
          </div>
        ) : wishlist.length === 0 ? (
          <div className="text-center text-base-content">
            <p>Your wishlist is empty.</p>
          </div>
        ) : (
          <div className="bg-base-100 border rounded-xl overflow-hidden shadow">
            <div className="overflow-x-auto">
              <table className="w-full min-w-[600px]  table-auto min-h-40">
                <tbody>
                  {wishlist?.map((item) => (
                    <tr
                      key={item._id}
                      className={`
                  border-b last:border-b-0 transition ease-in-out duration-200 
                  ${
                    theme === "dark" ? "hover:bg-gray-900" : "hover:bg-gray-100"
                  }
                `}
                    >
                      <td className="p-4 w-28">
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-16 h-16 object-contain rounded-md"
                        />
                      </td>
                      <td className="p-4">
                        <div className="text-lg font-semibold text-base-content">
                          {item.name}
                        </div>
                        <div className="text-sm text-base-content">
                        <ProductPrice amount={item.price} />
                        </div>
                        <div className="text-sm text-base-content mt-1">
                          {new Date(item.addedAt).toLocaleDateString("en-US", {
                            year: "numeric",
                            month: "short",
                            day: "numeric",
                          })}
                        </div>
                      </td>
                      <td className="p-4 text-right whitespace-nowrap">
                        <button
                          onClick={() => handleAddToCart(item)}
                          className="bg-green-700 hover:bg-yellow-300 hover:text-black text-white px-6 py-2 rounded-full font-semibold transition duration-300"
                        >
                          Add To Cart
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Footer Links */}
        <div className="mt-6 flex flex-col sm:flex-row justify-between items-center gap-4">
          <NavLink
            to="/dashboard/wishlist"
            className="text-base-content hover:text-green-700 underline uppercase text-base"
          >
            Open wishlist page
          </NavLink>
          <div
            onClick={closeModal}
            className="text-base-content hover:text-green-700 underline uppercase text-base cursor-pointer"
          >
            Continue shopping
          </div>
        </div>
      </div>
    </Dialog>
  );
};

export default WishListModal;
