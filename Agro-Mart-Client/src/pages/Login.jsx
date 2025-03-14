import React from "react";
import { Link, NavLink } from "react-router-dom";
const Login = () => {
  return (
    <div className="flex flex-col md:flex-row h-screen">
      <div className="hidden md:flex md:w-1/2 bg-green-50 items-center justify-center p-6">
        <div className="w-full max-w-sm">
          {/* <div className="w-full max-w-sm">
            <Lottie animationData={loginAni} loop={true} />
          </div> */}
        </div>
      </div>

      <div className="w-full md:w-1/2 flex items-center justify-center p-6">
        <div className="max-w-sm w-full">
          <h1 className="text-3xl font-bold text-gray-900 text-center">
            Welcome back
          </h1>
          <p className="text-gray-500 mb-6 text-center">
            Please enter your details
          </p>

          <form
          //</div>onSubmit={handleSubmit}
          >
            <div className="mb-4">
              <label className="block text-gray-700">Phone Number</label>
              <input
                type="number"
                name="mobile"
                placeholder="Enter your number"
                className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-green-500"
                required
              />
            </div>

            <div className="mb-4">
              <label className="block text-gray-700">Pin</label>
              <input
                type="password"
                name="pin"
                placeholder="Enter your pin"
                className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-green-500"
                required
              />
            </div>
            {/* {loading ? (
              //   <ButtonLoading />
              "Loading...."
            ) : (
              <button
                type="submit"
                className="w-full bg-green-600 text-white py-3 rounded-lg hover:bg-green-700 transition"
              >
                Sign in
              </button>
            )} */}
            <button
              type="submit"
              className="w-full bg-green-600 text-white py-3 rounded-lg hover:bg-green-700 transition"
            >
              Sign in
            </button>
          </form>
          <p className="mt-4 text-gray-600 text-center">
            Don’t have an account?{" "}
            <Link to="/sign-up" className="text-green-600 hover:underline">
              Sign Up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
