"use client";
import { useState, useEffect, useCallback } from "react";
import useAxiosSecure from "./useAxiosSecure";
import useAuth from "./useAuth";

const useWishlist = () => {
  const user = useAuth();
  const axiosSecure = useAxiosSecure();
  const [wishlist, setWishlist] = useState<any[]>([]);

  const fetchWishlist = useCallback(async () => {
    if (user?.email) {
      try {
        const { data } = await axiosSecure.get(`/wishlist/${user.email}`);
        setWishlist(data || []);
      } catch (err) {
        console.error("Failed to fetch wishlist:", err);
      }
    }
  }, [user?.email, axiosSecure]);

  useEffect(() => {
    fetchWishlist();
  }, [fetchWishlist]);

  return [wishlist, fetchWishlist] as const;
};

export default useWishlist;
