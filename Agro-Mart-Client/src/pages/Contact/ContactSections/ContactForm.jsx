import React, { useContext, useState, useEffect } from "react";
import toast from "react-hot-toast";
import emailjs from "@emailjs/browser";
import { ThemeContext } from "../../../provider/ThemeProvider";

const ContactForm = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [tel, setTel] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const { theme } = useContext(ThemeContext);

  useEffect(() => {
    emailjs.init("61mSC3agsF3cMsWXG");
  }, []);

  const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!name || !email || !subject || !message) {
      toast.error("Please fill in all required fields.");
      return;
    }

    if (!validateEmail(email)) {
      toast.error("Please enter a valid email address.");
      return;
    }

    setLoading(true);

    const serviceID = "service_8z6oxv8";
    const templateID = "template_0m98pb9"; 

    const templateParams = {
      from_name: name,
      from_email: email,
      tel: tel,
      subject: subject,
      message: message,
    };

    emailjs
      .send(serviceID, templateID, templateParams)
      .then((response) => {
        console.log("Email sent successfully:", response);
        toast.success("Message sent successfully!", {
          style: {
            background: "#333",
            color: "#fff",
          },
        });
        setName("");
        setEmail("");
        setTel("");
        setSubject("");
        setMessage("");
      })
      .catch((error) => {
        console.error("Error sending email:", error.text || error);
        toast.error("Failed to send message: " + (error.text || "Unknown error"));
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <div className="mb-20">
      <div className="card lg:card-side shadow-sm">
        {/* Image Section */}
        <div className="lg:w-1/2">
          <img
            src="https://i.ibb.co/C55cyHYg/farm-model.png"
            alt="Farm Model"
            className="w-full h-full object-cover"
          />
        </div>

        {/* Form Section */}
        <div className="card-body p-2 lg:w-1/2 ">
          <div className="text-center">
            <h1 className="font-bold text-base-content">GET TO CONTACT US</h1>
            <p
              className={`mt-4 text-4xl font-bold ${
                theme === "dark" ? "text-green-500" : "text-green-600"
              }`}
            >
              Send Your Message
            </p>
          </div>

          {/* Contact Form */}
          <div
            className={`mt-12 ${
              theme === "dark" ? "bg-base-300" : "bg-white"
            } p-8 rounded-xl shadow-md `}
          >
            <form
              onSubmit={handleSubmit}
              className="grid grid-cols-1 md:grid-cols-2 gap-6"
            >
              {/* Full Name */}
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-base-content">
                  Full Name*
                </label>
                <input
                  type="text"
                  name="from_name"
                  placeholder="Full Name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                  className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500 bg-base-100"
                />
              </div>

              {/* Email Address */}
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-base-content">
                  Email Address*
                </label>
                <input
                  type="email"
                  name="from_email"
                  placeholder="Email Address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500 bg-base-100"
                />
              </div>

              {/* Phone */}
              <div className="md:col-span-1">
                <label className="block text-sm font-medium text-base-content">
                  Phone
                </label>
                <input
                  type="tel"
                  name="tel"
                  placeholder="Phone"
                  value={tel}
                  onChange={(e) => setTel(e.target.value)}
                  className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500 bg-base-100"
                />
              </div>

              {/* Subject */}
              <div className="md:col-span-1">
                <label className="block text-sm font-medium text-base-content">
                  Subject
                </label>
                <input
                  type="text"
                  name="subject"
                  placeholder="Subject"
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                  required
                  className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500 bg-base-100"
                />
              </div>

              {/* Message */}
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-base-content">
                  Message
                </label>
                <textarea
                  rows="4"
                  name="message"
                  placeholder="Write Message..."
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  required
                  className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500 bg-base-100"
                ></textarea>
              </div>

              {/* Send Message Button */}
              {loading ? (
                <button className="bg-green-600 text-white text-base font-semibold px-6 py-3 rounded-lg hover:bg-green-700 transition duration-300">
                  <span className="loading loading-spinner"></span>
                </button>
              ) : (
                <button
                  type="submit"
                  className="bg-green-600 text-white text-base font-semibold px-6 py-3 rounded-lg hover:bg-green-700 transition duration-300"
                >
                  Send Message →
                </button>
              )}
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactForm;