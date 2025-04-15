import React from "react";
import { useQuery } from "@tanstack/react-query";
import useAuth from "./useAuth";
import useAxiosSecure from "./useAxiosSecure";
import { useSelector } from "react-redux";

const useRole = () => {
  const user = useAuth();
  const loading = useSelector((state) => state.auth.loading);
  const axiosSecure = useAxiosSecure();

  const { data: userRole, isLoading } = useQuery({
    queryKey: ["role", user?.email],
    enabled: !loading && !!user?.email,
    queryFn: async () => {
      const { data } = await axiosSecure.get(`/user/role/${user?.email}`);
      return data;
    },
  });
  const role = userRole?.role;
  return [role, isLoading];
};

export default useRole;
