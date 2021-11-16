import { BiBell, BiCheckCircle } from "react-icons/bi";

import { Fragment } from "react";
import { Menu, Transition } from "@headlessui/react";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

const NotifDropDown = () => {
  return (
    <Menu as="div" className="relative inline-block text-right z-40">
      <div className="flex items-center">
        <Menu.Button>
          <BiBell className="ml-5 cursor-pointer text-gray-500 text-xl hover:text-gray-600" />
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
        <Menu.Items className="origin-top-left absolute left-5 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
          <div className="py-1">
            <Menu.Item>
              {({ active }) => (
                <div
                  className={classNames(
                    active ? "bg-gray-100 text-gray-900" : "text-gray-700",
                    "block px-4 py-2 text-sm"
                  )}
                >
                  <div className="flex items-center space-x-1 space-x-reverse">
                    <BiCheckCircle className="text-green-500" />
                    <span>اخرین پست شما 3 لایک گرفت</span>
                  </div>
                </div>
              )}
            </Menu.Item>
            <Menu.Item>
              {({ active }) => (
                <div
                  className={classNames(
                    active ? "bg-gray-100 text-gray-900" : "text-gray-700",
                    "block px-4 py-2 text-sm"
                  )}
                >
                  <div className="flex items-center space-x-1 space-x-reverse">
                    <BiCheckCircle className="text-green-500" />
                    <span>3پیام جدید دارید</span>
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

export default NotifDropDown;
