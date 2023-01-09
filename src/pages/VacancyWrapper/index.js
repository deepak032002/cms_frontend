import React, { useEffect, useState } from "react";
import Vacancy from "../../components/Vacancy";
import NonVacancy from "../../components/NonVacancy";
import color from "../../assets/images/color-logo.jpg";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { removeToken } from "../../redux/features/authSlice";

const VacancyWrapper = () => {
  const [isShowNewStudentForm, setIsShowNewStudentForm] = useState(false);

  const handleToggleForm = (arg) => {
    setIsShowNewStudentForm(arg);
  };

  const navigate = useNavigate();
  const token = useSelector((state) => state.auth.token);
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(removeToken());
    navigate("/");
  };

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
          onClick={() => handleToggleForm(false)}
          className={`border border-r-0 rounded-l-[12px] flex-1 py-2 hover:bg-blue-500 hover:text-white ${
            !isShowNewStudentForm ? "bg-blue-500 text-white" : ""
          } `}
        >
          Teaching
        </button>
        <button
          onClick={() => handleToggleForm(true)}
          className={`border border-r-0 rounded-r-[12px] flex-1 py-2 hover:bg-blue-500 hover:text-white ${
            isShowNewStudentForm ? "bg-blue-500 text-white" : ""
          } `}
        >
          Non Teaching
        </button>
      </div>

      {isShowNewStudentForm ? (
        <>
          <NonVacancy />
        </>
      ) : (
        <Vacancy />
      )}
    </div>
  );
};

export default VacancyWrapper;
