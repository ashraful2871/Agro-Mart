import React from "react";
import "./loading.css";
const Loading = () => {
  return (
    <div className="flex items-center justify-center w-full min-h-[calc(100vh-305px)]">
      <div className="spinner">
        <img
          src="https://i.ibb.co.com/VcDYjKXm/agriMart.png"
          alt="Loading Logo"
          className="w-20"
        />
      </div>
    </div>
  );
};

export default Loading;
