import React, { useState, useEffect, useContext } from "react";
import { FcGoogle } from "react-icons/fc";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { googleLogin, signInUser, clearError } from "../store/authSlice";
import { useDispatch, useSelector } from "react-redux";
import toast from "react-hot-toast";
import { FaArrowLeft } from "react-icons/fa";
import axios from "axios";
import loginAni from "../../public/login.json";
import Lottie from "lottie-react";
import { ThemeContext } from "../provider/ThemeProvider";
const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const { error } = useSelector((state) => state.auth);
  const [isLoading, setIsLoading] = useState(false);
  const { theme } = useContext(ThemeContext);
  useEffect(() => {
    return () => dispatch(clearError());
  }, [dispatch]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    const formData = new FormData(e.target);
    const email = formData.get("email");
    const password = formData.get("password");

    try {
      const result = await dispatch(signInUser({ email, password })).unwrap();
      if (result.user) {
        toast.success("Logged in successfully!");
        navigate(location?.state?.from || "/");
      }
    } catch (error) {
      let errorMessage =
        typeof error === "string" ? error : error.message || "Login failed";

      // Special handling for permission errors
      if (error.code === "permission-denied") {
        errorMessage =
          "Login service temporarily unavailable. Please try again later.";
        console.error("Firestore permission error:", error);
      }

      toast.error(errorMessage, {
        duration: errorMessage.includes("locked") ? 8000 : 4000,
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleContinueGoogle = async () => {
    try {
      setIsLoading(true);
      const result = await dispatch(googleLogin()).unwrap();
      const user = result?.user;

      if (user) {
        navigate(location?.state?.from || "/");
        await axios.post(`${import.meta.env.VITE_API_URL}/users`, {
          name: user.displayName,
          email: user.email,
          photo: user.photoURL,
          uid: user.uid,
          role: "user",
        });
      }
    } catch (error) {
      toast.error("Google login failed!");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col md:flex-row h-screen">
      <div
        className={`hidden md:flex md:w-1/2 ${
          theme === "dark" ? "" : "bg-green-50"
        } items-center justify-center p-6`}
      >
        <div className="w-full max-w-sm">
          <div className="w-full max-w-sm">
            <Lottie animationData={loginAni} loop={true} />
          </div>
        </div>
      </div>

      <div className="w-full md:w-1/2 flex items-center justify-center p-6">
        <div className="max-w-sm w-full">
          <h1 className="text-3xl font-bold text-green-700 text-center uppercase">
            Welcome back !
          </h1>
          <p className="text-gray-500 mb-6 text-center">
            Login to your account.
          </p>

          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label className="block text-gray-700">Email</label>
              <input
                type="email"
                name="email"
                placeholder="Enter your number"
                className="w-full py-6 border rounded-lg input input-success"
                required
              />
            </div>

            <div className="mb-4">
              <label className="block text-gray-700">Password</label>
              <input
                type="password"
                name="password"
                placeholder="Enter your pin"
                className="w-full py-6 border rounded-lg input input-success"
                required
              />
            </div>
            {/* {loading ? (
              //   <ButtonLoading />
              "Loading...."
            ) : (
              <button
                type="submit"
                className="w-full bg-green-600 text-white py-3 rounded-lg hover:bg-green-700 transition"
              >
                Sign in
              </button>
            )} */}
            <button
              type="submit"
              className="w-full bg-green-600 text-white py-3 rounded-lg hover:bg-green-700 transition"
            >
              {isLoading ? "Loading..." : "Sign in"}
            </button>
          </form>
          <div className="flex items-center my-4">
            <div className="border-b w-full"></div>
            <span className="mx-3 text-gray-400">or</span>
            <div className="border-b w-full"></div>
          </div>

          <button
            onClick={handleContinueGoogle}
            className="w-full flex items-center justify-center border py-3 rounded-lg hover:bg-gray-100 transition"
          >
            <FcGoogle className="mr-2 text-2xl" /> Continue With Google
          </button>
          <p className="mt-4 text-gray-600 text-center">
            Don’t have an account?{" "}
            <Link
              to="/register"
              className="text-green-700 hover:underline font-semibold"
            >
              Register
            </Link>
          </p>
          <Link to="/">
            {" "}
            <div className=" text-green-800 text-center font-semibold flex justify-center mt-4 items-center gap-2">
              <span>
                <FaArrowLeft />
              </span>
              <span>Back to home</span>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
