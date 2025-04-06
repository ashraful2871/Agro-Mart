import React, { useContext } from "react";
import { FcGoogle } from "react-icons/fc";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { googleLogin, signUpUser } from "../store/authSlice";
import toast from "react-hot-toast";
import axios from "axios";
import { FaArrowLeft } from "react-icons/fa";
import { ThemeContext } from "../provider/ThemeProvider";

const image_hosting_key = import.meta.env.VITE_IMGBB_HOSTING_KEY;
const image_upload_api = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`;

const SignUp = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { theme } = useContext(ThemeContext);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const name = formData.get("name");
    const email = formData.get("email");
    const image = formData.get("image");
    const password = formData.get("password");

    let imageUrl = "";
    if (image) {
      const imageFormData = new FormData();
      imageFormData.append("image", image);
      try {
        const response = await axios.post(image_upload_api, imageFormData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });
        if (response.data.success) {
          imageUrl = response.data.data.display_url;
        }
      } catch (error) {
        console.log(error);
        toast.error("Image upload failed");
        return;
      }
    }

    try {
      // Dispatch signUpUser with all needed data
      const result = await dispatch(
        signUpUser({ email, password, name, photo: imageUrl })
      ).unwrap();

      if (result?.user) {
        toast.success("Account created successfully!");
        navigate("/");

        // Save user to database
        try {
          const userInfo = {
            name,
            email,
            photo: imageUrl,
            uid: result.user.uid,
            role: "user",
          };
          await axios.post(`${import.meta.env.VITE_API_URL}/users`, userInfo);
        } catch (error) {
          console.log(error);
        }
      }
    } catch (error) {
      toast.error(error.message || "Sign up failed!");
    }
  };

  const handleContinueGoogle = async () => {
    try {
      const result = await dispatch(googleLogin()).unwrap();
      const user = result?.user;

      if (user) {
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

            {/* Photo */}
            <div className="mb-4">
              <label className="block text-base-content">Photo</label>
              <input
                type="file"
                name="image"
                required
                className="file-input w-full file-input-success border rounded-lg focus:ring-2 focus:ring-green-500"
              />
            </div>

            {/* Password */}
            <div className="mb-4">
              <label className="block text-base-content">Password</label>
              <input
                type="password"
                name="password"
                placeholder="Enter your password"
                className="w-full py-6 border rounded-lg input input-success"
                required
              />
            </div>

            {/* Sign Up Button */}
            <button
              type="submit"
              className="w-full bg-green-600 text-white py-3 text-lg rounded-lg hover:bg-green-700 transition"
            >
              Sign Up
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
