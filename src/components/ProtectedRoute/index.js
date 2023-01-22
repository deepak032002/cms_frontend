import { useEffect, useState } from "react";
import { useNavigate, Outlet, Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { isVerifyEmail } from "../../api/auth";
import { setIsVerifyEmail } from "../../redux/features/verifyEmail";
import Header from "../Header2";
import Loder from "../Loder";
import { toast } from "react-toastify";

const ProtectedRoute = () => {
  const [isVerify, setIsVerify] = useState(false);
  const [isInitialLoading, setIsInitialLoading] = useState(true);
  const [isError, setIsError] = useState(false);

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const token = useSelector((state) => state.auth.token);

  useEffect(() => {
    if (!token) {
      navigate("/");
    }

    (async () => {
      const res = await isVerifyEmail(token);
      if (res?.status === 200) {
        setIsInitialLoading(false);
        setIsError(false);
        setIsVerify(res?.data?.verifyEmail);
        dispatch(setIsVerifyEmail(res?.data?.verifyEmail));
      }

      if (res?.response?.status === 400) {
        setIsError(true);
        setIsInitialLoading(false);
        toast.error("Some thing went wrong");
      }
    })();
  }, [navigate, token, dispatch]);

  if (isInitialLoading) {
    return <Loder />;
  }

  if (isError) {
    return <Header />;
  }

  if (!isVerify) {
    return (
      <>
        <Header />
        <div className="container h-screen w-full flex items-center flex-col justify-center">
          <h1 className="font-bold text-2xl">Your email is not verified! </h1>
          <Link
            to="/email-verification"
            className="bg-red-500 rounded px-2 py-1 text-white"
          >
            Verify
          </Link>
        </div>
      </>
    );
  }

  return (
    <>
      <Outlet />
    </>
  );
};

export default ProtectedRoute;
