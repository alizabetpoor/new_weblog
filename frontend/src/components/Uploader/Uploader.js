import { useRef, useState } from "react";
import { BiCloudUpload } from "react-icons/bi";
import { useToasts } from "react-toast-notifications";
const Uploader = ({ formChange }) => {
  const { addToast } = useToasts();
  const dragAreaRef = useRef();
  const imgRef = useRef();
  const inputRef = useRef();
  const [img, setImg] = useState(false);
  const [dragOver, setDragOver] = useState(false);

  const showImage = (file) => {
    let fileType = file.type;
    let validImage = ["image/jpeg", "image/jpg", "image/png"];
    if (validImage.includes(fileType)) {
      let fileReader = new FileReader();
      fileReader.onload = () => {
        let fileUrl = fileReader.result;
        setImg(true);
        imgRef.current.src = fileUrl;
      };
      fileReader.readAsDataURL(file);
    } else {
      addToast("فایل مورد نظر عکس نیست", {
        appearance: "error",
        autoDismiss: true,
        placement: "top-left",
      });
    }

    setDragOver(false);
  };
  const btnHandler = () => {
    inputRef.current.click();
  };
  const setImageInput = (e) => {
    try {
      let file = e.target.files[0];
      formChange(e);
      showImage(file);
    } catch {
      setImg(false);
      setDragOver(false);
    }
  };
  const dragOverFunc = (e) => {
    e.preventDefault();
    setImg(false);
    //   console.log("drag over shod");
    setDragOver(true);
  };
  const dragLeave = () => {
    //   console.log("drag leave shod");
    setDragOver(false);
  };

  const drop = (e) => {
    e.preventDefault();
    try {
      let file = e.dataTransfer.files[0];
      showImage(file);
    } catch (err) {
      setImg(false);
      setDragOver(false);
    }
  };
  const deletePhoto = () => {
    setDragOver(false);
    setImg(false);
    let e = {
      target: {
        files: [null],
        name: "pic",
      },
    };
    formChange(e);
  };
  return (
    <div className="flex justify-center items-center p-4 flex-col space-y-2 h-full bg-purple-800  text-white">
      {img && (
        <button
          className="py-1 px-3 rounded-md bg-red-600 text-white"
          onClick={deletePhoto}
        >
          حذف عکس
        </button>
      )}
      <div
        ref={dragAreaRef}
        onDragOver={dragOverFunc}
        onDragLeave={dragLeave}
        onDrop={drop}
        className={`uploader-container ${
          dragOver || img ? "border-solid" : "border-dashed"
        } space-y-2 border-2 border-white flex flex-col justify-center items-center h-4/5 w-4/5 p-1`}
      >
        {dragOver ? (
          <p className="text-xl">فایل رو رها کنید</p>
        ) : (
          <>
            {img ? (
              <img
                ref={imgRef}
                className="object-contain h-full w-full"
                src=""
                alt=""
              />
            ) : (
              <>
                <BiCloudUpload className="h-20 w-20" />
                <p className="text-xl">برای بارگذاری بکش و رها کن</p>
                <p className="text-xl">یا</p>

                <button
                  onClick={btnHandler}
                  type="button"
                  className="text-purple-800 rounded-md bg-white py-1 px-3"
                >
                  انتخاب کن
                </button>
              </>
            )}
            <input
              ref={inputRef}
              onChange={setImageInput}
              type="file"
              className="sr-only"
              id="pic"
              name="pic"
            />
          </>
        )}
      </div>
    </div>
  );
};

export default Uploader;
