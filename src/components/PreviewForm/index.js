import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link, Navigate } from "react-router-dom";
import { FaUserAlt } from "react-icons/fa";
import { setForm } from "../../redux/features/form";
import { getForm } from "../../api/vacancyapply";
import Loader from "../Loder";
import Header from "../header";

const PreviewForm = () => {
  //   const navigate = useNavigate();

  const [isLoading, setIsLoading] = useState(true);
  const form = useSelector((state) => state.form.form);
  const token = useSelector((state) => state.auth.token);

  useEffect(() => {
    (async () => {
      setIsLoading(true);
      const res = await getForm(token);
      //   if (res?.code !== "ERR_BAD_REQUEST") {
      //     dispatch(setForm(res));
      //   } else {
      //     dispatch(setForm(""));
      //   }
      setIsLoading(false);
    })();
  }, [token]);

  if (!token) {
    return <Navigate to="/" />;
  }

  return (
    <div className="Preview_page_wrp">
      <Header />

      {isLoading ? (
        <Loader />
      ) : (
        <>
          {Object.keys(form).length > 0 ? (
            <div className="body ">
              <h2 className="col-span-12 text-4xl font-bold w-[80%] mx-auto">
                Applicant's Details:
                {/* <Loader /> */}
              </h2>
              {/* {!form?.paymentConfirmation ? (
                <p className="text-red-500 text-sm w-[80%] mx-auto">
                  Please proceed for payment to confirm your form
                </p>
              ) : (
                <p className="text-green-500 text-sm w-[80%] mx-auto">
                  Your Payment is confirmed please download your form
                </p>
              )} */}
              <div className="shadow-md grid my-3 w-[80%] p-4 mx-auto grid-cols-12 border-solid border-2 border-black">
                <div className="md:col-span-8">
                  <p>
                    Application No.:<span>{form.registrationNum}</span>{" "}
                  </p>
                  <p className="capitalize">Applied For - {form.category}</p>
                  <p>
                    Campus Preference:{form.campus_preference}
                    <table class="border border-separate border-spacing-2 my-2 border-slate-400 ...">
                      <thead>
                        <tr>
                          <th class="border border-slate-300 ...">
                            Preference 1
                          </th>
                          <th class="border border-slate-300 ...">
                            Preference 2
                          </th>
                          <th class="border border-slate-300 ...">
                            Preference 3
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td class="border border-slate-300 ...">Indiana</td>
                          <td class="border border-slate-300 ...">Indiana</td>
                          <td class="border border-slate-300 ...">
                            Indianapolis
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </p>
                  <p>
                    Name - {form.personal_details.first_name}{" "}
                    {form.personal_details.middle_name}{" "}
                    {form.personal_details.last_name}
                  </p>
                  <p>Email - {form.personal_details.email}</p>
                  <p>DOB: {form.personal_details.dob}</p>
                  <p>Gender: {form.personal_details.gender}</p>
                  <p>Mobile - {form.personal_details.mobile}</p>
                  <p>Languages:</p>

                  <p>
                    Address - {form.address.current.flat_house}{" "}
                    {form.address.current.street_lane}{" "}
                    {form.address.current.city} {form.address.current.state}{" "}
                    {form.address.current.country}{" "}
                    {form.address.current.pincode}
                  </p>
                  <div className="md:col-span-4">
                    {form.personal_details.image_url ? (
                      <img
                        src={form.personal_details.image_url}
                        className="aspect-[9/16] w-[9rem] h-[10rem] shadow-lg border-black border"
                        alt="logo"
                      />
                    ) : (
                      <div className="border">
                        <FaUserAlt />
                      </div>
                    )}
                  </div>
                </div>

                <div className="md:col-span-12">
                  <p>
                    Academic Qualification
                    <table class="border-collapse border border-slate-400 ...">
                      <thead>
                        <tr>
                          <th class="border border-slate-300 ...">
                            High School{form.high_school}
                          </th>

                          <th class="border border-slate-300 ...">
                            School/Institute/University Name
                          </th>
                          <th class="border border-slate-300 ...">
                            Year of Passing
                          </th>
                          <th class="border border-slate-300 ...">Board</th>
                          <th class="border border-slate-300 ...">
                            Aggregate % Marks
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td class="border border-slate-300 ...">Indiana</td>
                          <td class="border border-slate-300 ...">
                            Indianapolis
                          </td>
                          <td class="border border-slate-300 ...">
                            Indianapolis
                          </td>
                          <td class="border border-slate-300 ...">
                            Indianapolis
                          </td>
                          <td class="border border-slate-300 ...">
                            Indianapolis
                          </td>
                          <td class="border border-slate-300 ...">
                            Indianapolis
                          </td>
                        </tr>
                        <tr>
                          <td class="border border-slate-300 ...">Ohio</td>
                          <td class="border border-slate-300 ...">Columbus</td>
                          <td class="border border-slate-300 ...">Columbus</td>
                          <td class="border border-slate-300 ...">Columbus</td>
                          <td class="border border-slate-300 ...">
                            Indianapolis
                          </td>
                          <td class="border border-slate-300 ...">
                            Indianapolis
                          </td>
                        </tr>
                        <tr>
                          <td class="border border-slate-300 ...">Michigan</td>
                          <td class="border border-slate-300 ...">Detroit</td>
                          <td class="border border-slate-300 ...">Columbus</td>
                          <td class="border border-slate-300 ...">Columbus</td>
                          <td class="border border-slate-300 ...">
                            Indianapolis
                          </td>
                          <td class="border border-slate-300 ...">
                            Indianapolis
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </p>
                </div>
                <div className="md:col-span-12 my-4">
                  <p>
                    <table class="border-collapse border border-slate-400 ...">
                      <thead>
                        <tr>
                          <th class="border border-slate-300 ...">College</th>
                          <th class="border border-slate-300 ...">Exam</th>
                          <th class="border border-slate-300 ...">
                            School/Institute/University Name
                          </th>
                          <th class="border border-slate-300 ...">
                            Year of Passing
                          </th>
                          <th class="border border-slate-300 ...">Board</th>
                          <th class="border border-slate-300 ...">
                            Aggregate % Marks
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td class="border border-slate-300 ...">Indiana</td>
                          <td class="border border-slate-300 ...">
                            Indianapolis
                          </td>
                          <td class="border border-slate-300 ...">
                            Indianapolis
                          </td>
                          <td class="border border-slate-300 ...">
                            Indianapolis
                          </td>
                          <td class="border border-slate-300 ...">
                            Indianapolis
                          </td>
                          <td class="border border-slate-300 ...">
                            Indianapolis
                          </td>
                        </tr>
                        <tr>
                          <td class="border border-slate-300 ...">Ohio</td>
                          <td class="border border-slate-300 ...">Columbus</td>
                          <td class="border border-slate-300 ...">Columbus</td>
                          <td class="border border-slate-300 ...">Columbus</td>
                          <td class="border border-slate-300 ...">
                            Indianapolis
                          </td>
                          <td class="border border-slate-300 ...">
                            Indianapolis
                          </td>
                        </tr>
                        <tr>
                          <td class="border border-slate-300 ...">Michigan</td>
                          <td class="border border-slate-300 ...">Detroit</td>
                          <td class="border border-slate-300 ...">Columbus</td>
                          <td class="border border-slate-300 ...">Columbus</td>
                          <td class="border border-slate-300 ...">
                            Indianapolis
                          </td>
                          <td class="border border-slate-300 ...">
                            Indianapolis
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </p>
                </div>
                <h2 className="col-span-12 text-sm font-bold w-[80%] mx-2">
                  WORKED ON CMS PAYROLL BEFORE?
                </h2>
                <h2 className="col-span-12 text-sm font-bold w-[80%] mx-2">
                  Total Work Experience:{form.total_experience}
                </h2>
                <div className="md:col-span-3">
                  <p>Branch Code: N/A</p>
                  <p>Reason for Leaving</p>
                  <p>Name of the Relative:</p>
                </div>
                <div className="md:col-span-3">
                  <p>Last Designation</p>
                  <p>Earliest Date You can Join: {form.earliest_date_join}</p>
                  <p>Staff Category:</p>
                </div>
                <div className="md:col-span-3">
                  <p>Date of Joining:</p>
                  <p>Do You a blood Relative in CMS?</p>
                  <p>Designation</p>
                </div>
                <div className="md:col-span-3">
                  <p>Date of Leaving: {""}</p>
                  <p></p>
                  <p>Campus:</p>
                </div>
              </div>

              <div className="col-span-12 flex items-center justify-center gap-4 my-4">
                {form?.paymentConfirmation ? (
                  <button className="bg-blue-600 text-white hover:bg-blue-700 rounded-md px-3 py-1">
                    Preview
                  </button>
                ) : (
                  <>
                    <Link
                      to={`/payment/CMS-${
                        Math.floor(
                          Math.random() * (10000000000 - 999999999 + 1)
                        ) + 999999999
                      }`}
                      className="bg-red-600 text-white hover:bg-red-700 rounded-md px-3 py-1"
                    >
                      Payment
                    </Link>

                    <Link
                      to={"/printpdf"}
                      className="bg-blue-600 text-white hover:bg-blue-700 rounded-md px-3 py-1"
                    >
                      Print Pdf
                    </Link>

                    <Link
                      to="/vacancy/edit"
                      className="bg-green-600 text-white hover:bg-blue-700 rounded-md px-3 py-1"
                    >
                      Edit
                    </Link>
                  </>
                )}
              </div>
            </div>
          ) : (
            <div className="w-full flex items-center justify-center my-2 h-full">
              <Link
                to="/info"
                className="bg-blue-600 text-white hover:bg-blue-700 rounded-md px-3 py-1"
              >
                New Form
              </Link>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default PreviewForm;
