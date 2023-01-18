import * as Yup from "yup";

Yup.addMethod(Yup.array, "unique", function (message) {
  console.log(message);
  return this.test("unique", message, function (list) {
    const mapper = (x) => x.name;
    const set = [...new Set(list.map(mapper))];
    const isUnique = list.length === set.length;
    if (isUnique) {
      return true;
    }

    const idx = list.findIndex((l, i) => mapper(l) !== set[i]);
    return this.createError({
      path: `[${idx}].name`,
      message: message,
    });
  });
});

export const staffTeachingSchema = Yup.object({
  academic: Yup.string(),
  subject: Yup.string(),
  designation: Yup.string(),

  campus_prefrence: Yup.array()
    .of(
      Yup.object().shape({
        campus: Yup.string().required("This is required"),
      })
    )
    .required("Fill all campus!"),
  personal_details: Yup.object().shape({
    first_name: Yup.string().required("This is required"),
    last_name: Yup.string().required("This is required"),
    dob: Yup.date().required("This is required"),
    image: Yup.mixed()
      .required("This is required")
      .test(
        "fileSize",
        "File size should be less than 2MB!",
        (e) => e?.size <= 2 * (1000 * 1000)
      ),
    father: Yup.object().shape({
      name: Yup.string().required("This is required"),
      mobile: Yup.string().required("This is required"),
      occupation: Yup.string().required("This is required"),
    }),
    mother: Yup.object().shape({
      name: Yup.string().required("This is required"),
      mobile: Yup.string().nullable(),
    }),
    mobile: Yup.string().required("This is required"),
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
        .required("This field is required"),
    }),
    current: Yup.object().shape({
      street_lane: Yup.string().required("This is required"),
      area_locality: Yup.mixed().required("This field is required"),
      landmark: Yup.string("Only contain letters"),
      country: Yup.string().required("This field is required"),
      state: Yup.string().required("This field is required"),
      city: Yup.string().required("This field is required"),
      pincode: Yup.string()
        .test("number_check", "Only enter number", (val) => !isNaN(val))
        .required("This field is required"),
    }),
  }),

  academic_details: Yup.object().shape({
    high_school: Yup.object().shape({
      year: Yup.date().required("This field is required"),
      board: Yup.string().required("This field is required"),
      school: Yup.string().required("This field is required"),
      percentage: Yup.string().required("This field is required"),
      medium: Yup.string().required("This field is required!"),
    }),
    senior_secondary: Yup.object().shape({
      year: Yup.date().required("This field is required"),
      board: Yup.string().required("This field is required"),
      school: Yup.string().required("This field is required"),
      percentage: Yup.string().required("This field is required"),
      medium: Yup.string().required("This field is required!"),
    }),
    graduation: Yup.object().shape({
      year: Yup.date().required("This field is required"),
      board: Yup.string().required("This field is required"),
      school: Yup.string().required("This field is required"),
      percentage: Yup.string().required("This field is required"),
      medium: Yup.string().required("This field is required!"),
    }),
    post_graduation: Yup.object().shape({
      year: Yup.date(),
      board: Yup.string(),
      school: Yup.string(),
      percentage: Yup.string(),
      medium: Yup.string(),
    }),
  }),
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
    name: Yup.string(),
    designation: Yup.string(),
  }),
});

// export const staffNonTeachingSchema = Yup.object({
//   designation: Yup.string().required("This is required"),
//   campus_prefrence: Yup.array()
//     .of(
//       Yup.object().shape({
//         campus: Yup.string().required("This is required"),
//       })
//     )
//     .required("Fill all campus!"),
//   personal_details: Yup.object().shape({
//     first_name: Yup.string().required("This is required"),
//     last_name: Yup.string().required("This is required"),
//     dob: Yup.date().required("This is required"),
//     image: Yup.mixed()
//       .required("This is required")
//       .test(
//         "fileSize",
//         "File size should be less than 2MB!",
//         (e) => e?.size <= 2 * (1000 * 1000)
//       ),
//     father: Yup.object().shape({
//       name: Yup.string().required("This is required"),
//       mobile: Yup.number("Only enter numbers").required("This is required"),
//       occupation: Yup.string().required("This is required"),
//     }),
//     mother: Yup.object().shape({
//       name: Yup.string().required("This is required"),
//       mobile: Yup.string().nullable(),
//     }),
//     mobile: Yup.number("Only enter numbers").required("This is required"),
//     email: Yup.string().required("This is required").email("Enter valid email"),
//     gender: Yup.string().required("This is required"),
//     marital_status: Yup.string().required("This is required"),
//     aadhar_number: Yup.string()
//       .required("This is required")
//       .test("number_check", "Only enter number", (val) => !isNaN(val))
//       .max(12, "Enter only 12 digit"),
//   }),
//   address: Yup.object().shape({
//     permanent: Yup.object().shape({
//       street_lane: Yup.mixed().required("This is required"),
//       area_locality: Yup.mixed().required("This field is required"),
//       landmark: Yup.string("Only contain letters"),
//       country: Yup.string().required("This field is required"),
//       state: Yup.string().required("This field is required"),
//       city: Yup.string().required("This field is required"),
//       pincode: Yup.string()
//         .test("number_check", "Only enter number", (val) => !isNaN(val))
//         .required("This field is required"),
//     }),
//     current: Yup.object().shape({
//       street_lane: Yup.string().required("This is required"),
//       area_locality: Yup.mixed().required("This field is required"),
//       landmark: Yup.string("Only contain letters"),
//       country: Yup.string().required("This field is required"),
//       state: Yup.string().required("This field is required"),
//       city: Yup.string().required("This field is required"),
//       pincode: Yup.string()
//         .test("number_check", "Only enter number", (val) => !isNaN(val))
//         .required("This field is required"),
//     }),
//   }),

//   academic_details: Yup.object().shape({
//     high_school: Yup.object().shape({
//       year: Yup.date().required("This field is required"),
//       board: Yup.string().required("This field is required"),
//       school: Yup.string().required("This field is required"),
//       percentage: Yup.string().required("This Field is required"),
//       medium: Yup.string().required("This field is required!"),
//     }),
//     senior_secondary: Yup.object().shape({
//       year: Yup.date().required("This field is required"),
//       board: Yup.string().required("This field is required"),
//       school: Yup.string().required("This field is required"),
//       percentage: Yup.string().required("This Field is required"),
//       medium: Yup.string().required("This field is required!"),
//     }),
//     graduation: Yup.object().shape({
//       year: Yup.date().required("This field is required"),
//       board: Yup.string().required("This field is required"),
//       school: Yup.string().required("This field is required"),
//       percentage: Yup.string().required("This Field is required"),
//       medium: Yup.string().required("This field is required!"),
//     }),
//     post_graduation: Yup.object().shape({
//       year: Yup.date().required("This field is required"),
//       board: Yup.string().required("This field is required"),
//       school: Yup.string().required("This field is required"),
//       percentage: Yup.string().required("This Field is required"),
//       medium: Yup.string().required("This field is required!"),
//     }),
//   }),
//   work_experience: Yup.array().of(
//     Yup.object().shape({
//       work: Yup.string(),
//       designation: Yup.string(),
//       organisation: Yup.string(),
//       joining_date: Yup.date(),
//       leaving_date: Yup.date()
//         .required()
//         .when("joining_date", (joining_date, schema) => {
//           if (joining_date) {
//             return schema.min(
//               joining_date,
//               "Leaving date must be after joining date"
//             );
//           }
//           return schema;
//         }),
//       salary: Yup.string(),
//       reason: Yup.string(),
//     })
//   ),

//   earliest_date_join: Yup.date().required("This field is required!"),
//   blood_relative: Yup.object().shape({
//     name: Yup.string(),
//     designation: Yup.string(),
//     campus: Yup.string(),
//   }),
// });
