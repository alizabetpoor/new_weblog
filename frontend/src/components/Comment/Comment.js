import { Link } from "react-router-dom";
import { useToasts } from "react-toast-notifications";
import { useState, useContext } from "react";
import AuthContext from "../../context/AuthContext";
import useAxios from "../../utils/UseAxios";
import { BiHeart, BiReply } from "react-icons/bi";
import Reply from "./Reply";
import { useEffect } from "react";
const Comment = ({ comment }) => {
  const [liked, setLiked] = useState(false);
  const [countLike, setCountLike] = useState(null);
  const { user } = useContext(AuthContext);
  const api = useAxios();
  const { addToast } = useToasts();
  const [showReply, setShowReply] = useState(false);
  const likeHandler = () => {
    if (user) {
      if (liked) {
        let list_liked = [...comment.likes];
        let new_list_like = list_liked.filter((like) => like !== user.user_id);
        api
          .patch(`/comments/${comment.id}/`, { likes: new_list_like })
          .then((res) => {
            console.log(res);
            setCountLike((prev) => prev - 1);
          })
          .catch((err) => console.log(err));
      } else {
        api
          .patch(`/comments/${comment.id}/`, {
            likes: [user.user_id, ...comment.likes],
          })
          .then((res) => {
            console.log(res);
            setCountLike((prev) => prev + 1);
          })
          .catch((err) => console.log(err));
      }
      setLiked((prev) => !prev);
    } else {
      addToast("ابتدا لاگین کنید.", {
        appearance: "error",
        autoDismiss: true,
        autoDismissTimeout: 3000,
      });
    }
  };
  const replyHandler = () => {
    setShowReply((prev) => !prev);
  };
  useEffect(() => {
    setCountLike(comment.likes.length);
    if (user) {
      if (comment.likes.includes(user.user_id)) {
        setLiked(true);
      } else {
        setLiked(false);
      }
    }
  }, [comment]);
  return (
    <div className="w-full bg-white p-3 flex flex-col space-y-3">
      <div className="flex space-x-2 space-x-reverse items-center">
        <div>
          <img
            className="h-9 w-9 rounded-full"
            src={comment.author.profile.profile_photo}
            alt=""
          />
        </div>
        <div className="flex flex-col justify-between items-start">
          <Link
            to={`/profile/${comment.author.username}`}
            className="text-blue-500 text-sm"
          >
            {comment.author.username}
          </Link>
          <span className="text-gray-400 text-xs">
            {comment.time_comment_created}
          </span>
        </div>
      </div>
      <div className="text-right">
        <p>{comment.text}</p>
      </div>
      <div className="text-2xl flex justify-between text-gray-500">
        <div className="flex items-center space-x-2 space-x-reverse">
          <BiHeart
            onClick={likeHandler}
            className={`hover:text-red-600 cursor-pointer ${
              liked ? "text-red-600" : null
            }`}
          />
          <span className="text-xs">{countLike}</span>
        </div>
        <BiReply className="cursor-pointer" onClick={replyHandler} />
      </div>
      {showReply && <Reply />}
    </div>
  );
};

export default Comment;
