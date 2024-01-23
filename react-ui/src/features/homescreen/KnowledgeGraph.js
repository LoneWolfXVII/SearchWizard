import React, { useState } from "react";
import { Button } from "../../components/ui/button";
import Toggle from "../../components/ui/toggle.component";
import BalckArrowSvg from "./Waitlist_Assets/blackArrow.svg";
import ArrowSvg from "./Waitlist_Assets/arow.svg";

const KnowledgeGraph = () => {
  const [uploadedFiles, setUploadedFiles] = useState([]);
  const [isDeleteIconVisible, setIsDeleteIconVisible] = useState(false);

  function handleUploadedfiles(e) {
    const filesArray = Array.from(e.target.files);
    setUploadedFiles(filesArray);
  }

  const handleRemoveFile = (index) => {
    const updatedFiles = [...uploadedFiles];
    updatedFiles.splice(index, 1);
    setUploadedFiles(updatedFiles);
  };

  return (
    <section className="px-4">
      <div className="flex justify-between">
        <h2 className="text-3xl font-bold text-white phonk-font">
          Knowledge Graph
          <br />
          Playground
        </h2>
        <Button className="tracking-widest rounded-3xl">
          Join the waitlist
          <img src={ArrowSvg} alt="Arrow" className="ml-1" />
        </Button>
      </div>

      <div className="flex flex-col items-center justify-center gap-5 my-16 text-white md:px-36 py-28" style={KnowledgeGraphStyle}>
        {uploadedFiles?.length === 0 ? (
          <>
            <h4 className="text-4xl font-semibold text-center">Analyse a PDF Text with Irame.ai</h4>
            <p className="px-2 py-1 tracking-wider text-center md:px-24 text-md opacity-80">
              First, visualize data and analyze text to identify key idea clusters. This provides a broad overview of the PDF document before delving
              into specific questions.
            </p>
          </>
        ) : (
          uploadedFiles?.map((_, index) => {
            return (
              <div
                onMouseEnter={() => {
                  setIsDeleteIconVisible(true);
                }}
                onMouseLeave={() => {
                  setIsDeleteIconVisible(false);
                }}
                key={index + 1}
                className={`flex items-center justify-center p-2 ${isDeleteIconVisible ? "bg-gray-700" : "bg-white"} rounded-md cursor-pointer`}
              >
                {isDeleteIconVisible ? (
                  <div onClick={() => handleRemoveFile(index)} className="h-[36px] w-[36px] rounded-full p-1 bg-white">
                    <img src="/trash.svg" alt="excel" width={30} height={30} />
                  </div>
                ) : (
                  <img src="/vscode-icons_file-type-excel.svg" alt="excel" width={36} height={36} />
                )}
              </div>
            );
          })
        )}
        <Button className="relative text-black bg-white md:px-28 hover:bg-gray-200">
          {uploadedFiles?.length === 0 && (
            <input type="file" className="absolute z-10 w-full opacity-0 cursor-pointer" onChange={(e) => handleUploadedfiles(e)} />
          )}
          {uploadedFiles?.length === 0 ? "Create your own datasheet" : "Save data set"}
          <img src={BalckArrowSvg} alt="Arrow" className="ml-2" />
        </Button>
        <span className="flex gap-2">
          <label>Use sample data set</label>
          <Toggle onValueChange={() => {}} />
        </span>
      </div>
    </section>
  );
};

const KnowledgeGraphStyle = {
  borderRadius: "50px",
  border: "2px solid rgba(255, 255, 255, 0.64)",
  background:
    "radial-gradient(228% 117.58% at 24.99% 43.36%, rgba(51, 71, 255, 0.40) 0%, rgba(223, 226, 255, 0.22) 74.98%, rgba(107, 122, 255, 0.40) 100%)",
  backdropFilter: "blur(7.637977123260498px)",
};

export default KnowledgeGraph;
