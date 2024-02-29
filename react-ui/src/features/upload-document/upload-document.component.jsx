import { useState } from "react";
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import { UploadedDocumentCard } from "./uploaded-document-card.component";

export function UploadDocument(props) {
  const [selectedDoc, setSelectedDoc] = useState("");
  function handelUploadDoc(ds) {
    // console.log("hola mgos sf");
    setSelectedDoc(ds);
  }
  return (
    <div className="flex flex-col w-full px-3 text-black">
      {!props.uploaded && (
        <div className="flex items-center justify-center px-16 py-5 mt-12 bg-white border-2 border-dashed rounded-3xl border-slate-300 max-md:px-5 max-md:mt-10 max-md:max-w-full">
          <div className="flex flex-col items-center max-w-full my-12 max-md:my-10">
            <div className="flex gap-2.5 justify-between self-stretch px-20 py-3.5 text-xl leading-8 whitespace-nowrap rounded-xl bg-neutral-100 max-md:px-5">
              <img
                loading="lazy"
                alt="Upload files"
                src="https://cdn.builder.io/api/v1/image/assets/TEMP/011c49511ffad4b9f66238e10f50c1ee347f33596640d2a9aa611edbadc9f011?"
                className="w-8 aspect-square"
              />
              <div className="grow">Upload files</div>
            </div>
            <div className="flex items-center max-w-full gap-4 mt-5 text-base font-semibold leading-6 text-center w-60">
              <img
                loading="lazy"
                alt="Supported formats"
                src="https://cdn.builder.io/api/v1/image/assets/TEMP/f7ec3896fcd55b7f1a3031806dda09ddc363757eb20186b0274859116f63398f?"
                className="self-stretch my-auto aspect-[50] stroke-[1px] stroke-black w-[41px]"
              />
              <div className="self-stretch flex-auto">Supported formats</div>
              <img
                loading="lazy"
                alt="Supported formats"
                src="https://cdn.builder.io/api/v1/image/assets/TEMP/f7ec3896fcd55b7f1a3031806dda09ddc363757eb20186b0274859116f63398f?"
                className="self-stretch my-auto aspect-[50] stroke-[1px] stroke-black w-[41px]"
              />
            </div>
            <img
              loading="lazy"
              alt="Upload document"
              src="https://cdn.builder.io/api/v1/image/assets/TEMP/950028f0fd5325abdc6cd08d3a301a96f99aa5a3c9db95f3d2a5800379e7e92a?"
              className="mt-4 w-60 max-w-full aspect-[5.88]"
            />
          </div>
        </div>
      )}
      {
        props.uploaded && (
          <>
            {Object.keys(props.dataSources).map((ds) => (
              <UploadedDocumentCard
                name={ds}
                options={props.dataSources[ds]}
                selectedDoc={selectedDoc}
                handelUploadDoc={() => {
                  handelUploadDoc(ds);
                }}
              />
              // <a
              //   className="hover:text-blue-500"
              //   key={ds}
              //   href="#"
              //   //  onClick={() => selectOption(ds)}
              // >
              //   {ds}
              // </a>
            ))}
          </>
        )
        // &&props?.fetchedData?.map((item) => <UploadedDocumentCard />)}
      }
      {!props.uploaded && (
        <div className="text-xl font-semibold leading-7 mt-14 max-md:mt-10 max-md:max-w-full">
          Import from URL
        </div>
      )}
      {!props.uploaded && (
        <Input
          placeholder="Add file URL"
          className="items-start justify-center py-8 pl-5 pr-16 mt-3 text-xl font-medium leading-7 text-gray-400 rounded-sm whitespace-nowrap bg-slate-100 max-md:pr-5 max-md:max-w-full"
        />
      )}
      <Button
        className="flex items-center self-center justify-center gap-4 px-20 py-6 mt-12 text-lg leading-7 text-center text-white bg-blue-600 rounded-xl whitespace-nowrap max-md:px-5 max-md:mt-10"
        onClick={() => props.handelcontinue(selectedDoc)}
      >
        Continue
        <img
          loading="lazy"
          alt="Continue"
          src="https://cdn.builder.io/api/v1/image/assets/TEMP/9c3ab869318fc883d2bb66eff501098dc443e670801e9704197a2c2c3d211cb7?"
          className="w-2.5 aspect-square fill-white"
        />
      </Button>
      <div className="flex gap-3.5 self-center mt-8 text-lg leading-7 text-center whitespace-nowrap">
        <div className="grow">Select from connected Data Source</div>
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
