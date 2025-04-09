import {
    Dialog,
    Transition,
  } from '@headlessui/react';
import { Fragment, useState } from 'react';
import toast from 'react-hot-toast';
import { AiOutlineHeart } from 'react-icons/ai';
import { FaFacebookF, FaTwitter, FaPinterestP, FaStar } from 'react-icons/fa';
import useAuth from '../../hooks/useAuth';
import useAxiosSecure from '../../hooks/useAxiosSecure';
  
  const ViewModal = ({ isOpen, closeModal, product }) => {
    const {
      name,
      price,
      image,
      category,
      description,
      stockQuantity,
      discount = 64,
      oldPrice = 48,
      tags = ['Vegetables', 'Healthy', 'Chinese', 'Green Cabbage'],
      brand = 'Farmway',
    } = product;
  
    const [quantity, setQuantity] = useState(1);
    const [selectedImage, setSelectedImage] = useState(image);
  
    const handleQuantity = (val) => {
      if (val < 1) {
        toast.error('Minimum quantity is 1');
        setQuantity(1);
      } else if (val > stockQuantity) {
        toast.error('Exceeds available stock');
        setQuantity(stockQuantity);
      } else {
        setQuantity(val);
      }
    };
  
    const addCard = async (cartProduct) => {
      const { image, _id, name, category, price } = cartProduct;
      const cardData = {
        image,
        productId: _id,
        name,
        category,
        price,
        userInfo: {
          name: user?.displayName,
          email: user?.email,
        },
      };
      const { data } = await axiosSecure.post("/add-cart", { cardData });
      console.log(data);
      if (data.insertedId) {
        toast.success("item added successfully in cart");
      }
    };

    const user = useAuth();
    const axiosSecure = useAxiosSecure();

    const addWish = async (wishProduct) => {
      const { image, _id, name, category, price } = wishProduct;
      const wishData = {
        image,
        productId: _id,
        name,
        category,
        price,
        userInfo: {
          name: user?.displayName,
          email: user?.email,
        },
      };
      const { data } = await axiosSecure.post("/add-wish", { wishData });
      console.log(data);
      if (data.insertedId) {
        toast.success("item added successfully in wish");
      }
    };
  
    return (
      <Transition appear show={isOpen} as={Fragment}>
        <Dialog as="div" className="relative z-50" onClose={closeModal}>
          
            <div className="fixed inset-0 bg-black/30" />
  
          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex items-center justify-center min-h-full p-4">
                <Dialog.Panel className="w-full max-w-4xl transform overflow-hidden rounded-2xl bg-white p-6 shadow-xl transition-all">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                    {/* Left side gallery */}
                    <div className="">
                      
                      <img
                        src={selectedImage}
                        alt={name}
                        className="rounded-lg w-full h-80 object-contain"
                      />
                    </div>
  
                    {/* Right side content */}
                    <div className="space-y-3">
                      <h2 className="text-2xl font-bold text-gray-800">{name}</h2>
                      <div className="flex items-center gap-2 text-yellow-500">
                        {[...Array(4)].map((_, i) => (
                          <FaStar key={i} />
                        ))}
                        <span className="text-sm text-gray-600 ml-2">4 Review • SKU: 251,594</span>
                      </div>
  
                      <div className="flex items-center gap-3">
                        <span className="text-xl font-bold text-green-600">${price}</span>
                        <span className="line-through text-gray-500">${oldPrice}</span>
                        <span className="text-sm bg-red-100 text-red-600 px-2 py-1 rounded">-{discount}% Off</span>
                      </div>
  
                      <div className="flex justify-between items-center">
                        <div className='flex items-center gap-2'>
                        <span className="font-semibold">Brand:</span>
                        <img
                          src="https://i.ibb.co/MZkPq3r/farmway.png"
                          alt="brand"
                          className="h-6"
                        />
                        </div>
                        {/* Share icons */}
                      <div className="flex gap-3 mt-4 text-green-700">
                        <span className="font-semibold">Share item:</span>
                        <FaFacebookF className="cursor-pointer hover:text-blue-600" />
                        <FaTwitter className="cursor-pointer hover:text-sky-500" />
                        <FaPinterestP className="cursor-pointer hover:text-red-500" />
                      </div>
                      </div>
  
                      <p className="text-sm py-2 text-gray-600">
                        {description}
                      </p>
  
                      {/* Quantity selector */}
                      <div className="flex items-center justify-between mt-4">

                        <div className='border rounded-full p-1'>
                        <button
                          onClick={() => handleQuantity(quantity - 1)}
                          className="w-8 h-8 border rounded-full text-lg bg-green-100"
                        >  - </button>
                        <input
                          type="number"
                          value={quantity}
                          onChange={(e) => handleQuantity(parseInt(e.target.value))}
                          className="w-16 text-center"
                        />
                        <button
                          onClick={() => handleQuantity(quantity + 1)}
                          className="w-8 h-8 border rounded-full text-lg bg-green-100"
                        > + </button>
                        </div>

                        <div>
                        <button
                          onClick={() => addCard(product)}
                          className="ml-4 px-6 py-2 w-full bg-green-600 text-white rounded-full hover:bg-green-700"
                        >
                          Add to Cart
                        </button>
                        </div>

                        <div onClick={() => addWish(product)}>
                        <button className="p-2 bg-green-100 rounded-full">
                          <AiOutlineHeart className="text-green-600 text-lg" />
                        </button>
                        </div>

                      </div>
  
                      {/* Tags & Category */}
                      <div className="text-sm text-gray-700 space-y-1 mt-4">
                        <p><strong>Category:</strong> {category}</p>
                        <p>
                          <strong>Tags:</strong>{' '}
                          {tags.map((tag, i) => (
                            <span key={i} className="mr-1 text-green-600">{tag}</span>
                          ))}
                        </p>
                      </div>
                    </div>
                  </div>
                </Dialog.Panel>
            </div>
          </div>
        </Dialog>
      </Transition>
    );
  };
  
  export default ViewModal;
  