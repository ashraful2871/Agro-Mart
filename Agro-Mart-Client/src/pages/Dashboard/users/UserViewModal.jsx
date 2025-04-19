import React from "react";
import { Dialog } from "@mui/material";

const UserViewModal = ({ isOpen, closeModal, user }) => {
  return (
    <Dialog open={isOpen} onClose={closeModal} fullWidth maxWidth="sm">
      <div className="p-6 bg-base-100 rounded-lg text-center text-base-content">
        <h2 className="text-xl font-semibold mb-4">User Information</h2>
        {user && (
          <>
            <img
              referrerPolicy="no-referrer"
              src={user.photo}
              alt=""
              className="rounded-full w-40 h-40 mx-auto my-4"
            />
            <p>
              <strong>Name:</strong> {user.name}
            </p>
            <p className="my-2">
              <strong>Email:</strong> {user.email}
            </p>
            <p>
              <strong>Phone:</strong> {user.phone}
            </p>
          </>
        )}
        <div className="flex justify-end mt-4">
          <button onClick={closeModal} className="btn">
            Close
          </button>
        </div>
      </div>
    </Dialog>
  );
};

export default UserViewModal;
