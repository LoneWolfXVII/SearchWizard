import {
  PenIcon,
  PlusCircle,
  Share2,
  ThumbsDown,
  ThumbsUp,
  User,
} from "lucide-react";
import { useContext, useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import BarGraph from "./BarGraph";
import CSVDataTable from "./components/csv-data-table";
import { Button } from "./components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./components/ui/dialog";
import { Input } from "./components/ui/input";
import { DashboardContext } from "./context/dashboard-context";
import { UploadDocument } from "./features/upload-document/upload-document.component";

export function Apiresult({ dataSources, fetchedData }) {
  const [like, setLike] = useState(false);
  const [dislike, setDislike] = useState(false);
  const [inputValue, setInputValue] = useState("");

  const [isUploadDB, setIsUploadDB] = useState(false);

  const [UploadboxOpen, setUploadboxOpen] = useState(false);

  const [answer, setAnswer] = useState("");
  const [question, setQuestion] = useState("");

  const [dataSource, setDataSource] = useState("");
  const [responseCsvUrl, setResponseCsvUrl] = useState("");
  const [graphResponseData, setGraphResponseData] = useState({});

  const location = useLocation();
  const [taskId, setTaskId] = useState("");
  const pollingRef = useRef(true);
  const [showCustomEdit, setShowCustomEdit] = useState(false);
  const [customEdit, setCustomEdit] = useState("");
  const { dashboard } = useContext(DashboardContext);
  const [DasboardList, setDasboardList] = useState([]);

  const { dataSourceID } = useSelector((state) => state.chat);

  const navigate = useNavigate();

  // setting dashboard list in this
  useEffect(() => {
    setDasboardList(
      fetchedData?.find(
        (item) => location.state.selecteddata === item?.datasource_name
      )?.dropdown || []
    );
  }, [location.state.selecteddata, fetchedData]);

  useEffect(() => {
    setAnswer("");
    setQuestion("");

    pollingRef.current = true;

    const fetchStatus = async () => {
      if (!pollingRef.current) return;
      try {
        let result = "";
        const id = taskId || location.state.name;
        // const id = "7823099b-78ea-498c-996f-8158cfee85df";
        console.log("query id ", id);
        if (!id) return;
        const res = await fetch(
          "https://api.irame.ai/knowledge-graph/kg/kg/get_response",
          {
            method: "POST",
            headers: {
              accept: "application/json",
              "Content-Type": "application/x-www-form-urlencoded",
            },
            body: new URLSearchParams({
              query_id: id,
            }),
          }
        );
        result = await res?.json();

        if (result?.status?.toLowerCase() === "done") {
          pollingRef.current = false;
          setAnswer(result?.response?.response_text || "");
          setQuestion(result?.response?.query || "");

          setResponseCsvUrl(result?.response?.response_csv_url || "");
          setGraphResponseData(result?.response?.graph_rep_data || {});
        }
      } catch (error) {
        console.error("Error:", error);
        pollingRef.current = false;
      } finally {
        if (pollingRef.current) {
          setTimeout(fetchStatus, 3000);
        }
      }
    };

    if (!taskId && !location.state.name) {
      console.log("not found task id");
      navigate("");
    } else {
      setDataSource(location?.state?.selecteddata);
      fetchStatus();
    }

    return () => {
      pollingRef.current = false;
    };
  }, [taskId, navigate, location.state.name, location.state.selecteddata]);

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

  function handelcontinue(ds) {
    setUploadboxOpen(false);
    setDataSource(ds);
    setDasboardList(
      fetchedData?.find((item) => ds === item?.datasource_name)?.dropdown || []
    );
    console.log("continue   ", ds);
  }

  async function onSearch() {
    console.log("final submit is working ", dataSource);

    if (!dataSource && dataSourceID) {
      alert("Datasource is not selected");
      return;
    }

    fetch("https://api.irame.ai/knowledge-graph/kg/kg/query_kg", {
      method: "POST",
      headers: {
        accept: "application/json",
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: new URLSearchParams({
        datasource_id: dataSource || dataSourceID,
        query: inputValue,
      }),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        console.log(data);

        setTaskId(data?.query_id);
      })
      .catch((error) => {
        console.error("There was a problem with the fetch operation:", error);
      });

    setInputValue("");
    // setDataSource("");
  }

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      event.preventDefault();
      //   handleSearch();
      onSearch();
    }
  };

  function handleSaveCustomEdit() {
    onAddToDashboardHandler(customEdit);
    setShowCustomEdit(false);
    setCustomEdit("");
  }

  const onAddToDashboardHandler = (option) => {
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify({
      task_id: taskId || location.state.name,
      dashboard_name: option,
    });

    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };

    fetch("https://api.irame.ai/update_dashboard", requestOptions)
      .then((response) => response.json())
      .then((result) => console.log("bar graph", result))
      .catch((error) => console.log("error", error));
  };

  function handleExistinDBSelect(data) {
    console.log(data);
    // this data will have datasource_id, sample_questions
    setDataSource(data?.datasource_id);

    setUploadboxOpen(false);
  }

  return (
    <>
      <section className="flex flex-col justify-center w-full h-screen px-5 py-5">
        <div className="h-[90vh] w-full">
          <Question question={question} />
          <div className="h-[60vh]">
            <Answer
              answer={answer}
              graphResponseData={graphResponseData}
              responseCsvUrl={responseCsvUrl}
            />
          </div>
          <div className="flex justify-between w-full my-10">
            <div className="flex items-center justify-center gap-2">
              <ThumbsUp
                onClick={() => {
                  setLike(!like);
                  setDislike(false);
                }}
                fill={like ? "black" : "transparent"}
              />
              <ThumbsDown
                onClick={() => {
                  setDislike(!dislike);
                  setLike(false);
                }}
                fill={dislike ? "black" : "transparent"}
              />
            </div>
            <div className="flex items-center justify-center gap-2">
              <Button className="flex gap-1 bg-white text-black border-[1px] border-black">
                <Share2 />
                Share answer
              </Button>

              <Dialog>
                <DialogTrigger>
                  <Button className="flex gap-1 bg-[#076EFF]">
                    <PlusCircle />
                    Add to dashboard
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>{dashboard?.dashboardName}</DialogTitle>
                    <DialogDescription>
                      <div className="w-full">
                        {!showCustomEdit && (
                          <button
                            onClick={() => setShowCustomEdit(true)}
                            className="w-full  py-3 my-3 capitalize font-semibold text-black bg-[#EEF1FF] border flex items-center gap-5 p-2"
                          >
                            <img src={PenIcon} alt="" width={20} height={20} />{" "}
                            <span> Add to a new report </span>
                          </button>
                        )}
                        {showCustomEdit && (
                          <>
                            <input
                              type="text"
                              className="w-full px-4 py-2 my-4 border rounded-lg"
                              placeholder="Enter dashboard name"
                              value={customEdit}
                              onChange={(e) => setCustomEdit(e.target.value)}
                            />
                            <div className="flex gap-3 px-2">
                              <button
                                onClick={() => {
                                  setShowCustomEdit(false);
                                  setCustomEdit("");
                                }}
                                className="flex-1 px-2 py-1 my-3 font-semibold text-white bg-red-500 border rounded-lg "
                              >
                                Clear
                              </button>
                              <div className="flex-1 w-full">
                                <DialogClose className="w-full">
                                  <button
                                    onClick={handleSaveCustomEdit}
                                    className="flex-1 w-full px-2 py-1 my-3 font-semibold text-white bg-green-500 border rounded-lg "
                                  >
                                    SavecurrentDashboardList
                                  </button>
                                </DialogClose>
                              </div>
                            </div>
                          </>
                        )}
                        <div className="bg-[#EEF1FF] py-5 px-3">
                          {DasboardList?.map((option, index) => (
                            <div
                              className="px-3 py-3 transition-all duration-300 ease-in-out bg-white rounded-md cursor-pointer hover:bg-gray-50"
                              onClick={() => {
                                onAddToDashboardHandler(option);
                              }}
                              key={index}
                            >
                              {option}
                            </div>
                          ))}
                        </div>
                      </div>
                    </DialogDescription>
                  </DialogHeader>
                </DialogContent>
              </Dialog>
            </div>
          </div>
        </div>
        <footer className="flex items-start justify-between w-full gap-5 p-2 mt-2 text-2xl font-medium leading-10 bg-white border border-solid whitespace-nowrap rounded-xl border-neutral-400 max-md:flex-wrap max-md:mt-10 max-md:max-w-full">
          <Dialog onOpenChange={setUploadboxOpen} open={UploadboxOpen}>
            <DialogTrigger>
              <ImageWithAlt
                src="https://cdn.builder.io/api/v1/image/assets/TEMP/8bf69877806be500d2c20c5ac79bc0421832a89a088395cd5bc42647232eb60d?apiKey=31468f0b56654704a0c955257a9b20f9&"
                alt="Icon"
                className={"w-[40px] max-md:w-[30px] cursor-pointer"}
              />
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
          <Button onClick={onSearch}>
            <ImageWithAlt
              src="/bi_send-fill.svg"
              alt="Icon"
              className={"w-[20px] max-md:w-[20px] cursor-pointer"}
            />
          </Button>
        </footer>
      </section>
    </>
  );
}

const Question = ({ question }) => {
  return (
    <div className="flex flex-col border rounded-lg p-6 bg-[#f8faff]">
      <div className="flex gap-3 text-xl font-bold">
        <User /> You
      </div>
      <p className="ml-3">{question}</p>
    </div>
  );
};

const Answer = ({ answer, responseCsvUrl, graphResponseData }) => {
  const [selectedTab, setSelectedTab] = useState("Graph");

  const [csvData, setCsvData] = useState([]);

  const [graphData, setGraphData] = useState({});

  useEffect(() => {
    fetch(responseCsvUrl)
      .then((response) => response.text())
      .then((csvText) => {
        const lines = csvText.split("\n");
        const headers = lines[0].split(",");
        const dataFrame = [];

        for (let i = 1; i < lines.length; i++) {
          const currentLine = lines[i].split(",");
          if (currentLine.length === headers.length) {
            const row = {};
            for (let j = 0; j < headers.length; j++) {
              row[headers[j].trim()] = currentLine[j].trim();
            }
            dataFrame.push(row);
          }
        }
        console.log("dataFrame", dataFrame);
        setCsvData(dataFrame);

        const yaxis = dataFrame.map((item) =>
          parseFloat(item[graphResponseData?.["y-axis"]])
        );
        const xaxis = dataFrame.map(
          (item) => item[graphResponseData?.["x-axis"]]
        );

        setGraphData({
          yaxis,
          xaxis,
        });
      })
      .catch((error) => console.error("Error loading CSV data:", error));
  }, [responseCsvUrl, graphResponseData]);

  // const handleFileChange = (event) => {
  //   const file = event.target.files[0];

  //   if (file) {
  //     const reader = new FileReader();

  //     reader.onload = (e) => {
  //       const csvText = e.target.result;
  //       parseCSV(csvText);
  //     };

  //     reader.readAsText(file);
  //   }
  // };

  // const parseCSV = (csvText) => {
  //   const lines = csvText.split("\n");
  //   const headers = lines[0].split(",");
  //   const parsedData = [];

  //   for (let i = 1; i < lines.length; i++) {
  //     const currentLine = lines[i].split(",");

  //     if (currentLine.length === headers.length) {
  //       const row = {};
  //       for (let j = 0; j < headers.length; j++) {
  //         row[headers[j].trim()] = currentLine[j].trim();
  //       }
  //       parsedData.push(row);
  //     }
  //   }

  //   setCsvData(parsedData);

  //   console.log("parsedData", parsedData);
  //   const yaxis = parsedData.map((item) => parseFloat(item.TRANS_AMOUNT));
  //   const xaxis = parsedData.map((item) => item.CATEGORY);

  //   console.log("yaxis", yaxis);
  //   console.log("xaxis", xaxis);

  //   setGraphData({
  //     yaxis,
  //     xaxis,
  //   });
  // };

  console.log("csvData", csvData);

  return (
    <div className="flex flex-col w-full h-full max-h-full p-6 overflow-x-hidden overflow-y-auto border rounded-lg">
      <div className="flex gap-3 text-xl font-bold">
        <User /> Irame.ai
        {/* <input type="file" onChange={handleFileChange} /> */}
      </div>
      <p className="ml-3">{answer}</p>

      {/* tabs design starts here  */}

      <nav className="relative flex w-full gap-8 my-3 border-b-2 border-gray-200 min-h-10">
        <div
          onClick={() => setSelectedTab("Graph")}
          className={`w-auto h-full cursor-pointer ${selectedTab === "Graph" ? "border-b-2 border-blue-500" : ""}`}
        >
          Graph
        </div>

        <div
          onClick={() => setSelectedTab("Source")}
          className={`w-auto h-full cursor-pointer ${selectedTab === "Source" ? "border-b-2 border-blue-500" : ""}`}
        >
          Source
        </div>
      </nav>

      <div className="w-full">
        {selectedTab === "Graph" && (
          <BarGraph
            labels={graphData?.xaxis}
            data={graphData?.yaxis}
            title={"Graph "}
          />
        )}

        {selectedTab === "Source" && <CSVDataTable data={csvData} />}
      </div>

      {/* tabs ends here  */}
    </div>
  );
};
