import React from "react";
import { FcGoogle } from "react-icons/fc";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { googleLogin, signUpUser, updateUserProfile } from "../store/authSlice";
import toast from "react-hot-toast";
import axios from "axios";

const image_hosting_key = "be0132eb382f7838de12f3bbabfccc00";
const image_upload_api = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`;
const SignUp = () => {
  const dispatch = useDispatch();
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

    const userInfo = { name, email, password, photo: imageUrl };
    // console.log(userInfo);
    // sign UP user
    dispatch(signUpUser({ email, password }))
      .unwrap()
      .then((user) => {
        dispatch(updateUserProfile({ name, photo: imageUrl }));
        toast.success("Account created successfully!");
      })
      .catch((error) => {
        toast.error(error.message || "Sign up failed!");
      });
  };

  // google login

  const handleGoogleSignUp = async () => {
    try {
      dispatch(googleLogin());
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
          <h1 className="text-3xl font-bold text-gray-900 text-center">
            Create your account
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
            onClick={handleGoogleSignUp}
            className="w-full flex items-center justify-center border py-3 rounded-lg hover:bg-gray-100 transition"
          >
            <FcGoogle className="mr-2 text-2xl" /> Sign up with Google
          </button>

          <p className="mt-4 text-gray-600 text-center">
            Already have an account?{" "}
            <Link to="/login" className="text-green-600 hover:underline">
              Login
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
