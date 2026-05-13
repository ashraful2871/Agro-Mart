"use client";
import Link from "next/link";

export default function PaymentCancelPage() {
  return (
    <div className="w-11/12 mx-auto py-20 text-center">
      <div className="text-yellow-600 text-6xl mb-4">⚠</div>
      <h1 className="text-3xl font-bold font-syne mb-4">Payment Cancelled</h1>
      <p className="mb-6">Your payment was cancelled.</p>
      <Link href="/shopping-cart" className="btn bg-green-600 text-white">Back to Cart</Link>
    </div>
  );
}
