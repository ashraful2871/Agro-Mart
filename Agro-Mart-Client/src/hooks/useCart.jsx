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
      const { data } = await axiosSecure.get(`/all-cart-items/${user?.email}`);
      return data;
    },
  });
  return [cart, refetch];
};

export default useCart;
