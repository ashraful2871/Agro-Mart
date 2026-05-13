"use client";
import useWishlist from "@/hooks/useWishlist";
import useAxiosSecure from "@/hooks/useAxiosSecure";
import ProductPrice from "@/components/ui/ProductPrice";
import toast from "react-hot-toast";

export default function WishlistPage() {
  const [wishlist, refetch] = useWishlist();
  const axiosSecure = useAxiosSecure();

  const handleRemove = async (id: string) => {
    try {
      await axiosSecure.delete(`/wishlist/${id}`);
      toast.success("Removed from wishlist");
      refetch();
    } catch { toast.error("Failed to remove"); }
  };

  return (
    <div>
      <h1 className="text-3xl font-bold font-syne mb-6">My Wishlist</h1>
      {wishlist.length === 0 ? (
        <p className="text-center text-base-content py-10">Your wishlist is empty</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {wishlist.map((item: any) => (
            <div key={item._id} className="card bg-base-100 shadow-md border">
              <figure className="p-4"><img src={item.image} alt={item.name} className="w-24 h-24 object-contain" /></figure>
              <div className="card-body text-center">
                <h3 className="font-bold">{item.name}</h3>
                <ProductPrice amount={item.price} />
                <button onClick={() => handleRemove(item._id)} className="btn btn-error btn-sm text-white mt-2">Remove</button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
