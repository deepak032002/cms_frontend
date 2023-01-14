import FormAction from "./FormAction";
import Input from "./Input";
import { useFormik } from "formik";
import * as Yup from "yup";
import { signUpApi } from "../../api/auth";
import { toast } from "react-toastify";
import { useNavigate, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

export default function Sign() {
  const navigate = useNavigate();
  const token = useSelector((state) => state.auth.token);
  const handleSignUp = async (values, action) => {
    const res = await signUpApi(values);
    console.log(res);

    if (res?.code === "ERR_BAD_REQUEST" && res?.response.status === 409) {
      toast.error(res.response.data.message);
    }

    if (res?.status === 201) {
      toast.success("Successfully Registered!");
      navigate("/");
    }
  };

  const formikSignUp = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
      confirm_password: "",
    },
    validationSchema: Yup.object({
      name: Yup.string()
        .required("This field is required!")
        .min(3, "Atleast enter 3 character"),
      email: Yup.string()
        .email("Enter valid email!")
        .required("This field is required!"),
      password: Yup.string().required("This field is required!").min(6),
      confirm_password: Yup.string()
        .required("This field is required!")
        .min(6)
        .oneOf(
          [Yup.ref("password"), null],
          "Password and confirm password should be match!"
        ),
    }),

    onSubmit: (values, action) => {
      handleSignUp(values, action);
    },
  });

  if (token) {
    return <Navigate to="/welcome" />;
  }

  return (
    <form className="mt-8 space-y-6" onSubmit={formikSignUp.handleSubmit}>
      <div className="">
        <Input
          handleChange={formikSignUp.handleChange}
          value={formikSignUp.values.name}
          labelText={"Name"}
          id={"name"}
          name={"name"}
          error={formikSignUp.errors?.name}
          type={"text"}
          isRequired={true}
          placeholder={"Name"}
        />

        <Input
          handleChange={formikSignUp.handleChange}
          value={formikSignUp.values.email}
          labelText={"Email"}
          id={"email"}
          name={"email"}
          error={formikSignUp.errors?.email}
          type={"email"}
          isRequired={true}
          placeholder={"Email"}
        />

        <Input
          handleChange={formikSignUp.handleChange}
          value={formikSignUp.values.password}
          labelText={"Password"}
          id={"password"}
          name={"password"}
          error={formikSignUp.errors?.password}
          type={"password"}
          isRequired={true}
          placeholder={"Password"}
        />

        <Input
          handleChange={formikSignUp.handleChange}
          value={formikSignUp.values.confirm_password}
          labelText={"Password"}
          id={"confirm_password"}
          name={"confirm_password"}
          error={formikSignUp.errors?.confirm_password}
          type={"password"}
          isRequired={true}
          placeholder={"Confirm Password"}
        />

        <FormAction handleSubmit={formikSignUp.handleSubmit} text="Sign Ups" />
      </div>
    </form>
  );
}
