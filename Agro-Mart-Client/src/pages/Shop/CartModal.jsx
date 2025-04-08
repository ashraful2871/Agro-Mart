import {
    Dialog,
    Transition,
    TransitionChild,
    DialogPanel,
    DialogTitle,
  } from "@headlessui/react";
  import { Fragment, useState } from "react";
  import toast from "react-hot-toast";
import useAuth from "../../hooks/useAuth";
  
  const CartModal = ({ isOpen, closeModal, product }) => {
    const { name, price, category, image, stockQuantity } = product;
    const [quantity, setQuantity] = useState(1);
    const { user } = useAuth();
  
    const handleQuantity = (value) => {
      if (value > stockQuantity) {
        setQuantity(stockQuantity);
        return toast.error("Quantity exceeds available stock!");
      }
      if (value < 1) {
        setQuantity(1);
        return toast.error("Minimum quantity is 1");
      }
      setQuantity(value);
    };
  
    const handleAddToCart = () => {
        if (!user || !user.email) {
          return toast.error("Please login to add items to cart");
        }
      
        const cartItem = {
          ...product,
          selectedQuantity: quantity,
          addedBy: {
            name: user.name,
            email: user.email,
          },
        };
      
        console.log("Added to Cart:", cartItem, addedBy);

        toast.success("Item added to cart!");
        closeModal();
      };
      
  
    return (
      <Transition appear show={isOpen} as={Fragment}>
        <Dialog as="div" className="relative z-50" onClose={closeModal}>
          <TransitionChild
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-30" />
          </TransitionChild>
  
          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4">
              <TransitionChild
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <DialogPanel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left shadow-xl transition-all">
                  <DialogTitle
                    as="h3"
                    className="text-lg font-bold text-center text-green-700"
                  >
                    Add to Cart
                  </DialogTitle>
  
                  <div className="mt-4 space-y-2 text-gray-700">
                    <img src={image} alt={name} className="w-full h-48 object-cover rounded-md" />
                    <p><strong>Product:</strong> {name}</p>
                    <p><strong>Category:</strong> {category}</p>
                    <p><strong>Price:</strong> ${price}</p>
                    <p><strong>Available:</strong> {stockQuantity}</p>
                  </div>
  
                  <div className="mt-4">
                    <label htmlFor="quantity" className="block mb-1 text-sm font-medium text-gray-700">
                      Quantity:
                    </label>
                    <input
                      id="quantity"
                      type="number"
                      min={1}
                      max={stockQuantity}
                      value={quantity}
                      onChange={(e) => {
                        const value = parseInt(e.target.value);
                        if (!isNaN(value)) {
                          handleQuantity(value);
                        }
                      }}
                      className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                    />
                  </div>
  
                  <div className="mt-6 flex justify-end gap-2">
                    <button
                      onClick={closeModal}
                      className="px-4 py-2 bg-gray-200 text-gray-800 rounded hover:bg-gray-300"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={handleAddToCart}
                      className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
                    >
                      Add to Cart
                    </button>
                  </div>
                </DialogPanel>
              </TransitionChild>
            </div>
          </div>
        </Dialog>
      </Transition>
    );
  };
  
  export default CartModal;
  