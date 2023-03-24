import React from "react";
import "./fileViewer.css";
export const FileViewer = ({ urls, urlExtensions }) => {
  return (
    <div>
      {urls.map((url, index) => {
        const fileExtension = urlExtensions[index];
        if (
          fileExtension === "jpg" ||
          fileExtension === "png" ||
          fileExtension === "JPG" ||
          fileExtension === "jpeg"
        ) {
          return <img key={url} src={url} alt="Images" className="image" />;
        } else if (fileExtension === "mp4" || fileExtension === "avi") {
          return (
            <video key={url} controls className="video">
              <source src={url} type={`video/${fileExtension}`} />
            </video>
          );
        } else {
          return <p key={url}>Unsupported file type</p>;
        }
      })}
    </div>
  );
};
