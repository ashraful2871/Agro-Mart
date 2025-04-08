import React from "react";
import useAuth from "../hooks/useAuth";
import Loading from "../components/loading/Loading";
import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

const Privet = ({ children }) => {
  const user = useAuth();
  const loading = useSelector((state) => state.auth.loading);
  console.log(loading);
  if (loading) {
    return <Loading></Loading>;
  }
  if (!user) {
    return <Navigate to="/login" state={{ from: location.pathname }} replace />;
  }

  return children;
};

export default Privet;
