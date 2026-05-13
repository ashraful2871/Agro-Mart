"use client";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";

const useAuth = () => {
  const { user } = useSelector((state: RootState) => state.auth);
  return user;
};

export default useAuth;
