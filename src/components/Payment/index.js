import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import Header from "../Header";
import Loader from "../Loder";

const Payment = () => {
  const [data, setData] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const params = useParams();
  const token = useSelector((state) => state.auth.token);
  const { orderId } = params;

  useEffect(() => {
    (async () => {
      setIsLoading(true);
      const res = await axios.post(
        `${process.env.REACT_APP_URL}/paymentInitiator`,
        {
          order_id: orderId,
          billing_name: "Deepak Verma",
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

export default Payment;
