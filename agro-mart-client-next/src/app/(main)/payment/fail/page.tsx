"use client";
import Link from "next/link";

export default function PaymentFailPage() {
  return (
    <div className="w-11/12 mx-auto py-20 text-center">
      <div className="text-red-600 text-6xl mb-4">✗</div>
      <h1 className="text-3xl font-bold font-syne mb-4">Payment Failed</h1>
      <p className="mb-6">Something went wrong. Please try again.</p>
      <Link href="/shopping-cart" className="btn bg-green-600 text-white">Back to Cart</Link>
    </div>
  );
}
