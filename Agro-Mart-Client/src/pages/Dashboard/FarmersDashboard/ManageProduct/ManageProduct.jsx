import { useContext, useEffect, useState } from "react";
import useAxiosPublic from "../../../../hooks/useAxiosPublic";
import { FaTrashAlt } from "react-icons/fa";
import Swal from "sweetalert2";
import { MdBrowserUpdated } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import Loading from "../../../../components/loading/Loading";
import { ThemeContext } from "../../../../provider/ThemeProvider";

const ManageProduct = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const axiosPublic = useAxiosPublic();
  const navigate = useNavigate();
  const { theme } = useContext(ThemeContext);

  const fetchProducts = async () => {
    try {
      const response = await axiosPublic.get("/products");
      console.log("Fetched Products:", response.data);
      if (Array.isArray(response.data)) {
        setProducts(response.data);
      } else {
        setError("Fetched data is not in the expected format.");
      }
      setLoading(false);
    } catch (err) {
      setError("Failed to fetch products.");
      setLoading(false);
      console.error(err);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, [axiosPublic]);

  if (loading) {
    return <Loading></Loading>;
  }

  if (error) {
    return (
      <div className="text-red-500 text-center mt-2">
        {error} <br />
        Please try again later.
      </div>
    );
  }

  const handleDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "Do you want to delete this product?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
      background: `${theme === "dark" ? "#1D232A" : "#ffff"}`,
      color: `${theme === "dark" ? "#ffff" : " #1D232A"}`,
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await axiosPublic.delete(`/product/${id}`);

          fetchProducts();

          Swal.fire({
            title: "Deleted!",
            text: "The product has been deleted.",
            icon: "success",
            background: `${theme === "dark" ? "#1D232A" : "#ffff"}`,
            color: `${theme === "dark" ? "#ffff" : " #1D232A"}`,
          });
        } catch (error) {
          Swal.fire({
            title: "Error!",
            text: "Something went wrong while deleting the product.",
            icon: "error",
            background: `${theme === "dark" ? "#1D232A" : "#ffff"}`,
            color: `${theme === "dark" ? "#ffff" : " #1D232A"}`,
          });
          console.error("Error deleting product:", error);
        }
      }
    });
  };

  const handleUpdate = (id) => {
    navigate(`/dashboard/product-update/${id}`);
  };

  return (
    <div className="">
      <h3 className="text-4xl mb-10 text-center">Manage Products</h3>

      {/* Display all products */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 justify-items-center">
        {products.map((product) => (
          <div className="card bg-base-100  shadow-sm" key={product._id}>
            <figure>
              <img
                src={product.image || "https://via.placeholder.com/150"}
                alt={product.name}
                className="h-72 w-full bg-cover bg-center"
              />
            </figure>
            <div className="card-body">
              <h2 className="card-title">
                {product.name}
                <div className="badge badge-secondary">
                  {product.stockQuantity || 0}
                </div>
              </h2>
              <p>{product.description}</p>
              <div className="card-actions justify-between mt-2">
                <button
                  onClick={() => handleUpdate(product._id)}
                  className="btn badge badge-outline"
                >
                  <MdBrowserUpdated /> Update
                </button>
                {/* Delete button */}
                <button
                  onClick={() => handleDelete(product._id)}
                  className="btn badge badge-outline"
                >
                  <FaTrashAlt /> Delete
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ManageProduct;
