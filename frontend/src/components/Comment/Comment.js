import photoimage from "../../assets/images/profile.webp";
import { useState } from "react";
import { BiHeart, BiReply } from "react-icons/bi";
import Reply from "./Reply";
const Comment = () => {
  const [liked, setLiked] = useState(false);
  const [countLike, setCountLike] = useState(5);
  const [showReply, setShowReply] = useState(false);
  const likeHandler = () => {
    liked ? setCountLike((prev) => prev - 1) : setCountLike((prev) => prev + 1);
    setLiked((prev) => !prev);
  };
  const replyHandler = () => {
    setShowReply((prev) => !prev);
  };
  return (
    <div className="w-full bg-white p-3 flex flex-col space-y-3">
      <div className="flex space-x-2 space-x-reverse items-center">
        <div>
          <img className="h-9 w-9 rounded-full" src={photoimage} alt="" />
        </div>
        <div className="flex flex-col justify-between items-start">
          <span className="text-blue-500 text-sm">علی ضابط پور</span>
          <span className="text-gray-400 text-xs">دو روز پیش</span>
        </div>
      </div>
      <div className="text-right">
        <p>
          سلام خسته نباشید یه سوال داشتم این امکان فراهم هست با ارتباط با شما یه
          ساب دامین متصل کنیم به انشارات خود سشبشسلشس سشلشسلسشل شسلشسل
        </p>
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
