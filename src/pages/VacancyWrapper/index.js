import React, { useEffect, useState } from "react";
import Vacancy from "../../components/Vacancy";
import color from "../../assets/images/color-logo.jpg";
import { Link, Navigate, useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { removeToken } from "../../redux/features/authSlice";
import { removeForm, setForm } from "../../redux/features/form";

const VacancyWrapper = () => {
  const [isShowTeachingForm, setIsShowTeachingForm] = useState(true);
  const [isDisableBtn, setIsDisableBtn] = useState(false);

  const { type } = useParams();

  const handleToggleForm = (arg) => {
    setIsShowTeachingForm(arg);
  };

  const navigate = useNavigate();
  const token = useSelector((state) => state.auth.token);
  const form = useSelector((state) => state.form.form);
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(removeToken());
    dispatch(removeForm());
    navigate("/");
  };

  useEffect(() => {
    if (type === "edit") {
      setIsDisableBtn(true);
      if (form?.category === "teaching") {
        setIsShowTeachingForm(true);
      } else {
        setIsShowTeachingForm(false);
      }
    } else {
      dispatch(setForm(""));
      setIsShowTeachingForm(true);
      setIsDisableBtn(false);
    }
  }, [dispatch, form, type]);

  if (!token) {
    return <Navigate to="/" />;
  }

  return (
    <div>
      <div className="w-full">
        <button
          className="bg-red-500 px-3 py-1 text-white block ml-auto mt-1 mr-3 rounded-md hover:bg-red-600"
          onClick={handleLogout}
        >
          LogOut
        </button>
      </div>

      <div className="flex justify-center mb-6">
        <Link
          to="/"
          className="flex title-font font-medium items-center text-gray-900 mb-4 mt-16 md:mb-0"
        >
          <img src={color} alt="icon" />
        </Link>
      </div>
      <p className="font-normal text-[12px] my-6 text-center">
        "All fields marked with *are required." <br />
        "Qualification for teachers: (i) Pre-primary - Graduation (ii) Junior
        and ICSE - Graduation in the teaching subject (iii) ISC- Post Graduation
        in the teaching subject"
      </p>

      <div className="nav_btn flex justify-center mx-auto md:w-[24rem] w-[18rem] items-center my-12">
        <button
          disabled={isDisableBtn}
          onClick={() => handleToggleForm(true)}
          className={`border border-r-0 rounded-l-[12px] flex-1 py-2 disabled:pointer-events-none disabled:cursor-not-allowed hover:bg-blue-500 hover:text-white ${
            isShowTeachingForm ? "bg-blue-500 text-white" : ""
          } `}
        >
          Teaching
        </button>
        <button
          disabled={isDisableBtn}
          onClick={() => handleToggleForm(false)}
          className={`border border-r-0 rounded-r-[12px] flex-1 py-2 disabled:pointer-events-none disabled:cursor-not-allowed hover:bg-blue-500 hover:text-white ${
            !isShowTeachingForm ? "bg-blue-500 text-white" : ""
          } `}
        >
          Non Teaching
        </button>
      </div>

      <Vacancy isShowTeachingForm={isShowTeachingForm} />
    </div>
  );
};

export default VacancyWrapper;
