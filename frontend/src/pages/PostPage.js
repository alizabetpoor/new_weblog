import FullPost from "../components/FullPost/FullPost";
const PostPage = (props) => {
  return (
    <div className="flex justify-center">
      <FullPost {...props} />
    </div>
  );
};

export default PostPage;
