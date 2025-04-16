import { useQuery } from "@tanstack/react-query";
import React from "react";
import useAxiosSecure from "./useAxiosSecure";
import useAuth from "./useAuth";

const useCart = () => {
  const axiosSecure = useAxiosSecure();
  const user = useAuth();
  const { data: cart = [], refetch } = useQuery({
    queryKey: ["all-cart", user?.email],
    queryFn: async () => {
      if (user) {
        const { data } = await axiosSecure.get(
          `/all-cart-items/${user?.email}`
        );
        return data;
      }
    },
    // enabled: !!user,
  });
  return [cart, refetch];
};

export default useCart;
