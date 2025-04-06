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
      <div className={`hidden md:flex `}>
        {/* <Lottie animationData={loginAni} loop={true} /> */}
        <img src="https://i.ibb.co.com/XrqVDTBr/loginpage.jpg" alt="" />
      </div>

      <div className="w-full md:w-[60%]  flex items-center justify-center p-6 ">
        <div className="max-w-lg w-full">
          <h1
            className={`text-3xl font-bold ${
              theme === "dark" ? "text-green-500" : "text-green-700"
            }  text-center uppercase`}
          >
            Welcome back !
          </h1>
          <p className="text-base-content mb-6 text-center">
            Login to your account.
          </p>

          <form onSubmit={handleSubmit}>
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

            <div className="mb-4">
              <label className="block text-base-content">Password</label>
              <input
                type="password"
                name="password"
                placeholder="Enter your pin"
                className="w-full py-6 border rounded-lg input input-success"
                required
              />
            </div>
            <div className="flex justify-between items-center ">
              <div className="mb-4">
                <label className="fieldset-label text-base-content">
                  <input
                    type="checkbox"
                    required
                    className="checkbox  checked:bg-green-600 checked:text-white text-base-content "
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
              {isLoading ? "Loading..." : "Sign in"}
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
