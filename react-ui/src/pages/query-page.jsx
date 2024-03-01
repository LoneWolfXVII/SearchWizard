import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "../components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTrigger,
} from "../components/ui/dialog";
import { Input } from "../components/ui/input";
import { UploadDocument } from "../features/upload-document/upload-document.component";

function WelcomeMessage() {
  return (
    <section className="mt-8 ml-20 text-3xl text-center max-md:max-w-full">
      <h2>
        To get started,
        <span className="font-semibold"> simply type your questions.</span>
      </h2>
    </section>
  );
}

function ImageWithAlt({ src, alt, className }) {
  return (
    <img
      loading="lazy"
      src={src}
      alt={alt}
      className={`aspect-square ${className}`}
    />
  );
}

export function QueryPage({ fetchedData, dataSources }) {
  // console.log(fetchedData);
  const navigate = useNavigate();
  const [inputValue, setInputValue] = useState("");
  const [SelectedFile, setSelectedFile] = useState("");

  const [UploadboxOpen, setUploadboxOpen] = useState(false);

  const [isUploadDB, setIsUploadDB] = useState(false);

  async function onSearch() {
    if (!inputValue || !SelectedFile) return;

    console.log("final submit is working ", SelectedFile);
    // navigate("/a");
    var myHeaders = new Headers();
    myHeaders.append("accept", "application/json");
    myHeaders.append("Content-Type", "application/x-www-form-urlencoded");

    var urlencoded = new URLSearchParams();
    urlencoded.append("query", inputValue);
    urlencoded.append("datasource_id", SelectedFile);

    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: urlencoded,
      redirect: "follow",
    };

    fetch("https://api.irame.ai/knowledge-graph/kg/kg/query_kg", requestOptions)
      .then((response) => response.json())
      .then((result) => {
        if (result?.query_id) {
          navigate("/chat", {
            state: { selecteddata: SelectedFile, name: result.query_id },
          });
        }
      })
      .catch((error) => console.log("error", error));
    setInputValue("");
    setSelectedFile("");
  }

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      event.preventDefault();
      // handleSearch();
      onSearch();
    }
  };
  function handelcontinue(ds) {
    setUploadboxOpen(false);
    setSelectedFile(ds);
    console.log("continue   ", ds);
  }

  return (
    <>
      <main className="flex flex-col items-center px-20 overflow-auto text-black bg-white max-md:px-5">
        <ImageWithAlt
          src="https://cdn.builder.io/api/v1/image/assets/TEMP/b819442815b2b58decba5c9068357da5aa7ffaab50aa8f2fa76560e57e6bf800?apiKey=31468f0b56654704a0c955257a9b20f9&"
          alt="Logo"
          className="ml-20 aspect-square w-[50px] max-md:mt-10"
        />
        <WelcomeMessage />
        <ImageWithAlt
          src="https://cdn.builder.io/api/v1/image/assets/TEMP/1dd559497ad071ab5c1e22202a33f43a8dcab2a768a0794f067d59e536deeec8?apiKey=31468f0b56654704a0c955257a9b20f9&"
          alt="Example illustration"
          className="max-w-full aspect-square w-[400px]"
        />
        <footer className="flex gap-5 justify-between items-start p-2 mt-20 w-full text-2xl font-medium leading-10 whitespace-nowrap bg-white rounded-xl border border-solid border-neutral-400 max-w-[1540px] max-md:flex-wrap max-md:mt-10 max-md:max-w-full">
          <Dialog
            open={UploadboxOpen}
            onOpenChange={(data) => {
              setUploadboxOpen(data);
              if (data === false) setIsUploadDB(false);
            }}
          >
            <DialogTrigger>
              <ImageWithAlt
                src="https://cdn.builder.io/api/v1/image/assets/TEMP/8bf69877806be500d2c20c5ac79bc0421832a89a088395cd5bc42647232eb60d?apiKey=31468f0b56654704a0c955257a9b20f9&"
                alt="Icon"
                className={"w-[40px] max-md:w-[30px] cursor-pointer"}
              />
            </DialogTrigger>
            <DialogContent className="md:max-w-[60rem] h-[70vh] max-h-screen px-10">
              <DialogHeader>
                <h2 className="text-2xl font-bold">Upload document</h2>
              </DialogHeader>
              <UploadDocument
                uploaded={isUploadDB}
                dataSources={dataSources}
                handelcontinue={(ds) => handelcontinue(ds)}
                onSelectDataSources={() => {
                  setIsUploadDB(true);
                }}
                onSuccessUploadNewDB={(dataSourceId) => {
                  setSelectedFile(dataSourceId);
                }}
              />
            </DialogContent>
          </Dialog>
          <Input
            className="border-none focus:border-none focus:outline-none"
            placeholder="Type here..."
            value={inputValue}
            onChange={handleInputChange}
            onKeyDown={handleKeyDown}
          />
          <Button onClick={onSearch} disabled={!inputValue || !SelectedFile}>
            <ImageWithAlt
              src="/bi_send-fill.svg"
              alt="Icon"
              className={"w-[20px] max-md:w-[20px] cursor-pointer"}
            />
          </Button>
        </footer>
      </main>
    </>
  );
}
