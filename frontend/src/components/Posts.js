import { useEffect, useRef, useState } from "react";
import Post from "./Post/Post";
import { withRouter } from "react-router-dom";
const Posts = (props) => {
  const [countPosts, setCountPosts] = useState(4);
  const [posts, setPosts] = useState([
    {
      username: "جواد جهانگیری",
      title: "ایجاد میکروسرویس با C# asp.net core با دیتابیس MongoDB",
      description:
        "در این مقاله از سری مقاله های آموزشی مونگودبی به آموزش نحوه ایجاد ...",
      created: "10 دقیقه پیش",
      category: "برنامه نویسی",
      like: 0,
    },
    {
      username: "جواد جهانگیری",
      title: "ایجاد میکروسرویس با C# asp.net core با دیتابیس MongoDB",
      description:
        "در این مقاله از سری مقاله های آموزشی مونگودبی به آموزش نحوه ایجاد ...",
      created: "10 دقیقه پیش",
      category: "برنامه نویسی",
      like: 0,
    },
    {
      username: "جواد جهانگیری",
      title: "ایجاد میکروسرویس با C# asp.net core با دیتابیس MongoDB",
      description:
        "در این مقاله از سری مقاله های آموزشی مونگودبی به آموزش نحوه ایجاد ...",
      created: "10 دقیقه پیش",
      category: "برنامه نویسی",
      like: 0,
    },
    {
      username: "جواد جهانگیری",
      title: "ایجاد میکروسرویس با C# asp.net core با دیتابیس MongoDB",
      description:
        "در این مقاله از سری مقاله های آموزشی مونگودبی به آموزش نحوه ایجاد ...",
      created: "10 دقیقه پیش",
      category: "برنامه نویسی",
      like: 0,
    },
    {
      username: "جواد جهانگیری",
      title: "ایجاد میکروسرویس با C# asp.net core با دیتابیس MongoDB",
      description:
        "در این مقاله از سری مقاله های آموزشی مونگودبی به آموزش نحوه ایجاد ...",
      created: "10 دقیقه پیش",
      category: "برنامه نویسی",
      like: 0,
    },
    {
      username: "جواد جهانگیری",
      title: "ایجاد میکروسرویس با C# asp.net core با دیتابیس MongoDB",
      description:
        "در این مقاله از سری مقاله های آموزشی مونگودبی به آموزش نحوه ایجاد ...",
      created: "10 دقیقه پیش",
      category: "برنامه نویسی",
      like: 0,
    },
    {
      username: "جواد جهانگیری",
      title: "ایجاد میکروسرویس با C# asp.net core با دیتابیس MongoDB",
      description:
        "در این مقاله از سری مقاله های آموزشی مونگودبی به آموزش نحوه ایجاد ...",
      created: "10 دقیقه پیش",
      category: "برنامه نویسی",
      like: 0,
    },
  ]);
  const postsRef = useRef();
  useEffect(() => {
    const minusHeight = props.history.location.pathname === "/" ? 100 : 300;
    const checkScroll = () => {
      if (
        postsRef.current &&
        window.scrollY > postsRef.current.offsetHeight - minusHeight
      ) {
        console.log("if");
        setCountPosts((last) => last + 4);
      }
    };
    window.addEventListener("scroll", checkScroll);
    return () => {
      window.removeEventListener("scroll", checkScroll);
    };
  }, [countPosts]);
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
