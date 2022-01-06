import AuthContext from "../context/AuthContext";
import useAxios from "../utils/UseAxios";
import { useToasts } from "react-toast-notifications";
import { BiBookmark } from "react-icons/bi";
import { useContext, useEffect, useState } from "react";
const BookmarkButton = ({ post_id, className }) => {
  const [bookmarked, setBookmarked] = useState(false);
  const { user } = useContext(AuthContext);
  const api = useAxios();
  const { addToast } = useToasts();
  const bookmarkClick = () => {
    if (!user) {
      addToast("ابتدا لاگین کنید.", { appearance: "info", autoDismiss: true });
    } else {
      if (bookmarked) {
        api
          .delete(`/bookmark/${user.user_id}/${post_id}/`)
          .then((res) => {
            if (res.status === 204) {
              addToast("پست از بوکمارک حذف شد", {
                appearance: "info",
                autoDismiss: true,
              });
              setBookmarked(false);
            }
          })
          .catch((err) => console.log(err));
      } else {
        api
          .post("/bookmark/", { post: post_id })
          .then((res) => {
            if (res.status === 201) {
              addToast("پست با موفقیت ذخیره شد", {
                appearance: "success",
                autoDismiss: true,
              });
              setBookmarked(true);
            }
          })
          .catch((err) => console.log(err));
      }
    }
  };
  useEffect(() => {
    if (user) {
      api
        .get(`/bookmark/${user.user_id}/${post_id}/`)
        .then((res) => {
          if (res.status === 200) {
            setBookmarked(true);
          }
        })
        .catch((err) => {
          if (err.response.status === 404) {
            console.log("not found");
          }
        });
    }
  }, []);

  return (
    <BiBookmark
      onClick={bookmarkClick}
      className={`${
        bookmarked ? "text-black" : "text-gray-400"
      } cursor-pointer ${className}`}
    />
  );
};

export default BookmarkButton;
