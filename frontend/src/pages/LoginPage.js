import { useFormik } from "formik";
import * as yup from "yup";
import TextInput from "../components/Inputs/TextInput";
import { useContext } from "react";
import AuthContext from "../context/AuthContext";
import Recaptcha from "../components/Recaptcha";
import { useState } from "react";
const initialValues = {
  username: "",
  password: "",
};

const validationSchema = yup.object({
  username: yup.string().required("یوزرنیم الزامی است"),
  password: yup.string().required("پسورد الزامی است"),
});

const LoginPage = (props) => {
  let { loginUser } = useContext(AuthContext);
  const [enabledForm, setEnabledForm] = useState(false);
  const onSubmit = (values) => {
    console.log(values);
    loginUser(values.username, values.password);
  };
  const formik = useFormik({
    initialValues,
    onSubmit,
    validationSchema,
    validateOnMount: true,
  });

  return (
    <div className="flex flex-col items-center ">
      <div className="h-2 lg:w-2/5 md:w-3/5 w-11/12 bg-blue-500"></div>
      <form
        onSubmit={formik.handleSubmit}
        className="lg:w-2/5 md:w-3/5 w-11/12 bg-white shadow-md p-3 rounded-sm space-y-2"
      >
        <h2 className="font-sahelbold">ورود</h2>
        <TextInput name="username" formik={formik} placeholder="یوزرنیم" />
        <TextInput
          name="password"
          type="password"
          formik={formik}
          placeholder="پسورد"
        />

        <Recaptcha setEnabledForm={setEnabledForm} />
        <button
          className={`p-2 ${
            formik.isValid && enabledForm
              ? "bg-blue-500 hover:bg-blue-600"
              : "bg-blue-200"
          }  transition-colors w-full rounded-md text-white`}
          type="submit"
          disabled={!formik.isValid || !enabledForm}
        >
          ورود
        </button>
      </form>
    </div>
  );
};

export default LoginPage;
