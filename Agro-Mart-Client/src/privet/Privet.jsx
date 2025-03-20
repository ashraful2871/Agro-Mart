import React from "react";
import useAuth from "../hooks/useAuth";
import Loading from "../components/loading/Loading";
import { Navigate } from "react-router-dom";

const Privet = ({ children }) => {
  const { user, loading } = useAuth();

  if (loading) {
    return <Loading></Loading>;
  }
  if (!user) {
    return <Navigate to="/login" state={{ from: location.pathname }} replace />;
  }

  return children;
};

export default Privet;
