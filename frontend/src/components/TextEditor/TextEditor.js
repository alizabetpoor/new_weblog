import { Editor } from "react-draft-wysiwyg";

import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
const TextEditor = ({ editorState, setEditorState }) => {
  return (
    <div
      className="w-full"
      style={{
        border: "1px solid black",
        borderRadius: "10px",
        padding: "8px",
        minHeight: "400px",
        direction: "ltr",
        backgroundColor: "white",
        minWidth: "70%",
      }}
    >
      <Editor editorState={editorState} onEditorStateChange={setEditorState} />
    </div>
  );
};

export default TextEditor;
