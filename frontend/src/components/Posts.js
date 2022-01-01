import { useEffect, useRef, useCallback, useState, forwardRef } from "react";
import Post from "./Post/Post";
import { withRouter } from "react-router-dom";
import Loader from "./Loader";
import useAxios from "../utils/UseAxios";
import axios from "axios";
const Posts = (props) => {
  const api = useAxios();
  const [loading, setLoading] = useState(true);
  const [posts, setPosts] = useState(null);
  const [nextPageNumber, setNextPageNumber] = useState(1);
  const [hasMore, setHasMore] = useState(false);
  const postsRef = useRef();
  const observer = useRef();
  const lastPost = useCallback(
    (node) => {
      if (loading) return;
      if (observer.current) {
        observer.current.disconnect();
      }
      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasMore) {
          console.log("visible");
          setLoading(true);
          setNextPageNumber((prev) => {
            loadNextPage(prev + 1);
            return prev + 1;
          });
        }
      });
      if (node) {
        observer.current.observe(node);
      }
      console.log(node);
    },
    [hasMore, loading]
  );
  useEffect(() => {
    api
      .get(props.endpoint)
      .then((res) => {
        console.log(res.data);
        if (res.data.next) {
          setHasMore(true);
        } else {
          setHasMore(false);
        }
        setPosts(res.data.results);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [props.endpoint]);
  const loadNextPage = (nextpage) => {
    let cancel;
    api
      .get(props.endpoint + `?page=${nextpage}`, {
        cancelToken: new axios.CancelToken((c) => (cancel = c)),
      })
      .then((res) => {
        console.log(res.data);
        if (res.data.next) {
          setHasMore(true);
        } else {
          setHasMore(false);
        }
        setPosts((prevposts) => {
          return [...prevposts, ...res.data.results];
        });
        setLoading(false);
      })
      .catch((err) => {
        if (axios.isCancel(err)) return;
      });
    return () => {
      cancel();
    };
  };
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
        if (posts.length === index + 1) {
          return (
            <div ref={lastPost} key={index}>
              <Post data={post} />
            </div>
          );
        }
        return <Post data={post} key={index} />;
      })}
      {loading && <Loader />}
    </div>
  );
};

export default withRouter(Posts);
