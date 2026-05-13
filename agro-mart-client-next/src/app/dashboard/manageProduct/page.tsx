"use client";
import { useState, useEffect } from "react";
import useAxiosSecure from "@/hooks/useAxiosSecure";
import useAuth from "@/hooks/useAuth";
import Link from "next/link";
import toast from "react-hot-toast";
import ProductPrice from "@/components/ui/ProductPrice";

export default function ManageProductPage() {
  const axiosSecure = useAxiosSecure();
  const user = useAuth();
  const [products, setProducts] = useState<any[]>([]);

  useEffect(() => {
    if (user?.email) {
      axiosSecure.get(`/products/seller/${user.email}`).then(({ data }) => setProducts(data || [])).catch(console.error);
    }
  }, [user?.email, axiosSecure]);

  const handleDelete = async (id: string) => {
    try {
      await axiosSecure.delete(`/products/${id}`);
      setProducts(products.filter((p) => p._id !== id));
      toast.success("Product deleted");
    } catch { toast.error("Failed to delete"); }
  };

  return (
    <div>
      <h1 className="text-3xl font-bold font-syne mb-6">Manage Products</h1>
      <div className="overflow-x-auto">
        <table className="table w-full">
          <thead><tr><th>Image</th><th>Name</th><th>Price</th><th>Actions</th></tr></thead>
          <tbody>
            {products.map((p: any) => (
              <tr key={p._id}>
                <td><img src={p.image} alt={p.name} className="w-12 h-12 rounded" /></td>
                <td>{p.name}</td>
                <td><ProductPrice amount={p.price} /></td>
                <td className="flex gap-2">
                  <Link href={`/dashboard/product-update/${p._id}`} className="btn btn-sm btn-warning">Edit</Link>
                  <button onClick={() => handleDelete(p._id)} className="btn btn-sm btn-error text-white">Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
