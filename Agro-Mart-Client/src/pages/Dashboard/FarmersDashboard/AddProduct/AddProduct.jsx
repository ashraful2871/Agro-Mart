import { useState } from "react";
import { ImSpinner9 } from "react-icons/im";
import { useSelector } from "react-redux";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const image_hosting_key = import.meta.env.VITE_IMGBB_HOSTING_KEY;
const image_upload_api = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`;
const AddProduct = () => {
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const user = useSelector((state) => state.auth.user);
  const navigate = useNavigate();
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
    // Continue to product submit
    // const productData = {
    //   name,
    //   category,
    //   price,
    //   description,
    //   stockQuantity,
    //   imageFile,
    //   addedBy: {
    //     name: user?.displayName,
    //     email: user?.email,
    //   },
    // };
    // console.log(productData);
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
        toast.error("Image upload failed");
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
      toast.success("Product successfully added!");
      e.target.reset();
      navigate("/dashboard/manageProduct");
    } catch (err) {
      setError("An error occurred while adding the product.");
      console.error("Product Upload Error:", err.response?.data || err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="">
      <h3 className="text-4xl mb-10 text-center">Add Product</h3>
      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Product Name */}
          <div>
            <label className="block font-bold mb-1">Product Name</label>
            <input
              type="text"
              name="name"
              className="input input-bordered w-full"
              placeholder="Product Name"
              required
            />
          </div>

          {/* Category */}
          <div>
            <label className="block font-bold mb-1">Category</label>
            <select
              name="category"
              className="input input-bordered w-full"
              required
            >
              <option value="">Select a category</option>
              <option value="Seeds & Plants">Seeds & Plants</option>
              <option value="Farming Equipment">Farming Equipment</option>
              <option value="Fertilizers & Pesticides">
                Fertilizers & Pesticides
              </option>
              <option value="Agricultural Tools">Agricultural Tools</option>
              <option value="Vegetables">Vegetables</option>
              <option value="Fruits">Fruits</option>
              <option value="Fresh Fish & Seafood">Fresh Fish & Seafood</option>
              <option value="Dairy & Milk Products">
                Dairy & Milk Products
              </option>
            </select>
          </div>

          {/* Image Upload */}
          <div>
            <label className="input input-bordered flex items-center gap-2 mt-7 pt-2 w-full">
              <span>Upload Image</span>
              <input type="file" name="image" accept="image/*" required />
            </label>
          </div>

          {/* Price */}
          <div>
            <label className="block font-bold mb-1">Price</label>
            <input
              type="number"
              name="price"
              className="input input-bordered w-full"
              placeholder="Price"
              required
              min="0"
            />
          </div>

          {/* Description */}
          <div className="md:col-span-2">
            <label className="block font-bold mb-1">Description</label>
            <textarea
              name="description"
              className="input input-bordered w-full"
              placeholder="Product Description"
              required
              rows="4"
            ></textarea>
          </div>

          {/* Stock Quantity */}
          <div>
            <label className="block font-bold mb-1">Stock Quantity</label>
            <input
              type="number"
              name="stockQuantity"
              className="input input-bordered w-full"
              placeholder="Stock Quantity"
              required
              min="0"
            />
          </div>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="btn w-full text-black text-bold text-lg bg-[#F6FCDF] hover:bg-[#c3e858] mt-4"
          disabled={loading}
        >
          {loading ? (
            <ImSpinner9 className="animate-spin mr-2" />
          ) : (
            "Add Product"
          )}
        </button>
      </form>

      {/* Display Error */}
      {error && <p className="text-red-500 text-center mt-2">{error}</p>}
    </div>
  );
};

export default AddProduct;
