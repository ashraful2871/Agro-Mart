import { FaStar } from "react-icons/fa";
import ServiceSlides from "./ServiceSlides";

const Service = () => {
    return (
        <div className="flex flex-col lg:flex-row gap-8 pt-20 ">
            <div className="space-y-4 lg:w-1/3 flex flex-col justify-center text-center ">
                <h4 className="uppercase text-green-700 font-bold text-lg">Our services</h4>
                <h3 className="font-bold text-3xl">What We Provide</h3>
                <div className="flex flex-col lg:flex-row space-x-4 items-start mx-auto">
                    <div className="w-16 h-16 min-w-[4rem] rounded-full overflow-hidden mx-auto">
                        <img 
                            src="https://i.ibb.co.com/wZfTrtPz/bedge-of-number-1.jpg" 
                            alt="Number 1 badge" 
                            className="w-full h-full object-cover"
                        />
                    </div>
                    <div>
                        <h4 className="font-bold lg:text-start">Best Services</h4>
                        <p className="text-base text-gray-600">National Best Services Awards</p>
                        <p className="text-green-700 font-medium flex items-center gap-1"><span className=""><FaStar /></span> 5/5 For The Agro Service</p>
                    </div>
                </div>
            </div>
            <div className="lg:w-2/3">
                <ServiceSlides />
            </div>
        </div>
    );
};

export default Service;