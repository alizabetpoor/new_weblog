import { NavLink } from "react-router-dom";
import styles from "./Header.module.css";
import { Link, useHistory } from "react-router-dom";
import logo from "../assets/images/logo.png";
import { BiSearch, BiX } from "react-icons/bi";
import ProfileDropDown from "./DropDown/ProfileDropDown";
import NotifDropDown from "./DropDown/NotifDrowDown";
import { useContext, useEffect, useState } from "react";
import AuthContext from "../context/AuthContext";
import useAxios from "../utils/UseAxios";

const Header = () => {
  const [loggedIn, setLoggedIn] = useState(false);
  const [searchBox, setSearchBox] = useState(false);
  const [categorys, setCategorys] = useState([]);
  const history = useHistory();
  const [searchInput, setSearchInput] = useState("");
  const api = useAxios();
  let { user } = useContext(AuthContext);
  const searchWord = (e) => {
    if (e.key === "Enter") {
      if (searchInput) {
        history.push(`/search/${searchInput}`);
        setSearchInput("");
      }
    }
  };
  useEffect(() => {
    if (user) {
      setLoggedIn(true);
    } else {
      setLoggedIn(false);
    }
  }, [user]);
  useEffect(() => {
    api
      .get("/categorys/")
      .then((res) => {
        setCategorys(res.data);
      })
      .catch((err) => console.log(err));
  }, []);
  return (
    <>
      <header className={`${styles.header} w-full flex flex-col items-stretch`}>
        <div
          className={`${searchBox ? "flex" : "hidden"} ${
            searchBox ? styles.activeSearchBox : styles.closeSearchBox
          } h-28 absolute top-0 right-0 w-full z-50 justify-center shadow-md`}
        >
          <div className="flex relative min-w-min lg:w-10/12 w-full">
            <input
              className="w-full focus:ring-0 focus:outline-none border-0 outline-none placeholder-black lg:pr-0 pr-4"
              type="search"
              value={searchInput}
              onKeyUp={(e) => searchWord(e)}
              placeholder="در بین مقالات ، نویسندگان و ... سرچ کنید"
              onChange={(e) => setSearchInput(e.target.value)}
            />
            <BiX
              onClick={() => setSearchBox(false)}
              className="absolute left-0 top-1/2 text-2xl cursor-pointer transform -translate-y-1/2"
            />
          </div>
        </div>
        <div
          className={`top lg:w-10/12 w-11/12 flex bg-white h-28 justify-between self-center`}
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
            {loggedIn ? (
              <>
                <NotifDropDown />
                <ProfileDropDown />
              </>
            ) : (
              <>
                {" "}
                <Link to="/login" className="py-1 px-4 text-blue-500">
                  ورود
                </Link>
                <Link
                  to="/register"
                  className="bg-blue-500 py-1 px-4 rounded-md text-white"
                >
                  ثبت نام
                </Link>
              </>
            )}
          </div>
        </div>
      </header>
      <div
        className={`${styles.headerBottom} z-30 h-12 sticky top-0 overflow-x-auto overflow-y-hidden flex justify-center`}
      >
        <nav className={`${styles.navbar} w-10/12 my-auto`}>
          <ul className="flex space-x-3 space-x-reverse min-w-max">
            <NavLink exact to="/" activeClassName={styles.active}>
              خانه
            </NavLink>
            {user && (
              <NavLink to="/newpost" activeClassName={styles.active}>
                ایجاد پست
              </NavLink>
            )}

            {categorys.map((category) => {
              return (
                <NavLink
                  key={category.id}
                  to={`/category/${category.id}`}
                  activeClassName={styles.active}
                >
                  {category.name}
                </NavLink>
              );
            })}
          </ul>
        </nav>
      </div>
    </>
  );
};

export default Header;
