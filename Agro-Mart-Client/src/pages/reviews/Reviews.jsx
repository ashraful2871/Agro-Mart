import React from "react";
import { useContext } from "react";
import { ThemeContext } from "../../provider/ThemeProvider";
import { FaStar } from "react-icons/fa";
import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import { format } from "date-fns";
import Loading from "../../components/loading/Loading";
const dummyReviews = [
  {
    id: 1,
    name: "Ashtaful Islam",
    date: "April 30, 2025",
    rating: 5,
    comment: "Absolutely amazing platform! Clean design and fast performance.",
  },
  {
    id: 2,
    name: "John Doe",
    date: "May 1, 2025",
    rating: 4,
    comment: "Great experience overall. Would love to see more features.",
  },
];

const Reviews = () => {
  const { theme } = useContext(ThemeContext);
  const axiosPublic = useAxiosPublic();

  const { data: reviews = [], isLoading } = useQuery({
    queryKey: ["/reviews"],
    queryFn: async () => {
      const { data } = await axiosPublic.get("/reviews");
      return data;
    },
  });
  if (isLoading) {
    return <Loading></Loading>;
  }
  return (
    <div
      className={`py-12 px-4 ${
        theme === "dark" ? " text-white" : " text-black"
      }`}
    >
      <h2 className="text-4xl font-bold text-center mb-10 font-syne">
        What People Are Saying
      </h2>
      <div className="max-w-5xl mx-auto grid gap-8 grid-cols-1 md:grid-cols-2">
        {reviews.map((review) => (
          <div
            key={review._id}
            className="p-6 rounded-2xl shadow-xl bg-base-100 bg-opacity-90 backdrop-blur-md border border-green-200 dark:border-green-800"
          >
            <div className="flex justify-between items-center mb-3">
              <h4 className="font-bold text-xl">{review.name}</h4>
              <span className="text-sm text-base-content ">
                {format(new Date(review.date), "MMMM d, yyyy")}
              </span>
            </div>
            <div className="flex items-center mb-2">
              {Array.from({ length: 5 }, (_, i) => (
                <FaStar
                  key={i}
                  className={`mr-1 ${
                    i < 3 ? "text-yellow-400" : "text-gray-400"
                  }`}
                />
              ))}
            </div>
            <p className="text-lg">{review.message}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Reviews;
