import { useEffect, useState } from "react";
import Posts from "../components/Posts";
import useAxios from "../utils/UseAxios";
const CategoryPage = (props) => {
  const [category, setCategory] = useState(null);
  const api = useAxios();
  useEffect(() => {
    console.log("re render");

    api
      .get(`/categorys/${props.match.params.category}/`)
      .then((res) => {
        setCategory(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [props.match.params.category]);
  return (
    <div className="flex flex-col items-center">
      <h1>دسته : {category?.name}</h1>
      <div className="sm:w-3/5 w-11/12">
        <Posts endpoint={`/posts/category/${props.match.params.category}/`} />
      </div>
    </div>
  );
};

export default CategoryPage;
