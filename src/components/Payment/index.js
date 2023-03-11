import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import Header from "../header";
import Loader from "../Loder";
import logo from "../../assets/images/color-logo.jpg";
import useRazorpay from "react-razorpay";
import { paymentInitiator, paymentVerify } from "../../api/vacancyapply";
import { toast } from "react-toastify";

const Payment = () => {
  const [data, setData] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const params = useParams();
  const token = useSelector((state) => state.auth.token);
  const { billing_name } = params;

  useEffect(() => {
    (async () => {
      setIsLoading(true);
      const res = await axios.post(
        `${process.env.REACT_APP_URL}/paymentInitiator`,
        {
          billing_name: billing_name,
        },
        {
          headers: {
            Authorisation: token,
          },
        }
      );
      setData(res.data);
      setIsLoading(false);
    })();
  }, []);

  return (
    <>
      {isLoading ? (
        <>
          <Loader />
        </>
      ) : (
        <>
          <Header />
          <div className="flex items-center justify-center w-full h-screen">
            <div dangerouslySetInnerHTML={{ __html: data }}></div>
          </div>
        </>
      )}
    </>
  );
};

// const Payment = () => {
//   const Razorpay = useRazorpay();
//   const { billing_name } = useParams();
//   const token = useSelector((state) => state.auth.token);
//   const navigate = useNavigate();

//   const isPaymentConfirmed = useSelector(
//     (state) => state.form.form.paymentConfirmation
//   );

//   const handlePaymentVerify = async (data) => {
//     const res = await paymentVerify({ ...data });
//     console.log(res);
//     if (res?.status === 200) {
//       navigate(
//         `/paymentSuccess/?status=success&orderId=${res.data.orderId}&amount=${res.data.amount}`
//       );
//     }

//     if (res?.status === 400) {
//       navigate(
//         `/paymentSuccess/?status=success&orderId=${res.data.orderId}&amount=${res.data.amount}`
//       );
//     }
//   };

//   const handlePayment = async () => {
//     try {
//       let res = paymentInitiator(token);

//       toast.promise(
//         res,
//         {
//           pending: "Wait...",
//           success: "Successfull order created!",
//           error: "Some Problem Occured!",
//         },
//         {
//           autoClose: 300,
//         }
//       );

//       res = await res;

//       const options = {
//         key: process.env.REACT_APP_DATA_KEY,
//         amount: res.data.amount,
//         currency: "INR",
//         name: billing_name,
//         description: "Test Transaction",
//         image: logo,
//         order_id: res.data.id,
//         handler: (res) => {
//           console.log(res);
//           handlePaymentVerify(res);
//         },
//         theme: {
//           color: "#3399cc",
//         },
//       };

//       const rzpay = new Razorpay(options);
//       rzpay.on("payment.failed", (data) => {
//         navigate(
//           `/paymentSuccess/?status=failed&orderId=${data.metadata.order_id}&amount=600`
//         );
//       });
//       rzpay.open();
//     } catch (error) {
//       console.log(error);
//     }
//   };

//   if (isPaymentConfirmed) {
//     return <Navigate to="/welcome" />;
//   }

//   return (
//     <div className="flex items-center justify-center flex-col min-h-screen">
//       <h2 className="text-3xl font-bold">Welcome To payment Page</h2>
//       <p> Your form is successfully submitted.</p>
//       <button
//         onClick={handlePayment}
//         className="bg-red-500 rounded px-3 py-2 text-white mt-5"
//       >
//         Proceed
//       </button>
//     </div>
//   );
// };

export default Payment;
