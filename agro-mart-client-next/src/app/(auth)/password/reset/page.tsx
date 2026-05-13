"use client";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { resetPassword } from "@/store/authSlice";
import { AppDispatch } from "@/store/store";
import Link from "next/link";
import toast from "react-hot-toast";

export default function ResetPasswordPage() {
  const dispatch = useDispatch<AppDispatch>();
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await dispatch(resetPassword(email)).unwrap();
      toast.success("Password reset email sent!");
    } catch (err: any) {
      toast.error(err || "Failed to send reset email");
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="max-w-md w-full p-8">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold font-syne">Reset Password</h2>
          <p className="mt-2 text-base-content">Enter your email to receive a password reset link</p>
        </div>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Enter your email" required className="input input-bordered w-full" />
          <button type="submit" disabled={loading} className="btn bg-green-600 text-white w-full">
            {loading ? <span className="loading loading-spinner"></span> : "Send Reset Email"}
          </button>
        </form>
        <p className="text-center mt-4">
          <Link href="/login" className="text-green-600 hover:underline">Back to Login</Link>
        </p>
      </div>
    </div>
  );
}
