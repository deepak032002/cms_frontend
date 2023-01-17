import React from "react";
import Header from "../header";
import { useFormik } from "formik";


const EmailVerification = () => {

  return (
    <div>
      <body className="bg-gray-200 font-sans text-gray-700">
        <div className="container mx-auto p-8 flex">
          <div className="max-w-md w-full mx-auto">
            <Header />
            <div className="bg-white rounded-lg overflow-hidden shadow-2xl">
              <div className="p-8">
                <div className="mb-5">
                  <label
                    htmlfor="otp"
                    className="block mb-2 text-sm font-medium text-gray-600"
                  >
                    Enter Your OTP
                  </label>
                  <input
                    type="number"
                    name="otp"
                    className="block w-full p-3 rounded bg-gray-200 border border-transparent focus:outline-none"
                  />
                </div>

                <button className="w-full p-3 mt-4 bg-indigo-600 text-white rounded shadow">
                  Submit
                </button>
              </div>
            </div>
          </div>
        </div>
      </body>
    </div>
  );
};

export default EmailVerification;
