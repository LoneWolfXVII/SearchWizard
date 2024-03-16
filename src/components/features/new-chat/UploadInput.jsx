import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import { useDropzone } from "react-dropzone";
import PropTypes from "prop-types";
import { welcomeTypography } from "./config";
import { Progress } from "@/components/ui/progress";

const UploadInput = ({ onFileUpload, files, setFiles, progress }) => {
  useEffect(() => {
    console.log(progress);
  }, [progress]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    accept: "image/*, application/pdf, text/csv",
    onDrop: (acceptedFiles) => {
      setFiles((prevFiles) => {
        if (!Array.isArray(prevFiles)) {
          prevFiles = [];
        }
        return [...prevFiles, ...acceptedFiles];
      });
      onFileUpload(acceptedFiles); // Pass uploaded files to parent component if needed
    },
  });
  const handleRemoveFile = (e, file, idx) => {
    e.preventDefault();
    e.stopPropagation();
    let tempArr = [...files];
    tempArr.splice(idx, 1);
    setFiles(tempArr);
  };

  return (
    <div
      className={`border border-dashed border-purple-24 bg-purple-2 py-6 rounded-2xl flex justify-center ${
        isDragActive ? "border-primary80" : ""
      }`}
      {...getRootProps()}
    >
      <div className="flex flex-col">
        <input {...getInputProps()} />
        {isDragActive ? (
          <p className="text-primary80 flex flex-col gap-1 text-center w-[29.5rem] h-[22.5rem]">
            Drop the files here...
          </p>
        ) : (
          <>
            <div className="flex flex-col gap-1 text-center w-[29.5rem]">
              <h2 className="text-4xl font-semibold text-primary80">
                {welcomeTypography?.subHeading1}
              </h2>
              <p className="text-sm font-medium text-primary80">
                {welcomeTypography.subHeading2}
              </p>
              <div className="relative w-full py-6">
                <p className="or-tagline px-[5px] text-xs text-purple-20">OR</p>
              </div>
              <div className="flex gap-2 justify-center w-full">
                <Button variant="secondary" className="w-full bg-purple-8 hover:bg-purple-16 text-purple-100 font-medium">
                  {welcomeTypography?.btn1Text}
                </Button>
                <Button variant="outline" className="w-full hover:bg-purple-8 border-purple-8 text-purple-100 font-medium hover:text-purple-100">
                  {welcomeTypography?.btn2Text}
                </Button>
              </div>
              <div
                className="flex cursor-pointer items-center justify-center mt-6 gap-2"
                onClick={(e) => {}}
              >
                <p className="text-sm font-medium leading-4 text-primary100">
                  {welcomeTypography?.fileStructure}
                </p>
              </div>
            </div>
          </>
        )}
        <div className="w-full flex mt-6 gap-3 flex-col ">
          {files?.map((file, idx) => (
            <div
              className="px-4 py-2.5 z-10 bg-purple-4 rounded-sm "
              key={file.name}
            >
              <div className="flex justify-between">
                <p className="text-sm text-purple-100">{file.name}</p>
                <span
                  onClick={(e) => handleRemoveFile(e, file, idx)}
                  className="flex items-center gap-4 text-sm font-medium cursor-pointer"
                >
                  {progress < 100 ? <p>uploading...</p> : null}x
                </span>
              </div>
              {progress <= 99.99 ? (
                <div className="mt-4">
                  <Progress value={progress} />
                </div>
              ) : null}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

UploadInput.propTypes = {
  onFileUpload: PropTypes.func,
  files: PropTypes.array,
  setFiles: PropTypes.func,
};

export default UploadInput;
