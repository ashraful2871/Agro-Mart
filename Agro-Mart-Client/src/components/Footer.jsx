import pic from "../assets/freepik__background__21643.png"

const Footer = () => {
    return (
        <div>
            <div className="flex justify-between gap-10">
                {/* newsletter */}
                <div className="bg-green-700 p-7 text-white rounded-b-xl">
                    <h3 className="text-4xl font-bold">Sign up to our Newslatters</h3>
                    <p className="my-2">Sign up to our newslatter & event right now to be updated</p>
                    <input type="email" placeholder="Enter your email address" className="p-4 w-full rounded-xl bg-purple-100"/><br/>
                    <button className="p-4 my-2 w-full rounded-xl bg-yellow-300 text-black font-bold">Subscribe</button>
                </div>
        
                <div>
                    {/* first div */}
                    <div className="mb-2 flex justify-between">
                        {/* Project description */}
                        <div className=" flex flex-col justify-center">
                            <h3>
                                <span className="text-4xl font-bold text-green-700">Agro</span>
                                <span className="text-4xl font-bold text-yellow-300">Mart</span>
                            </h3>
                            <p className="max-w-96">It's a platform enables farmers to sell agricultural products, manage inventory, and process orders while providing consumers with fresh farm produce at fair prices.
                            </p>
                        </div>
                        {/* image */}
                        <div>
                            <img src={pic} alt="" className="h-64"/>
                        </div>
                    </div>
                    {/* Next div */}
                    <div className="grid grid-cols-3 gap-5">
                        {/* Contact Information */}
                        <div>
                          <h3 className="text-xl font-bold text-green-700 mb-4">Contact Us</h3>
                          <p className="mb-2">📍 abc, Dhaka, Bangladesh</p>
                          <p className="mb-2">📞 01712345678</p>
                          <p>📧 agroMartSupport@gmail.com</p>
                        </div>
                        {/* our services */}
                        <div>
                          <h3 className="text-xl font-bold text-green-700 mb-4">Our Services</h3>
                          <ul className="list-disc">
                            <li>Farm-to-consumer sales.</li>
                            <li>Simple product and order management.</li>
                            <li>Secure payments and delivery.</li>
                            <li>Support with live chat and languages.</li>
                          </ul>
                        </div>
                        {/* About AgroMart */}
                        <div>
                          <h3 className="text-xl font-bold text-green-700 mb-4">AgroMart</h3>
                          <p>We carry out our mission based on the values of impeccable business reputation, social responsibility, respect for human dignity and synergetic and result-oriented partnerships.</p>
                        </div>
                    </div>
                </div>
            </div>
            {/* divider */}
            <div className="divider"></div>
            {/* copyWrite Warning */}
            <div className="text-center px-5 pb-5">
            <p>&copy; Copyright 2025 Agro. All Rights Reserved.</p>
            </div>
        </div>
    );
};

export default Footer;