import React, { useState } from "react";
import { Button } from "../../components/ui/button";
import Toggle from "../../components/ui/toggle.component";
import BalckArrowSvg from "./Waitlist_Assets/blackArrow.svg";
import ArrowSvg from "./Waitlist_Assets/arow.svg";
import { Input } from "../../components/ui/input";
import { useRef } from "react";
import axios from "axios";
import { Divide } from "lucide-react";

const KnowledgeGraph = ({ setDataSourceId, onSuccessfulUpload }) => {
  const [uploadedFiles, setUploadedFiles] = useState([]);
  const dbInputRef = useRef();

  const handleUploadedfiles = (e) => {
    const filesArray = Array.from(e.target.files);
    setUploadedFiles(filesArray);
  };

  const handleRemoveFile = (index) => {
    const updatedFiles = [...uploadedFiles];
    updatedFiles.splice(index, 1);
    setUploadedFiles(updatedFiles);
  };

  const dataSetHandler = async () => {
    if (uploadedFiles?.length === 0) return;
    const dbName = dbInputRef.current.value;

    try {
      if (dbName) {
        uploadedFiles.forEach(async (file) => {
          const formData = new FormData();
          formData.append("file", file);
          formData.append("data_source_name", dbName);
          const res = await axios.post("http://3.111.174.29:8080/kg/upload_file", formData);
          setDataSourceId(res?.data?.datasource_id);
        });

        onSuccessfulUpload();
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <section className="px-4">
      <div className="flex justify-between">
        <h2 className="text-3xl font-bold text-white phonk-font">
          Knowledge Graph
          <br />
          Playground
        </h2>
        <Button className="tracking-widest rounded-3xl bg-[#076eff]">
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
          <div className="flex flex-wrap items-center gap-4">
            {uploadedFiles?.map((file, index) => {
              return (
                <div>
                  <div
                    key={file?.name || index + 1}
                    className={`flex items-center group w-16 justify-center p-2 bg-white hover:bg-gray-700 duration-300 transition-all ease-linear rounded-md cursor-pointer`}
                  >
                    <div onClick={() => handleRemoveFile(index)} className="h-[36px] w-[36px] hidden group-hover:flex rounded-full p-1 bg-white">
                      <img src="/trash.svg" alt="excel" width={30} height={30} />
                    </div>

                    <img className="group-hover:hidden" src="/vscode-icons_file-type-excel.svg" alt="excel" width={36} height={36} />
                  </div>

                  <p className="w-20 overflow-hidden text-sm text-center line-clamp-1 text-ellipsis">{file?.name}</p>
                </div>
              );
            })}
          </div>
        )}

        <div className="flex flex-col w-11/12 gap-3 md:w-5/12">
          <Input placeholder="Enter database name" ref={dbInputRef} className={`text-black ${uploadedFiles?.length > 0 ? "hidden" : ""}`} />
          <Button onClick={dataSetHandler} className="relative text-black bg-white md:px-28 hover:bg-gray-200">
            {uploadedFiles?.length === 0 && (
              <input multiple type="file" className="absolute z-10 w-full opacity-0 cursor-pointer" onChange={(e) => handleUploadedfiles(e)} />
            )}
            {uploadedFiles?.length === 0 ? "Create your own datasheet" : "Save data set"}
            <img src={BalckArrowSvg} alt="Arrow" className="ml-2" />
          </Button>
        </div>
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
