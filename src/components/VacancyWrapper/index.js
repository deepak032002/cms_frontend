import React, { useEffect, useState } from "react";
import Vacancy from "../Vacancy";
import NonVacancy from "../NonVacancy";
import color from "../../assets/images/color-logo.jpg";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const VacancyWrapper = () => {
  const [isShowNewStudentForm, setIsShowNewStudentForm] = useState(false);

  const handleToggleForm = (arg) => {
    setIsShowNewStudentForm(arg);
  };

  const navigate = useNavigate();
  const token = useSelector((state) => state.auth.token);
  useEffect(() => {
    if (!token) {
      navigate("/");
    }
  }, []);

  return (
    <div>
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
