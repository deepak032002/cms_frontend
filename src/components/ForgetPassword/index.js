import React, { useState } from "react";
import Header from "../header";
import { useFormik } from "formik";
// import { basicSchema } from "../../utils/emailSchema";
import * as Yup from "yup";
import { forgetPassword } from "../../api/auth";
import { toast } from "react-toastify";

const ForgetPassword = () => {
  const [isLoading, setIsLoading] = useState(false);

  const handleForgetPassword = async (data, action) => {
    setIsLoading(true);
    const res = await forgetPassword(data);

    if (res?.status === 200) {
      setIsLoading(false);
      toast.success(res.data);
    } else {
      toast.error("Some Problem occured!");
    }
    action.resetForm();
  };

  const { values, errors, handleBlur, handleChange, handleSubmit } = useFormik({
    initialValues: {
      email: "",
    },
    validationSchema: Yup.object({
      email: Yup.string().email("Enter valid email!"),
    }),
    onSubmit: (values, action) => {
      handleForgetPassword(values, action);
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
                    htmlFor="email"
                    className="block mb-2 text-sm font-medium text-gray-600"
                  >
                    Enter Your Email
                  </label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    value={values.email}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    className="block w-full p-3 rounded bg-gray-200 border border-transparent focus:outline-none"
                  />
                  <p className="text-red-500 text-xs">
                    {errors ? errors.email : ""}
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
                    onClick={handleSubmit}
                    className="w-full p-3 mt-4 bg-indigo-600 text-white rounded shadow"
                  >
                    Submit
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

export default ForgetPassword;
