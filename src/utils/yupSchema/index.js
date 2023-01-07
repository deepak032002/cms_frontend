import * as Yup from "yup";

export const staffRegistrationSchema = Yup.object({
  category: Yup.string() .min( "") .required("This field needs to be entered"),
  firstName: Yup.string()
    .min(5, "Length should be 5 or more!")
    .required("Please Enter First Name!"),
  lastName: Yup.string()
    .min(5, "Length should be 5 or more!")
    .required("Please Enter Last Name!"),
  dob: Yup.string().required("Please Enter Date of Birth"),
  
  admission: Yup.string().required("please Enter Admission sought in class"),
  fileupload: Yup.string().required("please Enter the file"),
  gender: Yup.string().required("This field needs to be entered"),
  fathersname: Yup.string()
  .min(2, 'Too Short!')
  .max(50, 'Too Long!')
  .required('Required'),
  email: Yup.string().email('Invalid email').required('Required'),
  mothersname : Yup.string()
  .min(2, 'Too Short!')
  .max(50, 'Too Long!')
  .required('Required'),
  memail: Yup.string().email('Invalid email').required('Required'),
 
  academics: Yup.string().required("This field needs to be entered"),
  subjects: Yup.string().required("This field needs to be entered"),
  campus1: Yup.string().required("This field needs to be entered"),
  campus2: Yup.string().required("This field needs to be entered"),
  campus3: Yup.string().required("This field needs to be entered"),
  maritalStatus: Yup.string().required("This field needs to be entered"),
})