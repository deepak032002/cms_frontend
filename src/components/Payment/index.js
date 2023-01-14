import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";

const Payment = () => {
  const [data, setData] = useState("");

  const params = useParams();
  const token = useSelector((state) => state.auth.token);
  const { orderId } = params;

  useEffect(() => {
    (async () => {
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
    })();
  }, []);

  return (
    <div className="flex items-center justify-center w-full h-screen">
      <div dangerouslySetInnerHTML={{ __html: data }}></div>
    </div>
  );
};

export default Payment;
