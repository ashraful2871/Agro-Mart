import React from "react";
import { FcGoogle } from "react-icons/fc";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { googleLogin, signUpUser, updateUserProfile } from "../store/authSlice";
import toast from "react-hot-toast";
import axios from "axios";
import { FaArrowLeft } from "react-icons/fa";
import useAuth from "../hooks/useAuth";

const image_hosting_key = import.meta.env.VITE_IMGBB_HOSTING_KEY;
const image_upload_api = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`;
const SignUp = () => {
  const dispatch = useDispatch();
  const user = useAuth();
  const navigate = useNavigate();
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
        console.log(response.data.data.display_url);
        if (response.data.success) {
          imageUrl = response.data.data.display_url;
        }
      } catch (error) {
        console.log(error);
        toast.error("Image upload failed:", error);
        return;
      }
    }

    // console.log(userInfo);
    // sign UP user
    dispatch(signUpUser({ email, password }))
      .unwrap()
      .then(async (user) => {
        dispatch(updateUserProfile({ name, photo: imageUrl }));
        toast.success("Account created successfully!");
        navigate("/");

        try {
          const userInfo = {
            name,
            email,
            photo: imageUrl,
            uid: user?.uid,
            role: "user",
          };
          await axios.post(`${import.meta.env.VITE_API_URL}/users`, userInfo);
        } catch (error) {
          console.log(error);
        }
      })
      .catch((error) => {
        toast.error(error.message || "Sign up failed!");
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
      {/* Left Side - Animation (Hidden on Small Screens) */}
      <div className="hidden md:flex md:w-1/2 bg-green-50 items-center justify-center p-6">
        {/* <div className="w-full max-w-sm">
            <Lottie animationData={signAni} loop={true} />
          </div> */}
      </div>

      {/* Right Side - Sign Up Form */}
      <div className="w-full md:w-1/2 flex items-center justify-center p-6">
        <div className="max-w-sm w-full">
          <h1 className="text-3xl font-bold text-green-700 text-center uppercase">
            Create an account
          </h1>
          <p className="text-gray-500 mb-6 text-center">
            Please enter your details
          </p>

          <form onSubmit={handleSubmit}>
            {/* name */}
            <div className="mb-4">
              <label className="block text-gray-700">Name</label>
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
              <label className="block text-gray-700">Email address</label>
              <input
                type="email"
                name="email"
                placeholder="Enter your email address"
                className="w-full py-6 border rounded-lg input input-success"
                required
              />
            </div>

            {/* Photo  */}
            <div className="mb-4">
              <label className="block text-gray-700">Photo</label>
              <input
                type="file"
                name="image"
                required
                className="file-input w-full file-input-success border rounded-lg focus:ring-2 focus:ring-green-500"
              />
            </div>

            {/* Pin Number */}
            <div className="mb-4">
              <label className="block text-gray-700">Password</label>
              <input
                type="password"
                name="password"
                placeholder="Enter your 5  digit PIN "
                className="w-full py-6 border rounded-lg input input-success"
                required
              />
            </div>

            {/* Sign Up Button */}
            <button
              type="submit"
              className="w-full bg-green-600 text-white py-3 rounded-lg hover:bg-green-700 transition"
            >
              Sign Up
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
            Already have an account?{" "}
            <Link
              to="/login"
              className="text-green-700 hover:underline font-semibold"
            >
              Login
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

export default SignUp;
