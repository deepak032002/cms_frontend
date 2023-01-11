import React, { useEffect, useState } from "react";
import Input from "./Input";
import { staffTeachingSchema } from "../utils/yupSchema";

import { setNestedObjectValues, useFormik } from "formik";
import { formPost } from "../api/vacancyapply";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const campusPreference = [
  "Head Office",
  "Aliganj Campus I",
  "Aliganj Campus II",
  "Anand Nagar Campus",
  "Aasharfabad Campus",
  "Chowk Campus",
  "Gomti Nagar Campus I",
  "Gomti Nagar Campus II",
  "Indira Nagar Campus",
  "Jopling Road Campus",
  "Kanpur Road Campus",
  "Mahanagar Campus",
  "Rajajipuram Campus I",
  "Rajajipuram Campus II",
  "Rajendra Nagar Campus I",
  "Rajendra Nagar Campus II",
  "RDSO Campus",
  "Station Road Campus",
  "Golf City Campus",
  "United World Campus",
  "Ayodhya Road Campus",
  "Rajajipuram Campus III",
];

const academicSection = ["Pre-Primary", "Primary", "Junior", "ICSE", "ISC"];

const subjects = ["Computer", "Maths", "English", "Hindi", "Physics"];

const country = ["India", "Other"];

const state = [
  "Andhra Pradesh",
  "Arunachal Pradesh",
  "Assam",
  "Bihar",
  "Chhattisgarh",
  "Goa",
  "Gujarat",
  "Haryana",
  "Himachal Pradesh",
  "Jammu and Kashmir",
  "Jharkhand",
  "Karnataka",
  "Kerala",
  "Madhya Pradesh",
  "Maharashtra",
  "Manipur",
  "Meghalaya",
  "Mizoram",
  "Nagaland",
  "Odisha",
  "Punjab",
  "Rajasthan",
  "Sikkim",
  "Tamil Nadu",
  "Telangana",
  "Tripura",
  "Uttarakhand",
  "Uttar Pradesh",
  "West Bengal",
  "Andaman and Nicobar Islands",
  "Chandigarh",
  "Dadra and Nagar Haveli",
  "Daman and Diu",
  "Delhi",
  "Lakshadweep",
  "Puducherry",
];

const schoolBoards = [
  "Central Board of Secondary Education (CBSE)",
  "Indian Certificate of Secondary Education (ICSE)",
  "State Board of Education (SBE)",
  "Council for the Indian School Certificate Examinations (CISCE)",
  "National Institute of Open Schooling (NIOS)",
  "Tamil Nadu State Board",
  "Andhra Pradesh Board of Secondary Education",
  "Gujarat Secondary and Higher Secondary Education Board",
  "Maharashtra State Board of Secondary and Higher Secondary Education",
  "Karnatak",
  "Others",
];

const Vacancy = () => {
  const [year, setYear] = useState([]);
  const [isBloodRelative, setIsBloodRelative] = useState(false);
  const [isSameCurrentAddress, setIsSameCurrentAddress] = useState(false);
  const token = useSelector((state) => state.auth.token);
  const form = useSelector((state) => state.form.form);
  const navigate = useNavigate();

  const handleVacancyTeaching = async (data, action) => {
    const res = await formPost(data, token);
    if (res?.status === 201) {
      toast.success("Successfully submitted!");
      navigate("/payment");
    }

    if (res.code === "ERR_NETWORK") {
      toast.error("Network Error!");
    }

    if (res.code === "ERR_BAD_REQUEST" || res.code === "ERR_BAD_RESPONSE") {
      toast.error("Bad Request!");
    }
  };

  const {
    values,
    errors,
    handleChange,
    handleBlur,
    handleSubmit,
    setFieldValue,
    setValues,
  } = useFormik({
    initialValues: {
      category: "teaching",
      academic: "",
      subject: "",
      campus_prefrence: [{}, {}, {}],
      personal_details: {
        first_name: "",
        middle_name: "",
        last_name: "",
        dob: "",
        image: "",
        father: {
          name: "",
          mobile: "",
          occupation: "",
        },
        mother: {
          name: "",
          mobile: "",
          occupation: "",
        },
        mobile: "",
        email: "",
        gender: "",
        marital_status: "",
        aadhar_number: "",
      },
      communication: [],
      address: {
        permanent: {},
        current: {},
      },
      academic_details: {},
      work_experience: [],
      total_experience: 0,
      earliest_date_join: "",
      before_working_in_payroll: "no",
      blood_relative: {},
      declaration: false,
      isShortlisted: false,
      paymentConfirmation: false,
    },
    validationSchema: staffTeachingSchema,
    onSubmit: (values, action) => {
      handleVacancyTeaching(values, action);
    },
  });

  useEffect(() => {
    const years = [];
    for (let i = 1950; i <= new Date().getFullYear(); i++) {
      years.push(i);
    }

    if (Object.keys(form).length > 0) {
      setValues(form);
    }
    setYear(years);
  }, []);

  return (
    <div>
      <form onSubmit={handleSubmit} className="w-[90%] mx-auto">
        <h1 className="font-bold text-[22px]">Post Details</h1>
        <div className="grid grid-cols-12 gap-4">
          <div className="md:col-span-4 col-span-12">
            <Input
              type="select"
              label={"Select Academic"}
              className="my-4"
              name="academic"
              style={{ "--color--": "#525252" }}
              onChange={handleChange}
              value={values.academic}
              onBlur={handleBlur}
              error={errors.academic}
              id="academic"
              selectoptions={academicSection}
            />
          </div>
          <div className="md:col-span-4 col-span-12">
            <Input
              type="select"
              label={"Select Subject"}
              className="my-4"
              name="subject"
              style={{ "--color--": "#525252" }}
              onChange={handleChange}
              value={values.subject}
              onBlur={handleBlur}
              id="subject"
              error={errors.subject}
              selectoptions={subjects}
            />
          </div>
        </div>
        <h1 className="font-bold text-[22px]">Campus Preference</h1>
        <p>
          <strong>Note:</strong> Choosing campus preferences does not guarantee
          placement into that respective campus. Placement is based on the
          vacancy and other factors.
        </p>

        {Array.isArray(values.campus_prefrence) ? (
          <div className="grid grid-cols-12 gap-4">
            <div className="md:col-span-4 col-span-12">
              <Input
                type="select"
                label={"Preferred Campus 1"}
                className="my-4"
                name={`campus_prefrence[${0}].campus`}
                style={{ "--color--": "#525252" }}
                onChange={handleChange}
                onBlur={handleBlur}
                id={`campus_prefrence[${0}].campus`}
                value={values.campus_prefrence[0]?.campus}
                error={
                  Array.isArray(errors.campus_prefrence)
                    ? errors.campus_prefrence[0]?.campus
                    : ""
                }
                selectoptions={campusPreference}
              />
            </div>
            <div className="md:col-span-4 col-span-12">
              <Input
                type="select"
                label={"Preferred Campus 2"}
                className="my-4"
                name="campus_prefrence[1].campus"
                style={{ "--color--": "#525252" }}
                onChange={handleChange}
                onBlur={handleBlur}
                id="campus_prefrence[1].campus"
                value={values?.campus_prefrence[1]?.campus}
                error={
                  Array.isArray(errors.campus_prefrence)
                    ? errors.campus_prefrence[1]?.campus
                    : ""
                }
                selectoptions={campusPreference}
              />
            </div>
            <div className="md:col-span-4 col-span-12">
              <Input
                type="select"
                label={"Preferred Campus 3"}
                className="my-4"
                name="campus_prefrence[2].campus"
                style={{ "--color--": "#525252" }}
                onChange={handleChange}
                onBlur={handleBlur}
                id="campus_prefrence[2].campus"
                value={values?.campus_prefrence[2]?.campus}
                error={
                  Array.isArray(errors.campus_prefrence)
                    ? errors.campus_prefrence[2]?.campus
                    : ""
                }
                selectoptions={campusPreference}
              />
            </div>
          </div>
        ) : (
          <></>
        )}

        <h1 className="font-bold text-[22px]">Personal Details</h1>
        <div className="grid grid-cols-12 gap-4">
          <div className="md:col-span-4 col-span-12">
            <Input
              type="text"
              label={"FirstName"}
              className="my-4"
              name="personal_details.first_name"
              id="personal_details.first_name"
              style={{ "--color--": "#525252" }}
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.first_name}
              error={errors.personal_details?.first_name}
            />
          </div>

          <div className="md:col-span-4 col-span-12">
            <Input
              type="text"
              label={"Middle Name"}
              className="my-4"
              style={{ "--color--": "#525252" }}
              name="personal_details.middle_name"
              id="personal_details.middle_name"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.personal_details?.middle_name}
              error={errors.personal_details?.middle_name}
            />
          </div>

          <div className="md:col-span-4 col-span-12">
            <Input
              type="text"
              label={"Last Name"}
              className="my-4"
              name="personal_details.last_name"
              id="personal_details.last_name"
              style={{ "--color--": "#525252" }}
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.personal_details?.last_name}
              error={errors.personal_details?.last_name}
            />
          </div>

          <div className="md:col-span-6 col-span-12">
            <Input
              type="date"
              label="Date of Birth"
              required={true}
              className="my-4"
              name="personal_details.dob"
              id="personal_details.dob"
              style={{ "--color--": "#525252" }}
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.personal_details?.dob}
              error={errors.personal_details?.dob}
            />
          </div>

          <div className="md:col-span-6 col-span-12 flex gap-2">
            <Input
              type="select"
              selectoptions={["Married", "Unmarried"]}
              label={"Marital Status"}
              className="my-4 flex-1"
              style={{ "--color--": "#525252" }}
              name="personal_details.marital_status"
              id="personal_details.marital_status"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.personal_details?.marital_status}
              error={errors.personal_details?.marital_status}
            />

            {values.personal_details?.marital_status === "Married" ? (
              <Input
                type="text"
                label={"Spouse Name"}
                className="my-4 flex-1"
                name="personal_details.spouse"
                id="personal_details.spouse"
                style={{ "--color--": "#525252" }}
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.personal_details?.spouse}
                error={errors.personal_details?.spouse}
              />
            ) : (
              <></>
            )}
          </div>

          <div className="md:col-span-6 col-span-12">
            <Input
              type="text"
              label={"Aadhaar Number"}
              className="my-4"
              name="personal_details.aadhar_number"
              id="personal_details.aadhar_number"
              style={{ "--color--": "#525252" }}
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.personal_details?.aadhar_number}
              error={errors.personal_details?.aadhar_number}
            />
          </div>

          <div className="md:col-span-6 col-span-12">
            <Input
              type="file"
              label="Photo"
              accept=".png,.jpg,.jpeg"
              className="my-4"
              name="personal_details.image"
              id="personal_details.image"
              style={{ "--color--": "#525252" }}
              onChange={(e) =>
                setFieldValue("personal_details.image", e.target.files[0])
              }
              onBlur={handleBlur}
              error={errors.personal_details?.image}
            />
          </div>

          <div className="md:col-span-6 col-span-12">
            <Input
              type="number"
              label={"Mobile"}
              className="my-4"
              name="personal_details.mobile"
              id="personal_details.mobile"
              style={{ "--color--": "#525252" }}
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.personal_details?.mobile}
              error={errors.personal_details?.mobile}
            />
          </div>

          <div className="md:col-span-6 col-span-12">
            <Input
              type="text"
              label={"Email"}
              className="my-4"
              name="personal_details.email"
              id="personal_details.email"
              style={{ "--color--": "#525252" }}
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.personal_details?.email}
              error={errors.personal_details?.email}
            />
          </div>

          <div className="md:col-span-6 col-span-12">
            <h2 className="font-bold text-lg">Gender</h2>
            <div className="flex gap-4">
              <div className="input_wrp flex gap-2">
                <label htmlFor="">Male</label>
                <input
                  id="personal_details.gender"
                  name="personal_details.gender"
                  checked={
                    values.personal_details?.gender === "male" ? true : false
                  }
                  value={"male"}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  type="radio"
                />
              </div>
              <div className="input_wrp flex gap-2">
                <label htmlFor="">Female</label>
                <input
                  id="personal_details.gender"
                  name="personal_details.gender"
                  checked={
                    values.personal_details?.gender === "female" ? true : false
                  }
                  value={"female"}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  type="radio"
                />
              </div>
              <div className="input_wrp flex gap-2">
                <label htmlFor="">Others</label>
                <input
                  id="personal_details.gender"
                  name="personal_details.gender"
                  checked={
                    values.personal_details?.gender === "others" ? true : false
                  }
                  value={"others"}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  type="radio"
                />
              </div>
            </div>
          </div>
        </div>
        <h1 className="font-bold text-[22px]">Parent Details</h1>
        <div className="grid grid-cols-12 gap-4"></div>
        <div className="grid grid-cols-12 gap-4">
          <div className="md:col-span-4 col-span-12">
            <Input
              type="text"
              label={"Father's Name"}
              className="my-4"
              name="personal_details.father.name"
              id="personal_details.father.name"
              style={{ "--color--": "#525252" }}
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.personal_details?.father?.name}
              error={errors.personal_details?.father?.name}
            />
          </div>

          <div className="md:col-span-4 col-span-12 ">
            <Input
              type="number"
              label="Mobile Number"
              name="personal_details.father.mobile"
              id="personal_details.father.mobile"
              style={{ "--color--": "#525252" }}
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.personal_details?.father?.mobile}
              error={errors.personal_details?.father?.mobile}
              className="my-4"
            />
          </div>

          <div className="md:col-span-4 col-span-12">
            <Input
              type="text"
              label={"Occupation"}
              className="my-4"
              style={{ "--color--": "#525252" }}
              name="personal_details.father.occupation"
              id="personal_details.father.occupation"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.personal_details?.father?.occupation}
              error={errors.personal_details?.father?.occupation}
            />
          </div>

          <div className="md:col-span-4 col-span-12">
            <Input
              type="text"
              label={"Mother's Name"}
              className="my-4"
              name="personal_details.mother.name"
              id="personal_details.mother.name"
              style={{ "--color--": "#525252" }}
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.personal_details?.mother?.name}
              error={errors.personal_details?.mother?.name}
            />
          </div>

          <div className="md:col-span-4 col-span-12">
            <Input
              type="text"
              label={"Occupation"}
              className="my-4"
              name="personal_details.mother.occupation"
              id="personal_details.mother.occupation"
              style={{ "--color--": "#525252" }}
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.personal_details?.mother?.occupation}
              error={errors.personal_details?.mother?.occupation}
            />
          </div>

          <div className="md:col-span-4 col-span-12">
            <Input
              type="number"
              label={"Mobile Number"}
              className="my-4"
              name="personal_details.mother.mobile"
              id="personal_details.mother.mobile"
              style={{ "--color--": "#525252" }}
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.personal_details?.mother?.mobile}
              error={errors.personal_details?.mother?.mobile}
            />
          </div>

          {Array.isArray(values.communication) ? (
            <div className="col-span-12">
              <h1 className="font-bold text-[22px]">Communication Skill:</h1>
              <div className="grid grid-cols-12">
                <div className="md:col-span-4 col-span-12">
                  <h2 className="font-bold text-lg">English</h2>

                  <div className="flex gap-4">
                    <div className="input_group flex gap-2">
                      <label htmlFor="communication[0].english.speak">
                        Speak
                      </label>
                      <input
                        id="communication[0].english.speak"
                        value={values.communication[0]?.english?.speak}
                        checked={Boolean(
                          values.communication[0]?.english?.speak
                        )}
                        type="checkbox"
                        onChange={handleChange}
                        onBlur={handleBlur}
                      />
                    </div>
                    <div className="input_group flex gap-2">
                      <label htmlFor="communication[0].enlish.read">Read</label>
                      <input
                        id="communication[0].english.read"
                        value={values.communication[0]?.english?.read}
                        checked={Boolean(
                          values.communication[0]?.english?.read
                        )}
                        type="checkbox"
                        onChange={handleChange}
                        onBlur={handleBlur}
                      />
                    </div>
                    <div className="input_group flex gap-2">
                      <label htmlFor="communication[0].english.write">
                        Write
                      </label>
                      <input
                        id="communication[0].english.write"
                        value={values.communication[0]?.english?.write}
                        checked={Boolean(
                          values.communication[0]?.english?.write
                        )}
                        type="checkbox"
                        onChange={handleChange}
                        onBlur={handleBlur}
                      />
                    </div>
                  </div>
                </div>

                <div className="md:col-span-4 col-span-12">
                  <h2 className="font-bold text-lg">Hindi</h2>

                  <div className="flex gap-4">
                    <div className="input_group flex gap-2">
                      <label htmlFor="communication[1].hindi.speak">
                        Speak
                      </label>
                      <input
                        id="communication[1].hindi.speak"
                        value={values.communication[1]?.hindi?.speak}
                        checked={Boolean(values.communication[1]?.hindi?.speak)}
                        type="checkbox"
                        onChange={handleChange}
                        onBlur={handleBlur}
                      />
                    </div>
                    <div className="input_group flex gap-2">
                      <label htmlFor="communication[1].enlish.read">Read</label>
                      <input
                        id="communication[1].hindi.read"
                        value={values.communication[1]?.hindi?.read}
                        checked={Boolean(values.communication[1]?.hindi?.read)}
                        type="checkbox"
                        onChange={handleChange}
                        onBlur={handleBlur}
                      />
                    </div>
                    <div className="input_group flex gap-2">
                      <label htmlFor="communication[1].hindi.write">
                        Write
                      </label>
                      <input
                        id="communication[1].hindi.write"
                        value={values.communication[1]?.hindi?.write}
                        checked={Boolean(values.communication[1]?.hindi?.write)}
                        type="checkbox"
                        onChange={handleChange}
                        onBlur={handleBlur}
                      />
                    </div>
                  </div>
                </div>

                <div className="md:col-span-4 col-span-12">
                  <h2 className="font-bold text-lg">Others</h2>

                  <input
                    type="text"
                    name={`communication[2].others.type`}
                    id={`communication[2].others.type`}
                    className="focus:outline-0 border"
                    value={values.communication[2]?.others?.type}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />

                  {values.communication[2]?.others?.type ? (
                    <div className="flex gap-4">
                      <div className="input_group flex gap-2">
                        <label htmlFor="communication[2].others.speak">
                          Speak
                        </label>
                        <input
                          id="communication[2].others.speak"
                          value={values.communication[2]?.others?.speak}
                          checked={Boolean(
                            values.communication[2]?.others?.speak
                          )}
                          type="checkbox"
                          onChange={handleChange}
                          onBlur={handleBlur}
                        />
                      </div>
                      <div className="input_group flex gap-2">
                        <label htmlFor="communication[2].enlish.read">
                          Read
                        </label>
                        <input
                          id="communication[2].others.read"
                          value={values.communication[2]?.others?.read}
                          checked={Boolean(
                            values.communication[2]?.others?.read
                          )}
                          type="checkbox"
                          onChange={handleChange}
                          onBlur={handleBlur}
                        />
                      </div>
                      <div className="input_group flex gap-2">
                        <label htmlFor="communication[2].others.write">
                          Write
                        </label>
                        <input
                          id="communication[2].others.write"
                          value={values.communication[2]?.others?.write}
                          checked={Boolean(
                            values.communication[2]?.others?.write
                          )}
                          type="checkbox"
                          onChange={handleChange}
                          onBlur={handleBlur}
                        />
                      </div>
                    </div>
                  ) : (
                    <></>
                  )}
                </div>
              </div>
            </div>
          ) : (
            <></>
          )}
        </div>
        <div className="md:col-span-6 col-span-12">
          <h1 className="font-bold text-[22px]">Address Details:</h1>
        </div>
        <div className="md:col-span-6 col-span-12">
          <h1 className="font-bold text-[1rem] mb-4">Present Address</h1>
        </div>
        <div className="grid grid-cols-12 gap-4">
          <div className="md:col-span-6 col-span-12">
            <Input
              type="text"
              label={"Flat/House No"}
              name="address.current.flat_house"
              id="address.current.flat_house"
              value={values.address?.current?.flat_house}
              error={errors.address?.current?.flat_house}
              onChange={handleChange}
              onBlur={handleBlur}
              className="my-4"
              style={{ "--color--": "#525252" }}
            />
          </div>
          <div className="md:col-span-6 col-span-12">
            <Input
              type="text"
              label={"Street/Lane"}
              name="address.current.street_lane"
              id="address.current.street_lane"
              value={values.address?.current?.street_lane}
              error={errors.address?.current?.street_lane}
              onChange={handleChange}
              onBlur={handleBlur}
              className="my-4"
              style={{ "--color--": "#525252" }}
            />
          </div>
          <div className="md:col-span-6 col-span-12">
            <Input
              type="text"
              label={"Area/Locality"}
              name="address.current.area_locality"
              id="address.current.area_locality"
              value={values.address?.current?.area_locality}
              error={errors.address?.current?.area_locality}
              onChange={handleChange}
              onBlur={handleBlur}
              className="my-4"
              style={{ "--color--": "#525252" }}
            />
          </div>
          <div className="md:col-span-6 col-span-12">
            <Input
              type="text"
              label={"Nearest Landmark"}
              name="address.current.landmark"
              id="address.current.landmark"
              value={values.address?.current?.landmark}
              error={errors.address?.current?.landmark}
              onChange={handleChange}
              onBlur={handleBlur}
              className="my-4"
              style={{ "--color--": "#525252" }}
            />
          </div>
          <div className="md:col-span-6 col-span-12 flex gap-2">
            <Input
              type="select"
              selectoptions={country}
              label={"Country"}
              name="address.current.country"
              id="address.current.country"
              value={values.address?.current?.country}
              error={errors.address?.current?.country}
              onChange={handleChange}
              onBlur={handleBlur}
              className="my-4 flex-1"
              style={{ "--color--": "#525252" }}
            />

            {values.address.current?.country === "Other" ? (
              <Input
                type="text"
                label={"Country Name"}
                name="address.current.country_name"
                id="address.current.country_name"
                value={values.address?.current?.country_name}
                error={errors.address?.current?.country_name}
                onChange={handleChange}
                onBlur={handleBlur}
                className="my-4 flex-1"
                style={{ "--color--": "#525252" }}
              />
            ) : (
              <></>
            )}
          </div>
          <div className="md:col-span-6 col-span-12">
            {values.address.current?.country === "Other" ? (
              <Input
                type="text"
                label={"State Name"}
                name="address.current.state"
                id="address.current.state"
                value={values.address?.current?.state}
                error={errors.address?.current?.state}
                onChange={handleChange}
                onBlur={handleBlur}
                className="my-4 flex-1"
                style={{ "--color--": "#525252" }}
              />
            ) : (
              <Input
                type="select"
                selectoptions={state}
                label={"State"}
                name="address.current.state"
                id="address.current.state"
                value={values.address?.current?.state}
                error={errors.address?.current?.state}
                onChange={handleChange}
                onBlur={handleBlur}
                className="my-4"
                style={{ "--color--": "#525252" }}
              />
            )}
          </div>
          <div className="md:col-span-6 col-span-12">
            <Input
              type="text"
              label={"City"}
              className="my-4"
              name="address.current.city"
              id="address.current.city"
              value={values.address?.current?.city}
              error={errors.address?.current?.city}
              onChange={handleChange}
              onBlur={handleBlur}
              style={{ "--color--": "#525252" }}
            />
          </div>
          <div className="md:col-span-6 col-span-12">
            <Input
              type="number"
              label={"Pincode"}
              name="address.current.pincode"
              id="address.current.pincode"
              value={values.address?.current?.pincode}
              error={errors.address?.current?.pincode}
              onChange={handleChange}
              onBlur={handleBlur}
              className="my-4"
              style={{ "--color--": "#525252" }}
            />
          </div>
        </div>
        <div className="col-span-12 flex gap-2">
          <input
            type="checkbox"
            checked={isSameCurrentAddress}
            value={isSameCurrentAddress}
            id="isSameCurrentAddress"
            onChange={(e) => {
              setFieldValue("address.permanent", {
                ...values.address?.current,
              });
              setIsSameCurrentAddress(e.target.checked);
            }}
          />
          <label htmlFor="isSameCurrentAddress">Same as current</label>
        </div>
        {!isSameCurrentAddress ? (
          <>
            <h1 className="font-bold text-[1rem] mb-4">Permanent Address</h1>
            <div className="grid grid-cols-12 gap-4">
              <div className="md:col-span-6 col-span-12">
                <Input
                  type="text"
                  label={"Flat/House No"}
                  name="address.permanent.flat_house"
                  id="address.permanent.flat_house"
                  value={values.address.permanent?.flat_house}
                  error={errors.address?.permanent?.flat_house}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className="my-4"
                  style={{ "--color--": "#525252" }}
                />
              </div>
              <div className="md:col-span-6 col-span-12">
                <Input
                  type="text"
                  label={"Street/Lane"}
                  name="address.permanent.street_lane"
                  id="address.permanent.street_lane"
                  value={values.address.permanent?.street_lane}
                  error={errors.address?.permanent?.street_lane}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className="my-4"
                  style={{ "--color--": "#525252" }}
                />
              </div>
              <div className="md:col-span-6 col-span-12">
                <Input
                  type="text"
                  label={"Area/Locality"}
                  name="address.permanent.area_locality"
                  id="address.permanent.area_locality"
                  value={values.address.permanent?.area_locality}
                  error={errors.address?.permanent?.area_locality}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className="my-4"
                  style={{ "--color--": "#525252" }}
                />
              </div>
              <div className="md:col-span-6 col-span-12">
                <Input
                  type="text"
                  label={"Nearest Landmark"}
                  name="address.permanent.landmark"
                  id="address.permanent.landmark"
                  value={values.address.permanent?.landmark}
                  error={errors.address?.permanent?.landmark}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className="my-4"
                  style={{ "--color--": "#525252" }}
                />
              </div>
              <div className="md:col-span-6 col-span-12 flex gap-2">
                <Input
                  type="select"
                  selectoptions={country}
                  label={"Country"}
                  name="address.permanent.country"
                  id="address.permanent.country"
                  value={values.address.permanent?.country}
                  error={errors.address?.permanent?.country}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className="my-4 flex-1"
                  style={{ "--color--": "#525252" }}
                />

                {values.address.permanent?.country === "Other" ? (
                  <Input
                    type="text"
                    label={"Country Name"}
                    name="address.permanent.country_name"
                    id="address.permanent.country_name"
                    value={values.address.permanent?.country_name}
                    error={errors.address?.permanent?.country_name}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    className="my-4 flex-1"
                    style={{ "--color--": "#525252" }}
                  />
                ) : (
                  <></>
                )}
              </div>
              <div className="md:col-span-6 col-span-12">
                {values.address.permanent?.country === "Other" ? (
                  <Input
                    type="text"
                    label={"State Name"}
                    name="address.permanent.state"
                    id="address.permanent.state"
                    value={values.address.permanent?.state}
                    error={errors.address?.permanent?.state}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    className="my-4 flex-1"
                    style={{ "--color--": "#525252" }}
                  />
                ) : (
                  <Input
                    type="select"
                    selectoptions={state}
                    label={"State"}
                    name="address.permanent.state"
                    id="address.permanent.state"
                    value={values.address.permanent?.state}
                    error={errors.address?.permanent?.state}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    className="my-4"
                    style={{ "--color--": "#525252" }}
                  />
                )}
              </div>
              <div className="md:col-span-6 col-span-12">
                <Input
                  type="text"
                  label={"City"}
                  className="my-4"
                  name="address.permanent.city"
                  id="address.permanent.city"
                  value={values.address.permanent?.city}
                  error={errors.address?.permanent?.city}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  style={{ "--color--": "#525252" }}
                />
              </div>
              <div className="md:col-span-6 col-span-12">
                <Input
                  type="number"
                  label={"Pincode"}
                  name="address.permanent.pincode"
                  id="address.permanent.pincode"
                  value={values.address.permanent?.pincode}
                  error={errors.address?.permanent?.pincode}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className="my-4"
                  style={{ "--color--": "#525252" }}
                />
              </div>
            </div>
          </>
        ) : (
          <></>
        )}
        <div className="md:col-span-12">
          <h1 className="font-bold text-[22px]">Academic Details:</h1>
          <h1 className="font-bold text-[1rem] mb-4">Note:</h1>
          <ul className="list-[square] mx-3 px-3">
            <li>Exam</li>
            <li>Year of Passing</li>
            <li>
              Board or University && Subject(in case of Graduation &
              Post-Graduation)
            </li>
            <li>Institution</li>
            <li>
              Percentage Marks (Please Convert your CGPA to percentage){" "}
              <span> -(All Subjects)</span>
            </li>
          </ul>
        </div>
        <div className="grid grid-cols-12 gap-4">
          <p className="col-span-12 my-2 text-2xl font-bold">High School</p>

          <div className="md:col-span-6 col-span-12">
            <Input
              type="select"
              selectoptions={year}
              label={"Year"}
              className="my-4"
              id={`academic_details.high_school.year`}
              name={`academic_details.high_school.year`}
              value={values?.academic_details?.high_school?.year}
              error={errors?.academic_details?.high_school?.year}
              onBlur={handleBlur}
              onChange={handleChange}
              style={{ "--color--": "#525252" }}
            />
          </div>
          <div className="md:col-span-6 col-span-12">
            <Input
              type="select"
              selectoptions={schoolBoards}
              label={"Board"}
              className="my-4"
              id={`academic_details.high_school.board`}
              name={`academic_details.high_school.board`}
              value={values?.academic_details?.high_school?.board}
              error={errors?.academic_details?.high_school?.board}
              onBlur={handleBlur}
              onChange={handleChange}
              style={{ "--color--": "#525252" }}
            />
          </div>
          <div className="md:col-span-6 col-span-12">
            <Input
              type="text"
              label={"School Name"}
              className="my-4"
              id={`academic_details.high_school.school`}
              name={`academic_details.high_school.school`}
              value={values?.academic_details?.high_school?.school}
              error={errors?.academic_details?.high_school?.school}
              onBlur={handleBlur}
              onChange={handleChange}
              style={{ "--color--": "#525252" }}
            />
          </div>
          <div className="col-span-6">
            <Input
              type="number"
              label={"Percentage"}
              className="my-4"
              id={`academic_details.high_school.percentage`}
              name={`academic_details.high_school.percentage`}
              value={values?.academic_details?.high_school?.percentage}
              error={errors?.academic_details?.high_school?.percentage}
              onBlur={handleBlur}
              onChange={handleChange}
              style={{ "--color--": "#525252" }}
            />
          </div>
          <div className="md:col-span-6 col-span-12">
            <Input
              type="select"
              selectoptions={["English", "Others"]}
              label={"Medium of Education"}
              className="my-4"
              id={`academic_details.high_school.medium`}
              name={`academic_details.high_school.medium`}
              value={values?.academic_details?.high_school?.medium}
              error={errors?.academic_details?.high_school?.medium}
              onBlur={handleBlur}
              onChange={handleChange}
              style={{ "--color--": "#525252" }}
            />
          </div>
        </div>
        <div className="grid grid-cols-12 gap-4">
          <p className="col-span-12 my-2 text-2xl font-bold">Senior Secondry</p>
          <div className="md:col-span-6 col-span-12">
            <Input
              type="select"
              selectoptions={year}
              label={"Year"}
              className="my-4"
              id={`academic_details.senior_secondary.year`}
              name={`academic_details.senior_secondary.year`}
              value={values?.academic_details?.senior_secondary?.year}
              error={errors?.academic_details?.senior_secondary?.year}
              onBlur={handleBlur}
              onChange={handleChange}
              style={{ "--color--": "#525252" }}
            />
          </div>
          <div className="md:col-span-6 col-span-12">
            <Input
              type="select"
              selectoptions={schoolBoards}
              label={"Board"}
              className="my-4"
              id={`academic_details.senior_secondary.board`}
              name={`academic_details.senior_secondary.board`}
              value={values?.academic_details?.senior_secondary?.board}
              error={errors?.academic_details?.senior_secondary?.board}
              onBlur={handleBlur}
              onChange={handleChange}
              style={{ "--color--": "#525252" }}
            />
          </div>
          <div className="md:col-span-6 col-span-12">
            <Input
              type="text"
              label={"School Name"}
              className="my-4"
              id={`academic_details.senior_secondary.school`}
              name={`academic_details.senior_secondary.school`}
              value={values?.academic_details?.senior_secondary?.school}
              error={errors?.academic_details?.senior_secondary?.school}
              onBlur={handleBlur}
              onChange={handleChange}
              style={{ "--color--": "#525252" }}
            />
          </div>
          <div className="col-span-6">
            <Input
              type="number"
              label={"Percentage"}
              className="my-4"
              id={`academic_details.senior_secondary.percentage`}
              name={`academic_details.senior_secondary.percentage`}
              value={values?.academic_details?.senior_secondary?.percentage}
              error={errors?.academic_details?.senior_secondary?.percentage}
              onBlur={handleBlur}
              onChange={handleChange}
              style={{ "--color--": "#525252" }}
            />
          </div>
          <div className="md:col-span-6 col-span-12">
            <Input
              type="select"
              selectoptions={["English", "Others"]}
              label={"Medium of Education"}
              className="my-4"
              id={`academic_details.senior_secondary.medium`}
              name={`academic_details.senior_secondary.medium`}
              value={values?.academic_details?.senior_secondary?.medium}
              error={errors?.academic_details?.senior_secondary?.medium}
              onBlur={handleBlur}
              onChange={handleChange}
              style={{ "--color--": "#525252" }}
            />
          </div>
        </div>
        <div className="grid grid-cols-12 gap-4">
          <p className="col-span-12 my-2 text-2xl font-bold">Graduation</p>
          <div className="md:col-span-6 col-span-12">
            <Input
              type="select"
              selectoptions={year}
              label={"Year"}
              className="my-4"
              id={`academic_details.graduation.year`}
              name={`academic_details.graduation.year`}
              value={values?.academic_details?.graduation?.year}
              error={errors?.academic_details?.graduation?.year}
              onBlur={handleBlur}
              onChange={handleChange}
              style={{ "--color--": "#525252" }}
            />
          </div>
          <div className="md:col-span-6 col-span-12">
            <Input
              type="select"
              selectoptions={schoolBoards}
              label={"Board"}
              className="my-4"
              id={`academic_details.graduation.board`}
              name={`academic_details.graduation.board`}
              value={values?.academic_details?.graduation?.board}
              error={errors?.academic_details?.graduation?.board}
              onBlur={handleBlur}
              onChange={handleChange}
              style={{ "--color--": "#525252" }}
            />
          </div>
          <div className="md:col-span-6 col-span-12">
            <Input
              type="text"
              label={"School Name"}
              className="my-4"
              id={`academic_details.graduation.school`}
              name={`academic_details.graduation.school`}
              value={values?.academic_details?.graduation?.school}
              error={errors?.academic_details?.graduation?.school}
              onBlur={handleBlur}
              onChange={handleChange}
              style={{ "--color--": "#525252" }}
            />
          </div>
          <div className="col-span-6">
            <Input
              type="number"
              label={"Percentage"}
              className="my-4"
              id={`academic_details.graduation.percentage`}
              name={`academic_details.graduation.percentage`}
              value={values?.academic_details?.graduation?.percentage}
              error={errors?.academic_details?.graduation?.percentage}
              onBlur={handleBlur}
              onChange={handleChange}
              style={{ "--color--": "#525252" }}
            />
          </div>
          <div className="md:col-span-6 col-span-12">
            <Input
              type="select"
              selectoptions={["English", "Others"]}
              label={"Medium of Education"}
              className="my-4"
              id={`academic_details.graduation.medium`}
              name={`academic_details.graduation.medium`}
              value={values?.academic_details?.graduation?.medium}
              error={errors?.academic_details?.graduation?.medium}
              onBlur={handleBlur}
              onChange={handleChange}
              style={{ "--color--": "#525252" }}
            />
          </div>

          <div className="font-bold text-[1rem] mb-4 md:col-span-12 flex gap-1">
            <input
              type="checkbox"
              value={false}
              id={`academic_details.graduation.isPursuing`}
              name={`academic_details.graduation.isPursuing`}
              checked={Boolean(
                values?.academic_details?.graduation?.isPursuing
              )}
              onChange={(e) => {
                setFieldValue("academic_details.post_graduation", {});
                handleChange(e);
              }}
              onBlur={handleBlur}
            />
            <label htmlFor={`academic_details.isPursuing`}>
              Check If Pursuing
            </label>
          </div>
        </div>
        {!values?.academic_details.graduation?.isPursuing ? (
          <div className="grid grid-cols-12 gap-4">
            <p className="col-span-12 my-2 text-2xl font-bold">
              Post Graduation
            </p>

            <div className="md:col-span-6 col-span-12">
              <Input
                type="select"
                selectoptions={year}
                label={"Year"}
                className="my-4"
                id={`academic_details.post_graduation.year`}
                name={`academic_details.post_graduation.year`}
                value={values?.academic_details?.post_graduation?.year}
                error={errors?.academic_details?.post_graduation?.year}
                onBlur={handleBlur}
                onChange={handleChange}
                style={{ "--color--": "#525252" }}
              />
            </div>
            <div className="md:col-span-6 col-span-12">
              <Input
                type="select"
                selectoptions={schoolBoards}
                label={"Board"}
                className="my-4"
                id={`academic_details.post_graduation.board`}
                name={`academic_details.post_graduation.board`}
                value={values?.academic_details?.post_graduation?.board}
                error={errors?.academic_details?.post_graduation?.board}
                onBlur={handleBlur}
                onChange={handleChange}
                style={{ "--color--": "#525252" }}
              />
            </div>
            <div className="md:col-span-6 col-span-12">
              <Input
                type="text"
                label={"School Name"}
                className="my-4"
                id={`academic_details.post_graduation.school`}
                name={`academic_details.post_graduation.school`}
                value={values?.academic_details?.post_graduation?.school}
                error={errors?.academic_details?.post_graduation?.school}
                onBlur={handleBlur}
                onChange={handleChange}
                style={{ "--color--": "#525252" }}
              />
            </div>
            <div className="col-span-6">
              <Input
                type="number"
                label={"Percentage"}
                className="my-4"
                id={`academic_details.post_graduation.percentage`}
                name={`academic_details.post_graduation.percentage`}
                value={values?.academic_details?.post_graduation?.percentage}
                error={errors?.academic_details?.post_graduation?.percentage}
                onBlur={handleBlur}
                onChange={handleChange}
                style={{ "--color--": "#525252" }}
              />
            </div>
            <div className="md:col-span-6 col-span-12">
              <Input
                type="select"
                selectoptions={["English", "Others"]}
                label={"Medium of Education"}
                className="my-4"
                id={`academic_details.post_graduation.medium`}
                name={`academic_details.post_graduation.medium`}
                value={values?.academic_details?.post_graduation?.medium}
                error={errors?.academic_details?.post_graduation?.medium}
                onBlur={handleBlur}
                onChange={handleChange}
                style={{ "--color--": "#525252" }}
              />
            </div>
          </div>
        ) : (
          <></>
        )}
        {/* <div onClick={handleAddfield} className="mb-4">
          <IoIosAddCircleOutline className="text-4xl cursor-pointer text-white rounded-full bg-blue-600" />
        </div> */}
        <div className="md:col-span-12">
          <h1 className="font-bold text-[22px]">Work Experience:</h1>
        </div>
        <div className="col-span-12">
          If you are a fresher then enter 0(zero) as total work Experience{" "}
        </div>
        <div className="grid grid-cols-12 gap-4">
          <div className="md:col-span-6 col-span-12">
            <h1 className="font-bold text-[1rem] mb-4">
              Total Work Experience(In Months) *
            </h1>
            <Input
              type="text"
              label={"Work Experience"}
              className="my-4"
              name="total_experience"
              id="total_experience"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.total_experience}
              style={{ "--color--": "#525252" }}
            />
          </div>

          <div className="md:col-span-6 col-span-12">
            <h1 className="font-bold text-[1rem] mb-4">
              Your Total Work Experience(Auto Calculate)
            </h1>
            <Input
              type="text"
              // label={"0 yearn and 0 mog"}
              className="my-4"
              disabled
              value={`${parseInt(values.total_experience / 12)} year and ${
                values.total_experience % 12
              } months`}
              style={{ "--color--": "#525252" }}
            />
          </div>
        </div>
        <div className="">
          <div className="col-span-12 font-bold text-[1rem] mb-4">
            PROVIDE YOUR LAST THREE WORK EXPERIENCES:
            <span className="text-color:red">*</span>
          </div>

          <div className="wrp">
            <h2 className="font-bold text-lg">Latest Job</h2>
            <div className="grid grid-cols-12 gap-4">
              <div className="md:col-span-6 col-span-12">
                <Input
                  type="text"
                  label={"Work Experience"}
                  className="my-4"
                  id={`work_experience[${0}].work`}
                  name={`work_experience[${0}].work`}
                  value={values.work_experience[0]?.work}
                  error={
                    Array.isArray(errors?.work_experience)
                      ? errors?.work_experience[0]?.work
                      : ""
                  }
                  onBlur={handleBlur}
                  onChange={handleChange}
                  style={{ "--color--": "#525252" }}
                />
              </div>
              <div className="md:col-span-6 col-span-12">
                <Input
                  type="text"
                  label={"Designation"}
                  className="my-4"
                  id={`work_experience[${0}].designation`}
                  name={`work_experience[${0}].designation`}
                  value={values.work_experience[0]?.designation}
                  error={
                    Array.isArray(errors?.work_experience)
                      ? errors?.work_experience[0]?.designation
                      : ""
                  }
                  onBlur={handleBlur}
                  onChange={handleChange}
                  style={{ "--color--": "#525252" }}
                />
              </div>
              <div className="md:col-span-6 col-span-12">
                <Input
                  type="text"
                  label={"Organisation"}
                  className="my-4"
                  id={`work_experience[${0}].organisation`}
                  name={`work_experience[${0}].organisation`}
                  value={values.work_experience[0]?.organisation}
                  error={
                    Array.isArray(errors?.work_experience)
                      ? errors?.work_experience[0]?.organisation
                      : ""
                  }
                  onBlur={handleBlur}
                  onChange={handleChange}
                  style={{ "--color--": "#525252" }}
                />
              </div>
              <div className="md:col-span-6 col-span-12">
                <Input
                  type="date"
                  required={true}
                  label={"Date of Joining"}
                  className="my-4"
                  id={`work_experience[${0}].joining_date`}
                  name={`work_experience[${0}].joining_date`}
                  value={values.work_experience[0]?.joining_date}
                  error={
                    Array.isArray(errors?.work_experience)
                      ? errors?.work_experience[0]?.joining_date
                      : ""
                  }
                  onBlur={handleBlur}
                  onChange={handleChange}
                  style={{ "--color--": "#525252" }}
                />
              </div>
              <div className="md:col-span-6 col-span-12">
                <Input
                  type="date"
                  label={"Date of Leaving"}
                  className="my-4"
                  id={`work_experience[${0}].leaving_date`}
                  name={`work_experience[${0}].leaving_date`}
                  value={values.work_experience[0]?.leaving_date}
                  error={
                    Array.isArray(errors?.work_experience)
                      ? errors?.work_experience[0]?.leaving_date
                      : ""
                  }
                  onBlur={handleBlur}
                  onChange={handleChange}
                  style={{ "--color--": "#525252" }}
                />
              </div>
              <div className="md:col-span-6 col-span-12">
                <Input
                  type="text"
                  label={"Salary drawn in Rs/Month 1:"}
                  className="my-4"
                  id={`work_experience[${0}].salary`}
                  name={`work_experience[${0}].salary`}
                  value={values.work_experience[0]?.salary}
                  error={
                    Array.isArray(errors?.work_experience)
                      ? errors?.work_experience[0]?.salary
                      : ""
                  }
                  onBlur={handleBlur}
                  onChange={handleChange}
                  style={{ "--color--": "#525252" }}
                />
              </div>
              <div className="md:col-span-6 col-span-12">
                {/* <h1 className="font-bold text-[1rem] mb-4"></h1> */}
                <Input
                  type="text"
                  label={"Reason for Leaving"}
                  className="my-4"
                  id={`work_experience[${0}].reason`}
                  name={`work_experience[${0}].reason`}
                  value={values.work_experience[0]?.reason}
                  error={
                    Array.isArray(errors?.work_experience)
                      ? errors?.work_experience[0]?.reason
                      : ""
                  }
                  onBlur={handleBlur}
                  onChange={handleChange}
                  style={{ "--color--": "#525252" }}
                />
              </div>
              <div className="font-bold text-[1rem] mb-4 col-span-12 flex gap-1">
                <input
                  type="checkbox"
                  id={`work_experience[${0}].isWorking`}
                  name={`work_experience[${0}].isWorking`}
                  value={values.work_experience[0]?.isWorking}
                  onBlur={handleBlur}
                  onChange={handleChange}
                  checked={Boolean(values.work_experience[0]?.isWorking)}
                />

                <label htmlFor={`work_experience[${0}].isWorking`}>
                  Currently Working Here!
                </label>
              </div>
            </div>
          </div>

          <div className="wrp">
            <h2 className="font-bold text-lg">Previous Job 1</h2>
            <div className="grid grid-cols-12 gap-4">
              <div className="md:col-span-6 col-span-12">
                <Input
                  type="text"
                  label={"Work Experience"}
                  className="my-4"
                  id={`work_experience[${1}].work`}
                  name={`work_experience[${1}].work`}
                  value={values.work_experience[1]?.work}
                  error={
                    Array.isArray(errors?.work_experience)
                      ? errors?.work_experience[1]?.work
                      : ""
                  }
                  onBlur={handleBlur}
                  onChange={handleChange}
                  style={{ "--color--": "#525252" }}
                />
              </div>
              <div className="md:col-span-6 col-span-12">
                <Input
                  type="text"
                  label={"Designation"}
                  className="my-4"
                  id={`work_experience[${1}].designation`}
                  name={`work_experience[${1}].designation`}
                  value={values.work_experience[1]?.designation}
                  error={
                    Array.isArray(errors?.work_experience)
                      ? errors?.work_experience[1]?.designation
                      : ""
                  }
                  onBlur={handleBlur}
                  onChange={handleChange}
                  style={{ "--color--": "#525252" }}
                />
              </div>
              <div className="md:col-span-6 col-span-12">
                <Input
                  type="text"
                  label={"Organisation"}
                  className="my-4"
                  id={`work_experience[${1}].organisation`}
                  name={`work_experience[${1}].organisation`}
                  value={values.work_experience[1]?.organisation}
                  error={
                    Array.isArray(errors?.work_experience)
                      ? errors?.work_experience[1]?.organisation
                      : ""
                  }
                  onBlur={handleBlur}
                  onChange={handleChange}
                  style={{ "--color--": "#525252" }}
                />
              </div>
              <div className="md:col-span-6 col-span-12">
                <Input
                  type="date"
                  label={"Date of Joining"}
                  className="my-4"
                  id={`work_experience[${1}].joining_date`}
                  name={`work_experience[${1}].joining_date`}
                  value={values.work_experience[1]?.joining_date}
                  error={
                    Array.isArray(errors?.work_experience)
                      ? errors?.work_experience[1]?.joining_date
                      : ""
                  }
                  onBlur={handleBlur}
                  onChange={handleChange}
                  style={{ "--color--": "#525252" }}
                />
              </div>
              <div className="md:col-span-6 col-span-12">
                <Input
                  type="date"
                  label={"Date of Leaving"}
                  className="my-4"
                  id={`work_experience[${1}].leaving_date`}
                  name={`work_experience[${1}].leaving_date`}
                  value={values.work_experience[1]?.leaving_date}
                  error={
                    Array.isArray(errors?.work_experience)
                      ? errors?.work_experience[1]?.leaving_date
                      : ""
                  }
                  onBlur={handleBlur}
                  onChange={handleChange}
                  style={{ "--color--": "#525252" }}
                />
              </div>
              <div className="md:col-span-6 col-span-12">
                <Input
                  type="text"
                  label={"Salary drawn in Rs/Month 1:"}
                  className="my-4"
                  id={`work_experience[${1}].salary`}
                  name={`work_experience[${1}].salary`}
                  value={values.work_experience[1]?.salary}
                  error={
                    Array.isArray(errors?.work_experience)
                      ? errors?.work_experience[1]?.salary
                      : ""
                  }
                  onBlur={handleBlur}
                  onChange={handleChange}
                  style={{ "--color--": "#525252" }}
                />
              </div>
              <div className="md:col-span-6 col-span-12">
                <Input
                  type="text"
                  label={"Reason for Leaving"}
                  className="my-4"
                  id={`work_experience[${1}].reason`}
                  name={`work_experience[${1}].reason`}
                  value={values.work_experience[1]?.reason}
                  error={
                    Array.isArray(errors?.work_experience)
                      ? errors?.work_experience[1]?.reason
                      : ""
                  }
                  onBlur={handleBlur}
                  onChange={handleChange}
                  style={{ "--color--": "#525252" }}
                />
              </div>
            </div>
          </div>

          <div className="wrp">
            <h2 className="font-bold text-lg">Previous Job 2</h2>
            <div className="grid grid-cols-12 gap-4">
              <div className="md:col-span-6 col-span-12">
                <Input
                  type="text"
                  label={"Work Experience"}
                  className="my-4"
                  id={`work_experience[${2}].work`}
                  name={`work_experience[${2}].work`}
                  value={values.work_experience[2]?.work}
                  error={
                    Array.isArray(errors?.work_experience)
                      ? errors?.work_experience[2]?.work
                      : ""
                  }
                  onBlur={handleBlur}
                  onChange={handleChange}
                  style={{ "--color--": "#525252" }}
                />
              </div>
              <div className="md:col-span-6 col-span-12">
                <Input
                  type="text"
                  label={"Designation"}
                  className="my-4"
                  id={`work_experience[${2}].designation`}
                  name={`work_experience[${2}].designation`}
                  value={values.work_experience[2]?.designation}
                  error={
                    Array.isArray(errors?.work_experience)
                      ? errors?.work_experience[2]?.designation
                      : ""
                  }
                  onBlur={handleBlur}
                  onChange={handleChange}
                  style={{ "--color--": "#525252" }}
                />
              </div>
              <div className="md:col-span-6 col-span-12">
                <Input
                  type="text"
                  label={"Organisation"}
                  className="my-4"
                  id={`work_experience[${2}].organisation`}
                  name={`work_experience[${2}].organisation`}
                  value={values.work_experience[2]?.organisation}
                  error={
                    Array.isArray(errors?.work_experience)
                      ? errors?.work_experience[2]?.organisation
                      : ""
                  }
                  onBlur={handleBlur}
                  onChange={handleChange}
                  style={{ "--color--": "#525252" }}
                />
              </div>
              <div className="md:col-span-6 col-span-12">
                <Input
                  type="date"
                  label={"Date of Joining"}
                  className="my-4"
                  id={`work_experience[${2}].joining_date`}
                  name={`work_experience[${2}].joining_date`}
                  value={values.work_experience[2]?.joining_date}
                  error={
                    Array.isArray(errors?.work_experience)
                      ? errors?.work_experience[2]?.joining_date
                      : ""
                  }
                  onBlur={handleBlur}
                  onChange={handleChange}
                  style={{ "--color--": "#525252" }}
                />
              </div>
              <div className="md:col-span-6 col-span-12">
                <Input
                  type="date"
                  label={"Date of Leaving"}
                  className="my-4"
                  id={`work_experience[${2}].leaving_date`}
                  name={`work_experience[${2}].leaving_date`}
                  value={values.work_experience[2]?.leaving_date}
                  error={
                    Array.isArray(errors?.work_experience)
                      ? errors?.work_experience[2]?.leaving_date
                      : ""
                  }
                  onBlur={handleBlur}
                  onChange={handleChange}
                  style={{ "--color--": "#525252" }}
                />
              </div>
              <div className="md:col-span-6 col-span-12">
                <Input
                  type="text"
                  label={"Salary drawn in Rs/Month 1:"}
                  className="my-4"
                  id={`work_experience[${2}].salary`}
                  name={`work_experience[${2}].salary`}
                  value={values.work_experience[2]?.salary}
                  error={
                    Array.isArray(errors?.work_experience)
                      ? errors?.work_experience[2]?.salary
                      : ""
                  }
                  onBlur={handleBlur}
                  onChange={handleChange}
                  style={{ "--color--": "#525252" }}
                />
              </div>
              <div className="md:col-span-6 col-span-12">
                {/* <h1 className="font-bold text-[1rem] mb-4"></h1> */}
                <Input
                  type="text"
                  label={"Reason for Leaving"}
                  className="my-4"
                  id={`work_experience[${2}].reason`}
                  name={`work_experience[${2}].reason`}
                  value={values.work_experience[2]?.reason}
                  error={
                    Array.isArray(errors?.work_experience)
                      ? errors?.work_experience[2]?.reason
                      : ""
                  }
                  onBlur={handleBlur}
                  onChange={handleChange}
                  style={{ "--color--": "#525252" }}
                />
              </div>
              {/* <div className="md:col-span-6 col-span-12">
                <Input
                  type="text"
                  label={"Nature of The Job"}
                  className="my-4"
                  id={`work_experience[${2}].job_nature`}
                  name={`work_experience[${2}].job_nature`}
                  value={values.work_experience[2]?.job_nature}
                  onBlur={handleBlur}
                  onChange={handleChange}
                  style={{ "--color--": "#525252" }}
                />
              </div> */}
            </div>
          </div>
        </div>
        <div className="font-bold text-[1rem] mb-4 md:col-span-6 col-span-12 flex">
          <h2>HAVE YOU WORKED ON CMS PAYROLL BEFORE </h2>
          <div className="flex gap-2 ml-1">
            <label htmlFor="">Yes</label>
            <input
              type="radio"
              value="yes"
              name="before_working_in_payroll"
              id="before_working_in_payroll-yes"
              checked={
                values?.before_working_in_payroll === "yes" ? true : false
              }
              onChange={handleChange}
              onBlur={handleBlur}
            />
            <label htmlFor="">No</label>
            <input
              type="radio"
              value="no"
              name="before_working_in_payroll"
              id="before_working_in_payroll-no"
              checked={
                values?.before_working_in_payroll === "no" ? true : false
              }
              onChange={handleChange}
              onBlur={handleBlur}
            />
          </div>
        </div>
        <div className="grid grid-cols-12 gap-4 mb-2">
          <div className="col-span-12">
            <h1 className="font-bold text-[1rem] mb-4">
              Earliest Date you can join<span>*</span>:
            </h1>
            Earliest Date you can join (Date Format : DD-MM-YYYY, e.g.
            10-JUN-2021)
            <Input
              type="date"
              label="Date"
              required={true}
              name="earliest_date_join"
              value={values.earliest_date_join?.slice(0, 10)}
              error={errors.earliest_date_join}
              id="earliest_date_join-no"
              onChange={handleChange}
              onBlur={handleBlur}
              className="my-4 md:w-1/2 w-full"
            />
          </div>

          <div className="font-bold text-[1rem] mb-4 col-span-12">
            <div className="flex">
              <h2>Do you have a blood relative working in CMS?</h2>
              <div className="flex gap-2 ml-1">
                <label htmlFor="cms_working-yes">Yes</label>
                <input
                  type="radio"
                  id="cms_working-yes"
                  name="cms_working"
                  onClick={() => setIsBloodRelative(true)}
                  checked={isBloodRelative}
                  value="yes"
                />
                <label htmlFor="cms_working-no">No</label>
                <input
                  type="radio"
                  id="cms_working-no"
                  name="cms_working"
                  checked={!isBloodRelative}
                  onClick={() => setIsBloodRelative(false)}
                  value="no"
                />
              </div>
            </div>
          </div>

          {isBloodRelative ? (
            <>
              <div className="md:col-span-6 col-span-12">
                <Input
                  type="text"
                  label={"Name of Relative "}
                  name="blood_relative.name"
                  id="blood_relative.name"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.blood_relative?.name}
                  error={errors.blood_relative?.name}
                  className="my-4"
                  style={{ "--color--": "#525252" }}
                />
              </div>

              <div className="md:col-span-6 col-span-12">
                <Input
                  type="text"
                  label={"Designation"}
                  name="blood_relative.designation"
                  id="blood_relative.designation"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.blood_relative?.designation}
                  error={errors.blood_relative?.designation}
                  className="my-4"
                  style={{ "--color--": "#525252" }}
                />
              </div>

              <div className="md:col-span-6 col-span-12">
                <Input
                  type="select"
                  selectoptions={campusPreference}
                  name="blood_relative.campus"
                  id="blood_relative.campus"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.blood_relative?.campus}
                  error={errors.blood_relative?.campus}
                  label={"Campus"}
                  className="my-4"
                  style={{ "--color--": "#525252" }}
                />
              </div>

              <div className="md:col-span-6 col-span-12"></div>
            </>
          ) : (
            ""
          )}
        </div>
        <div className="font-bold text-[1rem] col-span-12">
          Declaration:<span>*</span>
          <div className="flex gap-2">
            <input
              type="checkbox"
              name="declaration"
              id="declaration"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.declaration}
              checked={values.declaration}
            />
            <label htmlFor="declaration">
              I declare that the entries in this application form are true to
              the best of my knowledge abd belief.
            </label>
          </div>
        </div>
        <div className="col-span-12 mb-2">
          <button
            type="submit"
            disabled={!values.declaration}
            className="bg-blue-500 disabled:bg-gray-500 hover:bg-blue-700 text-white font-bold py-2 px-4 border border-blue-700 rounded"
          >
            Save & Update
          </button>
        </div>
      </form>
    </div>
  );
};

export default React.memo(Vacancy);
