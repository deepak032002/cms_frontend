import React from "react";
import Header from "../header";
import { useFormik } from "formik";
import { basicSchema } from "../../utils/emailSchema";

const ResetPassword = () => {

    
const onSubmit = async (values, actions) => {
    console.log(values);
    console.log(actions);
    actions.resetForm();
  };
  
  const {
    values,
    errors,
    touched,
    isSubmitting,
    handleBlur,
    handleChange,
    handleSubmit,
  } = useFormik({
    initialValues: {
      password: "",
      confirmPassword: "",
    },
    validationSchema: basicSchema,
    onSubmit,
  });
  console.log(errors);
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
                </div>

                <div className="mb-5">
                  <label
                    htmlfor="resetpassword"
                    className="block mb-2 text-sm font-medium text-gray-600"
                  >
                    Confirm Password
                  </label>
                  <input
                    id="confirmPassword"
                    type="password"
                    placeholder="Confirm password"
                    value={values.confirmPassword}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    className="block w-full p-3 rounded bg-gray-200 border border-transparent focus:outline-none"
                  />
                </div>

                <button
                  className="w-full p-3 mt-4 bg-indigo-600 text-white rounded shadow"
                  onSubmit={handleSubmit}
                >
                  Reset Password
                </button>
              </div>
            </div>
          </div>
        </div>
      </body>
    </div>
  );
};

export default ResetPassword;
