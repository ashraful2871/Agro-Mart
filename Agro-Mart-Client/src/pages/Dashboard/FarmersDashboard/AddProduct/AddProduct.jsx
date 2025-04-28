import { useContext, useState } from "react";
import { useTranslation } from "react-i18next";
import { ImSpinner9 } from "react-icons/im";
import { useSelector } from "react-redux";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { ThemeContext } from "../../../../provider/ThemeProvider";

const image_hosting_key = import.meta.env.VITE_IMGBB_HOSTING_KEY;
const image_upload_api = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`;

const AddProduct = () => {
  const { t } = useTranslation();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const user = useSelector((state) => state.auth.user);
  const navigate = useNavigate();
  const { theme } = useContext(ThemeContext);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    const formData = new FormData(e.target);
    const name = formData.get("name");
    const category = formData.get("category");
    const price = parseFloat(formData.get("price"));
    const description = formData.get("description");
    const stockQuantity = parseInt(formData.get("stockQuantity"));
    const imageFile = formData.get("image");

    let imageUrl = "";
    if (imageFile) {
      const imageFormData = new FormData();
      imageFormData.append("image", imageFile);
      try {
        const response = await axios.post(image_upload_api, imageFormData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });
        if (response.data.success) {
          imageUrl = response.data.data.display_url;
        }
      } catch (error) {
        console.log(error);
        toast.error(t("dashboard.seller.add-product.toast_image_error"));
        setLoading(false);
        return;
      }
    }

    const productData = {
      name,
      category,
      price,
      description,
      stockQuantity,
      image: imageUrl,
      addedBy: {
        name: user?.displayName,
        email: user?.email,
      },
    };

    try {
      const { data } = await axios.post(
        `${import.meta.env.VITE_API_URL}/products`,
        productData
      );

      console.log("Product Added:", data);
      toast.success(t("dashboard.seller.add-product.toast_success"));
      e.target.reset();
      navigate("/dashboard/manageProduct");
    } catch (err) {
      setError(t("dashboard.seller.add-product.error"));
      console.error("Product Upload Error:", err.response?.data || err.message);
      setLoading(false);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className={`p-4 min-h-screen xl:mt-6 ${
        theme === "dark" ? "bg-[#1f29374b]" : "bg-white"
      } rounded-xl`}
    >
      <h3 className="text-4xl mb-10 text-center">
        {t("dashboard.seller.add-product.title")}
      </h3>
      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Product Name */}
          <div>
            <label className="block font-bold mb-1">
              {t("dashboard.seller.add-product.product_name_label")}
            </label>
            <input
              type="text"
              name="name"
              className="input input-bordered w-full"
              placeholder={t(
                "dashboard.seller.add-product.product_name_placeholder"
              )}
              required
            />
          </div>

          {/* Category */}
          <div>
            <label className="block font-bold mb-1">
              {t("dashboard.seller.add-product.category_label")}
            </label>
            <select
              name="category"
              className="input input-bordered w-full"
              required
            >
              <option value="">
                {t("dashboard.seller.add-product.category_placeholder")}
              </option>
              <option value="Seeds & Plants">
                {t("dashboard.seller.add-product.categories.seeds_plants")}
              </option>
              <option value="Farming Equipment">
                {t("dashboard.seller.add-product.categories.farming_equipment")}
              </option>
              <option value="Fertilizers & Pesticides">
                {t(
                  "dashboard.seller.add-product.categories.fertilizers_pesticides"
                )}
              </option>
              <option value="Agricultural Tools">
                {t(
                  "dashboard.seller.add-product.categories.agricultural_tools"
                )}
              </option>
              <option value="Vegetables">
                {t("dashboard.seller.add-product.categories.vegetables")}
              </option>
              <option value="Fruits">
                {t("dashboard.seller.add-product.categories.fruits")}
              </option>
              <option value="Fresh Fish & Seafood">
                {t("dashboard.seller.add-product.categories.fish_seafood")}
              </option>
              <option value="Dairy & Milk Products">
                {t("dashboard.seller.add-product.categories.dairy_milk")}
              </option>
            </select>
          </div>

          {/* Image Upload */}
          <div>
            <label className="input input-bordered flex items-center gap-2 mt-7 pt-2 w-full">
              <span>{t("dashboard.seller.add-product.image_label")}</span>
              <input type="file" name="image" accept="image/*" required />
            </label>
          </div>

          {/* Price */}
          <div>
            <label className="block font-bold mb-1">
              {t("dashboard.seller.add-product.price_label")}
            </label>
            <input
              type="number"
              name="price"
              className="input input-bordered w-full"
              placeholder={t("dashboard.seller.add-product.price_placeholder")}
              required
              min="0"
            />
          </div>

          {/* Description */}
          <div className="md:col-span-2">
            <label className="block font-bold mb-1">
              {t("dashboard.seller.add-product.description_label")}
            </label>
            <textarea
              name="description"
              className="input input-bordered w-full"
              placeholder={t(
                "dashboard.seller.add-product.description_placeholder"
              )}
              required
              rows="4"
            ></textarea>
          </div>

          {/* Stock Quantity */}
          <div>
            <label className="block font-bold mb-1">
              {t("dashboard.seller.add-product.stock_quantity_label")}
            </label>
            <input
              type="number"
              name="stockQuantity"
              className="input input-bordered w-full"
              placeholder={t(
                "dashboard.seller.add-product.stock_quantity_placeholder"
              )}
              required
              min="0"
            />
          </div>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="btn w-full text-bold text-lg mt-10 bg-green-600 text-white hover:bg-green-700 transition duration-300 rounded-lg"
          disabled={loading}
        >
          {loading ? (
            <ImSpinner9 className="animate-spin mr-2" />
          ) : (
            t("dashboard.seller.add-product.submit_button")
          )}
        </button>
      </form>

      {/* Display Error */}
      {error && <p className="text-red-500 text-center mt-2">{error}</p>}
    </div>
  );
};

export default AddProduct;
