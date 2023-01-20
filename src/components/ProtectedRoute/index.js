import { useEffect, useState } from "react";
import { useNavigate, Outlet, Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { isVerifyEmail } from "../../api/auth";
import { setIsVerifyEmail } from "../../redux/features/verifyEmail";

const ProtectedRoute = () => {
  const [isVerify, setIsVerify] = useState(false);

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
        setIsVerify(res?.data?.verifyEmail);
        dispatch(setIsVerifyEmail(res?.data?.verifyEmail));
      }
    })();
  }, [navigate, token]);

  if (!isVerify) {
    return (
      <>
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
