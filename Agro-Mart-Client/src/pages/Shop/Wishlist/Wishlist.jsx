import React, { useContext, useEffect, useState } from "react";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import useAuth from "../../../hooks/useAuth";
import Swal from "sweetalert2";
import toast from "react-hot-toast";
import { ThemeContext } from "../../../provider/ThemeProvider";
import { useTranslation } from "react-i18next";
import ProductPrice from "../../../components/ProductPrice/ProductPrice";

const Wishlist = () => {
  const { t } = useTranslation();
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
  }, [user?.email, axiosSecure]);

  // Handle Add to Cart and remove from wishlist
  const handleAddToCart = async (item) => {
    const { image, name, category, price, productId } = item;

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
    };

    try {
      // 1. Add to Cart
      const res = await axiosSecure.post("/add-cart", { cartData });

      if (res.data.insertedId) {
        // 2. If added successfully, remove from wishlist
        await axiosSecure.delete(`/wishlist/${item._id}`);
        toast.success(t("dashboard.wishlist.toast.success"));

        // 3. Optimistically update UI by removing the item from the wishlist
        setWishlist((prevWishlist) =>
          prevWishlist.filter((i) => i._id !== item._id)
        );
      }
    } catch (error) {
      toast.error(
        t("dashboard.wishlist.toast.error", {
          message: error?.response?.data?.message || "Unknown error",
        })
      );
    }
  };

  const handleDelete = (_id) => {
    Swal.fire({
      title: t("dashboard.wishlist.swal.confirm_title"),
      text: t("dashboard.wishlist.swal.confirm_text"),
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: t("dashboard.wishlist.swal.confirm_button"),
      cancelButtonText: t("dashboard.wishlist.swal.cancel_button"),
      background: `${theme === "dark" ? "#1D232A" : "#ffff"}`,
      color: `${theme === "dark" ? "#ffff" : "#1D232A"}`,
    }).then((result) => {
      if (result.isConfirmed) {
        axiosSecure
          .delete(`/wishlist/${_id}`)
          .then((res) => {
            if (res.status === 200 || res.status === 204 || res.data.deletedCount > 0) {
              Swal.fire({
                title: t("dashboard.wishlist.swal.success_title"),
                text: t("dashboard.wishlist.swal.success_text"),
                icon: "success",
                background: `${theme === "dark" ? "#1D232A" : "#ffff"}`,
                color: `${theme === "dark" ? "#ffff" : "#1D232A"}`,
              });
  
              setWishlist((prevWishlist) =>
                prevWishlist.filter((item) => item._id !== _id)
              );
            }
          })
          .catch((error) => {
            Swal.fire({
              title: t("dashboard.wishlist.swal.error_title"),
              text: t("dashboard.wishlist.swal.error_text"),
              icon: "error",
              background: `${theme === "dark" ? "#1D232A" : "#ffff"}`,
              color: `${theme === "dark" ? "#ffff" : "#1D232A"}`,
            });
            console.error("Error deleting the item:", error);
          });
      }
    });
  };
  

  if (!wishlist) {
    return (
      <div>
        {t("dashboard.wishlist.loading", { defaultValue: "Loading..." })}
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <h2 className="text-center text-3xl font-bold mb-10">
        {t("dashboard.wishlist.title")}
      </h2>

      {/* Responsive table wrapper */}
      {wishlist.length === 0 ? (
        <p className="text-center text-xl font-semibold">
          {t("dashboard.wishlist.no_wishlist")}
        </p>
      ) : (
        <div className="bg-base-100 border rounded-xl overflow-x-auto shadow min-h-28">
          <table className="w-full table-auto min-w-[600px]">
            <tbody>
              {wishlist?.map((item) => (
                <tr
                  key={item._id}
                  className={`${
                    theme === "dark" ? "hover:bg-gray-900" : "hover:bg-gray-100"
                  } border-b last:border-b-0`}
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
                      <ProductPrice amount={item.price}></ProductPrice>
                    </div>
                    <div className="text-sm text-base-content mt-1">
                      {new Date(item.addedAt).toLocaleDateString(
                        t("dashboard.wishlist.date_locale", {
                          defaultValue: "en-US",
                        }),
                        {
                          year: "numeric",
                          month: "short",
                          day: "numeric",
                        }
                      )}
                    </div>
                  </td>

                  {/* Add to Cart Button */}
                  <td className="p-4 text-right whitespace-nowrap">
                    <button
                      onClick={() => handleAddToCart(item)}
                      className="bg-green-700 hover:bg-yellow-300 hover:text-black text-white px-6 py-2 rounded-full font-semibold transition"
                    >
                      {t("dashboard.wishlist.add_to_cart")}
                    </button>
                  </td>

                  {/* Delete Button */}
                  <td className="p-4 text-right whitespace-nowrap">
                    <button
                      onClick={() => handleDelete(item._id)}
                      className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-full font-semibold transition"
                    >
                      {t("dashboard.wishlist.delete")}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default Wishlist;
