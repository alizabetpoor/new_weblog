import { useFormik } from "formik";
import { useContext, useState } from "react";
import * as yup from "yup";
import TextInput from "../components/Inputs/TextInput";
import AuthContext from "../context/AuthContext";
import Recaptcha from "../components/Recaptcha";
const initialValues = {
  username: "",
  email: "",
  password: "",
  password_confrim: "",
};

const validationSchema = yup.object({
  username: yup
    .string()
    .required("یوزرنیم الزامی است")
    .min(3, "حداقل طول یوزرنیم باید 3 کلمه باشد"),
  email: yup
    .string()
    .email("ایمیل وارد شده درست نمیباشد")
    .required("ایمیل نیاز است"),
  password: yup
    .string()
    .required("پسورد الزامی است")
    .min(8, "پسورد شما باید حداقل دارای 8 کاراکتر باشد")
    .notOneOf([yup.ref("username"), null], "پسورد نباید شامل یوزرنیم باشد"),
  password_confrim: yup
    .string()
    .required("پسورد الزامی است")
    .oneOf([yup.ref("password"), null], "پسورد وارد شده یکسان نیست"),
});
const RegisterPage = () => {
  let { signupUser } = useContext(AuthContext);
  const [enabledForm, setEnabledForm] = useState(false);
  const onSubmit = (values) => {
    console.log(values);
    signupUser(values.username, values.email, values.password);
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
        <h2 className="font-sahelbold">ثبت نام</h2>
        <TextInput
          name="username"
          checkvalid={true}
          formik={formik}
          placeholder="یوزرنیم"
        />
        <TextInput
          name="email"
          formik={formik}
          placeholder="ایمیل"
          checkvalid={true}
        />
        <TextInput
          checkvalid={true}
          name="password"
          type="password"
          formik={formik}
          placeholder="پسورد"
        />
        <TextInput
          checkvalid={true}
          name="password_confrim"
          formik={formik}
          type="password"
          placeholder="تایید پسورد"
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
          ثبت نام
        </button>
      </form>
    </div>
  );
};

export default RegisterPage;
