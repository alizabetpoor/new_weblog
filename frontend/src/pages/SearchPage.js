import { useEffect, useState } from "react";
import Posts from "../components/Posts";
import useAxios from "../utils/UseAxios";
const SearchPage = (props) => {
  return (
    <div className="flex flex-col items-center pb-12">
      <h1>کلمه : {props.match.params.word}</h1>
      <div className="sm:w-3/5 w-11/12">
        <Posts endpoint={`/posts/search/${props.match.params.word}/`} />
      </div>
    </div>
  );
};

export default SearchPage;
