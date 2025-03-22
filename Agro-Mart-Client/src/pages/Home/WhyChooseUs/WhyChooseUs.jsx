import React from 'react';

const WhyChooseUs = () => {
    return (
        <div className='flex flex-col lg:flex-row justify-between items-center p-8 bg-gray-50 w-11/12 mx-auto mb-20'>
            <div className='space-y-6 max-w-xl'>
                <h4 className='text-green-700 uppercase text-sm font-bold tracking-wide'>Why Choose Us</h4>
                <h2 className='font-syne text-4xl font-bold text-gray-900'>We Are Different From Other Farming</h2>
                <p className='text-gray-600'>
                    Our farming methods are sustainable, eco-friendly, and designed to deliver the highest quality produce. 
                    We prioritize nature and health in everything we do.
                </p>
                <div className='space-y-6'>
                    <div className='flex md:space-x-4'>
                        <div className='text-green-700 text-2xl hidden md:block'>🌱</div>
                        <div>
                            <h3 className='font-bold text-xl text-gray-800'>Sustainable Practices</h3>
                            <p className='text-gray-600'>
                                We use eco-friendly techniques to ensure the land remains fertile for future generations.
                            </p>
                        </div>
                    </div>
                    <div className='flex md:space-x-4'>
                        <div className='text-green-700 text-2xl hidden md:block'>🍃</div>
                        <div>
                            <h3 className='font-bold text-xl text-gray-800'>Organic Certification</h3>
                            <p className='text-gray-600'>
                                All our products are certified organic, free from harmful chemicals and pesticides.
                            </p>
                        </div>
                    </div>
                </div>
                <div className='grid grid-cols-2 gap-4 mt-6'>
                    <div className='flex items-center space-x-2'>
                        <span className='text-green-700 text-xl'>✔️</span>
                        <p className='text-gray-600'>100% Natural</p>
                    </div>
                    <div className='flex items-center space-x-2'>
                        <span className='text-green-700 text-xl'>✔️</span>
                        <p className='text-gray-600'>Locally Sourced</p>
                    </div>
                    <div className='flex items-center space-x-2'>
                        <span className='text-green-700 text-xl'>✔️</span>
                        <p className='text-gray-600'>Eco-Friendly</p>
                    </div>
                    <div className='flex items-center space-x-2'>
                        <span className='text-green-700 text-xl'>✔️</span>
                        <p className='text-gray-600'>Fresh & Healthy</p>
                    </div>
                </div>
            </div>
            <div className="max-w-md relative mt-4 lg:mt-0 flex flex-col items-center justify-center">
            <img 
                src="https://i.ibb.co/1Yz6gN2g/raspberries-2023404-1280.jpg" 
                alt="Farming Illustration" 
                className="rounded-lg shadow-lg w-full" 
            />
            
            <div className="hidden lg:block absolute -bottom-28 -left-28"> 
                <img 
                    src="https://i.ibb.co/xtJfP48V/pumpkin-1768857-1280.jpg" 
                    alt="Farming Illustration" 
                    className="rounded-lg shadow-lg w-96" 
                />
            </div>
            </div>
        </div>
    );
};

export default WhyChooseUs;