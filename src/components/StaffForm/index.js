import React from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { removeToken } from "../../redux/features/authSlice";
import color from ''

const StaffForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

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
    </div>
  );
};

export default StaffForm;
