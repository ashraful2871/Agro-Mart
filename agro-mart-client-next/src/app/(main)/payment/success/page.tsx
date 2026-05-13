"use client";
import Link from "next/link";

export default function PaymentSuccessPage() {
  return (
    <div className="w-11/12 mx-auto py-20 text-center">
      <div className="text-green-600 text-6xl mb-4">✓</div>
      <h1 className="text-3xl font-bold font-syne mb-4">Payment Successful!</h1>
      <p className="mb-6">Thank you for your purchase.</p>
      <Link href="/" className="btn bg-green-600 text-white">Back to Home</Link>
    </div>
  );
}
