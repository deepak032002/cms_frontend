import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, Navigate, useNavigate } from "react-router-dom";
import logo from "../../assets/images/color-logo.jpg";
import { removeToken } from "../../redux/features/authSlice";
import { FaUserAlt } from "react-icons/fa";
import { removeForm, setForm } from "../../redux/features/form";
import { getForm } from "../../api/vacancyapply";

const WelcomePage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const form = useSelector((state) => state.form.form);
  const token = useSelector((state) => state.auth.token);

  useEffect(() => {
    (async () => {
      const res = await getForm(token);
      if (res?.code !== "ERR_BAD_REQUEST") {
        dispatch(setForm(res));
      } else {
        dispatch(setForm(""));
      }
    })();
  }, [dispatch, token]);

  if (!token) {
    return <Navigate to="/" />;
  }

  return (
    <div className="welcome_page_wrp">
      <div className="header flex justify-between items-center py-6 px-3">
        <img className="w-20 h-auto" src={logo} alt="logo" />

        <button
          onClick={() => {
            dispatch(removeToken());
            dispatch(removeForm());
            navigate("/");
          }}
          className="bg-red-600 text-white hover:bg-red-700 rounded-md px-3 py-1"
        >
          Logout
        </button>
      </div>

      {Object.keys(form).length > 0 ? (
        <div className="body">
          <h1 className="col-span-12 text-4xl font-bold w-[80%] mx-auto">
            Your Form-
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
            <div className="col-span-8">
              <p>Registration No. - {form.registrationNum}</p>
              <p>
                Name - {form.personal_details.first_name}{" "}
                {form.personal_details.midlle_name}{" "}
                {form.personal_details.last_name}
              </p>
              <p>Email - {form.personal_details.email}</p>
              <p>Mobile - {form.personal_details.mobile}</p>
              <p>
                Address - {form.address.current.flat_house}{" "}
                {form.address.current.street_lane} {form.address.current.city}{" "}
                {form.address.current.state} {form.address.current.country}{" "}
                {form.address.current.pincode}
              </p>
              <p className="capitalize">Applied For - {form.category}</p>
            </div>
            <div className="col-span-4">
              {form.personal_details.image ? (
                <img src={form.personal_details.image} alt="" />
              ) : (
                <div className="border">
                  <FaUserAlt />
                </div>
              )}
            </div>

            <div className="col-span-12 flex items-center justify-center gap-4">
              {form?.paymentConfirmation ? (
                <button className="bg-blue-600 text-white hover:bg-blue-700 rounded-md px-3 py-1">
                  Preview
                </button>
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
    </div>
  );
};

export default WelcomePage;
