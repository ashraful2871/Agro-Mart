import axios from "axios";
import { useEffect, useState } from "react";
import { FaRegHeart } from "react-icons/fa";
import { IoMdGitCompare } from "react-icons/io";
import { useParams } from "react-router-dom";

const ProductDetails = () => {
  const { id } = useParams(); 
  const [product, setProduct] = useState(null);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/dashboard/product/${id}`
        );
        setProduct(response.data); 
      } catch (error) {
        console.error("Error fetching product details:", error);
      }
    };
    fetchProduct();
  }, [id]); 

  if (!product) {
    return <div className="text-center text-xl">Loading...</div>;
  }

  return (
    <div className="p-5">
        <div className="card lg:card-side bg-base-100 shadow-sm">
        <figure>
          <img
            src={product.image} 
            alt={product.name} 
            className="w-full h-96 object-cover"
          />
        </figure>
        <div className="card-body w-full mx-auto my-8 p-6 bg-white border border-gray-200 rounded-lg shadow-sm ml-7">
        {/* Product Title */}
        <h1 className="text-2xl font-bold mb-2">{product.name}</h1>

        {/* Product Price */}
        <div className="text-green-600 text-xl font-semibold mb-4">
          ${product.price.toFixed(2)}
        </div>

        {/* Product Description */}
        <p className="text-gray-600 mb-6">{product.description}</p>

        {/* Quantity Selector */}
        <div className="flex items-center space-x-2 mb-6">
          <button className="px-3 py-1 bg-gray-200 rounded-lg text-gray-700 hover:bg-gray-300">
            -
          </button>
          <span className="text-lg">1</span>
          <button className="px-3 py-1 bg-gray-200 rounded-lg text-gray-700 hover:bg-gray-300">
            +
          </button>
        </div>

        {/* Add to Cart Button */}
        <button className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition duration-300">
          Add To Cart →
        </button>

        {/* Wishlist and Compare Links */}
        <div className="mt-4 space-x-4 flex gap-7">
          <a href="#" className="hover:text-green-700 hover:underline flex  gap-2">
          <span className="my-auto"><FaRegHeart /></span>  Add to wishlist
          </a>
          <a href="#" className="hover:text-green-700 hover:underline flex justify-end gap-2">
          <span className="my-auto"><IoMdGitCompare /></span>  Compare
          </a>
        </div>

        {/* Checkout Icons */}
        <div className="flex justify-between mt-6 bg-gray-100 py-5 px-20 rounded-xl">
          <img src="https://i.ibb.co.com/23ncVSv0/card-11378186.png" alt="Visa" className="w-12 h-auto" />
          <img src="https://i.ibb.co.com/84DHynxv/logo-14082995.png" alt="Mastercard" className="w-12 h-auto" />
          <img src="https://i.ibb.co.com/d04xmJ6g/parking-card-1367193.png" alt="PayPal" className="w-12 h-auto" />
          <img src="https://i.ibb.co.com/XZrbNTzp/google-pay-6124998.png" alt="Google Pay" className="w-12 h-auto" />
        </div>
        </div>
        </div>
    </div>
  );
};

export default ProductDetails;