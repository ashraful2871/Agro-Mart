import { useSelector } from "react-redux";

const useAuth = () => {
  const auth = useSelector((state) => state.auth.user?.user);
  return auth;
};

export default useAuth;
