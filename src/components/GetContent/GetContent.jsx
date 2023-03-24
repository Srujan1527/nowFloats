import { listAll, getDownloadURL, ref } from "firebase/storage";

import React, { useState, useEffect } from "react";
import {
  getAllDocumentsFromCollection,
  storage,
} from "../../utils/Firebase/firebase";
import { FileViewer } from "../FileViewer/FileViewer";
import "./GetContent.css";

const GetContent = () => {
  const [urlExtensions, setUrlExtensions] = useState([]);
  var extensionsArray = [];
  const [folderNames, setFolderNames] = useState([]);
  const [urls, setUrls] = useState(new Set());
  var result = [];

  useEffect(() => {
    const fetchDocsFromStorage = (email) => {
      const listRef = ref(storage, `${email}`);

      listAll(listRef)
        .then((res) => {
          const promises = res.items.map((itemRef) =>
            getDownloadURL(itemRef).then((url) => url)
          );
          Promise.all(promises).then((urls) => {
            urls.forEach((each) => {
              const extensionList = each.split("?");
              const extension = extensionList[0].split(".").pop();
              extensionsArray.push(extension);

              setUrls((prevUrls) => new Set([...prevUrls, each]));
              setUrlExtensions(extensionsArray);
            });
          });
        })
        .catch((err) => console.log("Error Occurred", err));
    };

    folderNames.forEach((email) => {
      fetchDocsFromStorage(email);
    });
  }, [folderNames]);

  useEffect(() => {
    const fetchDocs = async () => {
      const response = await getAllDocumentsFromCollection();
      response.forEach((doc) => result.push(doc.data().email));
      setFolderNames(result);
    };
    fetchDocs();
  }, []);

  console.log(urls);
  console.log(urlExtensions);
  return (
    <div className="content-container">
      <h1 className="content-heading">Content</h1>
      <div className="items-container">
        <FileViewer urls={[...urls]} urlExtensions={urlExtensions} />
      </div>
    </div>
  );
};

export default GetContent;
