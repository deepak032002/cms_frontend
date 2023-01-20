import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, Navigate } from "react-router-dom";
import { FaUserAlt } from "react-icons/fa";
import { setForm } from "../../redux/features/form";
import { getForm } from "../../api/vacancyapply";
import Loader from "../Loder";
import Header from "../Header2";
import { toast } from "react-toastify";

const WelcomePage = () => {
  // const navigate = useNavigate();
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(true);
  const form = useSelector((state) => state.form.form);
  const token = useSelector((state) => state.auth.token);

  useEffect(() => {
    (async () => {
      setIsLoading(true);
      const res = await getForm(token);
      // console.log(res);

      if (res?.status === 200) {
        dispatch(setForm(res.data.form));
      } else {
        dispatch(setForm(""));
      }

      if (res?.code === "NETWORK_ERR") {
        toast.error("Some error occured!");
      }

      setIsLoading(false);
    })();
  }, [dispatch, token]);

  return (
    <div className="welcome_page_wrp">
      <Header />

      {isLoading ? (
        <Loader />
      ) : (
        <>
          {Object.keys(form).length > 0 ? (
            <div className="body">
              <h1 className="col-span-12 text-4xl font-bold w-[80%] mx-auto">
                Your Form-
                {/* <Loader /> */}
              </h1>
              {!form?.paymentConfirmation ? (
                <p className="text-red-500 text-sm w-[80%] mx-auto">
                  Please proceed for payment to confirm your form
                </p>
              ) : (
                <p className="text-green-500 text-sm w-[80%] mx-auto">
                  Your Payment is confirmed please download your form
                </p>
              )}
              <div className="shadow-md grid my-3 w-[80%] p-4 mx-auto grid-cols-12">
                <div className="md:col-span-8 col-span-12">
                  <p>Registration No. - {form.registrationNum}</p>
                  <p>
                    Name - {form.personal_details.first_name}{" "}
                    {form.personal_details.middle_name}{" "}
                    {form.personal_details.last_name}
                  </p>
                  <p>Email - {form.personal_details.email}</p>
                  <p>Mobile - {form.personal_details.mobile}</p>
                  <p>
                    Address - {form.address.current.flat_house}{" "}
                    {form.address.current.street_lane}{" "}
                    {form.address.current.city} {form.address.current.state}{" "}
                    {form.address.current.country}{" "}
                    {form.address.current.pincode}
                  </p>
                  <p className="capitalize">Applied For - {form.category}</p>
                </div>
                <div className="md:col-span-4 col-span-12 flex justify-center md:my-0 my-6 mx-2">
                  {form.personal_details.image_url ? (
                    <img
                      src={form.personal_details.image_url}
                      className="aspect-[9/16] w-52 h-64 shadow-lg border-black border"
                      alt="logo"
                    />
                  ) : (
                    <div className="border">
                      <FaUserAlt />
                    </div>
                  )}
                </div>

                <div className="col-span-12 flex items-center justify-center gap-4">
                  {form?.paymentConfirmation ? (
                    <Link
                      to="/previewform"
                      className="bg-blue-600 text-white hover:bg-blue-700 rounded-md px-3 py-1"
                    >
                      Preview
                    </Link>
                  ) : (
                    <>
                      <Link
                        to={`/payment/CMS-${
                          Math.floor(
                            Math.random() * (10000000000 - 999999999 + 1)
                          ) + 999999999
                        }`}
                        className="bg-red-600 text-white hover:bg-red-700 rounded-md px-3 py-1"
                      >
                        Payment
                      </Link>

                      <Link
                        to="/vacancy/edit"
                        className="bg-blue-600 text-white hover:bg-blue-700 rounded-md px-3 py-1"
                      >
                        Edit
                      </Link>
                    </>
                  )}
                </div>
              </div>
            </div>
          ) : (
            <div className="w-full flex items-center justify-center my-2 h-full">
              <Link
                to="/info"
                className="bg-blue-600 text-white hover:bg-blue-700 rounded-md px-3 py-1"
              >
                New Form
              </Link>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default WelcomePage;
