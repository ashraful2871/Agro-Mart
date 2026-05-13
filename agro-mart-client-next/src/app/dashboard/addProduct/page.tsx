"use client";
import React, { useState } from "react";
import useAxiosSecure from "@/hooks/useAxiosSecure";
import useAuth from "@/hooks/useAuth";
import { imageUpload } from "@/lib/utils";
import toast from "react-hot-toast";

export default function AddProductPage() {
  const axiosSecure = useAxiosSecure();
  const user = useAuth();
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    const formData = new FormData(e.currentTarget);
    try {
      const imageFile = formData.get("image") as File;
      let image = "";
      if (imageFile && imageFile.size > 0) {
        image = await imageUpload(imageFile);
      }
      const product = {
        name: formData.get("name"),
        price: Number(formData.get("price")),
        category: formData.get("category"),
        description: formData.get("description"),
        quantity: Number(formData.get("quantity")),
        image,
        sellerEmail: user?.email,
        sellerName: user?.displayName,
      };
      const { data } = await axiosSecure.post("/products", product);
      if (data.insertedId) {
        toast.success("Product added!");
        (e.target as HTMLFormElement).reset();
      }
    } catch (err) {
      toast.error("Failed to add product");
    }
    setLoading(false);
  };

  return (
    <div>
      <h1 className="text-3xl font-bold font-syne mb-6">Add Product</h1>
      <form onSubmit={handleSubmit} className="max-w-xl space-y-4">
        <input type="text" name="name" placeholder="Product Name" required className="input input-bordered w-full" />
        <input type="number" name="price" placeholder="Price" required className="input input-bordered w-full" />
        <input type="number" name="quantity" placeholder="Quantity" required className="input input-bordered w-full" />
        <select name="category" className="select select-bordered w-full">
          <option value="vegetables">Vegetables</option>
          <option value="fruits">Fruits</option>
          <option value="grains">Grains</option>
          <option value="dairy">Dairy</option>
        </select>
        <textarea name="description" placeholder="Description" className="textarea textarea-bordered w-full" rows={3}></textarea>
        <input type="file" name="image" accept="image/*" className="file-input file-input-bordered w-full" />
        <button type="submit" disabled={loading} className="btn bg-green-600 text-white w-full">
          {loading ? <span className="loading loading-spinner"></span> : "Add Product"}
        </button>
      </form>
    </div>
  );
}
