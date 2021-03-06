import AuthContext from "../context/AuthContext";
import useAxios from "../utils/UseAxios";
import { useToasts } from "react-toast-notifications";
import { useContext, useEffect } from "react";
import { useState } from "react";
const FollowingButton = ({ following_user, span }) => {
  const api = useAxios();
  const { addToast } = useToasts();
  const { user } = useContext(AuthContext);
  const [following, setFollowing] = useState(false);
  const followingButton = () => {
    if (following) {
      api
        .delete(`/following/${user?.user_id}/${following_user.id}/`)
        .then((res) => {
          if (res.status === 204) {
            addToast(`شما دیگر ${following_user.username} را دنبال نمی کنید.`, {
              appearance: "info",
              autoDismiss: true,
            });
            setFollowing(false);
          }
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      api
        .post(`/following/`, {
          user: user.user_id,
          following_user: following_user.id,
        })
        .then((res) => {
          if (res.status === 201) {
            addToast(`شما  ${following_user.username} را دنبال می کنید.`, {
              appearance: "success",
              autoDismiss: true,
            });
            setFollowing(true);
          }
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };
  useEffect(() => {
    if (user) {
      api
        .get(`/following/${user?.user_id}/${following_user.id}/`)
        .then((res) => {
          if (res.status === 200) {
            setFollowing(true);
          }
        })
        .catch((err) => {
          if (err.response.status === 404) {
            setFollowing(false);
          }
        });
    }
  }, []);
  if (!user) {
    return null;
  } else if (user.user_id == following_user.id) {
    return null;
  } else {
    if (!span) {
      return (
        <button
          onClick={followingButton}
          className={`${
            following ? "bg-blue-600" : " bg-gray-600"
          } px-5 py-1 text-white rounded-xl`}
        >
          {following ? "دنبال شده" : "دنبال کنید +"}
        </button>
      );
    } else {
      return (
        <span
          onClick={followingButton}
          className={`${
            following ? "bg-blue-500 text-white" : "text-blue-400"
          } cursor-pointer rounded-md px-3 py-1 self-center text-xs border border-blue-300`}
        >
          {following ? "دنبال شده" : "دنبال کردن +"}
        </span>
      );
    }
  }
};

export default FollowingButton;
