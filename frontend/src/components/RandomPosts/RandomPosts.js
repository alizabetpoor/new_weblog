import styles from "./RandomPosts.module.css";
import { useState, useEffect } from "react";
import ReactLoading from "react-loading";
import { Link } from "react-router-dom";
import useAxios from "../../utils/UseAxios";
const RandomPosts = () => {
  const [posts, setPosts] = useState();
  const api = useAxios();
  useEffect(() => {
    api
      .get("/posts/random/")
      .then((res) => setPosts(res.data))
      .catch((err) => console.log(err));
  }, []);
  if (!posts)
    return (
      <ReactLoading type="cubes" color="#236df7" height={"20%"} width={"20%"} />
    );
  return (
    <div className="random-posts flex flex-col w-10/12 overflow-x-auto">
      <p className="self-start text-gray-500 leading-10">
        مطالب انتخابی برای شما
      </p>

      <div className="text-white lg:grid lg:grid-cols-12 lg:gap-4 flex lg:space-x-0 space-x-3 space-x-reverse">
        {posts.map((post, index) => {
          return (
            <Link
              className={`relative leading-8 ${styles.image} ${
                index === 1 || index === 2 ? "lg:col-span-4" : "lg:col-span-8"
              }`}
              key={post.id}
              to={`/post/${post.id}`}
            >
              <img
                className={`w-full h-full object-cover rounded-lg`}
                src={post.image}
                alt=""
              />
              <div className="flex flex-col items-start absolute bottom-5 right-10">
                <h2 className="font-extrabold font-sahelbold text-xl text-right">
                  {post.title}
                </h2>
                <div className="flex items-center space-x-3 space-x-reverse">
                  <div>
                    <img
                      className="rounded-full w-12 h-12"
                      src={post.author.profile.profile_photo}
                      alt=""
                    />
                  </div>
                  <div className="break-words flex flex-col">
                    <span className="self-start">{post.author.username}</span>
                    <span>{post.time_post_created}</span>
                  </div>
                </div>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default RandomPosts;
