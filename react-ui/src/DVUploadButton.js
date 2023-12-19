import React from "react";
import "./DocumentVerification.css";

const UploadButton = ({ onFileSelect }) => {
  // This function is called when a file is selected
  const handleFileInput = (e) => {
    // Pass the selected file up to the parent component

    localStorage.mainFile = e.target.files[0];

    onFileSelect(e.target.files[0]);
  };

  return (
    <div className="upload-container">
      <input
        type="file"
        id="file-upload"
        className="file-input"
        onChange={handleFileInput}
        hidden // This hides the default file input
      />
      <label htmlFor="file-upload" className="upload-button">
        <img src="/dv-upload.svg" alt="Upload" className="upload-icon" />
        Upload document
      </label>
    </div>
  );
};

export default UploadButton;
