const uploadIcon = "/upload.svg";
const fileIcon = "/fileIcon.svg";

const UploadAutomation = ({ disabled, getUploadFiles, fileList, setFileList }) => {
  const handleUploadFiles = (event) => {
    const fileList = Array.from(event.target.files);
    setFileList(fileList);
    getUploadFiles(fileList);
  };

  const handleClearFiles = () => {
    setFileList([]);
    getUploadFiles([]);
  };

  return (
    <div
      className={`relative shadow-lg flex flex-col items-center justify-center w-full p-10 border rounded-lg ${
        disabled ? "bg-gray-100" : "bg-white cursor-pointer"
      }`}
    >
      {!fileList?.length && (
        <>
          <img src={uploadIcon} alt="" />
          <input disabled={disabled} className="absolute z-10 w-full h-full opacity-0" type="file" onChange={handleUploadFiles} />
          <p className="invert">Upload your own files</p>
        </>
      )}
      <div className="flex flex-wrap items-center gap-3 justify-evenly">
        {fileList?.map((file, index) => (
          <div key={index} className="flex flex-col items-center justify-center w-auto">
            <img src={fileIcon} alt="file icon" />
            <div className="relative">
              <p className="invert">{file.name.length > 25 ? `${file.name.substring(0, 25)}...` : file.name}</p>
              {file.name.length > 10 && (
                <div className="absolute left-0 w-auto p-2 -mt-1 text-xs leading-tight text-white transform -translate-y-full bg-black rounded-lg shadow-lg opacity-0 invert hover:opacity-100">
                  {file.name}
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
      {fileList?.length > 0 && (
        <div className="flex items-center justify-center w-full gap-3 py-3 px-auto">
          <button className="px-2 py-1 text-sm font-semibold text-white bg-red-500 border rounded-lg" onClick={handleClearFiles}>
            {/* <img src={clearIcon} alt="clear icon" />
             */}
            Clear
          </button>
        </div>
      )}
    </div>
  );
};

export default UploadAutomation;
