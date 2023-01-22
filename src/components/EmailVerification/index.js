import { useFormik } from "formik";
import React, { useState } from "react";
import Header from "../header";
import * as Yup from "yup";
import { resendSendEmail, verifyEmail } from "../../api/auth";
import { toast } from "react-toastify";
import { Navigate, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const EmailVerification = () => {
  const [showResendEmailInput, setShowResendEmailInput] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const isVerifyEmail = useSelector((state) => state.email.isVerifyEmail);

  const handleSubmit = async (data) => {
    setIsLoading(true);
    const res = await verifyEmail(data);
    console.log(res);
    setIsLoading(false);
    if (res?.status === 200) {
      toast.success("Verified Successfully!");
      navigate("/welcome");
    }

    if (res?.response?.status === 404) {
      toast.error(res?.response?.data);
    }
  };

  const handleResendEmail = async (data) => {
    setIsLoading(true);
    const res = await resendSendEmail(data);

    setIsLoading(false);
    if (res?.status === 200) {
      toast.success("Otp send on your email!");
    }
  };

  const otpVerificationData = useFormik({
    initialValues: {
      otp: "",
      email: "",
    },

    validationSchema: Yup.object({
      otp: Yup.string().max(6, "Enter only six length!"),
      email: Yup.string().email("Please enter valid email!"),
    }),

    onSubmit: (values, action) => {
      handleSubmit(values);
    },
  });

  const resendOtpVerification = useFormik({
    initialValues: {
      email: "",
    },

    validationSchema: Yup.object({
      email: Yup.string()
        .email("Please enter valid email!")
        .required("This is required field!"),
    }),

    onSubmit: (values, action) => {
      handleResendEmail(values);
      console.log(values);
    },
  });

  if (isVerifyEmail) {
    return <Navigate to="/welcome" />;
  }

  return (
    <div>
      <body className="bg-white font-sans text-gray-700">
        <div className="container mx-auto p-8 flex">
          <div className="max-w-md w-full mx-auto">
            <Header />

            {showResendEmailInput ? (
              <div className="bg-white rounded-lg overflow-hidden shadow-2xl">
                <div className="p-8">
                  <div className="mb-5">
                    <label
                      htmlfor="otp"
                      className="block mb-2 text-sm font-medium text-gray-600"
                    >
                      Enter Email
                    </label>
                    <input
                      type="text"
                      name="email"
                      onChange={resendOtpVerification.handleChange}
                      className="block w-full p-3 rounded bg-gray-200 border border-transparent focus:outline-none"
                    />
                    <p className="text-red-500 text-xs">
                      {resendOtpVerification.errors
                        ? resendOtpVerification.errors.email
                        : ""}
                    </p>
                  </div>
                  <button
                    onClick={() => setShowResendEmailInput(false)}
                    className="text-sm text-blue-600"
                  >
                    Go Back
                  </button>

                  {!isLoading ? (
                    <button
                      onClick={resendOtpVerification.handleSubmit}
                      className="w-full p-3 mt-4 bg-indigo-600 text-white rounded shadow"
                    >
                      Resend
                    </button>
                  ) : (
                    <button
                      disabled
                      className="w-full p-3 mt-4 bg-indigo-600 text-white rounded shadow"
                    >
                      Loading...
                    </button>
                  )}
                </div>
              </div>
            ) : (
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
                      type="text"
                      name="otp"
                      onChange={otpVerificationData.handleChange}
                      className="block w-full p-3 rounded bg-gray-200 border border-transparent focus:outline-none"
                    />
                    <p className="text-red-500 text-xs">
                      {otpVerificationData.errors
                        ? otpVerificationData.errors.otp
                        : ""}
                    </p>
                  </div>
                  <div className="mb-5">
                    <label
                      htmlfor="otp"
                      className="block mb-2 text-sm font-medium text-gray-600"
                    >
                      Enter Email
                    </label>
                    <input
                      type="email"
                      name="email"
                      onChange={otpVerificationData.handleChange}
                      className="block w-full p-3 rounded bg-gray-200 border border-transparent focus:outline-none"
                    />
                    <p className="text-red-500 text-xs">
                      {otpVerificationData.errors
                        ? otpVerificationData.errors.email
                        : ""}
                    </p>
                  </div>
                  <button
                    onClick={() => setShowResendEmailInput(true)}
                    className="text-sm text-blue-600"
                  >
                    Resend OTP
                  </button>
                  {!isLoading ? (
                    <button
                      onClick={otpVerificationData.handleSubmit}
                      className="w-full p-3 mt-4 bg-indigo-600 text-white rounded shadow"
                    >
                      Submit
                    </button>
                  ) : (
                    <button
                      disabled
                      className="w-full p-3 mt-4 bg-indigo-600 text-white rounded shadow"
                    >
                      Loading...
                    </button>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </body>
    </div>
  );
};

export default EmailVerification;
