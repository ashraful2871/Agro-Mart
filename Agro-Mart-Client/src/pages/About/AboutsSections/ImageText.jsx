import React from "react";

const ImageText = () => {
  return (
    <div
      style={{
        fontWeight: "bold",
        backgroundImage: "url('https://i.ibb.co.com/QjXtsqpC/farm-land.jpg')",
        backgroundSize: "cover",
        backgroundClip: "text",
        WebkitBackgroundClip: "text",
        color: "transparent",
        textAlign: "center",
        padding: "50px",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      <p className="font-syne text-9xl">AGRO MART</p>
    </div>
  );
};

export default ImageText;
