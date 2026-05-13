"use client";
import React from "react";
import { FaArrowRight } from "react-icons/fa";
import Link from "next/link";

const Error = () => {
  return (
    <div className="flex justify-center mt-48">
      <div className="space-y-5 text-center ">
        <div>
          <img src="https://i.ibb.co.com/QF3hTXMG/agro-404.png" alt="" />
        </div>
        <h1 className="text-4xl">Oops! That Page Can&apos;t Be Found.</h1>
        <p className="text-base">
          You are here because you entered the address of a page that no longer <br />
          exists or has been moved to a different address
        </p>
        <Link href="/" className="btn rounded-full text-white bg-green-800 text-xs py-4 px-7">
          Back To Homepage{" "}
          <span className="ml-1">
            <FaArrowRight />
          </span>
        </Link>
      </div>
    </div>
  );
};

export default Error;
