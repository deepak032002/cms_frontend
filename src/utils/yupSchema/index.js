import * as Yup from "yup";

function hasNoDuplicates(arr) {
  const seen = new Set();
  return arr.every((item) => {
    if (seen.has(item.campus)) {
      return false;
    } else {
      seen.add(item.campus);
      return true;
    }
  });
}

export const staffTeachingSchema = Yup.object({
  academic: Yup.string(),
  subject: Yup.string(),
  designation: Yup.string(),

  campus_prefrence: Yup.array()
    .of(
      Yup.object().shape({
        campus: Yup.string().required("This is required "),
      })
    )
    .test("unique", "Can't select same campus", (val) => hasNoDuplicates(val)),
  personal_details: Yup.object().shape({
    first_name: Yup.string().required("This is required"),
    last_name: Yup.string().required("This is required"),
    dob: Yup.date()
      .required("This is required")
      .test("ageCheck", "Age 18 year required!", (val) => {
        return new Date().getFullYear() - new Date(val).getFullYear() >= 18;
      }),
    image: Yup.mixed()
      .required("This is required")
      .test(
        "fileSize",
        "File size should be less than 2MB!",
        (e) => e?.size <= 2 * (1000 * 1000)
      ),
    father: Yup.object().shape({
      name: Yup.string().required("This is required"),
      mobile: Yup.string()
        .required("This is required")
        .test("number_check", "Only enter number", (val) => !isNaN(val))
        .max(10, "Enter only 10 digit"),
      occupation: Yup.string().required("This is required"),
    }),
    mother: Yup.object().shape({
      name: Yup.string().required("This is required"),
      mobile: Yup.string()
        .test("number_check", "Only enter number", (val) => !isNaN(val))
        .max(10, "Enter only 10 digit"),
    }),
    mobile: Yup.string()
      .test("number_check", "Only enter number", (val) => !isNaN(val))
      .max(10, "Enter only 10 digit"),
    email: Yup.string().required("This is required").email("Enter valid email"),
    gender: Yup.string().required("This is required"),
    marital_status: Yup.string().required("This is required"),
    aadhar_number: Yup.string()
      .required("This is required")
      .test("number_check", "Only enter number", (val) => !isNaN(val))
      .max(12, "Enter only 12 digit"),
  }),
  address: Yup.object().shape({
    permanent: Yup.object().shape({
      street_lane: Yup.mixed().required("This is required"),
      area_locality: Yup.mixed().required("This field is required"),
      landmark: Yup.string("Only contain letters"),
      country: Yup.string().required("This field is required"),
      state: Yup.string().required("This field is required"),
      city: Yup.string().required("This field is required"),
      pincode: Yup.string()
        .test("number_check", "Only enter number", (val) => !isNaN(val))
        .required("This field is required")
        .max(6, "Enter only 6 digit"),
    }),
    current: Yup.object().shape({
      street_lane: Yup.string().required("This is required"),
      area_locality: Yup.mixed().required("This field is required"),
      landmark: Yup.string("Only contain letters"),
      country: Yup.string().required("This field is required"),
      state: Yup.string().required("This field is required"),
      city: Yup.string().required("This field is required"),
      pincode: Yup.string()
        .required("This field is required")
        .max(6, "Enter only 6 digit"),
    }),
  }),

  academic_details: Yup.object().shape({
    high_school: Yup.object().shape({
      year: Yup.date().required("This field is required"),
      board: Yup.string().required("This field is required"),
      school: Yup.string().required("This field is required"),
      percentage: Yup.string()
        .required("This field is required")
        .max(2, "Enter only 2 digit"),
      medium: Yup.string().required("This field is required!"),
    }),
    senior_secondary: Yup.object().shape({
      year: Yup.date().required("This field is required"),
      board: Yup.string().required("This field is required"),
      school: Yup.string().required("This field is required"),
      percentage: Yup.string()
        .required("This field is required")
        .max(2, "Enter only 2 digit"),
      medium: Yup.string().required("This field is required!"),
    }),
    graduation: Yup.object().shape({
      year: Yup.date().required("This field is required"),
      board: Yup.string().required("This field is required"),
      // school: Yup.string().required("This field is required"),
      percentage: Yup.string()
        .required("This field is required")
        .max(2, "Enter only 2 digit"),
      medium: Yup.string().required("This field is required!"),
    }),
    post_graduation: Yup.object().shape({
      year: Yup.date(),
      board: Yup.string(),
      // school: Yup.string(),
      percentage: Yup.string().max(2, "Enter only 2 digit"),
      medium: Yup.string(),
    }),
  }),

  referenceMobile1: Yup.string().max(10, "Enter only 10 digit"),
  referenceMobile2: Yup.string().max(10, "Enter only 10 digit"),

  referenceName1: Yup.string().min(3, "Atleast 3 character"),
  referenceName2: Yup.string().min(3, "Atleast 3 character"),

  work_experience: Yup.array().of(
    Yup.object().shape({
      work: Yup.string(),
      designation: Yup.string(),
      organisation: Yup.string(),
      joining_date: Yup.date(),
      leaving_date: Yup.date().when("joining_date", (joining_date, schema) => {
        if (joining_date) {
          return schema.min(
            joining_date,
            "Leaving date must be after joining date"
          );
        }
        return schema;
      }),
      salary: Yup.string(),
      reason: Yup.string(),
    })
  ),

  earliest_date_join: Yup.date().required("This field is required!"),
  blood_relative: Yup.object().shape({
    name: Yup.string().min(3, "Atleast 3 character"),
    designation: Yup.string(),
  }),
  payrollCms: Yup.string().min(3, "Atleast 3 character"),
});
