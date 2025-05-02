import { useContext, useState } from "react";
import { ThemeContext } from "../../provider/ThemeProvider";
import { useTranslation } from "react-i18next";
import "./review.css";

const Review = () => {
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
      {/* bg-gradient-to-r from-green-700 via-green-600 to-green-700 */}
      <div className="flex items-center justify-center mt-5 mb-20">
        <div className=" bg-image border-[#0b4401] w-full h-96 ">
          <div className="border border-red-500 h-full bg-black opacity-35">
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
      </div>
    </>
  );
};

export default Review;
