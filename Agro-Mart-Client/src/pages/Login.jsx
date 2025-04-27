import React, { useState, useEffect, useContext } from "react";
import { FcGoogle } from "react-icons/fc";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { googleLogin, signInUser, clearError } from "../store/authSlice";
import { useDispatch, useSelector } from "react-redux";
import toast from "react-hot-toast";
import { FaArrowLeft, FaRegEye, FaRegEyeSlash } from "react-icons/fa";
import axios from "axios";
import { ThemeContext } from "../provider/ThemeProvider";
import ButtonLoading from "../components/loading/button-loading/ButtonLoading";
const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const [showPassword, setShowPassword] = useState(false);
  const { error } = useSelector((state) => state.auth);
  const [isLoading, setIsLoading] = useState(false);
  const { theme } = useContext(ThemeContext);

  useEffect(() => {
    return () => dispatch(clearError());
  }, [dispatch]);

  const handleSubmit = async (e) => {
    setIsLoading(true);
    e.preventDefault();
    const formData = new FormData(e.target);
    const email = formData.get("email");
    const password = formData.get("password");

    try {
      const result = await dispatch(signInUser({ email, password })).unwrap();
      if (result?.user) {
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
      setIsLoading(false);
    } finally {
      setIsLoading(false);
    }
  };

  const handleContinueGoogle = async () => {
    try {
      const result = await dispatch(googleLogin()).unwrap();
      const user = result?.user;

      if (user) {
        toast.success("Logged in successfully!");
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
    }
  };

  return (
    <div className="flex flex-col md:flex-row h-screen">
      <div className={`hidden md:flex `}>
        <img src="https://i.ibb.co.com/XrqVDTBr/loginpage.jpg" alt="" />
      </div>

      <div className="w-full md:w-[60%]  flex items-center justify-center p-6 ">
        <div className="max-w-lg w-full">
          <div className="mb-6 space-y-2">
            <h1
              className={`text-3xl font-bold ${
                theme === "dark" ? "text-green-500" : "text-green-700"
              }   uppercase`}
            >
              Welcome back !
            </h1>
            <p className="text-base-content  ">Login to your account.</p>
          </div>

          <form onSubmit={handleSubmit}>
            {/* email */}
            <div className="mb-4">
              <label className="block text-base-content">Email</label>
              <input
                type="email"
                name="email"
                placeholder="Enter your number"
                className="w-full py-6 border rounded-lg input input-success"
                required
              />
            </div>

            {/* password */}
            <div className="mb-4 relative">
              <label className="block text-base-content">Password</label>
              <input
                type={`${showPassword ? "text" : "password"}`}
                name="password"
                placeholder="Enter your password"
                className="w-full py-6 border rounded-lg input input-success"
                required
              />
              <button
                onClick={() => setShowPassword(!showPassword)}
                type="button"
                className="absolute top-10 right-5 text-xl font-extrabold text-green-600"
              >
                {showPassword ? <FaRegEyeSlash /> : <FaRegEye />}
              </button>
            </div>
            <div className="flex justify-between items-center ">
              <div className="mb-4">
                <label className="fieldset-label text-base-content">
                  <input
                    type="checkbox"
                    required
                    className="checkbox checkbox-success  checked:bg-green-600 checked:text-white text-base-content "
                  />
                  Remember me
                </label>
              </div>
              <div>
                <Link to="/password/reset" className="link link-hover">
                  Forgot password?
                </Link>
              </div>
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
              className="w-full bg-green-600 text-white py-3 text-lg rounded-lg hover:bg-green-700 transition"
            >
              {isLoading ? <ButtonLoading></ButtonLoading> : "Sign in"}
            </button>
          </form>

          <div className="flex items-center my-4">
            <div className="border-b  w-full"></div>
            <span className="mx-3 text-base-content">or</span>
            <div className="border-b  w-full"></div>
          </div>

          <button
            onClick={handleContinueGoogle}
            className="w-full flex items-center justify-center border border-green-600 py-3 rounded-lg  transition"
          >
            <FcGoogle className="mr-2 text-2xl" /> Continue With Google
          </button>
          <p className="mt-4 text-center text-base-content">
            Don’t have an account?{" "}
            <Link
              to="/register"
              className={`${
                theme === "dark" ? "text-green-500" : "text-green-700"
              }  hover:underline font-semibold`}
            >
              Register
            </Link>
          </p>
          <Link to="/">
            {" "}
            <div className=" text-green-800 text-center font-semibold flex justify-center mt-4 items-center gap-2">
              <span
                className={`${
                  theme === "dark" ? "text-green-500" : "text-green-700"
                }  hover:underline font-semibold`}
              >
                <FaArrowLeft />
              </span>
              <span
                className={`${
                  theme === "dark" ? "text-green-500" : "text-green-700"
                }  hover:underline font-semibold`}
              >
                Back to home
              </span>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
