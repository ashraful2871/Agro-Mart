import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import useAuth from "../../../../hooks/useAuth";
import axios from "axios";
import Swal from "sweetalert2";

const UpdateProduct = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [updatedProduct, setUpdatedProduct] = useState({});
  const user = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    // Fetching product details by id
    const fetchProduct = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/dashboard/product/${id}`
        );
        setProduct(response.data);
        setUpdatedProduct(response.data);
      } catch (error) {
        console.error("Error fetching product details:", error);
      }
    };
    fetchProduct();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData(e.target);
    const name = formData.get("name");
    const category = formData.get("category");
    const price = parseFloat(formData.get("price"));
    const description = formData.get("description");
    const stockQuantity = parseInt(formData.get("stockQuantity"));
    const updatedProduct = {
      name,
      category,
      price,
      description,
      stockQuantity,
    };
    try {
      const response = await axios.patch(
        `http://localhost:5000/dashboard/product-update/${id}`,
        { updatedProduct }
      );
      if (response.status === 200) {
        Swal.fire({
          title: "Updated!",
          text: "Your product has been updated.",
          icon: "success",
        });
        navigate("/dashboard/manageProduct");
      }
    } catch (error) {
      console.error("Error updating the product:", error);
    }
  };

  if (!product) {
    return <div className="text-center text-xl">Loading...</div>;
  }

  return (
    <div className="max-w-4xl mx-auto p-8 bg-white shadow-lg rounded-lg mt-10">
      <h2 className="text-3xl font-semibold text-gray-800 mb-6 text-center">
        Update Product
      </h2>
      <form
        onSubmit={handleSubmit}
        className="space-y-6 grid grid-cols-1 md:grid-cols-2 gap-7"
      >
        {/* Product Name */}
        <div className="flex flex-col justify-end">
          <label htmlFor="name" className="text-lg font-medium text-gray-700">
            Product Name
          </label>
          <input
            type="text"
            id="name"
            name="name"
            defaultValue={updatedProduct.name || ""}
            required
            className="input text-lg p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#F6FCDF]"
          />
        </div>

        {/* Category */}
        <div className="flex flex-col">
          <label
            htmlFor="category"
            className="text-lg font-medium text-gray-700"
          >
            Category
          </label>
          <input
            type="text"
            id="category"
            name="category"
            defaultValue={updatedProduct.category || ""}
            required
            className="input text-lg p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#F6FCDF]"
          />
        </div>

        {/* Price */}
        <div className="flex flex-col">
          <label htmlFor="price" className="text-lg font-medium text-gray-700 ">
            Price
          </label>
          <input
            type="number"
            id="price"
            name="price"
            defaultValue={updatedProduct.price || ""}
            required
            className="input text-lg p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#F6FCDF]"
          />
        </div>

        {/* Stock Quantity */}
        <div className="flex flex-col">
          <label
            htmlFor="stockQuantity"
            className="text-lg font-medium text-gray-700 "
          >
            Stock Quantity
          </label>
          <input
            type="number"
            id="stockQuantity"
            name="stockQuantity"
            defaultValue={updatedProduct.stockQuantity || ""}
            required
            className="input text-lg p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#F6FCDF]"
          />
        </div>

        {/* Description */}
        <div className="md:col-span-2">
          <label
            htmlFor="description"
            className="text-lg font-medium text-gray-700 "
          >
            Description
          </label>
          <textarea
            id="description"
            name="description"
            defaultValue={updatedProduct.description || ""}
            required
            className="input text-lg p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#F6FCDF] w-full"
            rows="4"
          ></textarea>
        </div>

        <div className="md:col-span-2">
          {/* Submit Button */}
          <button
            type="submit"
            className="btn text-black bg-[#F6FCDF] px-7 py-3 rounded-lg shadow-lg hover:bg-[#859F3D] w-full"
          >
            Update Product
          </button>
        </div>
      </form>
    </div>
  );
};

export default UpdateProduct;
