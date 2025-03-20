import React from "react";
import { FcGoogle } from "react-icons/fc";
import { Link, NavLink, useLocation, useNavigate } from "react-router-dom";
import { googleLogin, signInUser } from "../store/authSlice";
import { useDispatch } from "react-redux";
import toast from "react-hot-toast";
import { FaArrowLeft } from "react-icons/fa";
import axios from "axios";
const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const email = formData.get("email");
    const password = formData.get("password");

    //sign  in user
    dispatch(signInUser({ email, password }))
      .unwrap()
      .then(() => {
        toast.success("Account Login successfully!");
        navigate(location?.state ? location?.state : "/");
      })
      .catch((error) => {
        toast.error(error.message || "Login failed!");
      });
  };
  // google login
  const handleContinueGoogle = async () => {
    try {
      dispatch(googleLogin())
        .unwrap()
        .then(async (user) => {
          try {
            const userInfo = {
              name: user?.displayName,
              email: user?.email,
              photo: user?.photoURL,
              uid: user?.uid,
              role: "user",
            };
            await axios.post(`${import.meta.env.VITE_API_URL}/users`, userInfo);
            navigate("/");
          } catch (error) {
            console.log(error);
          }
        });
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="flex flex-col md:flex-row h-screen">
      <div className="hidden md:flex md:w-1/2 bg-green-50 items-center justify-center p-6">
        <div className="w-full max-w-sm">
          {/* <div className="w-full max-w-sm">
            <Lottie animationData={loginAni} loop={true} />
          </div> */}
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
              Sign in
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
