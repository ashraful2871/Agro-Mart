import { useContext } from "react";
import { BiSupport } from "react-icons/bi";
import { ImLocation } from "react-icons/im";
import { MdOutlineMarkEmailRead } from "react-icons/md";
import { ThemeContext } from "../../../provider/ThemeProvider";

const ContactInfo = () => {
  const { theme } = useContext(ThemeContext);
  return (
    <div className="py-20 grid grid-cols-1 md:grid-cols-2 gap-4 justify-items-center p-2">
      <div className="max-w-lg">
        <h4
          className={`${
            theme === "dark" ? "text-green-500" : "text-green-700"
          } uppercase text-xs font-bold `}
        >
          Contact Info
        </h4>
        <h3 className="text-4xl  font-bold font-syne my-4">
          Get in Touch
        </h3>
        <p className="text-sm ">
          You can contact us through email, phone, or by filling out the form
          below. We aim to respond to all inquiries as quickly as possible and
          ensure your experience with us is seamless. Your communication is
          important to us, and we look forward to connecting with you!
        </p>
        <div className="">
          <div className="my-4 flex">
            <div className="text-green-700 text-2xl flex justify-center items-center mr-4">
              <ImLocation />
            </div>
            <div>
              <h2 className="font-bold text-lg">Location</h2>
              <p>abc Dhaka Bangladesh</p>
            </div>
          </div>
          <div className="flex">
            <div className="text-green-700 text-2xl flex justify-center items-center mr-4">
              <MdOutlineMarkEmailRead />
            </div>
            <div>
              <h2 className="font-bold text-lg">Email</h2>
              <p>contact@gmail.com</p>
            </div>
          </div>
          <div className="my-4 flex">
            <div className="text-green-700 text-2xl flex justify-center items-center mr-4">
              <BiSupport />
            </div>
            <div>
              <h2 className="font-bold text-lg">Support</h2>
              <p>01712345678</p>
            </div>
          </div>
        </div>
      </div>
      <div className="relative w-full mx-auto max-w-xl">
        {/* Dot Image */}
        <div className="absolute top-0 left-0 z-10">
          <img
            src="https://i.ibb.co.com/SwHJnn6T/dot-image.png"
            alt="Dot Pattern"
            className="max-w-32"
          />
        </div>

        {/* City Image */}
        <div className="absolute top-0 left-28 z-0">
          <img
            src="https://i.ibb.co.com/B2jbpXBY/city-7358078-1280.jpg"
            alt="City"
            className="rounded-xl w-full max-w-md"
          />
        </div>

        {/* Farm Info Card */}
        <div className="relative mt-48 space-y-2 py-6 px-8 bg-base-200 rounded-xl z-20 w-fit">
          <h2 className="font-bold text-lg">Dhaka Farm</h2>
          <p className="text-base-content">abc Dhaka Bangladesh</p>
          <p className="font-bold text-base-content">01712345678</p>
        </div>
      </div>
    </div>
  );
};

export default ContactInfo;
