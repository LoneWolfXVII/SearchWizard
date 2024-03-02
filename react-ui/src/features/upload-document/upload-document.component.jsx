import axios from "axios";
import { useRef, useState } from "react";
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import { UploadedDocumentCard } from "./uploaded-document-card.component";

export function UploadDocument(props) {
  const [selectedDoc, setSelectedDoc] = useState("");
  const [selectedDbFile, setSelectedDbFile] = useState();

  async function handleDBSelect() {
    const data = {
      datasource_name: selectedDoc,
    };

    const config = {
      method: "post",
      maxBodyLength: Infinity,
      url: "https://api.irame.ai/knowledge-graph/kg/kg/get_datasource_info",
      headers: {
        accept: "application/json",
        "Content-Type": "application/x-www-form-urlencoded",
      },
      data: data,
    };

    const MAX_RETRIES = 5;
    const RETRY_TIMEOUT = 1000;

    let retryCount = 0;
    let isRequestSuccessful = false;

    while (retryCount < MAX_RETRIES && !isRequestSuccessful) {
      try {
        const response = await axios.request(config);

        if (response.data.status === "Processing") {
          retryCount++;
        } else {
          props.onSelectExistinDB(response?.data);
          isRequestSuccessful = true;
        }
      } catch (error) {
        console.error(error);
      } finally {
        await new Promise((resolve) => setTimeout(resolve, RETRY_TIMEOUT));
      }
    }

    if (!isRequestSuccessful) {
      console.error("Maximum retries reached, process timed out.");
    }
  }

  const fileUrlref = useRef();

  async function handleNewDBAdd() {
    if (!fileUrlref.current.value) {
      alert("Please enter a Data source name first.");
      return;
    }
    let data = new FormData();
    data.append("data_source_name", fileUrlref.current.value);
    data.append("files", selectedDbFile);

    let config = {
      method: "post",
      maxBodyLength: Infinity,
      url: "https://api.irame.ai/knowledge-graph/kg/kg/upload_files",
      headers: {
        accept: "application/json",
      },
      data: data,
    };

    axios
      .request(config)
      .then((res) => {
        props.onSuccessUploadNewDB(res?.data?.datasource_id);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  return (
    <div className="flex flex-col w-full px-3 text-black">
      {!props.uploaded && (
        <div className="flex items-center justify-center px-16 py-5 mt-6 bg-white border-2 border-dashed rounded-3xl border-slate-300 max-md:px-5 max-md:mt-10 max-md:max-w-full">
          {selectedDbFile && (
            <div className="py-12">
              <div
                className={`flex items-center group w-16 justify-center p-2 bg-white hover:bg-gray-700 duration-300 transition-all ease-linear rounded-md cursor-pointer`}
              >
                <div
                  onClick={() => setSelectedDbFile(null)}
                  className="h-[36px] w-[36px] hidden group-hover:flex rounded-full p-1 bg-white"
                >
                  <img src="/trash.svg" alt="excel" width={30} height={30} />
                </div>

                <img
                  className="group-hover:hidden"
                  src="/vscode-icons_file-type-excel.svg"
                  alt="excel"
                  width={36}
                  height={36}
                />
              </div>

              <p className="w-20 overflow-hidden text-sm text-center line-clamp-1 text-ellipsis">
                {selectedDbFile?.name}
              </p>
            </div>
          )}
          {!selectedDbFile && (
            <div className="flex flex-col items-center max-w-full my-5 max-md:my-10">
              <div className="relative flex self-stretch justify-between px-20 py-1 text-base font-semibold leading-8 cursor-pointer whitespace-nowrap rounded-xl bg-neutral-100 max-md:px-5">
                <img
                  loading="lazy"
                  alt="Upload files"
                  src="https://cdn.builder.io/api/v1/image/assets/TEMP/011c49511ffad4b9f66238e10f50c1ee347f33596640d2a9aa611edbadc9f011?"
                  className="w-8 aspect-square"
                />
                <input
                  type="file"
                  onChange={(e) => setSelectedDbFile(e.target.files[0])}
                  className="absolute top-0 left-0 z-10 w-full h-full opacity-0 cursor-pointer"
                />
                <div className="grow">Upload files</div>
              </div>
              <div className="flex items-center max-w-full gap-4 mt-5 text-sm font-semibold leading-6 text-center w-60">
                <img
                  loading="lazy"
                  alt="Supported formats"
                  src="https://cdn.builder.io/api/v1/image/assets/TEMP/f7ec3896fcd55b7f1a3031806dda09ddc363757eb20186b0274859116f63398f?"
                  className="self-stretch my-auto aspect-[50] stroke-[1px] stroke-black w-[41px]"
                  width={16}
                  height={16}
                />
                <div className="self-stretch flex-auto flex-nowrap whitespace-nowrap">
                  Supported formats
                </div>
                <img
                  loading="lazy"
                  alt="Supported formats"
                  src="https://cdn.builder.io/api/v1/image/assets/TEMP/f7ec3896fcd55b7f1a3031806dda09ddc363757eb20186b0274859116f63398f?"
                  className="self-stretch my-auto aspect-[50] stroke-[1px] stroke-black w-[41px]"
                  width={16}
                  height={16}
                />
              </div>
              <img
                loading="lazy"
                alt="Upload document"
                src="https://cdn.builder.io/api/v1/image/assets/TEMP/950028f0fd5325abdc6cd08d3a301a96f99aa5a3c9db95f3d2a5800379e7e92a?"
                className="mt-4 w-60 max-w-full aspect-[5.88]"
                width={16}
                height={16}
              />
            </div>
          )}
        </div>
      )}
      {props.uploaded && (
        <div className="flex flex-col gap-4 mt-10 overflow-x-hidden overflow-y-auto max-h-80">
          <UploadedDocumentCard
            handelDBSelect={(item) => setSelectedDoc(item)}
          />
        </div>
      )}
      {!props.uploaded && (
        <div className="mt-10 text-base font-bold leading-7 max-md:mt-10 max-md:max-w-full">
          Enter dataset name
        </div>
      )}
      {!props.uploaded && (
        <Input
          ref={fileUrlref}
          placeholder="Add dataset name"
          className="items-start justify-center py-1 pl-5 pr-16 mt-3 text-base font-medium leading-7 text-gray-400 rounded-sm whitespace-nowrap bg-slate-100 max-md:pr-5 max-md:max-w-full"
        />
      )}
      <Button
        className="flex items-center self-center justify-center gap-4 px-20 py-3 mt-8 text-base leading-7 text-center text-white bg-blue-600 rounded-xl whitespace-nowrap max-md:px-5 max-md:mt-10"
        onClick={() => {
          if (props.uploaded) handleDBSelect();
          else handleNewDBAdd();
        }}
      >
        Continue
        <img
          loading="lazy"
          alt="Continue"
          src="https://cdn.builder.io/api/v1/image/assets/TEMP/9c3ab869318fc883d2bb66eff501098dc443e670801e9704197a2c2c3d211cb7?"
          className="w-2.5 aspect-square fill-white"
        />
      </Button>
      <div className="flex gap-3.5 self-center mt-1 text-base leading-7 font-semibold text-center whitespace-nowrap">
        <div
          onClickCapture={() =>
            props.onSelectDataSources(props.uploaded ? false : true)
          }
          className="cursor-pointer grow"
        >
          {props.uploaded
            ? "Upload dataset"
            : "Select from connected Data Source"}
        </div>
        <img
          loading="lazy"
          alt="Select from connected Data Source"
          src="https://cdn.builder.io/api/v1/image/assets/TEMP/e4b158eecfeff4430cd0853dfdf52818b966a400b30aa91a8ece206ee58a6e30?"
          className="my-auto w-2.5 aspect-square fill-black"
        />
      </div>
    </div>
  );
}
