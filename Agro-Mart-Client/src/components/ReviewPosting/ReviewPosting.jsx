import { useContext, useState } from "react";
import { ThemeContext } from "../../provider/ThemeProvider";
import { useTranslation } from "react-i18next";

const ReviewPosting = () => {
  const [rating, setRating] = useState(0);
  const [reviewText, setReviewText] = useState("");
  const [userName, setUserName] = useState("");
  const { theme } = useContext(ThemeContext);
  const { t } = useTranslation();
  const handleSubmit = async (e) => {};

  return (
    <>
      <div className="flex justify-center">
        <div className="text-center">
          <h5
            className={`${
              theme === "dark" ? "text-green-600" : "text-green-700"
            }`}
          >
            {" "}
            {t("review.title")}{" "}
          </h5>
          <h3 className="text-5xl font-bold font-syne max-w-3xl py-4">
            {t("review.subTitle")}
          </h3>
        </div>
      </div>
      <div className="flex items-center justify-center mt-5 mb-20">
        <div className="relative w-[1100px] h-[600px] px-10 py-20 rounded-tr-[200px] rounded-bl-[200px] md:px-60 md:py-20 md:rounded-tr-full md:rounded-bl-full border-t-4 border-b-4 border-[#0b4401] overflow-hidden">
          {/* Background Image Layer */}
          <div
            className="absolute object-cover inset-0 bg-cover bg-center z-0 "
            style={{
              backgroundImage:
                "url('https://i.ibb.co.com/svpfgKCW/istockphoto.jpg')",
              transform: "rotate(180deg) scale(1.1)", // rotate 5 degrees and scale to avoid gaps
              transformOrigin: "center",
            }} // Replace with actual image path
          ></div>

          {/* Gradient Overlay */}
          <div className="absolute inset-0 bg-black opacity-40 z-0"></div>

          <form
            onSubmit={handleSubmit}
            className="grid grid-cols-1 justify-items-center"
          >
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
                  className={`mask mask-star ${
                    rating >= star ? "bg-yellow-500" : "bg-gray-300"
                  }`}
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
            <button
              type="submit"
              className="btn bg-[#cbec5f] border-green-700 mt-4"
            >
              Post Review
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default ReviewPosting;
