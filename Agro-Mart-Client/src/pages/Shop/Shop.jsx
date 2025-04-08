import { useContext, useEffect, useState } from "react";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import { IoCart } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import Loading from "../../components/loading/Loading";
import ProductsCard from "./ProductsCard";
import { ThemeContext } from "../../provider/ThemeProvider";

const Shop = () => {
  // State for products, sorting, search, and selected category
  const [products, setProducts] = useState([]);
  const [sortBy, setSortBy] = useState("default");
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const axiosPublic = useAxiosPublic();
  const navigate = useNavigate();
  const { theme } = useContext(ThemeContext);

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(6);

  // Fetch products from the database
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axiosPublic.get(
          `/products?sort=${sortBy}&&searchQuery=${searchQuery}&&selectedCategory=${selectedCategory}`
        );
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

    fetchProducts();
  }, [sortBy, searchQuery, selectedCategory]);

  // Handle sorting
  const handleSortChange = (e) => {
    setSortBy(e.target.value);
  };

  // Handle search
  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
    setCurrentPage(1);
  };

  // Handle category click
  const handleCategoryClick = (category) => {
    setSelectedCategory(category);
    setCurrentPage(1);
  };

  const handleDetails = (id) => {
    navigate(`/dashboard/product/${id}`);
  };

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentProducts = products.slice(indexOfFirstItem, indexOfLastItem);

  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  if (loading) {
    return (
      <div className="text-center text-xl">
        <Loading></Loading>
      </div>
    );
  }

  if (error) {
    return <div className="text-center text-red-500">{error}</div>;
  }

  return (
    <div className="py-10">
      <h1 className="text-3xl font-bold mb-5 text-center">Product Listing</h1>

      <div className="flex gap-7 w-11/12 mx-auto">
        {/* Left Sidebar for large screens */}
        <div className="w-1/4 p-5 rounded-lg shadow-sm hidden lg:block">
          {/* Search Box */}
          <div
            className={`${
              theme === "dark" ? "bg-black" : "bg-base-100"
            }  p-4 rounded-xl mb-5`}
          >
            <h3 className="text-xl font-bold mb-4">Search</h3>
            <input
              type="text"
              placeholder="Search products by name..."
              value={searchQuery}
              onChange={handleSearchChange}
              className="p-2 border border-gray-300 rounded-full w-full mb-5"
            />
          </div>

          {/* Categories */}
          <div
            className={`${
              theme === "dark" ? "bg-black" : "bg-base-100"
            }  p-4 rounded-xl mb-5`}
          >
            <h3 className="text-xl font-semibold mb-3">Categories</h3>
            <ul className="space-y-2">
              <li
                className="text-base-content flex justify-between cursor-pointer hover:text-green-700 transition-colors duration-300"
                onClick={() => handleCategoryClick("")}
              >
                <div>All Categories</div>
                <div>({products.length})</div>
              </li>
              <div className="divider"></div>
              <li
                className="text-base-content flex justify-between cursor-pointer hover:text-green-700 transition-colors duration-300"
                onClick={() => handleCategoryClick("Seeds & Plants")}
              >
                <div>Seeds & Plants</div>
                <div>
                  (
                  {
                    products.filter((p) => p.category === "Seeds & Plants")
                      .length
                  }
                  )
                </div>
              </li>
              <div className="divider"></div>
              <li
                className="text-base-content flex justify-between cursor-pointer hover:text-green-700 transition-colors duration-300"
                onClick={() => handleCategoryClick("Farming Equipment")}
              >
                <div>Farming Equipment</div>
                <div>
                  (
                  {
                    products.filter((p) => p.category === "Farming Equipment")
                      .length
                  }
                  )
                </div>
              </li>
              <div className="divider"></div>
              <li
                className="text-base-content flex justify-between cursor-pointer hover:text-green-700 transition-colors duration-300"
                onClick={() => handleCategoryClick("Fertilizers & Pesticides")}
              >
                <div>Fertilizers & Pesticides</div>
                <div>
                  (
                  {
                    products.filter(
                      (p) => p.category === "Fertilizers & Pesticides"
                    ).length
                  }
                  )
                </div>
              </li>
              <div className="divider"></div>
              <li
                className="text-base-content flex justify-between cursor-pointer hover:text-green-700 transition-colors duration-300"
                onClick={() => handleCategoryClick("Agricultural Tools")}
              >
                <div>Agricultural Tools</div>
                <div>
                  (
                  {
                    products.filter((p) => p.category === "Agricultural Tools")
                      .length
                  }
                  )
                </div>
              </li>
              <div className="divider"></div>
              <li
                className="text-base-content flex justify-between cursor-pointer hover:text-green-700 transition-colors duration-300"
                onClick={() => handleCategoryClick("Vegetables")}
              >
                <div>Vegetables</div>
                <div>
                  ({products.filter((p) => p.category === "Vegetables").length})
                </div>
              </li>
              <div className="divider"></div>
              <li
                className="text-base-content flex justify-between cursor-pointer hover:text-green-700 transition-colors duration-300"
                onClick={() => handleCategoryClick("Fruits")}
              >
                <div>Fruits</div>
                <div>
                  ({products.filter((p) => p.category === "Fruits").length})
                </div>
              </li>
              <div className="divider"></div>
              <li
                className="text-base-content flex justify-between cursor-pointer hover:text-green-700 transition-colors duration-300"
                onClick={() => handleCategoryClick("Fresh Fish & Seafood")}
              >
                <div>Fresh Fish & Seafood</div>
                <div>
                  (
                  {
                    products.filter(
                      (p) => p.category === "Fresh Fish & Seafood"
                    ).length
                  }
                  )
                </div>
              </li>
              <div className="divider"></div>
              <li
                className="text-base-content flex justify-between cursor-pointer hover:text-green-700 transition-colors duration-300"
                onClick={() => handleCategoryClick("Dairy & Milk Products")}
              >
                <div>Dairy & Milk Products</div>
                <div>
                  (
                  {
                    products.filter(
                      (p) => p.category === "Dairy & Milk Products"
                    ).length
                  }
                  )
                </div>
              </li>
            </ul>
          </div>

          {/* Tags */}
          <div
            className={`${
              theme === "dark" ? "bg-black" : "bg-base-100"
            } p-4 rounded-xl mb-5`}
          >
            <h3 className="text-xl font-semibold mb-3">Tags</h3>
            <div className="flex flex-wrap gap-2">
              <span
                className={`${
                  theme === "dark"
                    ? "bg-black border border-green-700"
                    : "bg-gray-200"
                } hover:bg-green-700 transition-colors duration-300 text-base-content hover:text-white px-3 py-1 rounded-full`}
              >
                Agriculture
              </span>
              <span
                className={`${
                  theme === "dark"
                    ? "bg-black border border-green-700"
                    : "bg-gray-200"
                } hover:bg-green-700 transition-colors duration-300 text-base-content hover:text-white px-3 py-1 rounded-full`}
              >
                Dairy
              </span>
              <span
                className={`${
                  theme === "dark"
                    ? "bg-black border border-green-700"
                    : "bg-gray-200"
                } hover:bg-green-700 transition-colors duration-300 text-base-content hover:text-white px-3 py-1 rounded-full`}
              >
                Design
              </span>
              <span
                className={`${
                  theme === "dark"
                    ? "bg-black border border-green-700"
                    : "bg-gray-200"
                } hover:bg-green-700 transition-colors duration-300 text-base-content hover:text-white px-3 py-1 rounded-full`}
              >
                Garden
              </span>
              <span
                className={`${
                  theme === "dark"
                    ? "bg-black border border-green-700"
                    : "bg-gray-200"
                } hover:bg-green-700 transition-colors duration-300 text-base-content hover:text-white px-3 py-1 rounded-full`}
              >
                Healthy
              </span>
              <span
                className={`${
                  theme === "dark"
                    ? "bg-black border border-green-700"
                    : "bg-gray-200"
                } hover:bg-green-700 transition-colors duration-300 text-base-content hover:text-white px-3 py-1 rounded-full`}
              >
                Landscaping
              </span>
              <span
                className={`${
                  theme === "dark"
                    ? "bg-black border border-green-700"
                    : "bg-gray-200"
                } hover:bg-green-700 transition-colors duration-300 text-base-content hover:text-white px-3 py-1 rounded-full`}
              >
                Nature
              </span>
              <span
                className={`${
                  theme === "dark"
                    ? "bg-black border border-green-700"
                    : "bg-gray-200"
                } hover:bg-green-700 transition-colors duration-300 text-base-content hover:text-white px-3 py-1 rounded-full`}
              >
                Organic
              </span>
            </div>
          </div>
        </div>

        {/* Product Listing */}
        <div className="w-full lg:w-3/4">
          {/* Filters */}
          <div className="my-5 flex justify-between">
            <div className="hidden lg:block">
              <span className="text-xl font-semibold">
                Showing {products.length} products
              </span>
            </div>

            {/* Drawer for small and medium screens */}
            <div className="drawer drawer-end lg:hidden">
              <input
                id="my-drawer-4"
                type="checkbox"
                className="drawer-toggle"
              />
              <div className="drawer-content">
                {/* Button to open the drawer for small and medium screens */}
                <label
                  htmlFor="my-drawer-4"
                  className="btn bg-[#c3e858] drawer-button"
                >
                  Filter
                </label>
              </div>

              {/* Sidebar content (this will be shown for mobile and tablet) */}
              <div className="drawer-side z-50">
                <label
                  htmlFor="my-drawer-4"
                  aria-label="close sidebar"
                  className="drawer-overlay"
                ></label>
                <div className="w-64 p-5 bg-white rounded-lg shadow-sm">
                  {/* Search Box */}
                  <div  className={`${
                    theme === "dark" ? "bg-black" : "bg-base-100"
                  }  p-4 rounded-xl mb-5`} >
                    <h3 className=" text-xl font-bold mb-4">Search</h3>
                    <input
                      type="text"
                      placeholder="Search products by name..."
                      value={searchQuery}
                      onChange={handleSearchChange}
                      className="p-2 border border-gray-300 rounded-full w-full mb-5"
                    />
                  </div>

                  {/* Categories */}
                  <div
                  className={`${
                    theme === "dark"
                      ? "bg-black border"
                      : "bg-white"
                  } p-4 rounded-lg mb-5`}>
                    <h3 className="text-xl font-semibold mb-3">Categories</h3>
                    <ul className="space-y-2">
                      <li
                        className="text-base-content flex justify-between cursor-pointer hover:text-green-700"
                        onClick={() => handleCategoryClick("")}
                      >
                        <div>All Categories</div>
                        <div>({products.length})</div>
                      </li>
                      <div className="divider"></div>
                      <li
                        className="text-base-content flex justify-between cursor-pointer hover:text-green-700"
                        onClick={() => handleCategoryClick("Seeds & Plants")}
                      >
                        <div>Seeds & Plants</div>
                        <div>
                          (
                          {
                            products.filter(
                              (p) => p.category === "Seeds & Plants"
                            ).length
                          }
                          )
                        </div>
                      </li>
                      <div className="divider"></div>
                      <li
                        className="text-base-content flex justify-between cursor-pointer hover:text-green-700"
                        onClick={() => handleCategoryClick("Farming Equipment")}
                      >
                        <div>Farming Equipment</div>
                        <div>
                          (
                          {
                            products.filter(
                              (p) => p.category === "Farming Equipment"
                            ).length
                          }
                          )
                        </div>
                      </li>
                      <div className="divider"></div>
                      <li
                        className="text-base-content flex justify-between cursor-pointer hover:text-green-700"
                        onClick={() =>
                          handleCategoryClick("Fertilizers & Pesticides")
                        }
                      >
                        <div>Fertilizers & Pesticides</div>
                        <div>
                          (
                          {
                            products.filter(
                              (p) => p.category === "Fertilizers & Pesticides"
                            ).length
                          }
                          )
                        </div>
                      </li>
                      <div className="divider"></div>
                      <li
                        className="text-base-content flex justify-between cursor-pointer hover:text-green-700"
                        onClick={() =>
                          handleCategoryClick("Agricultural Tools")
                        }
                      >
                        <div>Agricultural Tools</div>
                        <div>
                          (
                          {
                            products.filter(
                              (p) => p.category === "Agricultural Tools"
                            ).length
                          }
                          )
                        </div>
                      </li>
                      <div className="divider"></div>
                      <li
                        className="text-base-content flex justify-between cursor-pointer hover:text-green-700"
                        onClick={() => handleCategoryClick("Vegetables")}
                      >
                        <div>Vegetables</div>
                        <div>
                          (
                          {
                            products.filter((p) => p.category === "Vegetables")
                              .length
                          }
                          )
                        </div>
                      </li>
                      <div className="divider"></div>
                      <li
                        className="text-base-content flex justify-between cursor-pointer hover:text-green-700"
                        onClick={() => handleCategoryClick("Fruits")}
                      >
                        <div>Fruits</div>
                        <div>
                          (
                          {
                            products.filter((p) => p.category === "Fruits")
                              .length
                          }
                          )
                        </div>
                      </li>
                      <div className="divider"></div>
                      <li
                        className="text-base-content flex justify-between cursor-pointer hover:text-green-700"
                        onClick={() =>
                          handleCategoryClick("Fresh Fish & Seafood")
                        }
                      >
                        <div>Fresh Fish & Seafood</div>
                        <div>
                          (
                          {
                            products.filter(
                              (p) => p.category === "Fresh Fish & Seafood"
                            ).length
                          }
                          )
                        </div>
                      </li>
                      <div className="divider"></div>
                      <li
                        className="text-base-content flex justify-between cursor-pointer hover:text-green-700"
                        onClick={() =>
                          handleCategoryClick("Dairy & Milk Products")
                        }
                      >
                        <div>Dairy & Milk Products</div>
                        <div>
                          (
                          {
                            products.filter(
                              (p) => p.category === "Dairy & Milk Products"
                            ).length
                          }
                          )
                        </div>
                      </li>
                    </ul>
                  </div>

                  {/* Tags */}
                  <div  className={`${
              theme === "dark" ? "bg-black" : "bg-base-100"
            } p-4 rounded-xl mb-5`}>
                    <h3 className="text-black text-xl font-semibold mb-3">Tags</h3>
                    <div className="flex flex-wrap gap-2">
                      <span
                        className={`${
                          theme === "dark"
                            ? "bg-black border border-green-700"
                            : "bg-gray-200"
                        } hover:bg-green-700 text-base-content hover:text-white px-3 py-1 rounded-full`}
                      >
                        Agriculture
                      </span>
                      <span
                        className={`${
                          theme === "dark"
                            ? "bg-black border border-green-700"
                            : "bg-gray-200"
                        } hover:bg-green-700 text-base-content hover:text-white px-3 py-1 rounded-full`}
                      >
                        Dairy
                      </span>
                      <span
                        className={`${
                          theme === "dark"
                            ? "bg-black border border-green-700"
                            : "bg-gray-200"
                        } hover:bg-green-700 text-base-content hover:text-white px-3 py-1 rounded-full`}
                      >
                        Design
                      </span>
                      <span
                        className={`${
                          theme === "dark"
                            ? "bg-black border border-green-700"
                            : "bg-gray-200"
                        } hover:bg-green-700 text-base-content hover:text-white px-3 py-1 rounded-full`}
                      >
                        Garden
                      </span>
                      <span
                        className={`${
                          theme === "dark"
                            ? "bg-black border border-green-700"
                            : "bg-gray-200"
                        } hover:bg-green-700 text-base-content hover:text-white px-3 py-1 rounded-full`}
                      >
                        Healthy
                      </span>
                      <span
                        className={`${
                          theme === "dark"
                            ? "bg-black border border-green-700"
                            : "bg-gray-200"
                        } hover:bg-green-700 text-base-content hover:text-white px-3 py-1 rounded-full`}
                      >
                        Landscaping
                      </span>
                      <span
                        className={`${
                          theme === "dark"
                            ? "bg-black border border-green-700"
                            : "bg-gray-200"
                        } hover:bg-green-700 text-base-content hover:text-white px-3 py-1 rounded-full`}
                      >
                        Nature
                      </span>
                      <span
                        className={`${
                          theme === "dark"
                            ? "bg-black border border-green-700"
                            : "bg-gray-200"
                        } hover:bg-green-700 text-base-content hover:text-white px-3 py-1 rounded-full`}
                      >
                        Organic
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div>
              <select
                onChange={handleSortChange}
                className="py-2 px-4 border border-gray-300 rounded-full"
              >
                <option value="">Default sorting</option>
                <option value={1}>Price: Low to High</option>
                <option value={-1}>Price: High to Low</option>
              </select>
            </div>
          </div>

          {/* Products */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 rounded-br-3xl">
            {products.map((product) => (
              <ProductsCard product={product} key={product._id}></ProductsCard>
            ))}
          </div>

          {/* Pagination Controls */}
          <div className="flex justify-center mt-8">
            <button
              onClick={() => paginate(currentPage - 1)}
              disabled={currentPage === 1}
              className="px-4 py-2 bg-green-700 text-white rounded-full mx-1 disabled:bg-gray-300"
            >
              Previous
            </button>
            {Array.from(
              { length: Math.ceil(products.length / itemsPerPage) },
              (_, i) => (
                <button
                  key={i + 1}
                  onClick={() => paginate(i + 1)}
                  className={`px-4 py-2 mx-1 rounded-full ${
                    currentPage === i + 1
                      ? "bg-green-700 text-white"
                      : "bg-gray-200 text-base-content"
                  }`}
                >
                  {i + 1}
                </button>
              )
            )}
            <button
              onClick={() => paginate(currentPage + 1)}
              disabled={
                currentPage === Math.ceil(products.length / itemsPerPage)
              }
              className="px-4 py-2 bg-green-700 text-white rounded-full mx-1 disabled:bg-gray-300"
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Shop;
