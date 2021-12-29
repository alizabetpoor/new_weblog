import { useEffect, useRef, useState } from "react";
import "@amir04lm26/react-modern-calendar-date-picker/lib/DatePicker.css";
import DatePicker from "@amir04lm26/react-modern-calendar-date-picker";
import * as yup from "yup";
import useAxios from "../utils/UseAxios";
import TextInput from "../components/Inputs/TextInput";
import { useFormik } from "formik";
import { updatedDiff, diff } from "deep-object-diff";
import style from "./PersonalinfoPage.module.css";
import { useToasts } from "react-toast-notifications";

const initialValues = {
  first_name: "",
  last_name: "",
  email: "",
  phonenumber: "",
  displayname: "",
  birthday: null,
};
const validationSchema = yup.object({
  phonenumber: yup
    .string()
    .matches(/^(\+98|0)?9\d{9}$/, "شماره موبایل وارد شده درست نیست"),
});
const convertDate = (date) => {
  if (typeof date === "string") {
    let dateList = date.split("-");
    let dateObject = {
      day: parseInt(dateList[2]),
      month: parseInt(dateList[1]),
      year: parseInt(dateList[0]),
    };
    return dateObject;
  } else {
    let dateString = `${date.year}-${date.month}-${date.day}`;
    return dateString;
  }
};
const PersonalinfoPage = () => {
  const [photo, setPhoto] = useState(null);
  const photoRef = useRef();
  const api = useAxios();
  const [formValues, setFormValues] = useState(null);
  const { addToast } = useToasts();
  const [user, setUser] = useState(null);
  const onSubmit = (values) => {
    let diffrent = diff(formValues, values);
    let diffrent_size = Object.keys(diffrent).length;
    if (photo) {
      let data = new FormData();
      data.append("profile_photo", photo);
      api
        .patch("/profile/", data)
        .then((res) => {
          console.log(res);
          setUser({ ...user, profile: res.data });
          addToast(" عکس شما با موفقیت بروزرسانی شد", {
            autoDismiss: true,
            appearance: "success",
          });
        })
        .catch((err) => console.log(err));
    }
    let data;
    if (diffrent_size) {
      if (formValues.phonenumber) {
        data = {
          first_name: values.first_name,
          last_name: values.last_name,
          profile: {
            display_name: values.displayname,
            birthday: convertDate(values.birthday),
          },
        };
      } else {
        data = {
          first_name: values.first_name,
          last_name: values.last_name,
          profile: {
            phonenumber: values.phonenumber,
            display_name: values.displayname,
            birthday: convertDate(values.birthday),
          },
        };
      }

      api
        .patch("/user/me/", data)
        .then((res) => {
          // console.log(res);
          if (res.status === 200 && res.statusText === "OK") {
            setUser(res.data);
            let formvalues = {
              first_name: res.data.first_name,
              last_name: res.data.last_name,
              email: res.data.email,
              phonenumber: res.data.profile.phonenumber || "",
              displayname: res.data.profile.display_name || "",
              birthday: convertDate(res.data.profile.birthday),
            };
            setFormValues(formvalues);
            addToast("اطلاعات شما با موفقیت بروزرسانی شد", {
              autoDismiss: true,
              appearance: "success",
            });
          } else {
            addToast("مشکلی به وجود آمده است", {
              autoDismiss: true,
              appearance: "error",
            });
          }
        })
        .catch((err) => {
          console.log(err);
          if (err.response.status === 400) {
            addToast("مشکلی به وجود آمده است", {
              autoDismiss: true,
              appearance: "error",
            });
          }
        });
    }
  };
  const changePhoto = () => {
    console.log(photoRef.current.click());
  };
  const formik = useFormik({
    initialValues: formValues || initialValues,
    onSubmit,
    validationSchema,
    // validateOnMount: true,
    enableReinitialize: true,
  });

  const datefield = formik.getFieldProps("birthday");
  useEffect(() => {
    api
      .get("/user/me/")
      .then((res) => {
        setUser(res.data);
        let formvalues = {
          first_name: res.data.first_name,
          last_name: res.data.last_name,
          email: res.data.email,
          phonenumber: res.data.profile.phonenumber || "",
          displayname: res.data.profile.display_name || "",
          birthday: convertDate(res.data.profile.birthday),
        };
        setFormValues(formvalues);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  return (
    <div className="flex justify-center">
      <div className="sm:w-3/5 w-11/12 flex flex-col items-stretch">
        <div className="md:grid md:grid-cols-1 md:gap-6 text-right">
          <div className="mt-5 md:mt-0 md:col-span-2">
            <form className="w-full" onSubmit={formik.handleSubmit}>
              <div className="shadow sm:rounded-md sm:overflow-visible">
                <div className="px-4 py-5 bg-white space-y-6 sm:p-6 ">
                  <div className="grid grid-cols-6 gap-6">
                    <div className="col-span-6 sm:col-span-3">
                      <TextInput
                        name="first_name"
                        type="text"
                        formik={formik}
                        placeholder="نام"
                      />
                    </div>

                    <div className="col-span-6 sm:col-span-3">
                      <TextInput
                        name="last_name"
                        type="text"
                        formik={formik}
                        placeholder="نام خانوادگی"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-6 gap-6">
                    <div className="col-span-6 sm:col-span-3">
                      <TextInput
                        name="email"
                        type="email"
                        formik={formik}
                        disabled={true}
                        placeholder="ایمیل"
                      />
                    </div>
                    <div className="col-span-6 sm:col-span-3">
                      <TextInput
                        name="phonenumber"
                        type="text"
                        disabled={formValues?.phonenumber}
                        formik={formik}
                        placeholder="شماره موبایل"
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-6 gap-6">
                    <div className="col-span-6 sm:col-span-3">
                      <TextInput
                        name="displayname"
                        type="text"
                        formik={formik}
                        placeholder="نام مستعار"
                      />
                    </div>
                    <div className="col-span-6 sm:col-span-3 relative">
                      <label
                        htmlFor="birthday"
                        className="block text-sm font-medium text-gray-700"
                      >
                        تاریخ تولد
                      </label>
                      <DatePicker
                        value={datefield.value}
                        onChange={(value) =>
                          formik.setFieldValue("birthday", value)
                        }
                        wrapperClassName={`${style.datapicker}`}
                        inputName="birthday"
                        calendarPopperPosition="top"
                        inputPlaceholder="تاریخ تولد"
                        shouldHighlightWeekends
                        // locale="fa"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      عکس پروفایل
                    </label>
                    <div className="mt-1 flex items-center space-x-reverse space-x-3">
                      <span className="inline-block h-12 w-12 rounded-full overflow-hidden bg-gray-100">
                        <img src={user?.profile.profile_photo} alt="" />
                      </span>
                      <button
                        type="button"
                        onClick={changePhoto}
                        className="ml-5 bg-white py-2 px-3 border border-gray-300 rounded-md shadow-sm text-sm leading-4 font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                      >
                        تغییر
                      </button>
                      <input
                        name="photo"
                        onChange={(e) => setPhoto(e.target.files[0])}
                        ref={photoRef}
                        className="sr-only"
                        type="file"
                      />
                    </div>
                  </div>

                  <div className="px-4 py-3 bg-gray-50 text-right sm:px-6">
                    <button
                      type="submit"
                      disabled={!formik.isValid}
                      className={`${
                        (formik.isValid && formik.dirty) || photo
                          ? "bg-indigo-600 hover:bg-indigo-700"
                          : "bg-indigo-200"
                      } inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500`}
                    >
                      ویرایش
                    </button>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PersonalinfoPage;
