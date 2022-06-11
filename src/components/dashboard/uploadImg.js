import styled from "@emotion/styled";
import { useEffect, useState, useRef } from "react";
import { BsCloudUpload } from "react-icons/bs";
import "./tableDashboard.css";

const imageMimeType = /image\/(png|jpg|jpeg)/i;

function Upload({ handelChange, name }) {
  const [file, setFile] = useState(null);
  const [fileDataURL, setFileDataURL] = useState(null);

  const ref = useRef();

  const changeHandler = (e) => {
    const file = e.target.files[0];
    if (!file.type.match(imageMimeType)) {
      alert("Image mime type is not valid");
      return;
    }
    setFile(file);
  };
  useEffect(() => {
    let fileReader,
      isCancel = false;
    if (file) {
      fileReader = new FileReader();
      fileReader.onload = (e) => {
        const { result } = e.target;
        if (result && !isCancel) {
          setFileDataURL(result);
          handelChange({ target: { name: "image", value: result } });
        }
      };
      fileReader.readAsDataURL(file);
    }
    return () => {
      isCancel = true;
      if (fileReader && fileReader.readyState === 1) {
        fileReader.abort();
      }
    };
  }, [file]);

  const handleDragOver = (event) => {
    event.stopPropagation();
    event.preventDefault();
    // Style the drag-and-drop as a "copy file" operation.
    event.dataTransfer.dropEffect = "copy";
  };
  // Converts the image into a data URI
  const readImage = (file) => {
    const reader = new FileReader();
    reader.addEventListener("load", (event) => {
      const uploaded_image = event.target.result;
      ref.current.style.backGroundImage = `url(${uploaded_image})`;
    });
    reader.readAsDataURL(file);
  };
  const handleDrop = (event) => {
    event.stopPropagation();
    event.preventDefault();
    let fileList = event.dataTransfer.files;

    document.querySelector("#file_name").textContent = fileList[0].name;

    readImage(fileList[0]);
  };

  return (
    <>
      <form style={{ marginTop: "15px" }}>
        <div
          ref={ref}
          className="drag-drop-zone"
          onDragOver={handleDragOver}
          onDrop={handleDrop}
        >
          <BsCloudUpload className="uploadIcon" />
          Drag & Drop your files here <br />
          <p> OR</p>
          <label htmlFor="image" className="choosFileButton">
            Choose a file
            <input
              type="file"
              id="image"
              hidden
              name={name}
              accept=".png, .jpg, .jpeg"
              onChange={changeHandler}
            />
          </label>
          <p id="file_name"></p>
          {fileDataURL ? (
            <img src={fileDataURL} alt="preview" className="choosen-photo" />
          ) : null}
        </div>
      </form>
    </>
  );
}
export default Upload;
