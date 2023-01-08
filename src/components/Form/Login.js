import { useFormik } from "formik";
import FormAction from "./FormAction";
import FormExtra from "./FormExtra";
import Input from "./Input";
import * as Yup from "yup";
import { toast } from "react-toastify";
import { loginApi } from "../../api/auth";
import { Navigate, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setToken } from "../../redux/features/authSlice";

export default function Login() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const token = useSelector((state) => state.auth.token);
  const handleLogin = async (data, action) => {
    const res = await loginApi(data);
    console.log(res);

    if (res?.code === "ERR_BAD_REQUEST" && res?.response.status === 409) {
      toast.error(res.response.data.message);
    }

    if (res?.status === 200) {
      toast.success("Successfully Registered!");
      dispatch(setToken(res.data.token));
      navigate("/agreement");
    }
  };

  const formikLogin = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: Yup.object({
      email: Yup.string()
        .email("Enter valid email!")
        .required("This field is required!"),
      password: Yup.string().required("This field is required!").min(6),
    }),

    onSubmit: (values, action) => {
      handleLogin(values, action);
    },
  });

  if (token) {
    return <Navigate to="/agreement" />;
  }

  return (
    <form className="mt-8 space-y-6" onSubmit={formikLogin.handleSubmit}>
      <div className="-space-y-px">
        <Input
          handleChange={formikLogin.handleChange}
          value={formikLogin.values.email}
          labelText={"Email"}
          id={"email"}
          name={"email"}
          error={formikLogin.errors?.email}
          type={"email"}
          isRequired={true}
          placeholder={"Email"}
        />

        <Input
          handleChange={formikLogin.handleChange}
          value={formikLogin.values.password}
          labelText={"Password"}
          id={"password"}
          name={"password"}
          error={formikLogin.errors?.password}
          type={"password"}
          isRequired={true}
          placeholder={"Password"}
        />
      </div>

      <FormExtra />
      <FormAction handleSubmit={formikLogin.handleSubmit} text="Login" />
    </form>
  );
}
