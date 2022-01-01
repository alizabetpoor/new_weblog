import userphoto from "../../assets/images/profile.webp";
import postphoto from "../../assets/images/post.jpeg";
import style from "./FullPost.module.css";
import { BiBookmark, BiHeart, BiMessageRounded } from "react-icons/bi";
import { useContext, useEffect, useState } from "react";
import Comment from "../Comment/Comment";
import { useToasts } from "react-toast-notifications";
import { Link } from "react-router-dom";
import Reply from "../Comment/Reply";
import useAxios from "../../utils/UseAxios";
import Posts from "../Posts";
import AuthContext from "../../context/AuthContext";
import { useRef } from "react";
const FullPost = (props) => {
  const { user } = useContext(AuthContext);
  const [liked, setLiked] = useState(false);
  const [post, setPost] = useState(null);
  const [comments, setComments] = useState(null);
  const api = useAxios();
  const [relatedPosts, setRelatedPosts] = useState(null);
  const id = props.match.params.id;
  const commentRef = useRef();
  const [countLike, setCountLike] = useState(null);
  const { addToast } = useToasts();
  const likeHandler = () => {
    if (user) {
      if (liked) {
        let list_liked = [...post.likes];
        let new_list_like = list_liked.filter((like) => like !== user.user_id);
        api
          .patch(`/posts/${id}/`, { likes: new_list_like })
          .then((res) => {
            console.log(res);
            setCountLike((prev) => prev - 1);
          })
          .catch((err) => console.log(err));
      } else {
        api
          .patch(`/posts/${id}/`, { likes: [user.user_id, ...post.likes] })
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
  const copyLink = () => {
    navigator.clipboard.writeText("https://weblog.com/post/2");
    addToast("لینک کپی شد", {
      appearance: "success",
      autoDismiss: true,
      autoDismissTimeout: 3000,
    });
  };
  const relatedPost = relatedPosts ? (
    relatedPosts.map((relatedpost) => {
      return (
        <div
          key={relatedpost.id}
          className={`rounded-md bg-white w-1/3 h-72 flex flex-col ${style.relatedpost}`}
        >
          <img
            className="h-28 w-full rounded-t-md"
            src={relatedpost.image}
            alt=""
          />
          <div className="p-3 flex flex-col justify-between flex-grow">
            <Link
              to={`/post/${relatedpost.id}`}
              className="text-right font-sahelbold mt-5"
            >
              {relatedpost.title}
            </Link>
            <div className="flex items-center justify-between">
              <Link
                to={`/profile/${relatedpost.author.username}`}
                className="flex items-center space-x-2 space-x-reverse"
              >
                <img
                  className="w-9 h-9 rounded-full"
                  src={relatedpost.author.profile.profile_photo}
                  alt=""
                />
                <span className="text-blue-500 text-sm">
                  {relatedpost.author.username}
                </span>
              </Link>
              <BiBookmark className="text-2xl text-gray-500 cursor-pointer" />
            </div>
          </div>
        </div>
      );
    })
  ) : (
    <div>loading ...</div>
  );
  useEffect(() => {
    api
      .get(`/posts/${id}/`)
      .then((res) => {
        setPost(res.data);
        setCountLike(res.data.likes.length);
        if (user) {
          if (res.data.likes.includes(user.user_id)) {
            setLiked(true);
          } else {
            setLiked(false);
          }
        }
      })
      .catch((err) => console.log(err));
    api
      .get("/posts/random/")
      .then((res) => {
        setRelatedPosts(res.data.splice(0, 3));
      })
      .catch((err) => console.log("error"));
    api
      .get(`/comments/post/${id}/`)
      .then((res) => {
        setComments(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [id]);
  if (!post) {
    return <div>loading ...</div>;
  }
  return (
    <div className={`${style.fullpost} space-y-12 flex flex-col items-stretch`}>
      <div className="flex items-center text-black space-x-3 text-xs space-x-reverse">
        <div>
          <img
            className="rounded-full h-20 w-20"
            src={post.author.profile.profile_photo || userphoto}
            alt=""
          />
        </div>
        <div className="flex flex-col items-start space-y-2">
          <div className="flex space-x-2 space-x-reverse">
            <span className="text-base font-sahelbold">
              {post.author.username}
            </span>
            <button className="bg-gray-600 px-5 py-1 text-white rounded-xl">
              + دنبال کنید
            </button>
          </div>
          <div></div>
          <div>
            <span className="text-gray-600">{post.time_post_created}</span>
          </div>
        </div>
      </div>
      <div className="px-3 sm:px-0">
        <div className="flex flex-col items-start leading-10 space-y-6">
          <h1 className="font-sahelbold text-3xl">{post.title}</h1>
          <img
            className="w-full sm:h-96 h-56 self-stretch"
            src={post.image}
            alt=""
          />
          <p
            className="text-right"
            dangerouslySetInnerHTML={{ __html: post.text }}
          />
          <div className="flex space-x-3 space-x-reverse text-base">
            {post.category.map((category) => {
              return (
                <Link
                  key={category.id}
                  to={`/category/${category.id}`}
                  className="px-5 py-1 bg-gray-300 text-gray-600 rounded-sm"
                >
                  {category.name}
                </Link>
              );
            })}
          </div>
          <div className="flex sm:flex-row space-y-3 sm:space-y-0 flex-col justify-between self-stretch items-center">
            <div className="flex items-center text-2xl space-x-3 space-x-reverse text-gray-500">
              <BiBookmark className="cursor-pointer" />
              <div className="flex items-center space-x-2 space-x-reverse">
                <BiHeart
                  onClick={likeHandler}
                  className={`hover:text-red-600 cursor-pointer ${
                    liked ? "text-red-600" : null
                  }`}
                />
                <span className="text-xs">{countLike}</span>
              </div>
              <div className="flex items-center space-x-2 space-x-reverse">
                <BiMessageRounded
                  onClick={() => {
                    window.scrollTo(0, commentRef.current.offsetTop);
                  }}
                  className="cursor-pointer"
                />
                <span className="text-xs">3 نظر</span>
              </div>
            </div>
            <div>
              <div
                onClick={copyLink}
                className="text-sm cursor-pointer py-1 rounded-3xl px-5 border hover:bg-gray-200 border-gray-500 text-gray-500"
              >
                <span>{`weblog.com/post/${post.id}`}</span>
              </div>
            </div>
          </div>
          <div className="flex items-center space-x-3 space-x-reverse pt-8 border-t-4 border-gray-400 border-dotted self-stretch">
            <div>
              <img
                className="h-14 w-14 rounded-lg"
                src={post.author.profile.profile_photo || userphoto}
                alt=""
              />
            </div>
            <div className="flex flex-col justify-between items-start">
              <div className="flex space-x-3 space-x-reverse">
                <Link
                  to={`/profile/${post.author.username}`}
                  className="font-sahelbold"
                >
                  {post.author.username}
                </Link>
                <span className="cursor-pointer rounded-md px-3 py-1 self-center text-xs border border-blue-300 text-blue-400">
                  دنبال کردن
                </span>
              </div>
              <div></div>
            </div>
          </div>
        </div>
        <div className="py-12">
          <p className="text-right">شاید از این نوشته ها هم خوشتان بیاید</p>
          <div className="flex space-x-4 space-x-reverse mt-3 overflow-x-auto">
            {relatedPost}
          </div>
        </div>
        <div ref={commentRef} className="py-12 flex flex-col items-stretch">
          <p className="self-start">پاسخ ها</p>
          <Reply setComments={setComments} postid={post.id} />
          <div className="space-y-3 mt-5">
            {comments?.map((comment) => {
              return <Comment key={comment.id} comment={comment} />;
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default FullPost;
