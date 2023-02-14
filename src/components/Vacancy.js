import React, { useEffect, useState } from "react";
import Input from "./Input";
import { staffTeachingSchema } from "../utils/yupSchema";

import { useFormik } from "formik";
import { formPost, formUpdate } from "../api/vacancyapply";
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

const subjects = ["Computer", "Maths", "English", "Hindi", "Physics", "French"];

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

const gradDegree = [
  "Army Education Corps (A.E.C)",
  "Army Graduation Certificate",
  "Bachelor In Performing Arts (B.P.A)",
  "Bachelor Of Arts - Legislative Law (B.A. L.l.b. Hons.)",
  "Bachelor Of Arts - Legislative Law (B.A. L.l.b.)",
  "Bachelor Of Arts (B.A. Hons.)",
  "Bachelor Of Arts (B.A.)",
  "Bachelor Of Business Administration (B.B.A)",
  "Bachelor Of Business Management (B.B.M.)",
  "Bachelor Of Commerce (B.Com. Hons.)",
  "Bachelor Of Commerce (B.Com.)",
  "Bachelor Of Computer Applications (B.C.A)",
  "Bachelor Of Dental Surgery (B.D.S)",
  "Bachelor Of Engineering (B.E.)",
  "Bachelors Of Elementary Education (B.El.Ed.)",
  "Bachelor Of Fine Arts (B.F.A)",
  "Bachelor Of Health Science (B.H.Sc)",
  "Bachelor Of Information Technology (B.IT)",
  "Bachelor Of Journalism And Mass Communication (B.J.M.C)",
  "Bachelor Of Law (L.L.B)",
  "Bachelor Of Library And Information Science (B.Lib.I.Sc.)",
  "Bachelor Of Library Science (B.Lib.Sc.)",
  "Bachelor Of Physical Education (B.P.Ed.)",
  "Bachelor Of Physical Education And Sports",
  "Bachelor Of Science (B.Sc. Computer Science)",
  "Bachelor Of Science (B.Sc. Home Science)",
  "Bachelor Of Science (B.Sc. Hons.)",
  "Bachelor Of Science (B.Sc. In Hospitality And Hotel Management)",
  "Bachelor Of Science (B.Sc.)",
  "Bachelor Of Science Economics",
  "Bachelor Of Science In Applied Information Technology (B.Sc. Ait)",
  "Bachelor Of Technology (B. Tech.)",
  "Bachelor Of Tourism Administration (B.T.A)",
  "Bachelor Of Visual Arts (B.V.A)",
  "Bachelor Of Vocational Studies (B. Voc)",
  "Bachelors In Infrastructure Management System (B.Sc IMS)",
  "Indian Navy Graduation Certificate",
  "Integrated BBA & MBA",
  "Prabhakar",
  "Visharad",
  "Bachelor Of Science (B.sc. In Hotel And Catering Management)",
  "Bachelor Of Music (B. Mus. Kathak)",
  "Bachelor Of Musical Arts (B.M.A.)",
  "Bachelor Of Design (B.Des. Textile Design)",
  "Bachelor Of Home Science (B.H.sc.)",
  "Bachelor Of Homoeopathic Medicine And Surgery (B.H.M.S)",
  "Bachelor Of Library Science (B.L.Sc.)",
  "Uttama (Sahitya)",
  "Bachelor Of Tourism Studies (B.T.S)",
  "Bachelor Of Hospitality Management (B.H.M.)",
  "Bachelor Of Pharmacy (B.Pharma)",
  "Bachelor Of Social, Legal Sciences (B.S.L)",
  "Bachelor Of Corporate Secretaryship (B.C.S.)",
  "Indian Navy Graduation Certificate",
  "Other",
];
const designation = [
  "Accountant",
  "Accounts Manager",
  "Admin Executive",
  "Admin/Jr.Bursar",
  "Admission Officer",
  "Android App Developer",
  "Automobile Maintenance Supervisor",
  "Bagpipe Band Master",
  "Biology Science Lab Assistant",
  "Biotechnology Science Lab Assistant",
  "Brass Band Master",
  "Career Counsellor",
  "Caretaker",
  "Chemistry Science Lab Assistant",
  "Chief Engineer - Construction",
  "Clerk",
  "Computer Lab Assistant",
  "Coordinator - Alumni Connect",
  "Counsellor",
  "Data Analyst",
  "Data Entry Operator",
  "Director – Alumni",
  "Editor",
  "Electrical Engineer",
  "Electrical Foreman",
  "Electrical Supervisor",
  "ERP Executive",
  "Fire Operator",
  "Head - Procurement",
  "Head- Career Counselling",
  "Interior Designer",
  "IT Assistant",
  "IT Engineer",
  "IT Trainer",
  "Junior Civil Engineer",
  "Junior Electrical Engineer",
  "Legal Counsel",
  "Librarian",
  "Life Guard",
  "Manager- Marketing &amp; Communications",
  "Manager SIMS",
  "Marketing Executive",
  "MIS Executive",
  "Nodal Officer",
  "Nurse",
  "Office Assistant",
  "PA to the Principal",
  "Payroll Incharge",
  "Physics Science Lab Assistant",
  "Product Manager",
  "Project Executor",
  "Project Manager – Construction",
  "Project Manager - Electrical",
  "QA Tester",
  "Receptionist",
  "Recruiter",
  "Robotics Science Lab Assistant",
  "Social Media &amp; Content Writer",
  "Social Media Executive",
  "Sound Operator",
  "Sound Recordist",
  "Still Photographer/ Cameraman",
  "Transport Incharge",
  "Transport Manager",
  "Video Editor",
  "Video Librarian",
  "Web Developer",
];

const university = [
  "Akhil Bhartiya Gandharva Mahavidyalaya Mandal (Deemed University)",
  "Alagappa University",
  "Aligarh Muslim University",
  "Amity University",
  "Annamalai University",
  "Army Center Of Education",
  "Army Education Corps (AEC)",
  "Atal Bihari Vajpayee Vishwavidyalaya",
  "Awadhesh Pratap Singh University, Rewa",
  "Babasaheb Bhimrao Ambedkar Bihar University",
  "Babasaheb Bhimrao Ambedkar University, Lucknow",
  "Babu Banarasi Das University",
  "Baha'i Institute For Higher Education (Open University)",
  "Balaji Institute Of Modern Management, Pune",
  "Banaras Hindu University",
  "Banasthali University",
  "Bangalore University",
  "Barkatullah University, Bhopal",
  "Berhampur University",
  "Bhagalpur University",
  "Bharath Institute Of Higher Education & Research Deemed University, Chennai",
  "Bharathiar University",
  "Bharati Vidyapeeth Deemed University",
  "Bhartiya Shiksha Parishad",
  "Bhatkhande Sangit Vidyapith, Lucknow",
  "Bhopal University",
  "Bilaspur University",
  "Board Of Technical Education",
  "Bundelkhand University",
  "Chaudhary Devi Lal University, Sirsa, Haryana",
  "Chhatrapati Shahu Ji Maharaj University, Kanpur",
  "Chhattisgarh Swami Vivekanand Technical University (Csvtu)",
  "Choudhary Charan Singh University, Meerut",
  "Cmj University",
  "Dakshina Bharat Hindi Prachar Sabha Deemed University",
  "Dayalbagh Educational Institute, Deemed University, Agra",
  "Deen Dayal Upadhyay University Gorakhpur",
  "Devi Ahilya University",
  "Dibrugarh University",
  "Dr Apj Abdul Kalam Technical University",
  "Dr Babasaheb Ambedkar Marathwada University",
  "Dr Ram Manohar Lohia Avadh University",
  "Dr Shakuntala Misra National Rehabilitation University",
  "Dr. Bhimrao Ambedkar University, Agra",
  "Dr. C.v. Raman University, Chhattisgarh",
  "Dr. Harisingh Gour University, Madhya Pradesh",
  "Eiilm University, Sikkim",
  "English And Foreign Languages University",
  "Galgotias University",
  "Gangadhar Meher University, Sambalpur, Odisha",
  "Gauhati University",
  "Gautam Buddh Technical University",
  "Gautam Buddh Vishwa Vidyapeeth, Shripalpur",
  "Gautam Buddha University",
  "Global Open University",
  "Glocal University",
  "Goa University",
  "Govind Ballabh Pant University Of Agriculture & Technology",
  "Gulbarga University",
  "Guru Ghasidas Vishwavidyalaya, Bilaspur",
  "Guru Govind Singh Indraprastha University",
  "Guru Jambheshwar University Of Science And Technology",
  "Guru Nanak Dev University, Amritsar",
  "Hemwati Nandan Bahuguna Garhwal University",
  "Himachal Pradesh University",
  "Himalayan University",
  "Himanchal Pradesh University",
  "Hindi Sahitya Sammelan, Prayag (Hindi University)",
  "I.K. Gujral Punjab Technical University",
  "Ibs, Hyderabad",
  "Icfai University, Dehradun",
  "IGNOU",
  "Iilm University",
  "Iis University, Jaipur",
  "Indian Navy Graduation Certificate",
  "Indira Kala Sangit Vishwavidyalaya, Khairagarh",
  "Institute Of Chartered Financial Analysts Of India",
  "Integral University",
  "J S University, Shikohabad",
  "Jadavpur University",
  "Jai Narain Vyas University, Jodhpur",
  "Jai Prakash University, Chapra",
  "Jaipur National University",
  "Jamia Hamdard (Deemed University)",
  "Jamia Millia Islamia University",
  "Jananayak Chandrshekhar University, Ballia",
  "Jawaharlal Nehru University",
  "Jiwaji University, Gwalior",
  "Jodhpur National University",
  "Jrn University",
  "Kalinga Institute Of Industrial Technology (Kiit), Bhubaneswar",
  "Karnataka State Open University",
  "Kavayitri Bahinabai Chaudhari North Maharashtra University Jalgaon",
  "Khwaja Moinuddin Chishti Language University",
  "Kolhan University",
  "Kumaun University",
  "Kurukshetra University",
  "Kuvempu University",
  "Lakshmibai National University Of Physical Education",
  "Lalit Narayan Mithila University, Darbhanga",
  "Other",
];

const subjectsGrad = [
  "Academic National Libraries",
  "Accomodation Operation",
  "Accounting And Finance",
  "Accounts",
  "Advanced Control System",
  "Advertising And Marketing Management",
  "Agri-business",
  "Agriculture",
  "Anthropology",
  "Applied Biology",
  "Applied Business Statistics",
  "Applied Economics",
  "Applied Psychology",
  "Arab Culture",
  "Archaeology",
  "Army Graduation Certificate",
  "Art",
  "Asian Culture",
  "Asynchronous Javascript And Xml (Ajax)",
  "Audit",
  "Aviation Tourism And Hospitality Management",
  "Banking And Finance",
  "Bharatnatyam",
  "Bio Chemistry",
  "Biotechnology",
  "Botany",
  "Branch Textile Technology",
  "Business",
  "Business Administration",
  "Business Management",
  "C++",
  "Ceramics",
  "Chemistry",
  "Classification And Cataloguing",
  "Clinical Nutrition And Dietetics",
  "Commerce",
  "Computer",
  "Computer Applications",
  "Computer Graphics",
  "Computer Programming",
  "Computer Science",
  "Computer Science & Engineering",
  "Corporate Legal Framework",
  "Corporate Tax Planning And Management",
  "Corporate Taxation",
  "Culture & Archaeology",
  "Cyber Law",
  "Dance",
  "Data Communication Network",
  "Database Management System",
  "Desktop Publishing",
  "Dot Net Framework",
  "Drawing",
  "Drawing And Painting",
  "E-governance",
  "Economics",
  "Education",
  "Electrical Engineering",
  "Electronics",
  "Electronics And Communication",
  "Electronics Engineering",
  "English",
  "English And Education",
  "English Honours",
  "English Language",
  "English Literature",
  "Environmental Science",
  "Environmental Engineering",
  "Environmental Studies",
  "Fashion Designing",
  "Finance",
  "Financial Management",
  "Fine Arts",
  "Food & Nutrition",
  "Food And Beverage Service",
  "Food Production",
  "Foundation Of Library & Information Science",
  "Genetics & Genomics",
  "Geography",
  "Geology",
  "Global Markets",
  "Hindi",
  "Hindi Language",
  "Hindi Literature",
  "History",
  "History Of World Art",
  "Home Science",
  "Human Anatomy",
  "Human Resource",
  "Human Rights",
  "Income Tax",
  "Income Tax Law & Accounts",
  "Income Tax Laws",
  "Indian Economic Structure",
  "Industrial Biology",
  "Industrial Training",
  "Information And Communication",
  "Information Processing And Retrieval",
  "Information Technology",
];

const pgDegree = [
  "Acharya",
  "Master Of Arts (M.A.)",
  "Master Of Arts (M.A. Hons.)",
  "Master Of Science (M.Sc.)",
  "Master Of Commerce (M.Com.)",
  "Master Of Commerce (Applied Economics)",
  "Master Of Business Administration (M.B.A.)",
  "Master Of Music (M.M.)",
  "Master's Degree In Library And Information Science (M.L.I.S.)",
  "Master Of Science In Library And Information Science (M.L.I.Sc)",
  "Masters In Marketing Economics And Management",
  "Master Of Fine Arts (MFAa)",
  "Master Of Visual Arts (M.V.A.)",
  "Masters Of Public Administration (M.P.A.)",
  "Master Of Performing Arts (M.P.A.)",
  "Master Of Business Engineering (M.B.E.)",
  "Master Of Technology (M.Tech)",
  "Master Of Computer Applications (M.C.A)",
  "Master Of Philosophy (M.Phil)",
  "Master Of Science (M.Sc. Home Science)",
  "Master Of Tourism Management (MTM)",
  "Masters Of Journalism And Mass Communication",
  "Master Of Business Laws",
  "Master Of Physical Education (M.P.Ed.)",
  "Master Of Social Work (M.S.W)",
  "Sangeet Nipun",
  "Master In Human Rights",
  "Master Of Personnel Management(M.P.M)",
  "Master Of Management Sciences (M.M.Sc)",
  "Master Of Management Studies (M.M.S.)",
  "Master Of Laws (Business And Corporate Law)",
  "Master Of Science In Information Technology (M.Sc. It)",
  "Sangeet Alankar",
  "Master Of Laws (LLM)",
  "Other",
];

const schoolBoards = [
  "Aligarh Muslim University",
  "Andhra University",
  "Bihar Intermediate Education Council, Patna",
  "Bihar School Examination Board",
  "Board Of Intermediate Education, Andhra Pradesh",
  "Board Of Secondary Education Andhra Pradesh (BSEAP)",
  "Board Of Intermediate Education, Hyderabad",
  "Board Of School Education Uttarakhand",
  "Board Of Secondary Education, Assam",
  "Board Of Secondary Education, Madhya Pradesh",
  "Board Of Secondary Education, Manipur",
  "Board Of Secondary Education, Orissa",
  "CBSE",
  "Central Board Of Higher Education",
  "Council Of Higher Secondary Education, Odisha",
  "Department Of Education Istanbul",
  "Department Of Examinations, Madras",
  "Dibrugarh University",
  "Guru Nanak Dev University, Amritsar",
  "Gujarat Secondary And Higher Secondary Education Board",
  "Haryana Board Of School Education",
  "Higher Secondary Education Board, Govt. Of Nepal",
  "Himachal Pradesh Board Of School Education",
  "Hindi Sahitya Sammelan, Prayag (Hindi University)",
  "ICSE/ISC",
  "Jammu And Kashmir Board Of School Education (JKBOSE)",
  "Karnatka Secondary Education Examination Board",
  "Kerala Board",
  "Kurukshetra University",
  "Maharashtra Board",
  "Mahatma Gandhi University",
  "Meghalaya Board Of School Education (Mbose)",
  "National Examination Board, Nepal",
  "National Institute Of Open Schooling, New Delhi",
  "Kasturba Mahila Intermediate College Vidyalaya",
  "Punjab School Education Board (PSEB)",
  "Panjab University",
  "Rajasthan Board",
  "Sambalpur University",
  "Sampurnanand Sanskrit Vishwavidyalaya",
  "Tamil Nadu Board",
  "Uttar Pradesh Board",
  "Uttranchal Shiksha Evam Pariksha Parishad",
  "West Bengal Board Of Secondary Education",
  "West Bengal Council Of Higher Secondary Education",
  "Other",
];

const Vacancy = ({ isShowTeachingForm }) => {
  const [year, setYear] = useState([]);
  const [isBloodRelative, setIsBloodRelative] = useState(false);
  const [isPayrollCms, setIsPayrollCms] = useState(false);
  const [isSameCurrentAddress, setIsSameCurrentAddress] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedCampus, setSelectedCampus] = useState([]);
  const token = useSelector((state) => state.auth.token);
  const form = useSelector((state) => state.form.form);
  const navigate = useNavigate();

  const handleVacancyTeaching = async (data, action) => {
    setIsLoading(true);
    const res = await formPost(data, token);
    if (res?.status === 201) {
      toast.success("Successfully submitted!");
      navigate(
        `/payment/CMS-${Math.floor(
          Math.random() * (10000000000 - 999999999 + 1) + 999999999
        )}/${data?.personal_details?.first_name}${
          data?.personal_details?.middle_name
        }${data?.personal_details?.last_name}`
      );
    }

    if (res?.response?.status === 400) {
      setIsLoading(false);
    }

    if (res.code === "ERR_NETWORK") {
      toast.error("Network Error!");
      setIsLoading(false);
    }

    if (res.code === "ERR_BAD_REQUEST" || res.code === "ERR_BAD_RESPONSE") {
      toast.error("Bad Request!");
      setIsLoading(false);
    }
  };

  const handleVacancyTeachingUpdate = async (data, action) => {
    setIsLoading(true);
    const res = await formUpdate(data, token);

    if (res?.status === 200) {
      toast.success("Successfully Updated!");
      navigate(
        `/payment/CMS-${Math.floor(
          Math.random() * (10000000000 - 999999999 + 1) + 999999999
        )}/${data?.personal_details?.first_name}${
          data?.personal_details?.middle_name
        }${data?.personal_details?.last_name}`
      );
    }

    if (res.code === "ERR_NETWORK") {
      toast.error("Network Error!");
      setIsLoading(false);
    }

    if (res.code === "ERR_BAD_REQUEST" || res.code === "ERR_BAD_RESPONSE") {
      toast.error("Bad Request!");
      setIsLoading(false);
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
      payrollCms: {},
      trainings: [
        { name: "B.ed", isDo: false },
        { name: "LT", isDo: false },
        { name: "NTT", isDo: false },
        { name: "M.ed", isDo: false },
        { name: "NIS", isDo: false },
      ],
      academic_details: {},
      work_experience: [],
      total_experience: 0,
      earliest_date_join: "",
      before_working_in_payroll: "no",
      blood_relative: {},
      referenceMobile1: "",
      referenceMobile2: "",
      referenceName1: "",
      referenceName2: "",
      payrollCms: "",
      payrollCmsCampus: "",  
      declaration: false,
      isShortlisted: false,
      paymentConfirmation: false,
    },
    validationSchema: staffTeachingSchema,
    onSubmit: (values, action) => {
      // console.log(values);
      if (values?.registrationNum) {
        handleVacancyTeachingUpdate(values, action);
      } else {
        handleVacancyTeaching(values, action);
      }
    },
  });

  useEffect(() => {
    const years = [];
    for (let i = 1972; i <= new Date().getFullYear(); i++) {
      years.push(i);
    }
    if (Object.keys(form).length > 0) {
      setValues(form);
    }
    setYear(years);
  }, [form]);

  useEffect(() => {
    setFieldValue("category", isShowTeachingForm ? "teaching" : "non-teaching");
  }, [isShowTeachingForm]);

  return (
    <div>
      <form onSubmit={handleSubmit} className="w-[90%] mx-auto">
        <h1 className="font-bold text-[22px] mt-4">Post Details</h1>

        {isShowTeachingForm ? (
          <>
            <div className="grid grid-cols-12 gap-4">
              <div className="md:col-span-4 col-span-12">
                <Input
                  type="select"
                  label={"Select Academic"}
                  className="my-2"
                  name="academic"
                  style={{ "--color--": "#525252" }}
                  onChange={handleChange}
                  value={values.academic}
                  // onBlur={handleBlur}
                  error={errors.academic}
                  id="academic"
                  selectoptions={academicSection}
                />
              </div>
              <div className="md:col-span-4 col-span-12">
                <Input
                  type="select"
                  label={"Select Subject"}
                  className="my-2"
                  name="subject"
                  style={{ "--color--": "#525252" }}
                  onChange={handleChange}
                  value={values.subject}
                  // onBlur={handleBlur}
                  id="subject"
                  error={errors.subject}
                  selectoptions={subjects}
                />
              </div>
            </div>
          </>
        ) : (
          <>
            <div className="grid grid-cols-12 gap-4">
              <div className="md:col-span-4 col-span-12">
                <Input
                  type="select"
                  label={"Select Designation"}
                  className="my-2"
                  name="designation"
                  style={{ "--color--": "#525252" }}
                  onChange={handleChange}
                  value={values.designation}
                  // onBlur={handleBlur}
                  error={errors.designation}
                  id="academic"
                  selectoptions={designation}
                />
              </div>
            </div>
          </>
        )}

        <h1 className="font-bold text-[22px] mt-4">Campus Preference</h1>
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
                className="my-2"
                name={`campus_prefrence[${0}].campus`}
                style={{ "--color--": "#525252" }}
                onChange={handleChange}
                // onBlur={handleBlur}
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
                className="my-2"
                name="campus_prefrence[1].campus"
                style={{ "--color--": "#525252" }}
                onChange={handleChange}
                // onBlur={handleBlur}
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
                className="my-2"
                name="campus_prefrence[2].campus"
                style={{ "--color--": "#525252" }}
                onChange={handleChange}
                // onBlur={handleBlur}
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
            <div className="text-red-600 text-sm col-span-12">
              {!Array.isArray(errors.campus_prefrence)
                ? errors.campus_prefrence
                : ""}
            </div>
          </div>
        ) : (
          <></>
        )}

        <h1 className="font-bold text-[22px] mt-4">Personal Details</h1>
        <div className="grid grid-cols-12 gap-4">
          <div className="md:col-span-4 col-span-12">
            <Input
              type="text"
              label={"First Name"}
              className="mt-2"
              name="personal_details.first_name"
              id="personal_details.first_name"
              style={{ "--color--": "#525252" }}
              onChange={handleChange}
              // onBlur={handleBlur}
              value={values.personal_details.first_name}
              error={errors.personal_details?.first_name}
            />
          </div>

          <div className="md:col-span-4 col-span-12">
            <Input
              type="text"
              label={"Middle Name"}
              className="mt-2"
              style={{ "--color--": "#525252" }}
              name="personal_details.middle_name"
              id="personal_details.middle_name"
              onChange={handleChange}
              // onBlur={handleBlur}
              value={values.personal_details?.middle_name}
              error={errors.personal_details?.middle_name}
            />
          </div>

          <div className="md:col-span-4 col-span-12">
            <Input
              type="text"
              label={"Last Name"}
              className="mt-2"
              name="personal_details.last_name"
              id="personal_details.last_name"
              style={{ "--color--": "#525252" }}
              onChange={handleChange}
              // onBlur={handleBlur}
              value={values.personal_details?.last_name}
              error={errors.personal_details?.last_name}
            />
          </div>

          <div className="md:col-span-6 col-span-12">
            <Input
              type="date"
              label="Date of Birth"
              required={true}
              className=""
              name="personal_details.dob"
              id="personal_details.dob"
              style={{ "--color--": "#525252" }}
              onChange={handleChange}
              // onBlur={handleBlur}
              value={values.personal_details?.dob.slice(0, 10)}
              error={errors.personal_details?.dob}
            />
          </div>

          <div className="md:col-span-6 col-span-12 flex gap-2">
            <Input
              type="select"
              selectoptions={["Married", "Unmarried"]}
              label={"Marital Status"}
              className=" flex-1"
              style={{ "--color--": "#525252" }}
              name="personal_details.marital_status"
              id="personal_details.marital_status"
              onChange={handleChange}
              // onBlur={handleBlur}
              value={values.personal_details?.marital_status}
              error={errors.personal_details?.marital_status}
            />

            {values.personal_details?.marital_status === "Married" ? (
              <Input
                type="text"
                label={"Spouse Name"}
                className=" flex-1"
                name="personal_details.spouse"
                id="personal_details.spouse"
                style={{ "--color--": "#525252" }}
                onChange={handleChange}
                // onBlur={handleBlur}
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
              className=""
              name="personal_details.aadhar_number"
              id="personal_details.aadhar_number"
              style={{ "--color--": "#525252" }}
              onChange={handleChange}
              // onBlur={handleBlur}
              value={values.personal_details?.aadhar_number}
              error={errors.personal_details?.aadhar_number}
            />
          </div>

          <div className="md:col-span-6 col-span-12">
            {values.personal_details?.image_url ? (
              <Input
                type="text"
                label={"Your Uploaded Image"}
                className="pointer-events-none"
                disabled
                style={{ "--color--": "#525252" }}
                // onBlur={handleBlur}
                value={values.personal_details?.image_url}
              />
            ) : (
              <Input
                type="file"
                label="Photo"
                accept=".png,.jpg,.jpeg"
                className=""
                name="personal_details.image"
                id="personal_details.image"
                style={{ "--color--": "#525252" }}
                onChange={(e) =>
                  setFieldValue("personal_details.image", e.target.files[0])
                }
                error={errors.personal_details?.image}
              />
            )}
          </div>

          <div className="md:col-span-6 col-span-12">
            <Input
              type="number"
              label={"Mobile"}
              className=""
              name="personal_details.mobile"
              id="personal_details.mobile"
              style={{ "--color--": "#525252" }}
              onChange={handleChange}
              // onBlur={handleBlur}
              value={values.personal_details?.mobile}
              error={errors.personal_details?.mobile}
            />
          </div>

          <div className="md:col-span-6 col-span-12">
            <Input
              type="text"
              label={"Email"}
              className=""
              name="personal_details.email"
              id="personal_details.email"
              style={{ "--color--": "#525252" }}
              onChange={handleChange}
              // onBlur={handleBlur}
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
                  // onBlur={handleBlur}
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
                  // onBlur={handleBlur}
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
                  // onBlur={handleBlur}
                  type="radio"
                />
              </div>
            </div>
          </div>
        </div>
        <h1 className="font-bold text-[22px] mt-4">Parent Details</h1>
        <div className="grid grid-cols-12 gap-4"></div>
        <div className="grid grid-cols-12 gap-4">
          <div className="md:col-span-4 col-span-12">
            <Input
              type="text"
              label={"Father's Name"}
              className="mt-2"
              name="personal_details.father.name"
              id="personal_details.father.name"
              style={{ "--color--": "#525252" }}
              onChange={handleChange}
              // onBlur={handleBlur}
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
              // onBlur={handleBlur}
              value={values.personal_details?.father?.mobile}
              error={errors.personal_details?.father?.mobile}
              className="mt-2"
            />
          </div>

          <div className="md:col-span-4 col-span-12">
            <Input
              type="text"
              label={"Occupation"}
              className="mt-2"
              style={{ "--color--": "#525252" }}
              name="personal_details.father.occupation"
              id="personal_details.father.occupation"
              onChange={handleChange}
              // onBlur={handleBlur}
              value={values.personal_details?.father?.occupation}
              error={errors.personal_details?.father?.occupation}
            />
          </div>

          <div className="md:col-span-4 col-span-12">
            <Input
              type="text"
              label={"Mother's Name"}
              className=""
              name="personal_details.mother.name"
              id="personal_details.mother.name"
              style={{ "--color--": "#525252" }}
              onChange={handleChange}
              // onBlur={handleBlur}
              value={values.personal_details?.mother?.name}
              error={errors.personal_details?.mother?.name}
            />
          </div>

          <div className="md:col-span-4 col-span-12">
            <Input
              type="number"
              label={"Mobile Number"}
              className=""
              name="personal_details.mother.mobile"
              id="personal_details.mother.mobile"
              style={{ "--color--": "#525252" }}
              onChange={handleChange}
              // onBlur={handleBlur}
              value={values.personal_details?.mother?.mobile}
              error={errors.personal_details?.mother?.mobile}
            />
          </div>
          <div className="md:col-span-4 col-span-12">
            <Input
              type="text"
              label={"Occupation"}
              className=""
              name="personal_details.mother.occupation"
              id="personal_details.mother.occupation"
              style={{ "--color--": "#525252" }}
              onChange={handleChange}
              // onBlur={handleBlur}
              value={values.personal_details?.mother?.occupation}
              error={errors.personal_details?.mother?.occupation}
            />
          </div>

          {Array.isArray(values.communication) ? (
            <div className="col-span-12">
              <h1 className="font-bold text-[22px] mt-4">
                Communication Skill:
              </h1>
              <div className="grid grid-cols-12">
                <div className="md:col-span-4 col-span-12">
                  <h2 className="font-bold text-[14px]">English</h2>

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
                        // onBlur={handleBlur}
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
                        // onBlur={handleBlur}
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
                        // onBlur={handleBlur}
                      />
                    </div>
                  </div>
                </div>

                <div className="md:col-span-4 col-span-12">
                  <h2 className="font-bold text-[14px]">Hindi</h2>

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
                        // onBlur={handleBlur}
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
                        // onBlur={handleBlur}
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
                        // onBlur={handleBlur}
                      />
                    </div>
                  </div>
                </div>

                <div className="md:col-span-4 col-span-12">
                  <h2 className="font-bold text-[14px]">Others</h2>

                  <input
                    type="text"
                    name={`communication[2].others.type`}
                    id={`communication[2].others.type`}
                    className="focus:outline-0 border"
                    value={values.communication[2]?.others?.type}
                    onChange={handleChange}
                    // onBlur={handleBlur}
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
                          // onBlur={handleBlur}
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
                          // onBlur={handleBlur}
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
                          // onBlur={handleBlur}
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
          <h1 className="font-bold text-[22px] mt-4">Address Details:</h1>
        </div>
        <div className="md:col-span-6 col-span-12">
          <h1 className="font-bold text-[1rem] mb-4">Present Address</h1>
        </div>
        <div className="grid grid-cols-12 gap-4">
          <div className="md:col-span-3 col-span-12">
            <Input
              type="text"
              label={"Flat/House No"}
              name="address.current.flat_house"
              id="address.current.flat_house"
              value={values.address?.current?.flat_house}
              error={errors.address?.current?.flat_house}
              onChange={handleChange}
              // onBlur={handleBlur}
              className="mt-2"
              style={{ "--color--": "#525252" }}
            />
          </div>
          <div className="md:col-span-3 col-span-12">
            <Input
              type="text"
              label={"Street/Lane"}
              name="address.current.street_lane"
              id="address.current.street_lane"
              value={values.address?.current?.street_lane}
              error={errors.address?.current?.street_lane}
              onChange={handleChange}
              // onBlur={handleBlur}
              className="mt-2"
              style={{ "--color--": "#525252" }}
            />
          </div>
          <div className="md:col-span-3 col-span-12">
            <Input
              type="text"
              label={"Area/Locality"}
              name="address.current.area_locality"
              id="address.current.area_locality"
              value={values.address?.current?.area_locality}
              error={errors.address?.current?.area_locality}
              onChange={handleChange}
              // onBlur={handleBlur}
              className="mt-2"
              style={{ "--color--": "#525252" }}
            />
          </div>
          <div className="md:col-span-3 col-span-12">
            <Input
              type="text"
              label={"Nearest Landmark"}
              name="address.current.landmark"
              id="address.current.landmark"
              value={values.address?.current?.landmark}
              error={errors.address?.current?.landmark}
              onChange={handleChange}
              // onBlur={handleBlur}
              className="mt-2"
              style={{ "--color--": "#525252" }}
            />
          </div>
          <div className="md:col-span-3 col-span-12 flex gap-2">
            <Input
              type="select"
              selectoptions={country}
              label={"Country"}
              name="address.current.country"
              id="address.current.country"
              value={values.address?.current?.country}
              error={errors.address?.current?.country}
              onChange={handleChange}
              // onBlur={handleBlur}
              className="flex-1"
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
                // onBlur={handleBlur}
                className="flex-1"
                style={{ "--color--": "#525252" }}
              />
            ) : (
              <></>
            )}
          </div>
          <div className="md:col-span-3 col-span-12">
            {values.address.current?.country === "Other" ? (
              <Input
                type="text"
                label={"State Name"}
                name="address.current.state"
                id="address.current.state"
                value={values.address?.current?.state}
                error={errors.address?.current?.state}
                onChange={handleChange}
                // onBlur={handleBlur}
                className="flex-1"
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
                // onBlur={handleBlur}
                className=""
                style={{ "--color--": "#525252" }}
              />
            )}
          </div>
          <div className="md:col-span-3 col-span-12">
            <Input
              type="text"
              label={"City"}
              className=""
              name="address.current.city"
              id="address.current.city"
              value={values.address?.current?.city}
              error={errors.address?.current?.city}
              onChange={handleChange}
              // onBlur={handleBlur}
              style={{ "--color--": "#525252" }}
            />
          </div>
          <div className="md:col-span-3 col-span-12">
            <Input
              type="number"
              label={"Pincode"}
              name="address.current.pincode"
              id="address.current.pincode"
              value={values.address?.current?.pincode}
              error={errors.address?.current?.pincode}
              onChange={handleChange}
              // onBlur={handleBlur}
              className=""
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
            <h1 className="font-bold text-[1rem] my-4">Permanent Address</h1>
            <div className="grid grid-cols-12 gap-4">
              <div className="md:col-span-3 col-span-12">
                <Input
                  type="text"
                  label={"Flat/House No"}
                  name="address.permanent.flat_house"
                  id="address.permanent.flat_house"
                  value={values.address.permanent?.flat_house}
                  error={errors.address?.permanent?.flat_house}
                  onChange={handleChange}
                  // onBlur={handleBlur}
                  className="mt-2"
                  style={{ "--color--": "#525252" }}
                />
              </div>
              <div className="md:col-span-3 col-span-12">
                <Input
                  type="text"
                  label={"Street/Lane"}
                  name="address.permanent.street_lane"
                  id="address.permanent.street_lane"
                  value={values.address.permanent?.street_lane}
                  error={errors.address?.permanent?.street_lane}
                  onChange={handleChange}
                  // onBlur={handleBlur}
                  className="mt-2"
                  style={{ "--color--": "#525252" }}
                />
              </div>
              <div className="md:col-span-3 col-span-12">
                <Input
                  type="text"
                  label={"Area/Locality"}
                  name="address.permanent.area_locality"
                  id="address.permanent.area_locality"
                  value={values.address.permanent?.area_locality}
                  error={errors.address?.permanent?.area_locality}
                  onChange={handleChange}
                  // onBlur={handleBlur}
                  className="mt-2"
                  style={{ "--color--": "#525252" }}
                />
              </div>
              <div className="md:col-span-3 col-span-12">
                <Input
                  type="text"
                  label={"Nearest Landmark"}
                  name="address.permanent.landmark"
                  id="address.permanent.landmark"
                  value={values.address.permanent?.landmark}
                  error={errors.address?.permanent?.landmark}
                  onChange={handleChange}
                  // onBlur={handleBlur}
                  className="mt-2"
                  style={{ "--color--": "#525252" }}
                />
              </div>
              <div className="md:col-span-3 col-span-12 flex gap-2">
                <Input
                  type="select"
                  selectoptions={country}
                  label={"Country"}
                  name="address.permanent.country"
                  id="address.permanent.country"
                  value={values.address.permanent?.country}
                  error={errors.address?.permanent?.country}
                  onChange={handleChange}
                  // onBlur={handleBlur}
                  className="flex-1"
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
                    // onBlur={handleBlur}
                    className="flex-1"
                    style={{ "--color--": "#525252" }}
                  />
                ) : (
                  <></>
                )}
              </div>
              <div className="md:col-span-3 col-span-12">
                {values.address.permanent?.country === "Other" ? (
                  <Input
                    type="text"
                    label={"State Name"}
                    name="address.permanent.state"
                    id="address.permanent.state"
                    value={values.address.permanent?.state}
                    error={errors.address?.permanent?.state}
                    onChange={handleChange}
                    // onBlur={handleBlur}
                    className="flex-1"
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
                    // onBlur={handleBlur}
                    className=""
                    style={{ "--color--": "#525252" }}
                  />
                )}
              </div>
              <div className="md:col-span-3 col-span-12">
                <Input
                  type="text"
                  label={"City"}
                  className=""
                  name="address.permanent.city"
                  id="address.permanent.city"
                  value={values.address.permanent?.city}
                  error={errors.address?.permanent?.city}
                  onChange={handleChange}
                  // onBlur={handleBlur}
                  style={{ "--color--": "#525252" }}
                />
              </div>
              <div className="md:col-span-3 col-span-12">
                <Input
                  type="number"
                  label={"Pincode"}
                  name="address.permanent.pincode"
                  id="address.permanent.pincode"
                  value={values.address.permanent?.pincode}
                  error={errors.address?.permanent?.pincode}
                  onChange={handleChange}
                  // onBlur={handleBlur}
                  className=""
                  style={{ "--color--": "#525252" }}
                />
              </div>
            </div>
          </>
        ) : (
          <></>
        )}
        <div className="md:col-span-12">
          <h1 className="font-bold text-[22px] mt-4">Academic Details:</h1>
          <h1 className="font-bold text-[14px]">Note:</h1>
          <ul className="list-[square] mx-3 px-3">
            <li>Exam</li>
            <li>Year of Passing</li>
            <li>
              Board or University & Subject(in case of Graduation &
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
          <p className="col-span-12 my-2 text-2xl font-bold mt-4">
            High School
          </p>

          <div className="md:col-span-2 col-span-12">
            <Input
              type="select"
              selectoptions={year}
              label={"Year"}
              className="mt-2"
              id={`academic_details.high_school.year`}
              name={`academic_details.high_school.year`}
              value={values?.academic_details?.high_school?.year}
              error={errors?.academic_details?.high_school?.year}
              // onBlur={handleBlur}
              onChange={handleChange}
              style={{ "--color--": "#525252" }}
            />
          </div>
          <div className="md:col-span-3 col-span-12">
            <Input
              type="select"
              selectoptions={schoolBoards}
              label={"Board"}
              className="mt-2"
              id={`academic_details.high_school.board`}
              name={`academic_details.high_school.board`}
              value={values?.academic_details?.high_school?.board}
              error={errors?.academic_details?.high_school?.board}
              // onBlur={handleBlur}
              onChange={handleChange}
              style={{ "--color--": "#525252" }}
            />
          </div>
          <div className="md:col-span-4 col-span-12">
            <Input
              type="text"
              label={"School Name"}
              className="mt-2"
              id={`academic_details.high_school.school`}
              name={`academic_details.high_school.school`}
              value={values?.academic_details?.high_school?.school}
              error={errors?.academic_details?.high_school?.school}
              // onBlur={handleBlur}
              onChange={handleChange}
              style={{ "--color--": "#525252" }}
            />
          </div>
          <div className="md:col-span-1 col-span-6">
            <Input
              type="number"
              label={"%"}
              className="mt-2"
              id={`academic_details.high_school.percentage`}
              name={`academic_details.high_school.percentage`}
              value={values?.academic_details?.high_school?.percentage}
              error={errors?.academic_details?.high_school?.percentage}
              // onBlur={handleBlur}
              onChange={handleChange}
              style={{ "--color--": "#525252" }}
            />
          </div>
          <div className="md:col-span-2 col-span-12">
            <Input
              type="select"
              selectoptions={[
                "English",
                "Hindi",
                "English/Hindi",
                "Bengali",
                "Manipuri",
                "Malayalam",
                "Assamese",
                "Persian",
                "Other",
              ]}
              label={"Medium of Education"}
              className="mt-2"
              id={`academic_details.high_school.medium`}
              name={`academic_details.high_school.medium`}
              value={values?.academic_details?.high_school?.medium}
              error={errors?.academic_details?.high_school?.medium}
              // onBlur={handleBlur}
              onChange={handleChange}
              style={{ "--color--": "#525252" }}
            />
          </div>
        </div>
        <div className="grid grid-cols-12 gap-4">
          <p className="col-span-12 text-2xl font-bold mt-4">
            Senior Secondary
          </p>
          <div className="md:col-span-2 col-span-12">
            <Input
              type="select"
              selectoptions={year}
              label={"Year"}
              className="mt-2"
              id={`academic_details.senior_secondary.year`}
              name={`academic_details.senior_secondary.year`}
              value={values?.academic_details?.senior_secondary?.year}
              error={errors?.academic_details?.senior_secondary?.year}
              // onBlur={handleBlur}
              onChange={handleChange}
              style={{ "--color--": "#525252" }}
            />
          </div>
          <div className="md:col-span-3 col-span-12">
            <Input
              type="select"
              selectoptions={schoolBoards}
              label={"Board"}
              className="mt-2"
              id={`academic_details.senior_secondary.board`}
              name={`academic_details.senior_secondary.board`}
              value={values?.academic_details?.senior_secondary?.board}
              error={errors?.academic_details?.senior_secondary?.board}
              // onBlur={handleBlur}
              onChange={handleChange}
              style={{ "--color--": "#525252" }}
            />
          </div>
          <div className="md:col-span-4 col-span-12">
            <Input
              type="text"
              label={"School Name"}
              className="mt-2"
              id={`academic_details.senior_secondary.school`}
              name={`academic_details.senior_secondary.school`}
              value={values?.academic_details?.senior_secondary?.school}
              error={errors?.academic_details?.senior_secondary?.school}
              // onBlur={handleBlur}
              onChange={handleChange}
              style={{ "--color--": "#525252" }}
            />
          </div>
          <div className="md:col-span-1 col-span-6">
            <Input
              type="number"
              label={"%"}
              className="mt-2"
              id={`academic_details.senior_secondary.percentage`}
              name={`academic_details.senior_secondary.percentage`}
              value={values?.academic_details?.senior_secondary?.percentage}
              error={errors?.academic_details?.senior_secondary?.percentage}
              // onBlur={handleBlur}
              onChange={handleChange}
              style={{ "--color--": "#525252" }}
            />
          </div>
          <div className="md:col-span-2 col-span-12">
            <Input
              type="select"
              selectoptions={[
                "English",
                "Hindi",
                "English/Hindi",
                "Bengali",
                "Manipuri",
                "Malayalam",
                "Assamese",
                "Persian",
                "Other",
              ]}
              label={"Medium of Education"}
              className="mt-2"
              id={`academic_details.senior_secondary.medium`}
              name={`academic_details.senior_secondary.medium`}
              value={values?.academic_details?.senior_secondary?.medium}
              error={errors?.academic_details?.senior_secondary?.medium}
              // onBlur={handleBlur}
              onChange={handleChange}
              style={{ "--color--": "#525252" }}
            />
          </div>
        </div>
        <div className="grid grid-cols-12 gap-4">
          <p className="col-span-12 my-2 text-2xl font-bold mt-4">Graduation</p>
          <div className="md:col-span-6 col-span-12">
            <Input
              type="select"
              selectoptions={year}
              label={"Year"}
              className="my-2"
              id={`academic_details.graduation.year`}
              name={`academic_details.graduation.year`}
              value={values?.academic_details?.graduation?.year}
              error={errors?.academic_details?.graduation?.year}
              // onBlur={handleBlur}
              onChange={handleChange}
              style={{ "--color--": "#525252" }}
            />
          </div>
          <div className="md:col-span-6 col-span-12">
            <Input
              type="select"
              selectoptions={university}
              label={"University"}
              className="my-2"
              id={`academic_details.graduation.board`}
              name={`academic_details.graduation.board`}
              value={values?.academic_details?.graduation?.board}
              error={errors?.academic_details?.graduation?.board}
              // onBlur={handleBlur}
              onChange={handleChange}
              style={{ "--color--": "#525252" }}
            />
          </div>
          <div className="md:col-span-6 col-span-12">
            <Input
              type="select"
              selectoptions={gradDegree}
              label={"Degree"}
              className="my-2"
              id={`academic_details.graduation.school`}
              name={`academic_details.graduation.school`}
              value={values?.academic_details?.graduation?.school}
              error={errors?.academic_details?.graduation?.school}
              // onBlur={handleBlur}
              onChange={handleChange}
              style={{ "--color--": "#525252" }}
            />
          </div>
          <div className="col-span-6">
            <Input
              type="number"
              label={"Percentage"}
              className="my-2"
              id={`academic_details.graduation.percentage`}
              name={`academic_details.graduation.percentage`}
              value={values?.academic_details?.graduation?.percentage}
              error={errors?.academic_details?.graduation?.percentage}
              // onBlur={handleBlur}
              onChange={handleChange}
              style={{ "--color--": "#525252" }}
            />
          </div>
          <div className="md:col-span-6 col-span-12">
            <Input
              type="select"
              selectoptions={[
                "English",
                "Hindi",
                "English/Hindi",
                "Bengali",
                "Manipuri",
                "Malayalam",
                "Assamese",
                "Persian",
                "Other",
              ]}
              label={"Medium of Education"}
              className="my-2"
              id={`academic_details.graduation.medium`}
              name={`academic_details.graduation.medium`}
              value={values?.academic_details?.graduation?.medium}
              error={errors?.academic_details?.graduation?.medium}
              // onBlur={handleBlur}
              onChange={handleChange}
              style={{ "--color--": "#525252" }}
            />
          </div>
          <div className="md:col-span-6 col-span-12">
            <Input
              type="select"
              selectoptions={subjectsGrad}
              label={"Subject1"}
              className="my-2"
              id={`academic_details.graduation.subject1`}
              name={`academic_details.graduation.subject1`}
              value={values?.academic_details?.graduation?.subject1}
              error={errors?.academic_details?.graduation?.subject1}
              // onBlur={handleBlur}
              onChange={handleChange}
              style={{ "--color--": "#525252" }}
            />
          </div>
          <div className="md:col-span-6 col-span-12">
            <Input
              type="select"
              selectoptions={subjectsGrad}
              label={"Subject2"}
              className="my-2"
              id={`academic_details.graduation.subject2`}
              name={`academic_details.graduation.subject2`}
              value={values?.academic_details?.graduation?.subject2}
              error={errors?.academic_details?.graduation?.subject2}
              // onBlur={handleBlur}
              onChange={handleChange}
              style={{ "--color--": "#525252" }}
            />
          </div>
          <div className="md:col-span-6 col-span-12">
            <Input
              type="select"
              selectoptions={subjectsGrad}
              label={"Subject3"}
              className="my-2"
              id={`academic_details.graduation.subject3`}
              name={`academic_details.graduation.subject3`}
              value={values?.academic_details?.graduation?.subject3}
              error={errors?.academic_details?.graduation?.subject3}
              // onBlur={handleBlur}
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
              // onBlur={handleBlur}
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
                className="my-2"
                id={`academic_details.post_graduation.year`}
                name={`academic_details.post_graduation.year`}
                value={values?.academic_details?.post_graduation?.year}
                error={errors?.academic_details?.post_graduation?.year}
                // onBlur={handleBlur}
                onChange={handleChange}
                style={{ "--color--": "#525252" }}
              />
            </div>
            <div className="md:col-span-6 col-span-12">
              <Input
                type="select"
                selectoptions={university}
                label={"University"}
                className="my-2"
                id={`academic_details.post_graduation.board`}
                name={`academic_details.post_graduation.board`}
                value={values?.academic_details?.post_graduation?.board}
                error={errors?.academic_details?.post_graduation?.board}
                // onBlur={handleBlur}
                onChange={handleChange}
                style={{ "--color--": "#525252" }}
              />
            </div>
            <div className="md:col-span-6 col-span-12">
              <Input
                type="select"
                selectoptions={pgDegree}
                label={"Degree"}
                className="my-2"
                id={`academic_details.post_graduation.school`}
                name={`academic_details.post_graduation.school`}
                value={values?.academic_details?.post_graduation?.school}
                error={errors?.academic_details?.post_graduation?.school}
                // onBlur={handleBlur}
                onChange={handleChange}
                style={{ "--color--": "#525252" }}
              />
            </div>
            <div className="col-span-6">
              <Input
                type="number"
                label={"Percentage"}
                className="my-2"
                id={`academic_details.post_graduation.percentage`}
                name={`academic_details.post_graduation.percentage`}
                value={values?.academic_details?.post_graduation?.percentage}
                error={errors?.academic_details?.post_graduation?.percentage}
                // onBlur={handleBlur}
                onChange={handleChange}
                style={{ "--color--": "#525252" }}
              />
            </div>
            <div className="md:col-span-6 col-span-12">
              <Input
                type="select"
                selectoptions={[
                  "English",
                  "Hindi",
                  "English/Hindi",
                  "Bengali",
                  "Manipuri",
                  "Malayalam",
                  "Assamese",
                  "Persian",
                  "Other",
                ]}
                label={"Medium of Education"}
                className="my-2"
                id={`academic_details.post_graduation.medium`}
                name={`academic_details.post_graduation.medium`}
                value={values?.academic_details?.post_graduation?.medium}
                error={errors?.academic_details?.post_graduation?.medium}
                // onBlur={handleBlur}
                onChange={handleChange}
                style={{ "--color--": "#525252" }}
              />
            </div>
            <div className="md:col-span-6 col-span-12">
              <Input
                type="select"
                selectoptions={subjectsGrad}
                label={"Subject1"}
                className="my-2"
                id={`academic_details.post_graduation.subject1`}
                name={`academic_details.post_graduation.subject1`}
                value={values?.academic_details?.post_graduation?.subject1}
                error={errors?.academic_details?.post_graduation?.subject1}
                // onBlur={handleBlur}
                onChange={handleChange}
                style={{ "--color--": "#525252" }}
              />
            </div>
            <div className="md:col-span-6 col-span-12">
              <Input
                type="select"
                selectoptions={subjectsGrad}
                label={"Subject2"}
                className="my-2"
                id={`academic_details.post_graduation.subject2`}
                name={`academic_details.post_graduation.subject2`}
                value={values?.academic_details?.post_graduation?.subject2}
                error={errors?.academic_details?.post_graduation?.subject2}
                // onBlur={handleBlur}
                onChange={handleChange}
                style={{ "--color--": "#525252" }}
              />
            </div>
            <div className="md:col-span-6 col-span-12">
              <Input
                type="select"
                selectoptions={subjectsGrad}
                label={"Subject3"}
                className="my-2"
                id={`academic_details.post_graduation.subject3`}
                name={`academic_details.post_graduation.subject3`}
                value={values?.academic_details?.post_graduation?.subject3}
                error={errors?.academic_details?.post_graduation?.subject3}
                // onBlur={handleBlur}
                onChange={handleChange}
                style={{ "--color--": "#525252" }}
              />
            </div>
          </div>
        ) : (
          <></>
        )}

        <div className="Training">
          <h1 className="font-bold text-[22px] mt-4">
            Select Training if any:
          </h1>
          {Array.isArray(values.trainings) ? (
            <div className="col-span-12">
              <div className="grid grid-cols-12">
                <div className="md:col-span-4 col-span-12">
                  <div className="flex gap-4">
                    <div className="input_group flex gap-2">
                      <label htmlFor="trainings[0].isDo">B.ed</label>
                      <input
                        id="trainings[0].isDo"
                        value={values.trainings[0]?.isDo}
                        checked={values.trainings[0]?.isDo}
                        name="trainings[0].isDo"
                        type="checkbox"
                        onChange={handleChange}
                      />
                    </div>
                    <div className="input_group flex gap-2">
                      <label htmlFor="trainings[1].isDo">LT</label>
                      <input
                        id="trainings[1].isDo"
                        checked={values.trainings[1]?.isDo}
                        type="checkbox"
                        onChange={() =>
                          setFieldValue("trainings[1]", {
                            name: "B.ed",
                            isDo: !values.trainings[1]?.isDo,
                          })
                        }
                      />
                    </div>
                    <div className="input_group flex gap-2">
                      <label htmlFor="trainings[2].isDo">NTT</label>
                      <input
                        id="trainings[2].isDo"
                        checked={values.trainings[2]?.isDo}
                        type="checkbox"
                        onChange={() =>
                          setFieldValue("trainings[2]", {
                            name: "B.ed",
                            isDo: !values.trainings[2]?.isDo,
                          })
                        }
                      />
                    </div>
                    <div className="input_group flex gap-2">
                      <label htmlFor="trainings[3].isDo">M.ed</label>
                      <input
                        id="trainings[3].isDo"
                        checked={values.trainings[3]?.isDo}
                        type="checkbox"
                        onChange={() =>
                          setFieldValue("trainings[3]", {
                            name: "B.ed",
                            isDo: !values.trainings[3]?.isDo,
                          })
                        }
                      />
                    </div>
                    <div className="input_group flex gap-2">
                      <label htmlFor="trainings[4].isDo">NIS</label>
                      <input
                        id="trainings[4].isDo"
                        checked={values.trainings[4]?.isDo}
                        type="checkbox"
                        onChange={() =>
                          setFieldValue("trainings[4]", {
                            name: "B.ed",
                            isDo: !values.trainings[4]?.isDo,
                          })
                        }
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <></>
          )}
        </div>
        {/* <div onClick={handleAddfield} className="mb-4">
          <IoIosAddCircleOutline className="text-4xl cursor-pointer text-white rounded-full bg-blue-600" />
        </div> */}
        <div className="md:col-span-12">
          <h1 className="font-bold text-[22px] mt-4">Work Experience:</h1>
        </div>
        <div className="col-span-12 mb-4">
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
              className="my-2"
              name="total_experience"
              id="total_experience"
              onChange={handleChange}
              // onBlur={handleBlur}
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
              className="my-2"
              disabled
              value={`${parseInt(values.total_experience / 12)} year and ${
                values.total_experience % 12
              } months`}
              style={{ "--color--": "#525252" }}
            />
          </div>
        </div>
        <div className="">
          <div className="col-span-12 font-bold text-[1rem] mt-4">
            Provide your last three work experiences:
            <span className="text-color:red">*</span>
          </div>

          <div className="wrp">
            <h2 className="font-bold text-lg">Latest Job</h2>
            <div className="grid grid-cols-12 gap-4">
              <div className="md:col-span-4 col-span-12">
                <Input
                  type="text"
                  label={"Experience in Months"}
                  className="mt-2"
                  id={`work_experience[${0}].work`}
                  name={`work_experience[${0}].work`}
                  value={values.work_experience[0]?.work}
                  error={
                    Array.isArray(errors?.work_experience)
                      ? errors?.work_experience[0]?.work
                      : ""
                  }
                  // onBlur={handleBlur}
                  onChange={handleChange}
                  style={{ "--color--": "#525252" }}
                />
              </div>
              <div className="md:col-span-4 col-span-12">
                <Input
                  type="text"
                  label={"Designation"}
                  className="mt-2"
                  id={`work_experience[${0}].designation`}
                  name={`work_experience[${0}].designation`}
                  value={values.work_experience[0]?.designation}
                  error={
                    Array.isArray(errors?.work_experience)
                      ? errors?.work_experience[0]?.designation
                      : ""
                  }
                  // onBlur={handleBlur}
                  onChange={handleChange}
                  style={{ "--color--": "#525252" }}
                />
              </div>
              <div className="md:col-span-4 col-span-12">
                <Input
                  type="text"
                  label={"Organisation"}
                  className="mt-2"
                  id={`work_experience[${0}].organisation`}
                  name={`work_experience[${0}].organisation`}
                  value={values.work_experience[0]?.organisation}
                  error={
                    Array.isArray(errors?.work_experience)
                      ? errors?.work_experience[0]?.organisation
                      : ""
                  }
                  // onBlur={handleBlur}
                  onChange={handleChange}
                  style={{ "--color--": "#525252" }}
                />
              </div>
              <div className="md:col-span-3 col-span-12">
                <Input
                  type="date"
                  // required={true}
                  label={"Date of Joining"}
                  className="mt-2"
                  id={`work_experience[${0}].joining_date`}
                  name={`work_experience[${0}].joining_date`}
                  value={values.work_experience[0]?.joining_date}
                  error={
                    Array.isArray(errors?.work_experience)
                      ? errors?.work_experience[0]?.joining_date
                      : ""
                  }
                  // onBlur={handleBlur}
                  onChange={handleChange}
                  style={{ "--color--": "#525252" }}
                />
              </div>
              <div className="md:col-span-3 col-span-12">
                <Input
                  type="date"
                  label={"Date of Leaving"}
                  // required
                  className="mt-2"
                  id={`work_experience[${0}].leaving_date`}
                  name={`work_experience[${0}].leaving_date`}
                  value={values.work_experience[0]?.leaving_date}
                  error={
                    Array.isArray(errors?.work_experience)
                      ? errors?.work_experience[0]?.leaving_date
                      : ""
                  }
                  // onBlur={handleBlur}
                  onChange={handleChange}
                  style={{ "--color--": "#525252" }}
                />
              </div>
              <div className="md:col-span-3 col-span-12">
                <Input
                  type="text"
                  label={"Salary drawn in Rs/Month 1:"}
                  className="mt-2"
                  id={`work_experience[${0}].salary`}
                  name={`work_experience[${0}].salary`}
                  value={values.work_experience[0]?.salary}
                  error={
                    Array.isArray(errors?.work_experience)
                      ? errors?.work_experience[0]?.salary
                      : ""
                  }
                  // onBlur={handleBlur}
                  onChange={handleChange}
                  style={{ "--color--": "#525252" }}
                />
              </div>
              <div className="md:col-span-3 col-span-12">
                {/* <h1 className="font-bold text-[1rem] mb-4"></h1> */}
                <Input
                  type="text"
                  label={"Reason for Leaving"}
                  className="mt-2"
                  id={`work_experience[${0}].reason`}
                  name={`work_experience[${0}].reason`}
                  value={values.work_experience[0]?.reason}
                  error={
                    Array.isArray(errors?.work_experience)
                      ? errors?.work_experience[0]?.reason
                      : ""
                  }
                  // onBlur={handleBlur}
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
                  // onBlur={handleBlur}
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
            <h2 className="font-bold text-lg mt-2">Previous Job 1</h2>
            <div className="grid grid-cols-12 gap-4">
              <div className="md:col-span-4 col-span-12">
                <Input
                  type="text"
                  label={"Experience in Months"}
                  className="mt-2"
                  id={`work_experience[${1}].work`}
                  name={`work_experience[${1}].work`}
                  value={values.work_experience[1]?.work}
                  error={
                    Array.isArray(errors?.work_experience)
                      ? errors?.work_experience[1]?.work
                      : ""
                  }
                  // onBlur={handleBlur}
                  onChange={handleChange}
                  style={{ "--color--": "#525252" }}
                />
              </div>
              <div className="md:col-span-4 col-span-12">
                <Input
                  type="text"
                  label={"Designation"}
                  className="mt-2"
                  id={`work_experience[${1}].designation`}
                  name={`work_experience[${1}].designation`}
                  value={values.work_experience[1]?.designation}
                  error={
                    Array.isArray(errors?.work_experience)
                      ? errors?.work_experience[1]?.designation
                      : ""
                  }
                  // onBlur={handleBlur}
                  onChange={handleChange}
                  style={{ "--color--": "#525252" }}
                />
              </div>
              <div className="md:col-span-4 col-span-12">
                <Input
                  type="text"
                  label={"Organisation"}
                  className="mt-2"
                  id={`work_experience[${1}].organisation`}
                  name={`work_experience[${1}].organisation`}
                  value={values.work_experience[1]?.organisation}
                  error={
                    Array.isArray(errors?.work_experience)
                      ? errors?.work_experience[1]?.organisation
                      : ""
                  }
                  // onBlur={handleBlur}
                  onChange={handleChange}
                  style={{ "--color--": "#525252" }}
                />
              </div>
              <div className="md:col-span-3 col-span-12">
                <Input
                  type="date"
                  label={"Date of Joining"}
                  className="mt-2"
                  // required={true}
                  id={`work_experience[${1}].joining_date`}
                  name={`work_experience[${1}].joining_date`}
                  value={values.work_experience[1]?.joining_date}
                  error={
                    Array.isArray(errors?.work_experience)
                      ? errors?.work_experience[1]?.joining_date
                      : ""
                  }
                  // onBlur={handleBlur}
                  onChange={handleChange}
                  style={{ "--color--": "#525252" }}
                />
              </div>
              <div className="md:col-span-3 col-span-12">
                <Input
                  type="date"
                  label={"Date of Leaving"}
                  // required={true}
                  className="mt-2"
                  id={`work_experience[${1}].leaving_date`}
                  name={`work_experience[${1}].leaving_date`}
                  value={values.work_experience[1]?.leaving_date}
                  error={
                    Array.isArray(errors?.work_experience)
                      ? errors?.work_experience[1]?.leaving_date
                      : ""
                  }
                  // onBlur={handleBlur}
                  onChange={handleChange}
                  style={{ "--color--": "#525252" }}
                />
              </div>
              <div className="md:col-span-3 col-span-12">
                <Input
                  type="text"
                  label={"Salary drawn in Rs/Month 1:"}
                  className="mt-2"
                  id={`work_experience[${1}].salary`}
                  name={`work_experience[${1}].salary`}
                  value={values.work_experience[1]?.salary}
                  error={
                    Array.isArray(errors?.work_experience)
                      ? errors?.work_experience[1]?.salary
                      : ""
                  }
                  // onBlur={handleBlur}
                  onChange={handleChange}
                  style={{ "--color--": "#525252" }}
                />
              </div>
              <div className="md:col-span-3 col-span-12">
                <Input
                  type="text"
                  label={"Reason for Leaving"}
                  className="mt-2"
                  id={`work_experience[${1}].reason`}
                  name={`work_experience[${1}].reason`}
                  value={values.work_experience[1]?.reason}
                  error={
                    Array.isArray(errors?.work_experience)
                      ? errors?.work_experience[1]?.reason
                      : ""
                  }
                  // onBlur={handleBlur}
                  onChange={handleChange}
                  style={{ "--color--": "#525252" }}
                />
              </div>
            </div>
          </div>

          <div className="wrp">
            <h2 className="font-bold text-lg mt-6">Previous Job 2</h2>
            <div className="grid grid-cols-12 gap-4">
              <div className="md:col-span-4 col-span-12">
                <Input
                  type="text"
                  label={"Experience in Months"}
                  className="mt-2"
                  id={`work_experience[${2}].work`}
                  name={`work_experience[${2}].work`}
                  value={values.work_experience[2]?.work}
                  error={
                    Array.isArray(errors?.work_experience)
                      ? errors?.work_experience[2]?.work
                      : ""
                  }
                  // onBlur={handleBlur}
                  onChange={handleChange}
                  style={{ "--color--": "#525252" }}
                />
              </div>
              <div className="md:col-span-4 col-span-12">
                <Input
                  type="text"
                  label={"Designation"}
                  className="mt-2"
                  id={`work_experience[${2}].designation`}
                  name={`work_experience[${2}].designation`}
                  value={values.work_experience[2]?.designation}
                  error={
                    Array.isArray(errors?.work_experience)
                      ? errors?.work_experience[2]?.designation
                      : ""
                  }
                  // onBlur={handleBlur}
                  onChange={handleChange}
                  style={{ "--color--": "#525252" }}
                />
              </div>
              <div className="md:col-span-4 col-span-12">
                <Input
                  type="text"
                  label={"Organisation"}
                  className="mt-2"
                  id={`work_experience[${2}].organisation`}
                  name={`work_experience[${2}].organisation`}
                  value={values.work_experience[2]?.organisation}
                  error={
                    Array.isArray(errors?.work_experience)
                      ? errors?.work_experience[2]?.organisation
                      : ""
                  }
                  // onBlur={handleBlur}
                  onChange={handleChange}
                  style={{ "--color--": "#525252" }}
                />
              </div>
              <div className="md:col-span-3 col-span-12">
                <Input
                  type="date"
                  label={"Date of Joining"}
                  className="mt-2"
                  // required={true}
                  id={`work_experience[${2}].joining_date`}
                  name={`work_experience[${2}].joining_date`}
                  value={values.work_experience[2]?.joining_date}
                  error={
                    Array.isArray(errors?.work_experience)
                      ? errors?.work_experience[2]?.joining_date
                      : ""
                  }
                  // onBlur={handleBlur}
                  onChange={handleChange}
                  style={{ "--color--": "#525252" }}
                />
              </div>
              <div className="md:col-span-3 col-span-12">
                <Input
                  type="date"
                  label={"Date of Leaving"}
                  className="mt-2"
                  // required={true}
                  id={`work_experience[${2}].leaving_date`}
                  name={`work_experience[${2}].leaving_date`}
                  value={values.work_experience[2]?.leaving_date}
                  error={
                    Array.isArray(errors?.work_experience)
                      ? errors?.work_experience[2]?.leaving_date
                      : ""
                  }
                  // onBlur={handleBlur}
                  onChange={handleChange}
                  style={{ "--color--": "#525252" }}
                />
              </div>
              <div className="md:col-span-3 col-span-12">
                <Input
                  type="text"
                  label={"Salary drawn in Rs/Month 1:"}
                  className="mt-2"
                  id={`work_experience[${2}].salary`}
                  name={`work_experience[${2}].salary`}
                  value={values.work_experience[2]?.salary}
                  error={
                    Array.isArray(errors?.work_experience)
                      ? errors?.work_experience[2]?.salary
                      : ""
                  }
                  // onBlur={handleBlur}
                  onChange={handleChange}
                  style={{ "--color--": "#525252" }}
                />
              </div>
              <div className="md:col-span-3 col-span-12">
                {/* <h1 className="font-bold text-[1rem] mb-4"></h1> */}
                <Input
                  type="text"
                  label={"Reason for Leaving"}
                  className="my-2"
                  id={`work_experience[${2}].reason`}
                  name={`work_experience[${2}].reason`}
                  value={values.work_experience[2]?.reason}
                  error={
                    Array.isArray(errors?.work_experience)
                      ? errors?.work_experience[2]?.reason
                      : ""
                  }
                  // onBlur={handleBlur}
                  onChange={handleChange}
                  style={{ "--color--": "#525252" }}
                />
              </div>
              {/* <div className="md:col-span-6 col-span-12">
                <Input
                  type="text"
                  label={"Nature of The Job"}
                  className="my-2"
                  id={`work_experience[${2}].job_nature`}
                  name={`work_experience[${2}].job_nature`}
                  value={values.work_experience[2]?.job_nature}
                  // onBlur={handleBlur}
                  onChange={handleChange}
                  style={{ "--color--": "#525252" }}
                />
              </div> */}
            </div>
          </div>
        </div>

        <div className="font-bold text-[1rem] mb-4 md:col-span-6 col-span-12 flex mt-6">
          <h1>Have you worked on CMS payroll before? </h1>
          <div className="flex gap-2 pl-6">
            <label htmlFor="before_working_in_payroll-yes">Yes</label>
            <input
              type="radio"
              value="yes"
              name="before_working_in_payroll"
              id="before_working_in_payroll-yes"
              checked={
                values?.before_working_in_payroll === "yes" ? true : false
              }
              onChange={handleChange}
              onClick={() => setIsPayrollCms(true)}
              // onBlur={handleBlur}
            />
            <label htmlFor="before_working_in_payroll-no">No</label>
            <input
              type="radio"
              value="no"
              name="before_working_in_payroll"
              id="before_working_in_payroll-no"
              checked={
                values?.before_working_in_payroll === "no" ? true : false
              }
              onChange={handleChange}
              onClick={() => setIsPayrollCms(false)}
              // onBlur={handleBlur}
            />
          </div>
        </div>
        {values?.before_working_in_payroll === "yes" ? (
          <>
            {/* updated on 26 jan */}
            <div className="grid grid-cols-12 gap-4 mb-2">
              <div className="md:col-span-6 col-span-6">
                <Input
                  type="select"
                  selectoptions={campusPreference}
                  name="payrollCms.campus"
                  id="payrollCms.campus"
                  onChange={handleChange}
                  value={values.payrollCms?.campus}
                  error={errors.payrollCms?.campus}
                  label={"Campus"}
                  className="my-2"
                  style={{ "--color--": "#525252" }}
                />
              </div>

              <div className="md:col-span-6 col-span-6">
                <Input
                  type="text"
                  label={"Designation"}
                  name="payrollCms.designation"
                  id="payrollCms.designation"
                  onChange={handleChange}
                  value={values.payrollCms?.designation}
                  error={errors.payrollCms?.designation}
                  className="my-2"
                  style={{ "--color--": "#525252" }}
                />
              </div>
            </div>

            {/* updated on 26 jan */}
          </>
        ) : (
          ""
        )}

        <div className="grid grid-cols-12 gap-4 mt-8">
          <div className="col-span-12">
            <h1 className="font-bold text-[1rem]">
              Earliest Date you can join<span>*</span>:
            </h1>
            {/*Earliest Date you can join (Date Format : DD-MM-YYYY, e.g.
            10-JUN-2021)*/}
            <Input
              type="date"
              label="Date"
              required={true}
              name="earliest_date_join"
              value={values.earliest_date_join?.slice(0, 10)}
              error={errors.earliest_date_join}
              id="earliest_date_join-no"
              onChange={handleChange}
              // onBlur={handleBlur}
              min={new Date().toISOString().slice(0, 10)}
              className="my-2 md:w-1/2 w-full"
            />
          </div>

          <div className="font-normal text-[13px] col-span-12">
            <h2>
              Name and contact numbers of two prominent persons of the locality
              or organisations you were associated with to whom veridication of
              character could be referred:{" "}
            </h2>
          </div>

          <div className="font-bold text-[1rem] col-span-12">
            <h2>Reference 1</h2>
          </div>
          <div className="grid grid-cols-12 col-span-12 gap-4">
            <div className="md:col-span-6 col-span-12">
              <Input
                type="text"
                label={"Reference Name 1"}
                name="referenceName1"
                id="referenceName1"
                style={{ "--color--": "#525252" }}
                onChange={handleChange}
                // onBlur={handleBlur}
                value={values.referenceName1}
                error={errors.referenceName1}
              />
            </div>
            <div className="md:col-span-6 col-span-12">
              <Input
                type="number"
                label={"Reference Mobile 1"}
                name="referenceMobile1"
                id="referenceMobile1"
                style={{ "--color--": "#525252" }}
                onChange={handleChange}
                // onBlur={handleBlur}
                value={values.referenceMobile1}
                error={errors.referenceMobile1}
              />
            </div>
          </div>
          <div className="font-bold text-[1rem] col-span-12">
            <h2>Reference 2</h2>
          </div>
          <div className="grid grid-cols-12 col-span-12 gap-4">
            <div className="md:col-span-6 col-span-12">
              <Input
                type="text"
                label={"Reference Name 2"}
                name="referenceName2"
                id="referenceName2"
                style={{ "--color--": "#525252" }}
                onChange={handleChange}
                // onBlur={handleBlur}
                value={values.referenceName2}
                error={errors.referenceName2}
              />
            </div>
            <div className="md:col-span-6 col-span-12">
              <Input
                type="number"
                label={"Reference Mobile 2"}
                name="referenceMobile2"
                id="referenceMobile1"
                style={{ "--color--": "#525252" }}
                onChange={handleChange}
                // onBlur={handleBlur}
                value={values.referenceMobile2}
                error={errors.referenceMobile2}
              />
            </div>
          </div>

          <div className="font-bold text-[1rem] col-span-12">
            <div className="flex">
              <h2>Do you have a blood relative working in CMS?</h2>
              <div className="flex gap-2 pl-6">
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
                  // onBlur={handleBlur}
                  value={values.blood_relative?.name}
                  error={errors.blood_relative?.name}
                  className="mb-4"
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
                  // onBlur={handleBlur}
                  value={values.blood_relative?.designation}
                  error={errors.blood_relative?.designation}
                  className="mb-4"
                  style={{ "--color--": "#525252" }}
                />
              </div>

              {/* <div className="md:col-span-6 col-span-12">
                <Input
                  type="select"
                  selectoptions={campusPreference}
                  name="blood_relative.campus"
                  id="blood_relative.campus"
                  onChange={handleChange}
                  // onBlur={handleBlur}
                  value={values.blood_relative?.campus}
                  error={errors.blood_relative?.campus}
                  label={"Campus"}
                  className="mt-2"
                  style={{ "--color--": "#525252" }}
                />
              </div>

              <div className="md:col-span-6 col-span-12"></div> */}
            </>
          ) : (
            ""
          )}
        </div>
        <div className="font-bold text-[1rem] mt-6 col-span-12">
          Declaration:<span>*</span>
          <div className="flex gap-2">
            <input
              type="checkbox"
              name="declaration"
              id="declaration"
              onChange={handleChange}
              // onBlur={handleBlur}
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
          {isLoading ? (
            <button
              type="submit"
              disabled={true}
              className="bg-blue-500 disabled:bg-gray-500 hover:bg-blue-700 text-white font-bold py-2 px-4 border border-blue-700 rounded"
            >
              Loading...
            </button>
          ) : (
            <button
              type="submit"
              disabled={!values.declaration}
              className="bg-blue-500 disabled:bg-gray-500 hover:bg-blue-700 text-white font-bold py-2 px-4 mt-6 mb-12 rounded"
            >
              Save & Update
            </button>
          )}
        </div>
      </form>
    </div>
  );
};

export default React.memo(Vacancy);
