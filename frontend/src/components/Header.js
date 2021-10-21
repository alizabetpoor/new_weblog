import { NavLink } from "react-router-dom";
import styles from "./Header.module.css";
import logo from "../assets/images/logo.png";
import { BiSearch, BiX } from "react-icons/bi";
import { useState } from "react";
const Header = () => {
  const [searchBox, setSearchBox] = useState(false);
  return (
    <header className={`${styles.header} w-full flex flex-col items-stretch`}>
      <div
        className={`${searchBox ? "flex" : "hidden"} ${
          searchBox ? styles.activeSearchBox : styles.closeSearchBox
        } h-28 absolute top-0 right-0 w-full z-10 justify-center`}
      >
        <div className="flex relative min-w-min lg:w-8/12 w-full">
          <input
            className="w-full outline-none placeholder-black"
            type="search"
            placeholder="در بین مقالات ، نویسندگان و ... سرچ کنید"
          />
          <BiX
            onClick={() => setSearchBox(false)}
            className="absolute left-0 top-1/2 text-2xl cursor-pointer transform -translate-y-1/2"
          />
        </div>
      </div>
      <div
        className={`top lg:w-8/12 w-11/12 flex bg-white h-28 justify-between self-center`}
      >
        <div className="flex items-center space-x-3 space-x-reverse">
          <img className="w-14 h-14" src={logo} alt="" />
          <p>وبلاگ</p>
        </div>
        <div className="flex items-center">
          <BiSearch
            onClick={() => setSearchBox(true)}
            className="ml-5 cursor-pointer text-gray-500 text-xl hover:text-gray-600"
          />
          <button className="py-1 px-4 text-blue-500">ورود</button>
          <button className="bg-blue-500 py-1 px-4 rounded-md text-white">
            ثبت نام
          </button>
        </div>
      </div>
      <div
        className={`${styles.headerBottom} top-0 z-30 h-12 overflow-x-auto overflow-y-hidden flex justify-center`}
      >
        <nav className={`${styles.navbar} w-8/12 my-auto`}>
          <ul className="flex space-x-3 space-x-reverse min-w-max">
            <NavLink exact to="/" activeClassName={styles.active}>
              خانه
            </NavLink>
            <NavLink to="/new-posts" activeClassName={styles.active}>
              پست های جدید
            </NavLink>
            <NavLink to="/most-like-posts" activeClassName={styles.active}>
              پست ها با بیشترین لایک
            </NavLink>
            <NavLink to="/category/khalaghiat" activeClassName={styles.active}>
              خلاقیت
            </NavLink>
            <NavLink to="/category/ajib" activeClassName={styles.active}>
              عجیب
            </NavLink>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;
