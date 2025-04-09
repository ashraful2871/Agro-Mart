import { useContext } from "react";
import { ThemeContext } from "../../../provider/ThemeProvider";

const AboutAgro = () => {
  const { theme } = useContext(ThemeContext);
  return (
    <div>
      <div
        className={`${
          theme === "dark" ? "bg-[#1F2937]" : "bg-white"
        } py-16 flex flex-col lg:flex-row justify-between`}
      >
        <div className="flex justify-center items-center">
          <img
            src="https://i.ibb.co.com/gZGgsyDv/freepik-background-12695.png"
            alt=""
          />
        </div>
        <div className="max-w-full lg:max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header Section */}
          <div className="">
            <h1 className="text-4xl font-bold text-green-700">ABOUT AGRO</h1>
            <p className="mt-4 text-5xl font-bold text-base-content">
              Organic & Healthy Food
            </p>
          </div>

          {/* Introduction */}
          <p className="mt-8 text-lg text-base-content ">
            At Agro, we are committed to revolutionizing agriculture by
            providing sustainable, organic, and healthy food solutions. Our
            mission is to empower farmers, promote green practices, and ensure
            food security for future generations.
          </p>

          {/* Agriculture & Foods Section */}
          <div className="mt-12 flex flex-col md:flex-row justify-between gap-8">
            <div
              className={`${
                theme === "dark" ? "bg-[#1F2937]" : "bg-white"
              } p-6 rounded-lg shadow-md flex-1`}
            >
              <h2 className="text-2xl font-semibold text-green-700">
                Agriculture & Foods
              </h2>
              <p className="mt-2 text-base-content">
                We specialize in modern farming techniques and food production,
                ensuring high-quality, organic products for global markets.
              </p>
            </div>

            {/* Vegetables & Fruits Section */}
            <div
              className={`${
                theme === "dark" ? "bg-[#1F2937]" : "bg-white"
              } p-6 rounded-lg shadow-md flex-1`}
            >
              <h2 className="text-2xl font-semibold text-green-700">
                Vegetables & Fruits
              </h2>
              <p className="mt-2 text-base-content">
                Our farms produce a wide variety of fresh, organic vegetables
                and fruits, grown with care and sustainability in mind.
              </p>
            </div>
          </div>

          {/* Mission Statement */}
          <p className="mt-12 text-lg text-base-content ">
            By converting non-utilized lands into productive farms, we provide
            agricultural livelihoods for farmers, employ youth, and contribute
            to a greener, more sustainable future.
          </p>

          {/* Footer Section */}
          <div className="mt-16 flex flex-col md:flex-row justify-between items-center gap-8">
            <p className="text-base-content">Co-Founder, Agro</p>
            <button className="bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition duration-300">
              Explore More →
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutAgro;
