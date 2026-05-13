"use client";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { signInUser, googleLogin, clearError } from "@/store/authSlice";
import { AppDispatch, RootState } from "@/store/store";
import { useRouter } from "next/navigation";
import Link from "next/link";
import toast from "react-hot-toast";
import { FcGoogle } from "react-icons/fc";

export default function LoginPage() {
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();
  const { loading, error } = useSelector((state: RootState) => state.auth);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await dispatch(signInUser({ email, password })).unwrap();
      toast.success("Login successful!");
      router.push("/");
    } catch (err: any) {
      toast.error(err || "Login failed");
    }
  };

  const handleGoogleLogin = async () => {
    try {
      await dispatch(googleLogin()).unwrap();
      toast.success("Login successful!");
      router.push("/");
    } catch (err: any) {
      toast.error(err || "Google login failed");
    }
  };

  return (
    <div className="min-h-screen flex">
      <div className="hidden lg:flex lg:w-1/2 bg-cover bg-center" style={{ backgroundImage: "url('https://i.ibb.co.com/hR8R8B2s/organic.jpg')" }}>
        <div className="flex items-center justify-center w-full h-full bg-black/50">
          <div className="text-center text-white p-10">
            <h1 className="text-5xl font-bold font-syne">Welcome Back</h1>
            <p className="mt-4 text-lg">Login to access your AgroMart account</p>
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
            <h2 className="text-2xl font-bold mt-6">Sign In</h2>
          </div>

          {error && <div className="alert alert-error mb-4"><span>{error}</span></div>}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="label"><span className="label-text">Email</span></label>
              <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Enter your email" required className="input input-bordered w-full" />
            </div>
            <div>
              <label className="label"><span className="label-text">Password</span></label>
              <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Enter your password" required className="input input-bordered w-full" />
            </div>
            <div className="text-right">
              <Link href="/password/reset" className="text-green-600 text-sm hover:underline">Forgot password?</Link>
            </div>
            <button type="submit" disabled={loading} className="btn bg-green-600 text-white w-full text-lg">
              {loading ? <span className="loading loading-spinner"></span> : "Sign In"}
            </button>
          </form>

          <div className="divider">OR</div>
          <button onClick={handleGoogleLogin} className="btn btn-outline w-full flex items-center gap-2">
            <FcGoogle className="text-2xl" /> Continue with Google
          </button>
          <p className="text-center mt-6">
            Don&apos;t have an account? <Link href="/register" className="text-green-600 font-bold hover:underline">Sign Up</Link>
          </p>
        </div>
      </div>
    </div>
  );
}
