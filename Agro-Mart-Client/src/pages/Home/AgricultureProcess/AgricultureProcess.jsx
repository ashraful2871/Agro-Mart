import React from "react";

const AgricultureProcess = () => {
  const steps = [
    {
      id: "01",
      title: "Schedule Your Experience",
      description:
        "When you work with us, you’ll see that absolute conditions is our priority.",
      icon: "📅",
    },
    {
      id: "02",
      title: "Get Professional Advice",
      description:
        "When you work with us, you’ll see that absolute conditions is our priority.",
      icon: "🛠️",
    },
    {
      id: "03",
      title: "Meet Our Expert People",
      description:
        "When you work with us, you’ll see that absolute conditions is our priority.",
      icon: "👨‍🌾",
    },
    {
      id: "04",
      title: "Now Get A Best Products",
      description:
        "When you work with us, you’ll see that absolute conditions is our priority.",
      icon: "🛒",
    },
  ];

  return (
    <section className="xl:relative  py-10 md:py-16 lg:py-20">
      <div className="flex flex-col xl:flex-row gap-8">
        {/* Left Side Image */}
        <div className="xl:w-1/2">
          <img
            src="https://i.ibb.co.com/CgRwKPZ/farmer-2.jpg"
            alt="Agriculture"
            className="w-full h-full object-cover rounded-tr-[200px] md:rounded-tr-[250px] lg:rounded-tr-[300px]"
          />
        </div>

        {/* Right Side Content */}
        <div className="xl:w-1/2 text-center">
          <h3 className="text-green-600 font-bold uppercase text-sm">
            Work Process
          </h3>
          <h2 className="text-3xl md:text-4xl font-bold text-base-content mt-2">
            The Agriculture Process
          </h2>
          <p className="mt-4 text-base-content text-sm md:text-base">
            We take part in many key international agricultural exhibitions,
            which gives us the opportunity to find new partners, learn new
            trends in the development of the agricultural sector, share
            experiences, present our products and the latest innovations.
          </p>

          {/* Experience Badge */}
          <div className="mt-6 flex items-center justify-center space-x-4">
            <div className="bg-green-100 p-4 rounded-full">
              <img
                src="https://cdn-icons-png.flaticon.com/512/2906/2906279.png"
                alt="Farm"
                className="w-12 h-12"
              />
            </div>
            <div>
              <h3 className="text-3xl font-bold text-green-700">250+</h3>
              <p className="text-base-content">Years of experience</p>
            </div>
          </div>

          {/* Process Steps */}
          <div className="xl:absolute left-9 mt-28 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-4 gap-6">
            {steps.map((step) => (
              <div
                key={step.id}
                className="bg-base-100 p-6 rounded-xl shadow-md hover:shadow-lg transition duration-300 border"
              >
                <span className="text-base-content text-3xl text-green-600 font-bold">
                  {step.id}
                </span>
                <h4 className="text-lg font-bold text-base-content mt-2 flex items-center">
                  {step.icon} <span className="ml-2">{step.title}</span>
                </h4>
                <p className="text-sm text-base-content mt-1">
                  {step.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default AgricultureProcess;
