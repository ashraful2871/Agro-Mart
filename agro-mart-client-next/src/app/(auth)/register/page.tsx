"use client";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { signUpUser, googleLogin } from "@/store/authSlice";
import { AppDispatch, RootState } from "@/store/store";
import { useRouter } from "next/navigation";
import Link from "next/link";
import toast from "react-hot-toast";
import { FcGoogle } from "react-icons/fc";
import { imageUpload } from "@/lib/utils";
import useAxiosPublic from "@/hooks/useAxiosPublic";

export default function RegisterPage() {
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();
  const axiosPublic = useAxiosPublic();
  const { loading, error } = useSelector((state: RootState) => state.auth);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const name = formData.get("name") as string;
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;
    const imageFile = formData.get("photo") as File;
    const role = formData.get("role") as string;

    try {
      let photo = "https://i.ibb.co.com/zWQYnrGM/user.png";
      if (imageFile && imageFile.size > 0) {
        photo = await imageUpload(imageFile);
      }
      await dispatch(signUpUser({ email, password, name, photo })).unwrap();
      // Save user to backend
      await axiosPublic.post("/users", { name, email, photo, role: role || "customer" });
      toast.success("Account created successfully!");
      router.push("/");
    } catch (err: any) {
      toast.error(err || "Registration failed");
    }
  };

  const handleGoogleLogin = async () => {
    try {
      const result = await dispatch(googleLogin()).unwrap();
      await axiosPublic.post("/users", {
        name: result.user.displayName,
        email: result.user.email,
        photo: result.user.photoURL,
        role: "customer",
      });
      toast.success("Login successful!");
      router.push("/");
    } catch (err: any) {
      toast.error(err || "Google login failed");
    }
  };

  return (
    <div className="min-h-screen flex">
      <div className="hidden lg:flex lg:w-1/2 bg-cover bg-center" style={{ backgroundImage: "url('https://i.ibb.co.com/jk9hyFT8/environmental-conservation-plant-sustainability.jpg')" }}>
        <div className="flex items-center justify-center w-full h-full bg-black/50">
          <div className="text-center text-white p-10">
            <h1 className="text-5xl font-bold font-syne">Join AgroMart</h1>
            <p className="mt-4 text-lg">Create your account and start shopping</p>
          </div>
        </div>
      </div>
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8">
        <div className="max-w-md w-full">
          <div className="text-center mb-8">
            <Link href="/" className="flex items-center justify-center gap-2">
              <img src="https://i.ibb.co.com/0pKYrs73/agriMart.png" alt="AgroMart" className="h-10" />
              <span className="text-3xl font-bold font-syne"><span className="text-green-700">Agro</span><span className="text-yellow-400">Mart</span></span>
            </Link>
            <h2 className="text-2xl font-bold mt-6">Create Account</h2>
          </div>

          {error && <div className="alert alert-error mb-4"><span>{error}</span></div>}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="label"><span className="label-text">Full Name</span></label>
              <input type="text" name="name" placeholder="Enter your name" required className="input input-bordered w-full" />
            </div>
            <div>
              <label className="label"><span className="label-text">Email</span></label>
              <input type="email" name="email" placeholder="Enter your email" required className="input input-bordered w-full" />
            </div>
            <div>
              <label className="label"><span className="label-text">Password</span></label>
              <input type="password" name="password" placeholder="Create password" required className="input input-bordered w-full" />
            </div>
            <div>
              <label className="label"><span className="label-text">Profile Photo</span></label>
              <input type="file" name="photo" accept="image/*" className="file-input file-input-bordered w-full" />
            </div>
            <div>
              <label className="label"><span className="label-text">Role</span></label>
              <select name="role" className="select select-bordered w-full">
                <option value="customer">Customer</option>
                <option value="farmer">Farmer</option>
              </select>
            </div>
            <button type="submit" disabled={loading} className="btn bg-green-600 text-white w-full text-lg">
              {loading ? <span className="loading loading-spinner"></span> : "Sign Up"}
            </button>
          </form>

          <div className="divider">OR</div>
          <button onClick={handleGoogleLogin} className="btn btn-outline w-full flex items-center gap-2">
            <FcGoogle className="text-2xl" /> Continue with Google
          </button>
          <p className="text-center mt-6">
            Already have an account? <Link href="/login" className="text-green-600 font-bold hover:underline">Sign In</Link>
          </p>
        </div>
      </div>
    </div>
  );
}
