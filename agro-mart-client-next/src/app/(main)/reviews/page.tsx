"use client";
import ReviewDisplay from "@/components/reviews/ReviewDisplay";
import ReviewPosting from "@/components/reviews/ReviewPosting";

export default function ReviewsPage() {
  return (
    <div className="w-11/12 mx-auto">
      <ReviewDisplay />
      <ReviewPosting />
    </div>
  );
}
