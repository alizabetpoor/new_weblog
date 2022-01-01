import { useEffect } from "react";
import { Link } from "react-router-dom";
import useAxios from "../../utils/UseAxios";
import profilepic from "../../assets/images/profile.webp";
import { useState } from "react";
const PopularPosts = () => {
  const [posts, setPosts] = useState(null);
  const api = useAxios();
  useEffect(() => {
    api
      .get("/posts/popularposts/")
      .then((res) => {
        setPosts(res.data);
      })
      .catch((err) => console.log(err));
  }, []);
  return (
    <div className="flex flex-col mt-6 items-start space-y-7">
      <h2 className="font-sahelbold">محبوب ترین های وبلاگ</h2>
      {posts?.map((post) => {
        return (
          <div
            key={post.id}
            className="flex items-center space-x-reverse space-x-2"
          >
            <Link to={`/profile/${post.author.username}`}>
              <img
                className="rounded-full h-12 w-12"
                src={post.author.profile.profile_photo}
                alt=""
              />
            </Link>
            <div className="flex flex-col items-start">
              <Link to={`/post/${post.id}`}>
                <h5 className="font-sahelbold text-xs">{post.title}</h5>
              </Link>
              <Link to={`/profile/${post.author.username}`}>
                <span className="text-gray-500 text-xs">
                  {post.author.username}
                </span>
              </Link>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default PopularPosts;
