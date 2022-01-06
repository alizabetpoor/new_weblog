import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import profilepic from "../../assets/images/profile.webp";
import { BiHeart } from "react-icons/bi";
import AuthContext from "../../context/AuthContext";
import { useToasts } from "react-toast-notifications";
import useAxios from "../../utils/UseAxios";
import BookmarkButton from "../BookmarkButton";
const Post = (props) => {
  const { addToast } = useToasts();
  const { user } = useContext(AuthContext);
  const api = useAxios();
  const [post, setPost] = useState(props.data);
  const [liked, setLiked] = useState(null);
  const [countLike, setCountLike] = useState(null);
  const likeHandler = () => {
    if (user) {
      if (liked) {
        let list_liked = [...post.likes];
        let new_list_like = list_liked.filter((like) => like !== user.user_id);
        api
          .patch(`/posts/${post.id}/`, { likes: new_list_like })
          .then((res) => {
            console.log(res);
            setCountLike((prev) => prev - 1);
          })
          .catch((err) => console.log(err));
      } else {
        api
          .patch(`/posts/${post.id}/`, { likes: [user.user_id, ...post.likes] })
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
  useEffect(() => {
    if (user) {
      if (post.likes.includes(user.user_id)) {
        setLiked(true);
      }
    }
    setCountLike(post.likes.length);
  }, []);
  useEffect(() => {
    setPost(props.data);
  }, [props.data]);

  return (
    <div className="bg-white p-3 flex flex-col w-full rounded-md leading-10 text-gray-500">
      <div className="flex justify-between">
        <div className="flex items-center">
          <div>
            <img
              className="rounded-full w-12 h-12"
              src={post.author.profile.profile_photo || profilepic}
              alt=""
            />
          </div>
          <div className="flex flex-col mr-3 items-start">
            <Link to={`/profile/${post.author.username}`}>
              <span className="text-gray-700">{post.author.username}</span>
            </Link>
            <span className="text-xs">{post.time_post_created}</span>
          </div>
        </div>
        <div className="flex items-center">
          {post.category
            ? post.category.map((cat, index) => {
                return (
                  <div key={cat.id}>
                    <Link to={`/category/${cat.id}`} className="text-gray-700">
                      {cat.name}
                    </Link>
                    {index !== post.category.length - 1 ? "," : null}
                  </div>
                );
              })
            : null}
        </div>
      </div>
      <div className="self-start my-6 font-sahelbold font-extrabold text-xl text-gray-700">
        <Link to={`/post/${post.id}`}>
          <h1>{post.title}</h1>
        </Link>
      </div>
      <div>
        <img className="w-full h-52" src={post.image} alt="" />
      </div>
      <div className="self-start">
        <p
          className="text-right"
          dangerouslySetInnerHTML={{
            __html: post.text.substring(0, 50) + " ...",
          }}
        />
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
          <BookmarkButton post_id={post.id} />
        </div>
      </div>
    </div>
  );
};

export default Post;
