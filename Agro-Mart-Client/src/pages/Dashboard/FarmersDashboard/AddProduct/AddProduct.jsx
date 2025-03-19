import { useState } from "react";
import { ImSpinner9 } from "react-icons/im";
import { imageUpload } from "../../../../api/utils";
import { useSelector } from "react-redux";
import useAxiosPublic from "../../../../hooks/useAxiosPublic";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const AddProduct = () => {
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const user = useSelector((state) => state.auth.user);
    const axiosPublic = useAxiosPublic();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(""); 
        setLoading(true); 
    
        const form = e.target;
        const name = form.name.value;
        const image = form.image.files[0];
        const imageURL = await imageUpload(image);
        const category = form.category.value;
        const price = parseFloat(form.price.value);
        const description = form.description.value;
        const stockQuantity = parseInt(form.stockQuantity.value);
    
        const productData = {
            name,
            category,
            price,
            description,
            stockQuantity,
            imageURL,
            addedBy: {
                name: user?.displayName,
                email: user?.email,
            },
        };
    
        axiosPublic.post("/products", productData)
            .then((res) => {
                if (res.data.insertedId) {
                    toast.success('Product successfully added!');
                    form.reset();
                    navigate('/dashboard/manageProduct');
                } else {
                    toast.error('Product could not be added.');
                }
            })
            .catch((err) => {
                if (err.response && err.response.data.message) {
                    setError(err.response.data.message); 
                } else {
                    setError('An error occurred while adding the product.');
                }
                console.error(err);
            })
            .finally(() => {
                setLoading(false); 
            });
    };

  return (
    <div className="max-w-5xl mx-auto">
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
