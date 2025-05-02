import { useContext, useEffect, useState } from "react";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import Loading from "../../components/loading/Loading";
import ProductsCard from "./ProductsCard";
import { ThemeContext } from "../../provider/ThemeProvider";
import { useQuery } from "@tanstack/react-query";
import { useTranslation } from "react-i18next";
import CurrencySelector from "../../components/CurrencySelector/CurrencySelector";

const Shop = () => {
  // State for products, sorting, search, and selected category
  const [sortBy, setSortBy] = useState("default");
  const [searchQuery, setSearchQuery] = useState("");
  const [error, setError] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const axiosPublic = useAxiosPublic();
  const { theme } = useContext(ThemeContext);
  const { t } = useTranslation();

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(8);

  // Fetch products from the database
  const { data: productsData = {}, isLoading } = useQuery({
    queryKey: [
      "products",
      { sortBy, searchQuery, selectedCategory, currentPage },
    ],
    queryFn: async () => {
      const response = await axiosPublic.get(
        `/products?sort=${sortBy}&&searchQuery=${searchQuery}&&selectedCategory=${selectedCategory}&&page=${currentPage}&&limit=${itemsPerPage}`
      );
      return response.data;
    },
  });

  const products = productsData.products || [];
  const totalPages = productsData.totalPages || 1;

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

  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  if (error) {
    return <div className="text-center text-red-500">{error}</div>;
  }

  return (
    <div className="py-10">
      <h1 className="text-3xl font-bold mb-5 text-center">
        {" "}
        {t("shop.title")}{" "}
      </h1>

      <div className="flex gap-7 w-11/12 mx-auto">
        {/* Left Sidebar for large screens */}
        <div className="w-1/4 p-5 rounded-lg shadow-sm hidden lg:block">
          {/* Search Box */}
          <div
            className={`${
              theme === "dark" ? "bg-black" : "bg-base-100"
            }  p-4 rounded-xl mb-5`}
          >
            <h3 className="text-xl font-bold mb-4">{t("shop.search")}</h3>
            <input
              type="text"
              placeholder={t("shop.searchPlaceholder")}
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
            <h3 className="text-xl font-semibold mb-3">
              {t("shop.categories.title")}
            </h3>
            <ul className="space-y-2">
              <li
                className="text-base-content flex justify-between cursor-pointer hover:text-green-700 transition-colors duration-300"
                onClick={() => handleCategoryClick("")}
              >
                <div>{t("shop.categories.all")}</div>
                <div>({products.length})</div>
              </li>
              <div className="divider"></div>
              <li
                className="text-base-content flex justify-between cursor-pointer hover:text-green-700 transition-colors duration-300"
                onClick={() => handleCategoryClick("Seeds & Plants")}
              >
                <div>{t("shop.categories.Seeds&Plants")}</div>
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
                <div>{t("shop.categories.FarmingEquipment")}</div>
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
                <div>{t("shop.categories.fertilizers")}</div>
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
                <div>{t("shop.categories.tools")}</div>
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
                <div>{t("shop.categories.Vegetables")}</div>
                <div>
                  ({products.filter((p) => p.category === "Vegetables").length})
                </div>
              </li>
              <div className="divider"></div>
              <li
                className="text-base-content flex justify-between cursor-pointer hover:text-green-700 transition-colors duration-300"
                onClick={() => handleCategoryClick("Fruits")}
              >
                <div>{t("shop.categories.fruits")}</div>
                <div>
                  ({products.filter((p) => p.category === "Fruits").length})
                </div>
              </li>
              <div className="divider"></div>
              <li
                className="text-base-content flex justify-between cursor-pointer hover:text-green-700 transition-colors duration-300"
                onClick={() => handleCategoryClick("Fresh Fish & Seafood")}
              >
                <div>{t("shop.categories.fish")}</div>
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
                <div>{t("shop.categories.dairy")}</div>
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
            <h3 className="text-xl font-semibold mb-3">
              {t("shop.tags.title")}
            </h3>
            <div className="flex flex-wrap gap-2">
              <span
                className={`${
                  theme === "dark"
                    ? "bg-black border border-green-700"
                    : "bg-gray-200"
                } hover:bg-green-700 transition-colors duration-300 text-base-content hover:text-white px-3 py-1 rounded-full`}
              >
                {t("shop.tags.Agriculture")}
              </span>
              <span
                className={`${
                  theme === "dark"
                    ? "bg-black border border-green-700"
                    : "bg-gray-200"
                } hover:bg-green-700 transition-colors duration-300 text-base-content hover:text-white px-3 py-1 rounded-full`}
              >
                {t("shop.tags.Dairy")}
              </span>
              <span
                className={`${
                  theme === "dark"
                    ? "bg-black border border-green-700"
                    : "bg-gray-200"
                } hover:bg-green-700 transition-colors duration-300 text-base-content hover:text-white px-3 py-1 rounded-full`}
              >
                {t("shop.tags.Design")}
              </span>
              <span
                className={`${
                  theme === "dark"
                    ? "bg-black border border-green-700"
                    : "bg-gray-200"
                } hover:bg-green-700 transition-colors duration-300 text-base-content hover:text-white px-3 py-1 rounded-full`}
              >
                {t("shop.tags.Garden")}
              </span>
              <span
                className={`${
                  theme === "dark"
                    ? "bg-black border border-green-700"
                    : "bg-gray-200"
                } hover:bg-green-700 transition-colors duration-300 text-base-content hover:text-white px-3 py-1 rounded-full`}
              >
                {t("shop.tags.Healthy")}
              </span>
              <span
                className={`${
                  theme === "dark"
                    ? "bg-black border border-green-700"
                    : "bg-gray-200"
                } hover:bg-green-700 transition-colors duration-300 text-base-content hover:text-white px-3 py-1 rounded-full`}
              >
                {t("shop.tags.Landscaping")}
              </span>
              <span
                className={`${
                  theme === "dark"
                    ? "bg-black border border-green-700"
                    : "bg-gray-200"
                } hover:bg-green-700 transition-colors duration-300 text-base-content hover:text-white px-3 py-1 rounded-full`}
              >
                {t("shop.tags.Natural")}
              </span>
              <span
                className={`${
                  theme === "dark"
                    ? "bg-black border border-green-700"
                    : "bg-gray-200"
                } hover:bg-green-700 transition-colors duration-300 text-base-content hover:text-white px-3 py-1 rounded-full`}
              >
                {t("shop.tags.Organic")}
              </span>
            </div>
          </div>
        </div>

        {/* Product Listing */}
        <div className="w-full lg:w-3/4 ">
          {/* Filters */}
          <div className="my-5 flex justify-between ">
            <div className="hidden lg:block">
              <span className="text-xl font-semibold">
                {t("shop.showing")} {products.length} {t("shop.products")}
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
                  className="btn bg-green-600 drawer-button"
                >
                  {t("shop.filters")}
                </label>
              </div>

              {/* Sidebar content (this will be shown for mobile and tablet) */}
              <div className="drawer-side z-50">
                <label
                  htmlFor="my-drawer-4"
                  aria-label="close sidebar"
                  className="drawer-overlay"
                ></label>
                <div className="w-64 p-5 bg-base-100 rounded-lg shadow-sm">
                  {/* Search Box */}
                  <div
                    className={`${
                      theme === "dark" ? "bg-black" : "bg-base-100"
                    }  p-4 rounded-xl mb-5`}
                  >
                    <h3 className=" text-xl font-bold mb-4">
                      {t("shop.search")}
                    </h3>
                    <input
                      type="text"
                      placeholder={t("shop.searchPlaceholder")}
                      value={searchQuery}
                      onChange={handleSearchChange}
                      className="p-2 border border-gray-300 rounded-full w-full mb-5"
                    />
                  </div>

                  {/* Categories */}
                  <div
                    className={`${
                      theme === "dark" ? "bg-black " : "bg-white"
                    } p-4 rounded-lg mb-5`}
                  >
                    <h3 className="text-xl font-semibold mb-3">
                      {" "}
                      {t("shop.categories.title")}{" "}
                    </h3>
                    <ul className="space-y-2">
                      <li
                        className="text-base-content flex justify-between cursor-pointer hover:text-green-700"
                        onClick={() => handleCategoryClick("")}
                      >
                        <div>{t("shop.categories.all")}</div>
                        <div>({products.length})</div>
                      </li>
                      <div className="divider"></div>
                      <li
                        className="text-base-content flex justify-between cursor-pointer hover:text-green-700"
                        onClick={() => handleCategoryClick("Seeds & Plants")}
                      >
                        <div>{t("shop.categories.Seeds&Plants")}</div>
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
                        <div>{t("shop.categories.FarmingEquipment")}</div>
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
                        <div>{t("shop.categories.fertilizers")}</div>
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
                        <div>{t("shop.categories.tools")}</div>
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
                        <div>{t("shop.categories.Vegetables")}</div>
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
                        <div>{t("shop.categories.fruits")}</div>
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
                        <div>{t("shop.categories.fish")}</div>
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
                        <div>{t("shop.categories.dairy")}</div>
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
                    <h3 className="text-black text-xl font-semibold mb-3">
                      {t("shop.tags.title")}
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      <span
                        className={`${
                          theme === "dark"
                            ? "bg-black border border-green-700"
                            : "bg-gray-200"
                        } hover:bg-green-700 text-base-content hover:text-white px-3 py-1 rounded-full`}
                      >
                        {t("shop.tags.Agriculture")}
                      </span>
                      <span
                        className={`${
                          theme === "dark"
                            ? "bg-black border border-green-700"
                            : "bg-gray-200"
                        } hover:bg-green-700 text-base-content hover:text-white px-3 py-1 rounded-full`}
                      >
                        {t("shop.tags.Dairy")}
                      </span>
                      <span
                        className={`${
                          theme === "dark"
                            ? "bg-black border border-green-700"
                            : "bg-gray-200"
                        } hover:bg-green-700 text-base-content hover:text-white px-3 py-1 rounded-full`}
                      >
                        {t("shop.tags.Design")}
                      </span>
                      <span
                        className={`${
                          theme === "dark"
                            ? "bg-black border border-green-700"
                            : "bg-gray-200"
                        } hover:bg-green-700 text-base-content hover:text-white px-3 py-1 rounded-full`}
                      >
                        {t("shop.tags.Garden")}
                      </span>
                      <span
                        className={`${
                          theme === "dark"
                            ? "bg-black border border-green-700"
                            : "bg-gray-200"
                        } hover:bg-green-700 text-base-content hover:text-white px-3 py-1 rounded-full`}
                      >
                        {t("shop.tags.Healthy")}
                      </span>
                      <span
                        className={`${
                          theme === "dark"
                            ? "bg-black border border-green-700"
                            : "bg-gray-200"
                        } hover:bg-green-700 text-base-content hover:text-white px-3 py-1 rounded-full`}
                      >
                        {t("shop.tags.Landscaping")}
                      </span>
                      <span
                        className={`${
                          theme === "dark"
                            ? "bg-black border border-green-700"
                            : "bg-gray-200"
                        } hover:bg-green-700 text-base-content hover:text-white px-3 py-1 rounded-full`}
                      >
                        {t("shop.tags.Natural")}
                      </span>
                      <span
                        className={`${
                          theme === "dark"
                            ? "bg-black border border-green-700"
                            : "bg-gray-200"
                        } hover:bg-green-700 text-base-content hover:text-white px-3 py-1 rounded-full`}
                      >
                        {t("shop.tags.Organic")}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex gap-3 items-center">
              <div>
                <CurrencySelector></CurrencySelector>
              </div>
              <div>
                <select
                  onChange={handleSortChange}
                  className="py-2 px-4 border border-gray-300 rounded-full"
                >
                  <option value=""> {t("shop.sortOptions.default")} </option>
                  <option value={1}>
                    {" "}
                    {t("shop.sortOptions.priceLowToHigh")}{" "}
                  </option>
                  <option value={-1}>
                    {" "}
                    {t("shop.sortOptions.priceHighToLow")}{" "}
                  </option>
                </select>
              </div>
            </div>
          </div>

          {/* Products */}
          {isLoading ? (
            <Loading></Loading>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 rounded-br-3xl">
              {products.map((product) => (
                <ProductsCard
                  product={product}
                  key={product._id}
                ></ProductsCard>
              ))}
            </div>
          )}

          {/* Pagination Controls */}
          <div className="flex justify-center mt-14">
            <button
              onClick={() => paginate(currentPage - 1)}
              disabled={currentPage === 1}
              className={`px-4 py-2 bg-green-700 text-base-content rounded-full mx-1 ${
                theme === "dark"
                  ? "disabled:bg-gray-700"
                  : " disabled:bg-gray-300 "
              }`}
            >
              {t("shop.previous")}
            </button>

            {Array.from({ length: totalPages }, (_, i) => (
              <button
                key={i + 1}
                onClick={() => paginate(i + 1)}
                className={`px-4 py-2 mx-1 rounded-full text-base-content ${
                  currentPage === i + 1
                    ? "bg-green-700 text-white"
                    : theme === "dark"
                    ? "bg-gray-700 "
                    : "bg-gray-300"
                }`}
              >
                {i + 1}
              </button>
            ))}

            <button
              onClick={() => paginate(currentPage + 1)}
              disabled={currentPage === totalPages}
              className={`px-4 py-2 bg-green-700 text-base-content rounded-full mx-1 ${
                theme === "dark"
                  ? "disabled:bg-gray-700"
                  : " disabled:bg-gray-300 "
              }`}
            >
              {t("shop.next")}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Shop;
