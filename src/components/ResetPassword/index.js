import React, { useState } from "react";
import Header from "../header";
import { useFormik } from "formik";
import { resetPassword } from "../../api/auth";
import * as Yup from "yup";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";

const ResetPassword = () => {
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();
  const { token } = useParams();

  const handleResetPassword = async (data) => {
    setIsLoading(true);
    const res = await resetPassword({ ...data, resetToken: token });

    if (res?.status === 200) {
      toast.success("Password Reset successfully!");
      navigate("/");
    }
    setIsLoading(false);
  };

  const { values, errors, handleBlur, handleChange, handleSubmit } = useFormik({
    initialValues: {
      password: "",
      confirm_password: "",
    },
    validationSchema: Yup.object({
      password: Yup.string()
        .required("This field is required!")
        .min(6, "Enter atleast 6 length password"),
      confirm_password: Yup.string()
        .required("This field is required!")
        .oneOf(
          [Yup.ref("password"), null],
          "Password and confirm password should be match!"
        ),
    }),
    onSubmit: (values, action) => {
      console.log(errors, values);
      handleResetPassword(values);
    },
  });

  return (
    <div>
      <body className="bg-white font-sans text-gray-700">
        <div className="container mx-auto p-8 flex">
          <div className="max-w-md w-full mx-auto">
            <Header />
            <div className="bg-white rounded-lg overflow-hidden shadow-2xl">
              <div className="p-8">
                <div className="mb-5">
                  <label
                    htmlFor="password"
                    className="block mb-2 text-sm font-medium text-gray-600"
                  >
                    New Password
                  </label>
                  <input
                    id="password"
                    type="password"
                    placeholder="Enter your password"
                    value={values.password}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    className="block w-full p-3 rounded bg-gray-200 border border-transparent focus:outline-none"
                  />
                  <p className="text-red-500 text-xs">
                    {errors ? errors.password : ""}
                  </p>
                </div>

                <div className="mb-5">
                  <label
                    htmlFor="confirmPassword"
                    className="block mb-2 text-sm font-medium text-gray-600"
                  >
                    Confirm Password
                  </label>
                  <input
                    id="confirmPassword"
                    type="password"
                    name="confirm_password"
                    placeholder="Confirm password"
                    value={values.confirm_password}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    className="block w-full p-3 rounded bg-gray-200 border border-transparent focus:outline-none"
                  />
                  <p className="text-red-500 text-xs">
                    {errors ? errors.confirm_password : ""}
                  </p>
                </div>

                {isLoading ? (
                  <button
                    disabled
                    className="w-full p-3 mt-4 bg-indigo-600 text-white rounded shadow"
                  >
                    Loading...
                  </button>
                ) : (
                  <button
                    className="w-full p-3 mt-4 bg-indigo-600 text-white rounded shadow"
                    onClick={handleSubmit}
                  >
                    Reset Password
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </body>
    </div>
  );
};

export default ResetPassword;
