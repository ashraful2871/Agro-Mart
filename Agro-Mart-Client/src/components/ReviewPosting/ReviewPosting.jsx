import { useState } from "react";



const ReviewPosting = () => {
    const [rating, setRating] = useState(0);
    const [reviewText, setReviewText] = useState("");
    const [userName, setUserName] = useState("");

    const handleSubmit = async (e) =>{

    }

    return (
        <div className="flex items-center justify-center mt-5 mb-20">
            <div className="bg-gradient-to-r from-[#cbec5f] via-[#66b500] to-[#438d00] px-10 py-20 rounded-tr-[200px] rounded-bl-[200px] md:px-60 md:py-20 md:rounded-tr-full md:rounded-bl-full border-t-4 border-b-4 border-[#0b4401]">
            <div className="">
        <h2 className="text-3xl font-bold text-white">Rate and Review</h2>

        <form onSubmit={handleSubmit} className="grid grid-cols-1 justify-items-center">

        <div>
          <input
            type="text"
            className="input input-info w-80 my-3"
            placeholder="Your Name"
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
            required
          />
        </div>

          <div className="rating py-4">
            {[1, 2, 3, 4, 5].map((star) => (
              <input
                key={star}
                type="radio"
                name="rating"
                className={`mask mask-star ${rating >= star ? "bg-yellow-500" : "bg-gray-300"}`}
                value={star}
                checked={rating === star}
                onChange={() => setRating(star)}
                required
              />
            ))}
          </div>
          <textarea
            className="textarea textarea-info"
            placeholder="Write your review here..."
            value={reviewText}
            onChange={(e) => setReviewText(e.target.value)}
            required
          ></textarea>
          <button type="submit" className="btn bg-[#cbec5f] border-green-700 mt-4">
            Post Review
          </button>
        </form>
      </div>
            </div>
        </div>
    );
};

export default ReviewPosting;