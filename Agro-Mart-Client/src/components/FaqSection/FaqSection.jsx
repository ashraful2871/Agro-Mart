import { useState } from "react";
import FaqSectionsImageOne from "../../assets/senior-hardworking-farmer-agronomist-soybean-field-checking-crops-before-harvest.jpg";
import FaqSectionsImageTwo from "../../assets/positive-mature-man-carrying-basket-with-fresh-strawberries.jpg";


const FaqSection = () => {
    const [activeFAQ, setActiveFAQ] = useState(null);

    const toggleFAQ = (index) => {
      if (activeFAQ === index) {
        setActiveFAQ(null); 
      } else {
        setActiveFAQ(index); 
      }
    };

    const faqs = [
        {
          question: "What are the best crops to grow in this region?",
          answer:
            "The best crops to grow depend on the climate and soil conditions. For this region, some suitable crops include wheat, corn, and soybeans.",
        },
        {
          question: "How can we improve soil fertility?",
          answer:
            "Soil fertility can be improved through crop rotation, the use of organic fertilizers, and adding compost or manure to enrich the soil.",
        },
        {
          question: "What are the benefits of sustainable farming practices?",
          answer:
            "Sustainable farming practices help preserve natural resources, reduce the carbon footprint, and ensure the long-term health of the ecosystem and the farm's productivity.",
        },
        
      ];

    return (
       <>
       {/* its just for large device */}
       <div className="hidden lg:block">
        {/* // bg-[#faf9f7] */}
        <div className="flex flex-col md:flex-row justify-between pt-20 pb-44 relative">
            <div className=""><img src={FaqSectionsImageOne} alt="" className="h-96 w-[450px] rounded-xl"/></div>
            <div className="max-w-lg lg:max-w-xl">
                <h3 className="text-xl text-green-700">Frequently Asked Questions</h3>
                <h3 className="text-5xl font-bold my-2 font-syne">Do You Have Any Questions ?</h3>
                <p>Explore the frequently asked questions below for quick solutions to common inquiries. We’ve got you covered with helpful insights and support.</p>
            </div>
        </div>
        {/* Question & Answer */}
        <div className="relative">
        <div className="ml-auto absolute -top-[350px] right-0 flex">
        <div className="mr-24">
            <img src={FaqSectionsImageTwo} alt="" className="h-60 w-60 rounded-xl"/>
        </div>
        <div className="max-w-xl">
        {faqs.map((faq, index) => (
        <div key={index} className="mb-4">
          <button
            className="w-full py-3 px-4 text-left bg-green-500 text-white rounded-lg flex justify-between items-center focus:outline-none hover:bg-green-400"
            onClick={() => toggleFAQ(index)}
          >
            {faq.question}
            <span className="text-xl">{activeFAQ === index ? "-" : "+"}</span>
          </button>
          <div
            className={`${
              activeFAQ === index
                ? "opacity-100 max-h-[400px]"
                : "opacity-0 max-h-0"
            } mt-2 rounded-lg transition-all duration-500 ease-in-out overflow-hidden`}
          >
            <p>{faq.answer}</p>
          </div>
        </div>
      ))}
        </div>
    </div>
        </div>
       </div>

       {/* Its for small and medium device */}
       <div className="block lg:hidden">
       <div className="py-20">
            <div className="text-center">
                <h3 className="text-xl text-green-700">Frequently Asked Questions</h3>
                <h3 className="text-5xl font-bold my-2 font-syne">Do You Have Any Questions ?</h3>
                <p>Explore the frequently asked questions below for quick solutions to common inquiries. We’ve got you covered with helpful insights and support.</p>
            </div>
            <div className="max-w-xl mx-auto mt-4">
        {faqs.map((faq, index) => (
        <div key={index} className="mb-4">
          <button
            className="w-full py-3 px-4 text-left bg-green-500 text-white rounded-lg flex justify-between items-center focus:outline-none hover:bg-green-400"
            onClick={() => toggleFAQ(index)}
          >
            {faq.question}
            <span className="text-xl">{activeFAQ === index ? "-" : "+"}</span>
          </button>
          <div
            className={`${
              activeFAQ === index
                ? "opacity-100 max-h-[400px]"
                : "opacity-0 max-h-0"
            } mt-2 rounded-lg transition-all duration-500 ease-in-out overflow-hidden`}
          >
            <p>{faq.answer}</p>
          </div>
        </div>
      ))}
        </div>
        </div>
       </div>
       </>
    );
};

export default FaqSection;