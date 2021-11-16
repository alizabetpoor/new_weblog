import userphoto from "../../assets/images/profile.webp";
import postphoto from "../../assets/images/post.jpeg";
import style from "./FullPost.module.css";
import { BiBookmark, BiHeart, BiMessageRounded } from "react-icons/bi";
import { useState } from "react";
import Comment from "../Comment/Comment";
import { useToasts } from "react-toast-notifications";
import { Link } from "react-router-dom";
import Reply from "../Comment/Reply";
const FullPost = () => {
  const [liked, setLiked] = useState(false);
  const [countLike, setCountLike] = useState(5);
  const { addToast } = useToasts();
  const likeHandler = () => {
    liked ? setCountLike((prev) => prev - 1) : setCountLike((prev) => prev + 1);
    setLiked((prev) => !prev);
  };
  const copyLink = () => {
    navigator.clipboard.writeText("https://weblog.com/post/2");
    addToast("لینک کپی شد", {
      appearance: "success",
      autoDismiss: true,
      autoDismissTimeout: 3000,
    });
  };
  return (
    <div className={`${style.fullpost} space-y-12 flex flex-col items-stretch`}>
      <div className="flex items-center text-black space-x-3 text-xs space-x-reverse">
        <div>
          <img className="rounded-full h-20 w-20" src={userphoto} alt="" />
        </div>
        <div className="flex flex-col items-start space-y-2">
          <div className="flex space-x-2 space-x-reverse">
            <span className="text-base font-sahelbold">علی ضابط پور</span>
            <button className="bg-gray-600 px-5 py-1 text-white rounded-xl">
              + دنبال کنید
            </button>
          </div>
          <div>
            <span className="text-gray-400">
              علاقه مند به دیجیتال مارکتینگ www.sheragim.ir
            </span>
          </div>
          <div>
            <span className="text-gray-600">دو ماه پیش</span>
          </div>
        </div>
      </div>
      <div className="px-3 sm:px-0">
        <div className="flex flex-col items-start leading-10 space-y-6">
          <h1 className="font-sahelbold text-3xl">
            کاربرد گزارش سالانه کافه بازار برای یک تبلیغاتچی
          </h1>
          <img
            className="w-full sm:h-96 h-56 self-stretch"
            src={postphoto}
            alt=""
          />
          <p className="text-right">
            همیشه قدم اول شروع فعالیت‌های یک مارکتر، قطعا تحقيق و بررسي است و
            خوشبختانه در ايران هم استارت‌آپ‌ها آمارهاي مهم و كاربردي خود را در
            اختيار كاربران قرار مي‌دهند تا با دانش‌افزایی بیشتر رشد دو سویه در
            این پلتفرم‌ها رقم بخورد. یکی از شرکت‎های همیشه پیشرو حتی در زمینه
            ارائه اطلاعات کاربردی در زمینه موبایل مارکتینگ قطعا کافه بازار است
            که اخیرا هم گزارش جذاب و پرمغذی برای صاحبین کسب و کار و دیجیتال
            مارکترها ارائه کرده است. این گزارش را از اینجا دریافت کنید. مزایای
            تبلیغات کافه بازار برای من از زمان شروع به کار سرویس تبلیغات داخل
            کافه بازار تا به امروز برای شرکت‌های مختلف از این سرویس استفاده کردم
            و نکته جذاب این نوع تبلیغات قطعا گستردگی مخاطبین آن است. 26 میلیون
            بازدید روزانه باکس تبلیغات و نزدیک به 3 میلیارد جستجوی سال 99 برطبق
            گزارش رسمی کافه بازار، آماری هیجان انگیز برای هر دیجیتال مارکتر
            محسوب می‌شود.
          </p>
          <div className="flex space-x-3 space-x-reverse text-base">
            <Link
              to="/category/2"
              className="px-5 py-1 bg-gray-300 text-gray-600 rounded-sm"
            >
              سیاسی
            </Link>
            <Link
              to="/category/2"
              className="px-5 py-1 bg-gray-300 text-gray-600 rounded-sm"
            >
              اخبار
            </Link>
            <Link
              to="/category/2"
              className="px-5 py-1 bg-gray-300 text-gray-600 rounded-sm"
            >
              ایران
            </Link>
          </div>
          <div className="flex sm:flex-row space-y-3 sm:space-y-0 flex-col justify-between self-stretch items-center">
            <div className="flex items-center text-2xl space-x-3 space-x-reverse text-gray-500">
              <BiBookmark className="cursor-pointer" />
              <div className="flex items-center space-x-2 space-x-reverse">
                <BiHeart
                  onClick={likeHandler}
                  className={`hover:text-red-600 cursor-pointer ${
                    liked ? "text-red-600" : null
                  }`}
                />
                <span className="text-xs">{countLike}</span>
              </div>
              <div className="flex items-center space-x-2 space-x-reverse">
                <BiMessageRounded className="cursor-pointer" />
                <span className="text-xs">3 نظر</span>
              </div>
            </div>
            <div>
              <div
                onClick={copyLink}
                className="text-sm cursor-pointer py-1 rounded-3xl px-5 border hover:bg-gray-200 border-gray-500 text-gray-500"
              >
                <span>weblog.com/post/2</span>
              </div>
            </div>
          </div>
          <div className="flex items-center space-x-3 space-x-reverse pt-8 border-t-4 border-gray-400 border-dotted self-stretch">
            <div>
              <img className="h-14 w-14 rounded-lg" src={userphoto} alt="" />
            </div>
            <div className="flex flex-col justify-between items-start">
              <div className="flex space-x-3 space-x-reverse">
                <h3 className="font-sahelbold">علی ضابط پور</h3>
                <span className="cursor-pointer rounded-md px-3 py-1 self-center text-xs border border-blue-300 text-blue-400">
                  دنبال کردن
                </span>
              </div>
              <div>
                <span className="text-xs">علاقه مند به دیجیتال مارکتینگ</span>
              </div>
            </div>
          </div>
        </div>
        <div className="py-12">
          <p className="text-right">شاید از این نوشته ها هم خوشتان بیاید</p>
          <div className="flex space-x-4 space-x-reverse mt-3 overflow-x-auto">
            <div className="rounded-md bg-white w-1/3 h-72 flex flex-col min-w-max">
              <img
                className="h-28 w-full rounded-t-md"
                src={postphoto}
                alt=""
              />
              <div className="p-3 flex flex-col justify-between flex-grow">
                <h3 className="text-right font-sahelbold mt-5">
                  معرفی کتاب فقر احمق میکند
                </h3>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2 space-x-reverse">
                    <img
                      className="w-9 h-9 rounded-full"
                      src={userphoto}
                      alt=""
                    />
                    <span className="text-blue-500 text-sm">علی ضابط پور</span>
                  </div>
                  <BiBookmark className="text-2xl text-gray-500 cursor-pointer" />
                </div>
              </div>
            </div>
            <div className="rounded-md bg-white w-1/3 h-72 flex flex-col min-w-max">
              <img
                className="h-28 w-full rounded-t-md"
                src={postphoto}
                alt=""
              />
              <div className="p-3 flex flex-col justify-between flex-grow">
                <h3 className="text-right font-sahelbold mt-5">
                  معرفی کتاب فقر احمق میکند
                </h3>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2 space-x-reverse">
                    <img
                      className="w-9 h-9 rounded-full"
                      src={userphoto}
                      alt=""
                    />
                    <span className="text-blue-500 text-sm">علی ضابط پور</span>
                  </div>
                  <BiBookmark className="text-2xl text-gray-500 cursor-pointer" />
                </div>
              </div>
            </div>
            <div className="rounded-md bg-white w-1/3 h-72 flex flex-col min-w-max">
              <img
                className="h-28 w-full rounded-t-md"
                src={postphoto}
                alt=""
              />
              <div className="p-3 flex flex-col justify-between flex-grow">
                <h3 className="text-right font-sahelbold mt-5">
                  معرفی کتاب فقر احمق میکند
                </h3>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2 space-x-reverse">
                    <img
                      className="w-9 h-9 rounded-full"
                      src={userphoto}
                      alt=""
                    />
                    <span className="text-blue-500 text-sm">علی ضابط پور</span>
                  </div>
                  <BiBookmark className="text-2xl text-gray-500 cursor-pointer" />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="py-12 flex flex-col items-stretch">
          <p className="self-start">پاسخ ها</p>
          <Reply />
          <div className="space-y-3 mt-5">
            <Comment />
            <Comment />
          </div>
        </div>
      </div>
    </div>
  );
};

export default FullPost;
