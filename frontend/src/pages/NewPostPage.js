import { useState } from "react";
import { EditorState, convertToRaw } from "draft-js";
import TextEditor from "../components/TextEditor/TextEditor";
import useAxios from "../utils/UseAxios";
import draftToHtml from "draftjs-to-html";
import { useToasts } from "react-toast-notifications";

const NewPostPage = (props) => {
  const api = useAxios();
  const [formState, setFormState] = useState({
    pic: null,
    link: "",
    title: "",
  });
  const { addToast } = useToasts();

  const [editorState, setEditorState] = useState(() =>
    EditorState.createEmpty()
  );
  const formChange = (e) => {
    if (e.target.name === "pic") {
      setFormState({ ...formState, [e.target.name]: e.target.files[0] });
    } else {
      setFormState({ ...formState, [e.target.name]: e.target.value });
    }
  };
  const submitForm = (e) => {
    e.preventDefault();
    console.log(formState);
    let text = draftToHtml(convertToRaw(editorState.getCurrentContent()));
    let photo = formState.pic;
    let data = new FormData();
    data.append("image", photo);
    data.append("title", formState.title);
    data.append("slug", formState.link);
    data.append("text", text);
    api
      .post("/posts/", data)
      .then((res) => {
        console.log(res);
        if (res.status === 201 && res.statusText === "Created") {
          addToast("پست شما با موفقیت ساخته شد", {
            appearance: "success",
            autoDismiss: true,
          });
          // props.history.push(`/post/${formState.link}`);
        }
      })
      .catch((err) => {
        console.log(err);
        addToast("مشکلی به وجود آمد", {
          appearance: "error",
          autoDismiss: true,
        });
      });
  };
  return (
    <div className="py-3">
      <div className="flex justify-center">
        <form onSubmit={submitForm} className="flex flex-col space-y-4">
          <label htmlFor="title" className="self-start">
            عنوان پست
          </label>
          <input
            onChange={formChange}
            type="text"
            name="title"
            id="title"
            placeholder="عنوان پست"
          />
          <label htmlFor="link" className="self-start">
            لینک پست
          </label>
          <input
            onChange={formChange}
            type="text"
            name="link"
            id="link"
            placeholder="لینک پست"
          />
          <label htmlFor="pic" className="self-start">
            تصویر پست
          </label>
          <input onChange={formChange} id="pic" name="pic" type="file" />

          <TextEditor
            editorState={editorState}
            setEditorState={setEditorState}
          />
          <button
            className="bg-blue-500 rounded-md py-2 text-white"
            type="submit"
          >
            ارسال پست
          </button>
        </form>
      </div>
    </div>
  );
};

export default NewPostPage;
