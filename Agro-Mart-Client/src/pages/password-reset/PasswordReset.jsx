import React, { useContext } from "react";
import { ThemeContext } from "../../provider/ThemeProvider";
import { useDispatch, useSelector } from "react-redux";
import { resetPassword } from "../../store/authSlice";

const PasswordReset = () => {
  const { theme } = useContext(ThemeContext);
  const dispatch = useDispatch();
  const { loading, error, resetPasswordMessage } = useSelector(
    (state) => state.auth
  );
  const handleSubmit = (e) => {
    e.preventDefault();
    const formdata = new FormData(e.target);
    const email = formdata.get("email");
    console.log(email);
    dispatch(resetPassword(email));
  };
  return (
    <div>
      <div className="flex flex-col md:flex-row h-screen">
        <div className={`hidden md:flex `}>
          {/* <Lottie animationData={loginAni} loop={true} /> */}
          <img src="https://i.ibb.co.com/XrqVDTBr/loginpage.jpg" alt="" />
        </div>

        <div className="w-full md:w-[60%]  flex items-center justify-center p-6 ">
          <div className="max-w-lg w-full">
            <div className="flex flex-col flex-wrap">
              <h1
                className={`text-3xl font-bold ${
                  theme === "dark" ? "text-green-500" : "text-green-700"
                }  text-center `}
              >
                Reset Password
              </h1>
              <p className="text-base-content mb-6 text-center">
                Enter your account email to receive a link allowing you to reset
                your password.
              </p>
            </div>

            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label className="block text-base-content">Email</label>
                <input
                  type="email"
                  name="email"
                  placeholder="Enter your number"
                  className="w-full py-6 border rounded-lg input input-success"
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
                className="w-full bg-green-600 text-white py-3 text-lg rounded-lg hover:bg-green-700 transition"
              >
                Reset Password
              </button>
            </form>
            {resetPasswordMessage && (
              <div
                className={`mb-4 p-3 rounded-lg ${
                  theme === "dark"
                    ? "bg-green-900/20 text-green-400"
                    : "bg-green-100 text-green-700"
                }`}
              >
                {resetPasswordMessage}
              </div>
            )}
            {error && (
              <div
                className={`mb-4 p-3 rounded-lg ${
                  theme === "dark"
                    ? "bg-red-900/20 text-red-400"
                    : "bg-red-100 text-red-700"
                }`}
              >
                {error}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PasswordReset;
