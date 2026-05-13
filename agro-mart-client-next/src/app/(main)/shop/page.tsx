"use client";
import React, { useState, useEffect, useContext, useCallback } from "react";
import { ThemeContext } from "@/providers/ThemeProvider";
import { useTranslation } from "react-i18next";
import Loading from "@/components/ui/Loading";
import ProductPrice from "@/components/ui/ProductPrice";
import useAuth from "@/hooks/useAuth";
import useAxiosSecure from "@/hooks/useAxiosSecure";
import toast from "react-hot-toast";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export default function ShopPage() {
  const { theme } = useContext(ThemeContext);
  const { t } = useTranslation();
  const user = useAuth();
  const axiosSecure = useAxiosSecure();
  const [products, setProducts] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState("");
  const [category, setCategory] = useState("");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const fetchProducts = useCallback(async () => {
    setIsLoading(true);
    try {
      const params = new URLSearchParams();
      if (search) params.set("search", search);
      if (sort) params.set("sort", sort);
      if (category) params.set("category", category);
      params.set("page", page.toString());
      params.set("limit", "12");
      const res = await fetch(`${API_URL}/products?${params.toString()}`);
      const data = await res.json();
      setProducts(data.products || data || []);
      setTotalPages(data.totalPages || 1);
    } catch (err) {
      console.error("Failed to fetch products:", err);
    }
    setIsLoading(false);
  }, [search, sort, category, page]);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  const addToCart = async (product: any) => {
    if (!user?.email) {
      toast.error("Please login first");
      return;
    }
    try {
      const cartItem = {
        productId: product._id,
        name: product.name,
        image: product.image,
        price: product.price,
        quantity: 1,
        email: user.email,
      };
      await axiosSecure.post("/add-to-cart", cartItem);
      toast.success("Added to cart!");
    } catch (err) {
      toast.error("Failed to add to cart");
    }
  };

  if (isLoading) return <Loading />;

  return (
    <div className="w-11/12 mx-auto py-10">
      <h1 className="text-4xl font-bold font-syne text-center mb-8">{t("shop.title") || "Our Products"}</h1>
      
      {/* Filters */}
      <div className="flex flex-col md:flex-row gap-4 mb-8 justify-center">
        <input
          type="text"
          placeholder="Search products..."
          className="input input-bordered w-full max-w-xs"
          value={search}
          onChange={(e) => { setSearch(e.target.value); setPage(1); }}
        />
        <select className="select select-bordered" value={sort} onChange={(e) => setSort(e.target.value)}>
          <option value="">Sort by</option>
          <option value="asc">Price: Low to High</option>
          <option value="desc">Price: High to Low</option>
        </select>
        <select className="select select-bordered" value={category} onChange={(e) => { setCategory(e.target.value); setPage(1); }}>
          <option value="">All Categories</option>
          <option value="vegetables">Vegetables</option>
          <option value="fruits">Fruits</option>
          <option value="grains">Grains</option>
          <option value="dairy">Dairy</option>
        </select>
      </div>

      {/* Products Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {products.map((product: any) => (
          <div key={product._id} className="card bg-base-100 shadow-xl">
            <figure className="p-4">
              <img src={product.image} alt={product.name} className="w-32 h-32 object-contain" />
            </figure>
            <div className="card-body text-center">
              <h2 className="text-lg font-semibold">{product.name}</h2>
              <div className="text-primary font-bold">
                <ProductPrice amount={product.price} />
              </div>
              <button onClick={() => addToCart(product)} className="btn btn-success btn-sm mt-2 text-white">
                Add to Cart
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex justify-center gap-2 mt-8">
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
            <button key={p} onClick={() => setPage(p)} className={`btn btn-sm ${page === p ? "btn-success text-white" : ""}`}>{p}</button>
          ))}
        </div>
      )}
    </div>
  );
}
