import Posts from "../components/Posts";
import { BiChevronLeft } from "react-icons/bi";
import { Link } from "react-router-dom";
import enamadphoto from "../assets/images/enamad.png";
import RandomPosts from "../components/RandomPosts/RandomPosts";
import PopularPosts from "../components/PopularPosts/PopularPosts";
const HomePage = () => {
  return (
    <div className="homepage w-full space-y-8 flex flex-col items-center">
      <RandomPosts />
      <div className="flex w-full sm:w-10/12 lg:w-8/12 justify-center lg:space-x-6 pb-10 lg:space-x-reverse">
        <main className="lg:w-8/12 sm:w-10/12 w-full">
          <Posts />
        </main>
        <aside className="w-4/12 mt-3 lg:block hidden">
          <div className="text-right w-full">
            <h2 className="font-sahelbold font-bold text-base">
              به وبلاگ ما خوش آمدید
            </h2>
            <p className="text-gray-500">
              زمان آن رسیده که شیوه‌ی نوشتن و خواندن مطالبتان را تغییر دهید. اگر
              برای آغاز دوران جدید آماده هستید به ویرگول خوش آمدید.
            </p>
            <Link
              className="flex px-5 py-3 w-2/3 bg-blue-600 hover:bg-blue-700 transition-all mt-4 text-white justify-between items-center rounded-3xl"
              to="/register"
            >
              <span className="text-sm">میخواهم ثبت نام کنم</span>
              <BiChevronLeft className="text-xl" />
            </Link>
          </div>
          <div className="sticky top-14">
            <PopularPosts />
            <div className="mt-10 space-y-4">
              <ul className="flex text-sm text-gray-500 space-x-4 space-x-reverse mr-6">
                <Link className="hover:text-gray-700" to="/">
                  قوانین
                </Link>
                <Link className="hover:text-gray-700" to="/">
                  حریم شخصی
                </Link>
                <Link className="hover:text-gray-700" to="/">
                  نقشه راه
                </Link>
                <Link className="hover:text-gray-700" to="/">
                  تماس با ما
                </Link>
              </ul>
              <div>
                <img src={enamadphoto} alt="" />
              </div>
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
};

export default HomePage;
