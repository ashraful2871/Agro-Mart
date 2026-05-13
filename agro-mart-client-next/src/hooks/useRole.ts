"use client";
import { useState, useEffect, useCallback } from "react";
import useAuth from "./useAuth";
import useAxiosSecure from "./useAxiosSecure";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";

const useRole = () => {
  const user = useAuth();
  const loading = useSelector((state: RootState) => state.auth.loading);
  const axiosSecure = useAxiosSecure();
  const [role, setRole] = useState<string | undefined>(undefined);
  const [isLoading, setIsLoading] = useState(true);

  const fetchRole = useCallback(async () => {
    if (!loading && user?.email) {
      try {
        const { data } = await axiosSecure.get(`/user/role/${user.email}`);
        setRole(data?.role);
      } catch (err) {
        console.error("Failed to fetch role:", err);
      } finally {
        setIsLoading(false);
      }
    } else {
      setIsLoading(false);
    }
  }, [loading, user?.email, axiosSecure]);

  useEffect(() => {
    fetchRole();
  }, [fetchRole]);

  return [role, isLoading] as const;
};

export default useRole;
