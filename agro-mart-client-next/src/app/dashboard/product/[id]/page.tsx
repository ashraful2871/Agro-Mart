"use client";
import { useParams } from "next/navigation";

export default function ProductDetailsPage() {
  const { id } = useParams();
  return (
    <div>
      <h1 className="text-3xl font-bold font-syne mb-6">Product Details</h1>
      <p>Product ID: {id}</p>
    </div>
  );
}
