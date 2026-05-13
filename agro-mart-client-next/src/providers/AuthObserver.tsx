"use client";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { InitializeAuthListener } from "@/store/authSlice";
import { AppDispatch } from "@/store/store";

const AuthObserver = ({ children }: { children?: React.ReactNode }) => {
  const dispatch = useDispatch<AppDispatch>();
  useEffect(() => {
    dispatch(InitializeAuthListener());
  }, [dispatch]);
  return <>{children}</>;
};

export default AuthObserver;
