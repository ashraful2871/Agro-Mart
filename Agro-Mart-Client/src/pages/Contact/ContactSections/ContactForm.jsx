


const ContactForm = () => {
    return (
      <div className="mb-20">
        <div className="card lg:card-side bg-gray-100 shadow-sm">
          {/* Image Section */}
          <div className="lg:w-1/2">
            <img
              src="https://i.ibb.co.com/C55cyHYg/farm-model.png"
              alt="Farm Model"
              className="w-full h-full object-cover"
            />
          </div>
  
          {/* Form Section */}
          <div className="card-body lg:w-1/2 p-8">
            {/* Header Section */}
            <div className="text-center">
              <h1 className="font-bold text-gray-600">GET TO CONTACT US</h1>
              <p className="mt-4 text-4xl font-bold text-green-700">
                Send Your Message
              </p>
            </div>
  
            {/* Contact Form */}
            <div className="mt-12 bg-white p-8 rounded-lg shadow-md">
              <form className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Full Name */}
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700">
                    Full Name*
                  </label>
                  <input
                    type="text"
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
                    required
                    className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500"
                  ></textarea>
                </div>
  
                {/* Send Message Button */}
                <div className="md:col-span-2 text-center">
                  <button
                    type="submit"
                    className="bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition duration-300"
                  >
                    Send Message →
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  };
  
  export default ContactForm;