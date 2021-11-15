import { useState } from "react";
import userphoto from "../../assets/images/profile.webp";
const Reply = () => {
  const [showSendButton, setShowSendButton] = useState(false);
  const [comment, setComment] = useState("");
  const commentHandler = (e) => {
    setComment(e.target.value);
  };
  const buttonHandler = () => {
    if (comment) {
      console.log(comment);
      setComment("");
    }
  };
  return (
    <div className="bg-white  px-2">
      <div className="relative">
        <input
          className="py-5 outline-none border-0 rounded-sm pl-2 pr-16 w-full placeholder-gray-300"
          placeholder="نظر خود را درباره این پست بنویسید"
          onFocus={() => setShowSendButton(true)}
          type="text"
          onChange={commentHandler}
          value={comment}
        />
        <img
          className="h-10 w-10 rounded-full absolute right-4 top-1/2 transform -translate-y-1/2"
          src={userphoto}
          alt=""
        />
      </div>
      {showSendButton && (
        <div className="border-t border-gray-400 py-4 text-left">
          <button
            onClick={() => setShowSendButton(false)}
            className={`rounded-2xl px-3 py-2 text-sm transition text-gray-500 hover:border-gray-400 border border-gray-300 ml-3`}
          >
            منصرف شدم
          </button>
          <button
            disabled={!Boolean(comment)}
            onClick={buttonHandler}
            className={`${
              comment ? "bg-blue-500" : "bg-blue-100"
            } rounded-2xl px-3 py-2 text-sm text-white`}
          >
            ارسال نظر
          </button>
        </div>
      )}
    </div>
  );
};

export default Reply;
