import { BiBell, BiCheckCircle } from "react-icons/bi";
import userphoto from "../../assets/images/profile.webp";
import { Link } from "react-router-dom";
import { Fragment, useContext, useEffect, useState } from "react";
import { Menu, Transition } from "@headlessui/react";
import AuthContext from "../../context/AuthContext";
import useAxios from "../../utils/UseAxios";
function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

const ProfileDropDown = () => {
  let { logoutUser, user } = useContext(AuthContext);
  let [userProfile, setUserProfile] = useState(null);
  let api = useAxios();
  useEffect(() => {
    api
      .get("/profile/")
      .then((res) => {
        setUserProfile(res.data);
      })
      .catch((err) => console.log(err));
  }, []);
  return (
    <Menu as="div" className="relative inline-block text-right z-40">
      <div className="flex items-center">
        <Menu.Button>
          <img
            className="h-10 w-10 rounded-full cursor-pointer"
            src={userProfile && (userProfile.profile_photo || userphoto)}
            alt=""
          />
        </Menu.Button>
      </div>

      <Transition
        as={Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <Menu.Items className="origin-top-left absolute left-5 mt-2 w-36 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
          <div className="py-1">
            <Menu.Item>
              {({ active }) => (
                <Link
                  className={classNames(
                    active ? "bg-gray-100 text-gray-900" : "text-gray-700",
                    "block px-4 py-2 text-sm"
                  )}
                  to={`/profile/${user?.username}`}
                >
                  <div className="flex items-center space-x-1 space-x-reverse">
                    <span>پروفایل</span>
                  </div>
                </Link>
              )}
            </Menu.Item>
            <Menu.Item>
              {({ active }) => (
                <div
                  className={classNames(
                    active ? "bg-gray-100 text-gray-900" : "text-gray-700",
                    "block px-4 py-2 text-sm cursor-pointer"
                  )}
                  onClick={() => logoutUser()}
                >
                  <div className="flex items-center space-x-1 space-x-reverse">
                    <span>خروج</span>
                  </div>
                </div>
              )}
            </Menu.Item>
          </div>
        </Menu.Items>
      </Transition>
    </Menu>
  );
};

export default ProfileDropDown;
