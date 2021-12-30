import { useEffect, useRef, useState } from "react";
import Post from "./Post/Post";
import { withRouter } from "react-router-dom";
import Loader from "./Loader";
import useAxios from "../utils/UseAxios";
const Posts = (props) => {
  const [countPosts, setCountPosts] = useState(4);
  const api = useAxios();
  const [posts, setPosts] = useState(null);
  const postsRef = useRef();
  useEffect(() => {
    api
      .get(props.endpoint)
      .then((res) => {
        console.log(res.data);
        setPosts(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [props.endpoint]);
  useEffect(() => {
    const minusHeight = props.history.location.pathname === "/" ? 100 : 300;
    const checkScroll = () => {
      if (
        postsRef.current &&
        window.scrollY > postsRef.current.offsetHeight - minusHeight
      ) {
        setCountPosts((last) => last + 4);
      }
    };
    window.addEventListener("scroll", checkScroll);
    return () => {
      window.removeEventListener("scroll", checkScroll);
    };
  }, [countPosts]);
  if (!posts) {
    return (
      <div className="space-y-6 w-full">
        <Loader />
        <Loader />
        <Loader />
      </div>
    );
  }
  return (
    <div ref={postsRef} className="posts space-y-6 w-full">
      {posts.map((post, index) => {
        if (index + 1 < countPosts) {
          return <Post data={post} key={index} />;
        }
      })}
    </div>
  );
};

export default withRouter(Posts);
