import userphoto from "../assets/images/profile.webp";
import Posts from "../components/Posts";
import { Link } from "react-router-dom";
const Profile = () => {
  return (
    <div className="flex justify-center">
      <div className="lg:w-6/12 md:w-9/12 w-full px-2 md:px-0 flex flex-col space-y-10 pb-8">
        <div className="flex md:flex-row flex-col space-y-3 items-center text-black space-x-3 text-xs space-x-reverse">
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
          </div>
        </div>
        <div className="flex md:justify-start justify-center space-x-7 space-x-reverse text-gray-600 text-base border-b-4 pb-14 border-gray-500 border-dotted">
          <Link
            to="/profile/alizabetpoor/following"
            className="hover:text-black"
          >
            توسط{" "}
            <span className="text-black font-sahelbold font-extrabold underline">
              110
            </span>{" "}
            نفر دنبال می شود
          </Link>
          <Link
            to="/profile/alizabetpoor/follower"
            className="hover:text-black"
          >
            <span className="text-black font-sahelbold font-extrabold underline">
              110
            </span>{" "}
            را دنبال می کند
          </Link>
        </div>
        <Posts />
      </div>
    </div>
  );
};

export default Profile;
