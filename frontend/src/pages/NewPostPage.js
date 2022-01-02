import { useEffect, useState } from "react";
import { EditorState, convertToRaw } from "draft-js";
import TextEditor from "../components/TextEditor/TextEditor";
import useAxios from "../utils/UseAxios";
import Uploader from "../components/Uploader/Uploader";
import draftToHtml from "draftjs-to-html";
import Select from "react-select";
import { useToasts } from "react-toast-notifications";

const NewPostPage = (props) => {
  const api = useAxios();
  const [categoryOptions, setCategoryOptions] = useState([]);
  const [formState, setFormState] = useState({
    pic: null,
    title: "",
    selectedCategory: null,
  });
  const { addToast } = useToasts();
  const categoryHandler = (selectedOption) => {
    setFormState({ ...formState, selectedCategory: selectedOption });
  };
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
    let category = formState.selectedCategory.value;

    let data = new FormData();
    data.append("image", photo);
    data.append("title", formState.title);
    data.append("text", text);
    data.append("category", category);
    api
      .post("/posts/", data)
      .then((res) => {
        console.log(res);
        if (res.status === 201 && res.statusText === "Created") {
          addToast("پست شما با موفقیت ساخته شد", {
            appearance: "success",
            autoDismiss: true,
          });
          props.history.push(`/post/${res.data.id}`);
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
  useEffect(() => {
    api
      .get("/categorys/")
      .then((res) => {
        let categorylist = [];
        res.data.forEach((category) => {
          categorylist.push({ value: category.id, label: category.name });
        });
        setCategoryOptions(categorylist);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
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
          <label htmlFor="category" className="self-start">
            دسته بندی
          </label>
          <Select
            value={formState.selectedCategory}
            onChange={categoryHandler}
            options={categoryOptions}
          />
          <label className="self-start">تصویر پست</label>
          <div className="h-56 w-1/2 self-center">
            <Uploader formChange={formChange} />
          </div>
          <TextEditor
            editorState={editorState}
            setEditorState={setEditorState}
          />
          <button
            className={`py-2 ${
              formState.pic &&
              formState.selectedCategory &&
              formState.title &&
              editorState.getCurrentContent().getPlainText()
                ? "bg-blue-500 hover:bg-blue-600"
                : "bg-blue-200"
            }  transition-colors rounded-md text-white`}
            type="submit"
            disabled={
              !formState.pic ||
              !formState.selectedCategory ||
              !formState.title ||
              !editorState.getCurrentContent().getPlainText()
            }
          >
            ارسال پست
          </button>
        </form>
      </div>
    </div>
  );
};

export default NewPostPage;
