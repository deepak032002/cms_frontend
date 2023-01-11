import axios from "axios";
import React, { useEffect, useState } from "react";

const Payment = () => {
  const [data, setData] = useState("");
  useEffect(() => {
    (async () => {
      const res = await axios.post(
        `${process.env.REACT_APP_URL}/paymentInitiator`,
        {
          merchant_id: "1918298",
          order_id: "HJKSHDUSDNSIUNNADU",
          currency: "INR",
          amount: "500",
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
