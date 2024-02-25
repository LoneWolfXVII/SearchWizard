import axios from "axios";
import React, { useState } from "react";
const uploadIcon = "/upload.svg";
const fileIcon = "/fileIcon.svg";

const Upload = ({ onUploadDone, dataSource, setDataSource }) => {
  const [uploadedFiles, setUploadedFiles] = useState([]);

  const handleUploadFiles = (event) => {
    const fileList = Array.from(event.target.files);
    setUploadedFiles(fileList);
  };

  const handleClearFiles = () => {
    setUploadedFiles([]);
    setDataSource("");
  };

  const handleSaveDataSource = async (callback) => {
    const formData = new FormData();
    formData.append("datasource_name", dataSource);
    formData.append("class", "text_docs");
    try {
      const res = await axios.post(
        "http://3.111.174.29:8080/create_new_datasource",
        formData,
      );
      if (res.status !== 200) {
        throw new Error(`Unexpected status code: ${res.status}`);
      }

      callback(res?.data?.datasource_id);

    } catch (error) {
      console.error(error);
    }
  };

  const handleUploadButton = async (dataSourceId) => {
    const uploadPromises = uploadedFiles.map((file, index) => {
      const formData = new FormData();
      formData.append("datasource_id", dataSourceId);
      formData.append("data_file", file);
      if (uploadedFiles.length - 1 === index) {
        formData.append("status", "done");
      }

      return axios.post(
        "http://3.111.174.29:8080/upload_datasource_files",
        formData,
      );
    });

    try {
      const responses = await Promise.all(uploadPromises);
      responses.forEach((res) => {
        if (res.status !== 200) {
          throw new Error(`Unexpected status code: ${res.status}`);
        }
      });
      onUploadDone();
      handleClearFiles();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div
      className={`relative shadow-lg flex flex-col items-center justify-center w-full py-5 border rounded-lg 
      bg-gray-100 cursor-pointer"
      `}
    >
      {!uploadedFiles?.length && (
        <>
          <div className="flex gap-2 items-center font-semibold">
            <img src={uploadIcon} alt="" />
            <p className="text-black">Upload your own files</p>
          </div>
          <input
            className="absolute z-10 w-full h-full opacity-0"
            type="file"
            onChange={handleUploadFiles}
            multiple
          />
        </>
      )}
      <div className="flex flex-wrap items-center gap-3 justify-evenly">
        {uploadedFiles?.map((file, index) => (
          <div
            key={index}
            className="flex flex-col items-center justify-center w-auto"
          >
            <img src={fileIcon} alt="file icon" />
            <div className="relative">
              <p>
                {file.name.length > 10
                  ? `${file.name.substring(0, 10)}...`
                  : file.name}
              </p>
              {file.name.length > 10 && (
                <div className="absolute left-0 w-auto p-2 -mt-1 text-xs leading-tight text-white transform -translate-y-full bg-black rounded-lg shadow-lg opacity-0 hover:opacity-100">
                  {file.name}
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
      {uploadedFiles?.length > 0 && (
        <div className="flex items-center justify-center w-full gap-3 py-3 px-auto">
          <button
            className="px-2 py-1 text-sm font-semibold text-white bg-red-500 border rounded-lg"
            onClick={handleClearFiles}
          >
            {/* <img src={clearIcon} alt="clear icon" />
             */}
            Clear
          </button>
          <button
            className="px-2 py-1 text-sm font-semibold text-white bg-blue-500 border rounded-lg"
            onClick={() => handleSaveDataSource(handleUploadButton)}
          >
            {/* <img src={uploadButtonIcon} alt="upload button icon" /> */}
            Upload
          </button>
        </div>
      )}
    </div>
  );
};

export default Upload;
