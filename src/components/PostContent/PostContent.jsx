import React, { useState, useContext } from "react";
import "./PostContent.css";

import { UserContext } from "../../context/userContext";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { storage } from "../../utils/Firebase/firebase";
import { useNavigate } from "react-router-dom";

const PostContent = () => {
  const navigate = useNavigate();
  const [file, setFile] = useState("");
  const [text, setText] = useState(""); // progress

  const { currentUser } = useContext(UserContext);
  const folderName = currentUser.email;
  const [percent, setPercent] = useState(0); // Handle file upload event and update state
  function handleChange(event) {
    setFile(event.target.files[0]);
  }
  const handleUpload = () => {
    if (!file) {
      alert("Please upload an image first!");
    }
    const storageRef = ref(storage, `/${folderName}/${file.name}/`); // progress can be paused and resumed. It also exposes progress updates. // Receives the storage reference and the file to upload.
    const uploadTask = uploadBytesResumable(storageRef, file);
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const percent = Math.round(
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        ); // update progress
        setPercent(percent);
      },
      (err) => console.log(err),
      () => {
        // download url
        getDownloadURL(uploadTask.snapshot.ref).then((url) => {
          console.log(url);
        });
      }
    );
  };
  const goBack = () => {
    navigate("/");
  };
  return (
    <div data-testid="post-content" className="post-content-container">
      <p className="paragraph">Please select only images and videos</p>
      <input type="file" onChange={handleChange} className="post-input" />

      <button onClick={handleUpload} className="button">
        Upload to Firebase
      </button>
      <p className="heading">{percent}% done</p>
      {/* <p>Enter the Text</p>
      <input rows={5} cols={30} onChange={(e) => setText(e.target.value)} />
      <button onClick={handleFileUpload}>Upload to FireBase</button>
      <p>{percent}% done</p> */}
      <button onClick={goBack} className="button">
        Back
      </button>
    </div>
  );
};

export default PostContent;
