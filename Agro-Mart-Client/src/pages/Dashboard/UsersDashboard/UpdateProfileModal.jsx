import { useState } from "react";
import { useDispatch } from "react-redux";
import { toast } from "react-hot-toast";
import { updateUserProfile} from "../../../store/authSlice.js";

const UpdateProfileModal = ({ isOpen, closeModal, user }) => {
  const dispatch = useDispatch();

  const [name, setName] = useState(user?.displayName || "");
  const [email] = useState(user?.email || "");

  const handleUpdate = () => {
    dispatch(updateUserProfile({ name, photo: user?.photoURL || "" }))
      .unwrap()
      .then(() => {
        toast.success("Profile updated successfully!");
        closeModal();
      })
      .catch((err) => {
        toast.error("Update failed: " + err);
      });
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 z-50 flex items-center justify-center">
      <div className="bg-white rounded-xl shadow-lg p-6 w-full max-w-md relative">
        {/* Close Button */}
        <button
          className="absolute top-3 right-3 text-gray-500 hover:text-red-600 text-xl"
          onClick={closeModal}
        >
          ✕
        </button>

        {/* Header */}
        <h2 className="text-2xl font-bold text-center mb-6">Update Profile</h2>

        {/* Form Fields */}
        <div className="space-y-4">
          <div>
            <label className="block text-sm text-gray-600 mb-1">Name</label>
            <input
              type="text"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-200"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div>
            <label className="block text-sm text-gray-600 mb-1">Email</label>
            <input
              type="email"
              className="w-full px-4 py-2 border border-gray-200 bg-gray-100 rounded-lg"
              value={email}
              disabled
            />
          </div>
        </div>

        {/* Buttons */}
        <div className="mt-6 flex justify-between">
          <button
            onClick={closeModal}
            className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300"
          >
            Cancel
          </button>
          <button
            onClick={handleUpdate}
            className="px-6 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600"
          >
            Update
          </button>
        </div>
      </div>
    </div>
  );
};

export default UpdateProfileModal;
