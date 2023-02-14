import React, { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { Link, Navigate } from "react-router-dom";
import { BsCheck } from "react-icons/bs";
import { getForm } from "../../api/vacancyapply";
import Loader from "../Loder";
import logo from "../../assets/images/color-logo.jpg";
import Header from "../Header2";
import ReactToPrint from "react-to-print";

const PreviewForm = () => {
  //   const navigate = useNavigate();
  const printRef = useRef();
  const form = useSelector((state) => state.form.form);
  const token = useSelector((state) => state.auth.token);

  if (!token) {
    return <Navigate to="/" />;
  }

  return (
    <div className="Preview_page_wrp">
      <Header />

      <div
        ref={printRef}
        className="table_body w-[98%] mx-auto p-2 border-collapse shadow-md"
      >
        <header className="flex items-center justify-center flex-col">
          <img src={logo} alt="" />
          <h2 className="text-lg font-semibold capitalize">
            Recruitment Form- {form?.category} Staff
          </h2>
        </header>
        <table className="table-fixed w-full border-collapse border-black">
          <tr className="w-full">
            <td className="border px-2">
              <span className="font-bold"> Registration No.-</span>{" "}
              {form?.registrationNum}
            </td>

            <td className="border px-2">
              <span className="font-bold">Designation- </span>{" "}
              <span className="capitalize">
                {form?.category}
                &nbsp;{form?.designation}
              </span>
            </td>

            <td className="border px-2 w-[15%]" rowSpan={6}>
              <img src={form?.personal_details?.image_url} alt="" />
            </td>
          </tr>

          <tr className="w-full">
            <td className="border px-2 w-full" colSpan={2}>
              <span className="font-bold">Campus Prefrence-</span>
            </td>
          </tr>
          <tr>
            <td className="border px-2" colSpan={"2"}>
              <div className="flex">
                {form?.campus_prefrence.map((item, index) => {
                  return (
                    <span key={new Date().getTime() + index} className="flex-1">
                      {index + 1}. {item.campus}
                    </span>
                  );
                })}
              </div>
            </td>
          </tr>
          <tr>
            <td className="border px-2">
              <span className="font-bold">Name:</span>
              {form?.personal_details?.first_name}
            </td>
            <td className="border px-2">
              <span className="font-bold">Email:</span>
              {form?.personal_details?.email}
            </td>
          </tr>
          <tr>
            <td className="border px-2">
              <span className="font-bold">Contact:</span>
              {form?.personal_details?.mobile}
            </td>
            <td className="border px-2">
              <span className="font-bold">Gender:</span>
              {form?.personal_details?.gender}
            </td>
            <td className="border px-2">
              <span className="font-bold">Aadhar Number:</span>
              {form?.personal_details?.aadhar_number}
            </td>
            <td className="border px-2">
              <span className="font-bold">Marital Status :</span>
              {form?.personal_details?.marital_status}
            </td>
            <td className="border px-2">
              <span className="font-bold">Date of Birth:</span>
              {new Date(form?.personal_details?.dob).toLocaleDateString(
                undefined,
                {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                }
              )}
            </td>
          </tr>
         

          <tr>
            <td className="border px-2">
              <div>
                <h3 className="font-bold">Present Address:</h3>
                <div className="grid grid-cols-2 text-sm">
                  <div className="col-span-1">
                    <p>
                      <span className="font-bold">House No.</span>{" "}
                      {form?.address?.current?.flat_house}
                    </p>
                    <p>
                      <span className="font-bold">Street</span>{" "}
                      {form?.address?.current?.street_lane}
                    </p>
                    <p>
                      <span className="font-bold">City</span>{" "}
                      {form?.address?.current?.city}
                    </p>
                  </div>
                  <div className="col-span-1">
                    <p>
                      <span className="font-bold">Country</span>{" "}
                      {form?.address?.current?.country}
                    </p>
                    <p>
                      <span className="font-bold">State</span>{" "}
                      {form?.address?.current?.state}
                    </p>
                    <p>
                      <span className="font-bold">Pincode</span>{" "}
                      {form?.address?.current?.pincode}
                    </p>
                  </div>
                </div>
              </div>
            </td>
            <td className="border px-2" colSpan={1}>
              <div>
                <h3 className="font-bold">Permanent Address:</h3>
                <div className="grid grid-cols-2 text-sm">
                  <div className="col-span-1">
                    <p>
                      <span className="font-bold">House No.</span>{" "}
                      {form?.address?.permanent?.flat_house}
                    </p>
                    <p>
                      <span className="font-bold">Street</span>{" "}
                      {form?.address?.permanent?.street_lane}
                    </p>
                    <p>
                      <span className="font-bold">City</span>{" "}
                      {form?.address?.permanent?.city}
                    </p>
                  </div>
                  <div className="col-span-1">
                    <p>
                      <span className="font-bold">Country</span>{" "}
                      {form?.address?.permanent?.country}
                    </p>
                    <p>
                      <span className="font-bold">State</span>{" "}
                      {form?.address?.permanent?.state}
                    </p>
                    <p>
                      <span className="font-bold">Pincode</span>{" "}
                      {form?.address?.permanent?.pincode}
                    </p>
                  </div>
                </div>
              </div>
            </td>
          </tr>

          <h3 className="font-bold my-2 text-xl">Languages-</h3>

          <tr>
            <td colSpan={3}>
              <tr className="flex w-full border-collapse">
                <th className="border flex-1">Language</th>
                <th className="border flex-1">Speak</th>
                <th className="border flex-1">Read</th>
                <th className="border flex-1">Write</th>
              </tr>
              {form?.communication.map((item, index) => {
                console.log(item);
                return (
                  <tr className="flex w-full border-collapse">
                    {Object.keys(item)[0] === "others" ? (
                      <td className="border text-center flex-1 capitalize">
                        {item.others.type}
                      </td>
                    ) : (
                      <td className="border text-center flex-1 capitalize">
                        {Object.keys(item)[0]}
                      </td>
                    )}
                    <td className="border text-center flex-1 flex items-center justify-center">
                      {item[Object.keys(item)[0]].speak === "true" ? (
                        <BsCheck className="text-green-500 text-lg" />
                      ) : (
                        ""
                      )}
                    </td>
                    <td className="border text-center flex-1 flex items-center justify-center">
                      {item[Object.keys(item)[0]].read === "true" ? (
                        <BsCheck className="text-green-500 text-lg" />
                      ) : (
                        ""
                      )}
                    </td>
                    <td className="border text-center flex-1 flex items-center justify-center">
                      {item[Object.keys(item)[0]].write === "true" ? (
                        <BsCheck className="text-green-500 text-lg" />
                      ) : (
                        ""
                      )}
                    </td>
                  </tr>
                );
              })}
            </td>
          </tr>

          <h3 className="font-bold my-2 text-xl">Academic Qualification-</h3>
          <tr>
            <td colSpan={3}>
              <tr className="flex w-full border-collapse">
                <th className="border flex-1">Exam</th>
                <th className="border flex-1">
                  School Institute University Name
                </th>
                <th className="border flex-1">Year of Passing</th>
                <th className="border flex-1">Board</th>
                <th className="border flex-1">Aggregate % Marks</th>
              </tr>
              <tr className="flex w-full border-collapse">
                <td className="border text-center flex-1">X</td>
                <td className="border text-center flex-1">
                  {form?.academic_details.high_school?.school}
                </td>
                <td className="border text-center flex-1">
                  {form?.academic_details.high_school?.year}
                </td>
                <td className="border text-center flex-1">
                  {form?.academic_details.high_school?.board}
                </td>
                <td className="border text-center flex-1">
                  {form?.academic_details.high_school?.percentage}
                </td>
              </tr>
              <tr className="flex w-full border-collapse">
                <td className="border text-center flex-1">XII</td>
                <td className="border text-center flex-1">
                  {form?.academic_details.senior_secondary?.school}
                </td>
                <td className="border text-center flex-1">
                  {form?.academic_details.senior_secondary?.year}
                </td>
                <td className="border text-center flex-1">
                  {form?.academic_details.senior_secondary?.board}
                </td>
                <td className="border text-center flex-1">
                  {form?.academic_details.senior_secondary?.percentage}
                </td>
              </tr>
              <tr className="flex w-full border-collapse">
                <td className="border text-center flex-1">Graduation</td>
                <td className="border text-center flex-1">
                  {form?.academic_details.graduation?.school}
                </td>
                <td className="border text-center flex-1">
                  {form?.academic_details.graduation?.year}
                </td>
                <td className="border text-center flex-1">
                  {form?.academic_details.graduation?.board}
                </td>
                <td className="border text-center flex-1">
                  {form?.academic_details.graduation?.percentage}
                </td>
              </tr>

              {form?.academic_details.post_graduation ? (
                <tr className="flex w-full border-collapse">
                  <td className="border text-center flex-1">Post Graduation</td>
                  <td className="border text-center flex-1">
                    {form?.academic_details.post_graduation?.school}
                  </td>
                  <td className="border text-center flex-1">
                    {form?.academic_details.post_graduation?.year}
                  </td>
                  <td className="border text-center flex-1">
                    {form?.academic_details.post_graduation?.board}
                  </td>
                  <td className="border text-center flex-1">
                    {form?.academic_details.post_graduation?.percentage}
                  </td>
                </tr>
              ) : (
                <></>
              )}
            </td>
          </tr>

          <h3 className="font-bold my-2 text-xl">Work Experience-</h3>
          <p>
            <span className="font-bold">Total Experience:</span>{" "}
            {`${parseInt(form?.total_experience / 12)} year and ${
              form?.total_experience % 12
            } months`}
          </p>

          <tr>
            <td colSpan={3}>
              <tr className="flex w-full border-collapse">
                <th className="border flex-1">Designation</th>
                <th className="border flex-1">Organisation</th>
                <th className="border flex-1">Date of Joining</th>
                <th className="border flex-1">Date of Leaving</th>
                <th className="border flex-1">Salary Drawn</th>
                <th className="border flex-1">Reason Of Leaving</th>
                {/* <th className="border flex-1">Nature of the job</th> */}
              </tr>

              {form?.work_experience.map((item, index) => {
                return (
                  <tr
                    key={new Date().getTime() + index + 3}
                    className="flex w-full border-collapse"
                  >
                    <td className="border text-center flex-1">
                      {item?.designation}
                    </td>
                    <td className="border text-center flex-1">
                      {item?.organisation}
                    </td>
                    <td className="border text-center flex-1">
                      {item?.joining_date}
                    </td>
                    <td className="border text-center flex-1">
                      {item?.leaving_date}
                    </td>
                    <td className="border text-center flex-1">
                      {item?.salary}
                    </td>
                    <td className="border text-center flex-1">
                      {item?.reason}
                    </td>
                    {/* <td className="border text-center flex-1">
                      Nature of the job
                    </td> */}
                  </tr>
                );
              })}
            </td>
          </tr>
          <tr>
            <td className="border" colSpan={3}>
              {/* Branch Code: N/A

Last Designation in CMS: N/A

Date of Joining: N/A

Date of Leaving: N/A

Reason for Leaving: N/A */}
              <div>
                <p>
                  <span className="font-bold">
                    Earlierst Date you can join:
                  </span>

                  {new Date(form?.earliest_date_join).toLocaleDateString(
                    undefined,
                    {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    }
                  )}
                </p>
                <p>
                  <span className="font-bold">Before Working in Payroll:</span>
                  {form?.before_working_in_payroll}
                </p>
              </div>
              {/* Name of the Relative: Akanshi Pal

Staff Category: Non-Teaching

Designation: JYEP- Educator

Campus: Head Office */}
            </td>
          </tr>
        </table>
      </div>

      <ReactToPrint
        trigger={() => (
          <button className="text-white bg-red-600 hover:bg-red-500 px-3 py-1 mx-auto my-3 block rounded-md">
            Print
          </button>
        )}
        content={() => printRef.current}
      />
    </div>
  );
};

export default PreviewForm;
