import React, { useEffect } from "react";
import { Link, useSearchParams } from "react-router-dom";
import Header from "../header";
import {
  BsFillPatchCheckFill,
  BsFillPatchExclamationFill,
} from "react-icons/bs";
import axios from "axios";

const SuccessfullPaymentComponent = () => {
  const [searchParams] = useSearchParams();

  const status = searchParams.get("status");
  const orderId = searchParams.get("orderNo");
  const amount = searchParams.get("amount");

  useEffect(() => {
    (async () => {
      const res = await axios.post('/')
    })();
  }, []);

  return (
    <>
      <Header />
      {status === "success" ? (
        <div class="bg-white p-6  md:mx-auto shadow-lg md:w-1/2 mx-auto w-full">
          <div className="w-full flex items-center justify-center text-6xl text-white">
            <BsFillPatchCheckFill className="bg-green-600 rounded-full p-2" />
          </div>

          <div class="text-center">
            <h3 class="md:text-2xl text-base text-gray-900 font-semibold text-center">
              Payment Done!
            </h3>
            <p class="text-gray-600 my-2">
              Thank you for completing your secure online payment.
            </p>
            <p>Order Id: {orderId}</p>
            <p>Amount: {amount}</p>
            <p> Have a great day! </p>
            <div class="py-10 text-center">
              <Link
                to="/welcome"
                class="px-12 bg-indigo-600 hover:bg-indigo-500 text-white font-semibold py-3"
              >
                GO BACK
              </Link>
            </div>
          </div>
        </div>
      ) : (
        <div class="bg-white p-6  md:mx-auto shadow-lg md:w-1/2 mx-auto w-full">
          <div className="w-full flex items-center justify-center text-6xl text-white">
            <BsFillPatchExclamationFill className="bg-red-600 rounded-full p-2" />
          </div>

          <div class="text-center">
            <h3 class="md:text-2xl text-base text-gray-900 font-semibold text-center">
              Payment Failed!
            </h3>
            <p class="text-gray-600 my-2">
              Your payment has declined please try again!
            </p>
            <p>Order Id: {orderId}</p>
            <p>Amount: {amount}</p>
            <p> Have a great day! </p>
            <div class="py-10 text-center">
              <Link
                to="/welcome"
                class="px-12 bg-indigo-600 hover:bg-indigo-500 text-white font-semibold py-3"
              >
                GO BACK
              </Link>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default SuccessfullPaymentComponent;
