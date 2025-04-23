import React, { useContext, useState } from "react";
import { FcGoogle } from "react-icons/fc";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { googleLogin, signUpUser } from "../store/authSlice";
import toast from "react-hot-toast";
import axios from "axios";
import { FaArrowLeft, FaRegEye, FaRegEyeSlash } from "react-icons/fa";
import { ThemeContext } from "../provider/ThemeProvider";
import ButtonLoading from "../components/loading/button-loading/ButtonLoading";

const SignUp = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setConfirmShowPassword] = useState(false);
  const [type, setType] = useState("");

  const { theme } = useContext(ThemeContext);

  const handleSubmit = async (e) => {
    setLoading(true);
    e.preventDefault();
    const formData = new FormData(e.target);
    const name = formData.get("name");
    const email = formData.get("email");
    const password = formData.get("password");
    const confirmPassword = formData.get("confirm_password");
    const formInfo = { name, email, password, confirmPassword };
    // console.log(formInfo);
    if (!password || !confirmPassword) {
      toast.error("password and confirm password are required");
      setLoading(false);
      return;
    }
    if (password !== confirmPassword) {
      toast.error("password and confirm password are dose not match");
      setLoading(false);
      return;
    }
    if (password.length < 6) {
      toast.error("Password must be at least 6 characters long!");
      setLoading(false);
      return;
    }
    try {
      // Dispatch signUpUser with all needed data
      const result = await dispatch(
        signUpUser({
          email,
          password,
          name,
          photo: "https://i.ibb.co.com/7tR89ZTR/user.png",
        })
      ).unwrap();

      if (result?.user) {
        toast.success("Account created successfully!");
        navigate("/");

        // Save user to database
        try {
          const userInfo = {
            name,
            email,
            photo: "https://i.ibb.co.com/7tR89ZTR/user.png",
            uid: result.user.uid,
            role: type,
          };
          await axios.post(`${import.meta.env.VITE_API_URL}/users`, userInfo);
        } catch (error) {
          console.log(error);
          setLoading(false);
        }
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message || "Sign up failed!");
      setLoading(false);
    }
  };

  const handleContinueGoogle = async () => {
    try {
      const result = await dispatch(googleLogin()).unwrap();
      const user = result?.user;

      if (user) {
        toast.success("Logged in successfully!");
        navigate("/");

        // Send user info to the backend
        const userInfo = {
          name: user?.displayName,
          email: user?.email,
          photo: user?.photoURL,
          uid: user?.uid,
          role: "user",
        };
        axios
          .post(`${import.meta.env.VITE_API_URL}/users`, userInfo)
          .catch(console.log);
      }
    } catch (error) {
      console.log(error);
      toast.error("Google login failed!");
    }
  };

  return (
    <div className="flex flex-col md:flex-row h-screen">
      {/* Left Side - Animation (Hidden on Small Screens) */}
      <div className={`hidden md:flex `}>
        {/* <Lottie animationData={loginAni} loop={true} /> */}
        <img src="https://i.ibb.co.com/XrqVDTBr/loginpage.jpg" alt="" />
      </div>

      {/* Right Side - Sign Up Form */}
      <div className="w-full md:w-[60%]  flex items-center justify-center p-6">
        <div className="max-w-lg w-full">
          <h1
            className={`text-3xl font-bold ${
              theme === "dark" ? "text-green-500" : "text-green-700"
            }  text-center uppercase`}
          >
            Create an account
          </h1>
          <p className="text-base-content mb-6 text-center">
            Please enter your details
          </p>

          <form onSubmit={handleSubmit}>
            {/* name */}
            <div className="mb-4">
              <label className="block text-base-content">Name</label>
              <input
                type="text"
                name="name"
                placeholder="Enter your name"
                className="w-full py-6 border rounded-lg input input-success "
                required
              />
            </div>

            {/* email address */}
            <div className="mb-4">
              <label className="block text-base-content">Email address</label>
              <input
                type="email"
                name="email"
                placeholder="Enter your email address"
                className="w-full py-6 border rounded-lg input input-success"
                required
              />
            </div>
            {/* select account typ */}
            <div className="mb-4">
              <label className="block text-base-content">
                Select Account Type
              </label>
              <select
                name="accountType"
                onChange={(e) => setType(e.target.value)}
                value={type}
                className="select w-full select-success"
                required
              >
                <option value="" disabled>
                  Select Account Type
                </option>
                <option value="customer">Customer</option>
                <option value="farmer">Farmer</option>
              </select>
            </div>

            {/* Password */}
            <div
              className="mb-4 relative
            "
            >
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
            {/* confirm password */}
            <div className="mb-4 relative">
              <label className="block text-base-content">
                Confirm Password
              </label>
              <input
                type={`${showConfirmPassword ? "text" : "password"}`}
                name="confirm_password"
                placeholder="Enter your password"
                className="w-full py-6 border rounded-lg input input-success"
                required
              />
              <button
                onClick={() => setConfirmShowPassword(!showConfirmPassword)}
                type="button"
                className="absolute top-10 right-5 text-xl font-extrabold text-green-600"
              >
                {showConfirmPassword ? <FaRegEyeSlash /> : <FaRegEye />}
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
                  Accept trams & condition
                </label>
              </div>
            </div>

            {/* Sign Up Button */}
            <button
              type="submit"
              className="w-full bg-green-600 text-white py-3 text-lg rounded-lg hover:bg-green-700 transition"
            >
              {loading ? <ButtonLoading></ButtonLoading> : "Sign Up"}
            </button>
          </form>

          <div className="flex items-center my-4">
            <div className="border-b w-full"></div>
            <span className="mx-3 text-base-content">or</span>
            <div className="border-b w-full"></div>
          </div>

          <button
            onClick={handleContinueGoogle}
            className="w-full flex items-center justify-center border py-3 rounded-lg  transition"
          >
            <FcGoogle className="mr-2 text-2xl" /> Continue With Google
          </button>

          <p className="mt-4 text-base-content text-center">
            Already have an account?{" "}
            <Link
              to="/login"
              className={`${
                theme === "dark" ? "text-green-500" : "text-green-700"
              }  hover:underline font-semibold`}
            >
              Login
            </Link>
          </p>
          <Link to="/">
            <div className="text-green-800 text-center font-semibold flex justify-center mt-4 items-center gap-2">
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

export default SignUp;
