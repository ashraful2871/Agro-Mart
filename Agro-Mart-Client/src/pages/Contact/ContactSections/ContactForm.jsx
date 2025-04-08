import React, { useState } from "react";
import toast from "react-hot-toast";
import emailjs from "@emailjs/browser";

const ContactForm = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [tel, setTel] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);

    const serviceID = "service_8z6oxv8";
    const templateID = "template_0m98pb9";
    const publicKey = "61mSC3agsF3cMsWXG";

    const templateParams = {
      from_name: name,
      from_email: email,
      tel: tel,
      subject: subject,
      message: message,
    };

    emailjs
      .send(serviceID, templateID, templateParams, publicKey)
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
        console.error("Error sending email:", error);
        toast.error("Failed to send message. Try again.");
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <div className="mb-20">
      <div className="card lg:card-side bg-gray-100 shadow-sm">
        {/* Image Section */}
        <div className="lg:w-1/2">
          <img
            src="https://i.ibb.co/C55cyHYg/farm-model.png"
            alt="Farm Model"
            className="w-full h-full object-cover"
          />
        </div>

        {/* Form Section */}
        <div className="card-body lg:w-1/2 p-8">
          <div className="text-center">
            <h1 className="font-bold text-gray-600">GET TO CONTACT US</h1>
            <p className="mt-4 text-4xl font-bold text-green-700">
              Send Your Message
            </p>
          </div>

          {/* Contact Form */}
          <div className="mt-12 bg-white p-8 rounded-lg shadow-md">
            <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
              
              {/* Full Name */}
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700">
                  Full Name*
                </label>
                <input
                  type="text"
                  name="from_name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                  className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500"
                />
              </div>

              {/* Email Address */}
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700">
                  Email Address*
                </label>
                <input
                  type="email"
                  name="from_email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500"
                />
              </div>

              {/* Phone */}
              <div className="md:col-span-1">
                <label className="block text-sm font-medium text-gray-700">
                  Phone
                </label>
                <input
                  type="tel"
                  name="tel"
                  value={tel}
                  onChange={(e) => setTel(e.target.value)}
                  className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500"
                />
              </div>

              {/* Subject */}
              <div className="md:col-span-1">
                <label className="block text-sm font-medium text-gray-700">
                  Subject
                </label>
                <input
                  type="text"
                  name="subject"
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                  required
                  className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500"
                />
              </div>

              {/* Message */}
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700">
                  Write Message...
                </label>
                <textarea
                  rows="4"
                  name="message"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  required
                  className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500"
                ></textarea>
              </div>

              {/* Send Message Button */}
              {loading ? (
                <button className="w-full py-1 px-4 font-bold text-base text-black bg-[#f9df60] hover:bg-[#fde047] rounded-lg focus:outline-none">
                  <span className="loading loading-spinner"></span>
                </button>
              ) : (
                <button
                  type="submit"
                  className="bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition duration-300"
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
