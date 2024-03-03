import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Navigation, Pagination, Scrollbar } from "swiper/modules";
import { Button } from "../components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTrigger,
} from "../components/ui/dialog";
import { Input } from "../components/ui/input";
import { UploadDocument } from "../features/upload-document/upload-document.component";
import tryNowIcon from "../assets/arcticons_youtube-go.svg";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Swiper, SwiperSlide } from "swiper/react";

function WelcomeMessage() {
  return (
    <section className="mt-4 text-xl text-center max-md:max-w-full">
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

function SampleQuestionCard({ question, title }) {
  return (
    <div className="max-w-xs w-[20rem] h-40 relative px-4 flex flex-col justify-between bg-[#f3faff] py-3 border rounded-md ">
      <div>
        <h5 className="font-semibold">{title}</h5>
        <p>{question}</p>
      </div>
      <div className="flex items-center gap-2 mt-auto ml-auto">
        <p>Try Now</p>
        <img src={tryNowIcon} width={30} height={30} alt="try now" />
      </div>
    </div>
  );
}

export function QueryPage({ fetchedData, dataSources }) {
  // console.log(fetchedData);
  const navigate = useNavigate();
  const [inputValue, setInputValue] = useState("");
  const [dataSource, setDataSource] = useState("");

  const [UploadboxOpen, setUploadboxOpen] = useState(false);

  const [isUploadDB, setIsUploadDB] = useState(false);

  const [sampleQuestions, setSampleQuestions] = useState([]);

  async function onSearch() {
    if (!inputValue || !dataSource) return;

    console.log("final submit is working ", dataSource);
    // navigate("/a");
    var myHeaders = new Headers();
    myHeaders.append("accept", "application/json");
    myHeaders.append("Content-Type", "application/x-www-form-urlencoded");

    var urlencoded = new URLSearchParams();
    urlencoded.append("query", inputValue);
    urlencoded.append("datasource_id", dataSource);

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
            state: { selecteddata: dataSource, name: result.query_id },
          });
        }
      })
      .catch((error) => console.log("error", error));
    setInputValue("");
    setDataSource("");
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
    setDataSource(ds);
    console.log("continue   ", ds);
  }

  function handleExistinDBSelect(data) {
    console.log(data);
    // this data will have datasource_id, sample_questions
    setDataSource(data?.datasource_id);

    // set sample questions
    setSampleQuestions(data?.sample_questions);

    setUploadboxOpen(false);
  }

  return (
    <>
      <main className="flex flex-col justify-center w-full h-screen px-20 overflow-x-hidden overflow-y-auto text-black bg-white items-between max-md:px-5">
        <div className="flex flex-col items-center justify-center overflow-y-auto h-[90vh]">
          <ImageWithAlt
            src="https://cdn.builder.io/api/v1/image/assets/TEMP/b819442815b2b58decba5c9068357da5aa7ffaab50aa8f2fa76560e57e6bf800?apiKey=31468f0b56654704a0c955257a9b20f9&"
            alt="Logo"
            className="aspect-square w-[50px] max-md:mt-10"
          />
          <WelcomeMessage />

          <div className="w-full my-5 ">
            <Swiper
              style={{
                height: "10rem",
                paddingLeft: "5rem",
                paddingRight: "5rem",
              }}
              modules={[Navigation, Pagination, Scrollbar]}
              slidesPerView={3}
              navigation
              pagination={{ clickable: true }}
            >
              {Object.keys(sampleQuestions)?.map((key) => (
                <SwiperSlide key={key}>
                  <SampleQuestionCard
                    title={key}
                    question={sampleQuestions[key]}
                  />
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </div>
        {/* <ImageWithAlt
          src="https://cdn.builder.io/api/v1/image/assets/TEMP/1dd559497ad071ab5c1e22202a33f43a8dcab2a768a0794f067d59e536deeec8?apiKey=31468f0b56654704a0c955257a9b20f9&"
          alt="Example illustration"
          className="max-w-full aspect-square w-[400px]"
        /> */}
        <footer className="flex items-start justify-between w-full gap-5 px-3 py-1 text-2xl font-medium leading-10 bg-white border border-solid whitespace-nowrap rounded-xl border-neutral-400 max-md:flex-wrap max-md:mt-10 max-md:max-w-full">
          <Dialog
            open={UploadboxOpen}
            onOpenChange={(data) => {
              setUploadboxOpen(data);
              if (data === false) setIsUploadDB(false);
            }}
          >
            <DialogTrigger>
              <div class="relative flex flex-col items-center group">
                <ImageWithAlt
                  src="https://cdn.builder.io/api/v1/image/assets/TEMP/8bf69877806be500d2c20c5ac79bc0421832a89a088395cd5bc42647232eb60d?apiKey=31468f0b56654704a0c955257a9b20f9&"
                  alt="Icon"
                  className={"w-[40px] max-md:w-[30px] cursor-pointer"}
                />
                <div
                  class={`absolute bottom-6 flex flex-col items-center  mb-6 group-hover:flex ${dataSource ? "hidden" : ""}`}
                >
                  <span class="relative z-10 p-2 text-xs leading-none text-white whitespace-no-wrap bg-blue-500 rounded-lg px-2 py-3 shadow-lg">
                    Select database to get started.
                  </span>
                  <div class="w-3 h-3 -mt-2 rotate-45 bg-blue-500"></div>
                </div>
              </div>
            </DialogTrigger>
            <DialogContent className="md:max-w-[60rem] h-[80vh] max-h-screen px-10">
              <DialogHeader>
                <h2 className="text-2xl font-bold">Upload document</h2>
              </DialogHeader>
              <UploadDocument
                uploaded={isUploadDB}
                dataSources={dataSources}
                handelcontinue={(ds) => handelcontinue(ds)}
                onSelectExistinDB={handleExistinDBSelect}
                onSelectDataSources={(value) => {
                  setIsUploadDB(value);
                }}
                onSuccessUploadNewDB={(dataSourceId) => {
                  setDataSource(dataSourceId);
                  setUploadboxOpen(false);
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
          <Button onClick={onSearch} disabled={!inputValue || !dataSource}>
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
