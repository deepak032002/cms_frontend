import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const Payment = () => {
  const [data, setData] = useState("");

  const params = useParams();

  const { orderId } = params;

  useEffect(() => {
    (async () => {
      const res = await axios.post(
        `${process.env.REACT_APP_URL}/paymentInitiator`,
        {
          order_id: `CMS-${
            Math.floor(Math.random() * (10000000000 - 999999999 + 1)) +
            999999999
          }`,
          billing_name: "Deepak Verma",
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
