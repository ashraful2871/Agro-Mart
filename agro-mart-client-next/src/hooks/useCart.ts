"use client";
import { useState, useEffect, useCallback } from "react";
import useAxiosSecure from "./useAxiosSecure";
import useAuth from "./useAuth";

const useCart = () => {
  const axiosSecure = useAxiosSecure();
  const user = useAuth();
  const [cart, setCart] = useState<any[]>([]);

  const fetchCart = useCallback(async () => {
    if (user?.email) {
      try {
        const { data } = await axiosSecure.get(`/all-cart-items/${user.email}`);
        setCart(data || []);
      } catch (err) {
        console.error("Failed to fetch cart:", err);
      }
    }
  }, [user?.email, axiosSecure]);

  useEffect(() => {
    fetchCart();
  }, [fetchCart]);

  return [cart, fetchCart] as const;
};

export default useCart;
