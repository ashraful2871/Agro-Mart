import { useContext, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { FaTrashAlt } from "react-icons/fa";
import Swal from "sweetalert2";
import { MdBrowserUpdated } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import Loading from "../../../../components/loading/Loading";
import { ThemeContext } from "../../../../provider/ThemeProvider";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";

const ManageProduct = () => {
  const { t } = useTranslation();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();
  const { theme } = useContext(ThemeContext);

  const fetchProducts = async () => {
    try {
      const response = await axiosSecure.get("/products");
      console.log("Fetched Products:", response.data);
      if (Array.isArray(response.data)) {
        setProducts(response.data);
      } else {
        setError(t("dashboard.seller.manage-product.format_error"));
      }
      setLoading(false);
    } catch (err) {
      setError(t("dashboard.seller.manage-product.fetch_error"));
      setLoading(false);
      console.error(err);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, [axiosSecure]);

  if (loading) {
    return <Loading />;
  }

  if (products.length === 0) {
    return (
      <div className="text-center mt-2 text-red-500">
        {t("dashboard.seller.manage-product.no_products")}
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-red-500 text-center mt-2">
        {error} <br />
        {t("dashboard.seller.manage-product.try_again")}
      </div>
    );
  }

  const handleDelete = (id) => {
    Swal.fire({
      title: t("dashboard.seller.manage-product.swal.confirm_title"),
      text: t("dashboard.seller.manage-product.swal.confirm_text"),
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: t(
        "dashboard.seller.manage-product.swal.confirm_button"
      ),
      cancelButtonText: t("dashboard.seller.manage-product.swal.cancel_button"),
      background: `${theme === "dark" ? "#1D232A" : "#ffff"}`,
      color: `${theme === "dark" ? "#ffff" : " #1D232A"}`,
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await axiosSecure.delete(`/product/${id}`);

          fetchProducts();

          Swal.fire({
            title: t("dashboard.seller.manage-product.swal.success_title"),
            text: t("dashboard.seller.manage-product.swal.success_text"),
            icon: "success",
            background: `${theme === "dark" ? "#1D232A" : "#ffff"}`,
            color: `${theme === "dark" ? "#ffff" : " #1D232A"}`,
          });
        } catch (error) {
          Swal.fire({
            title: t("dashboard.seller.manage-product.swal.error_title"),
            text: t("dashboard.seller.manage-product.swal.error_text"),
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
      <h3 className="text-4xl mt-6 mb-10 text-center">
        {t("dashboard.seller.manage-product.title")}
      </h3>

      {/* Display all products */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 justify-items-center">
        {products.map((product) => (
          <div className="card bg-base-100 shadow-sm" key={product._id}>
            <figure>
              <img
                src={product.image || "https://via.placeholder.com/150"}
                alt={product.name}
                className="h-64 w-full bg-cover bg-center"
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
                  <MdBrowserUpdated />{" "}
                  {t("dashboard.seller.manage-product.update_button")}
                </button>
                {/* Delete button */}
                <button
                  onClick={() => handleDelete(product._id)}
                  className="btn badge badge-outline"
                >
                  <FaTrashAlt />{" "}
                  {t("dashboard.seller.manage-product.delete_button")}
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
