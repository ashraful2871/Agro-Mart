import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { InitializeAuthListener } from "../store/authSlice";

const AuthObserver = ({ children }) => {
  const disPatch = useDispatch();
  useEffect(() => {
    disPatch(InitializeAuthListener());
  }, [disPatch]);
  return children;
};

export default AuthObserver;
