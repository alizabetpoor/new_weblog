import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import profilepic from "../../assets/images/profile.webp";
import { BiBookmark, BiHeart } from "react-icons/bi";
import postpic from "../../assets/images/post.jpeg";
const Post = (props) => {
  const [liked, setLiked] = useState(null);
  const [countLike, setCountLike] = useState(null);
  const likeHandler = () => {
    liked ? setCountLike((prev) => prev - 1) : setCountLike((prev) => prev + 1);
    setLiked((prev) => !prev);
  };
  useEffect(() => {
    setLiked(false);
    setCountLike(props.data.like);
  }, [props.data.like]);
  return (
    <div className="bg-white p-3 flex flex-col w-full rounded-md leading-10 text-gray-500">
      <div className="flex justify-between">
        <div className="flex items-center">
          <div>
            <img className="rounded-full w-12 h-12" src={profilepic} alt="" />
          </div>
          <div className="flex flex-col mr-3 items-start">
            <Link to="/profile/alizabetpoor">
              <span className="text-gray-700">{props.data.username}</span>
            </Link>
            <span className="text-xs">{props.data.created}</span>
          </div>
        </div>
        <div>
          <Link to="/barnamenevisi" className="text-gray-700">
            {props.data.category}
          </Link>
        </div>
      </div>
      <div className="self-start my-6 font-sahelbold font-extrabold text-xl text-gray-700">
        <Link to="/post/1">
          <h1>{props.data.title}</h1>
        </Link>
      </div>
      <div>
        <img className="w-full h-52" src={postpic} alt="" />
      </div>
      <div className="self-start">
        <p>{props.data.description}</p>
      </div>
      <div className="flex justify-between items-center text-2xl">
        <div className="flex space-x-2 items-center space-x-reverse">
          <BiHeart
            onClick={likeHandler}
            className={`hover:text-red-600 cursor-pointer ${
              liked ? "text-red-600" : null
            }`}
          />
          <span className="text-sm">{countLike}</span>
        </div>
        <div>
          <BiBookmark className="cursor-pointer" />
        </div>
      </div>
    </div>
  );
};

export default Post;
