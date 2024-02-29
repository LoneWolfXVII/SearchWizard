import { PlusCircle, Share2, ThumbsDown, ThumbsUp, User } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Button } from "./components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTrigger,
  DialogTitle,
  DialogDescription,
  DialogClose,
} from "./components/ui/dialog";
import { Input } from "./components/ui/input";
import { UploadDocument } from "./features/upload-document/upload-document.component";
import BarGraph from "./BarGraph";
import PenIcon from "./assets/pen.svg";
import { useContext } from "react";
import { DashboardContext } from "./context/dashboard-context";

export function Apiresult({ dataSources, fetchedData }) {
  const [like, setLike] = useState(false);
  const [dislike, setDislike] = useState(false);
  const [showGraph, setShowGraph] = useState("");
  const [inputValue, setInputValue] = useState("");

  const [UploadboxOpen, setUploadboxOpen] = useState(false);

  const [answer, setAnswer] = useState("");
  const [question, setQuestion] = useState("");
  const [labels, setLabels] = useState([]);
  const [label, setlabel] = useState("");
  const [chartData, setChartData] = useState([]);
  const [fileData, setFileData] = useState({});
  const [followUpQuestions, setFollorUpQuestions] = useState([]);
  const [SelectedFile, setSelectedFile] = useState("");
  const [result, setResult] = useState("");

  const location = useLocation();
  const [taskId, setTaskId] = useState("");
  const pollingRef = useRef(true);
  const [isModalOpen, setModalOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [showCustomEdit, setShowCustomEdit] = useState(false);
  const [customEdit, setCustomEdit] = useState("");
  const { dashboard } = useContext(DashboardContext);
  const [DasboardList, setDasboardList] = useState([]);

  // const { answer, graph_img, insight } = answerData;

  const navigate = useNavigate();
  useEffect(() => {
    setDasboardList(
      fetchedData?.find(
        (item) => location.state.selecteddata === item?.datasource_name
      )?.dropdown || []
    );
  }, [location.state.selecteddata, fetchedData]);

  useEffect(() => {
    const requestOptions = {
      method: "GET",
      redirect: "follow",
    };

    setAnswer("");
    setQuestion("");
    setLabels([]);
    setlabel("");
    setChartData([]);
    setFollorUpQuestions([]);
    setFileData({});
    pollingRef.current = true;

    const fetchStatus = async () => {
      if (!pollingRef.current) return;
      try {
        let result = "";
        // const id = taskId || location.state.name;
        const id = "7823099b-78ea-498c-996f-8158cfee85df";
        console.log("query id ", id);
        if (!id) return;
        await fetch("https://api.irame.ai/knowledge-graph/kg/kg/get_response", {
          method: "POST",
          headers: {
            accept: "application/json",
            "Content-Type": "application/x-www-form-urlencoded",
          },
          body: new URLSearchParams({
            query_id: id,
          }),
        })
          .then((response) => {
            if (!response.ok) {
              throw new Error("Network response was not ok");
            }
            return response.json();
          })
          .then((data) => {
            console.log("this is bar grah response ", data); // Handle the response data here
            result = data;
            setResult(data);
          })
          .catch((error) => {
            console.error(
              "There was a problem with the fetch operation:",
              error
            );
          });

        console.log("this is dataa result in graph ", result);
        if (result?.status?.toLowerCase() !== "done") {
          if (result?.answer) setAnswer(result?.answer);
          if (result?.query) setQuestion(result?.query);
          if (result?.follow_up_questions?.length)
            setFollorUpQuestions(result?.follow_up_questions);
        } else {
          pollingRef.current = false;
          if (result?.answer) setAnswer(result?.answer);
          if (result?.query) setQuestion(result?.query);
          if (result?.query_data?.labels?.length)
            setLabels(result?.query_data?.labels);
          if (result?.query_data?.values?.length)
            setChartData(result?.query_data?.values);
          if (result?.follow_up_questions?.length)
            setFollorUpQuestions(result?.follow_up_questions);
          if (result?.query_data?.label) setlabel(result?.query_data?.label);
          if (
            typeof result?.query_data === "object" &&
            !result?.query_data?.label &&
            !result?.query_data?.values
          ) {
            setFileData(result?.query_data);
          }
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
    console.log("chardata is  ", chartData, fileData, answer);

    if (!taskId && !location.state.name) {
      console.log("not found task id");
      navigate("");
    } else {
      fetchStatus();
    }

    return () => {
      pollingRef.current = false;
    };
  }, [SelectedFile, taskId, navigate, location.state.name]);

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
    setSelectedFile(ds);
    setDasboardList(
      fetchedData?.find((item) => ds === item?.datasource_name)?.dropdown || []
    );
    console.log("continue   ", ds);
  }

  async function onSearch() {
    console.log("final submit is working ", SelectedFile);
    // navigate("/a");
    // var myHeaders = new Headers();
    // myHeaders.append("Content-Type", "application/json");

    // var raw = JSON.stringify({
    //   query: inputValue,
    //   "Data Source Name": SelectedFile,
    // });

    // var requestOptions = {
    //   method: "POST",
    //   headers: myHeaders,
    //   body: raw,
    //   redirect: "follow",
    // };

    // fetch("https://api.irame.ai/get_answer2", requestOptions)
    //   .then((response) => response.json())
    //   .then((result) => {
    //     if (result?.task_id) {
    //       console.log("result is ", result);
    //       setTaskId(result?.task_id);
    //     }
    //   })
    //   .catch((error) => console.log("error", error));
    fetch("https://api.irame.ai/knowledge-graph/kg/kg/query_kg", {
      method: "POST",
      headers: {
        accept: "application/json",
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: new URLSearchParams({
        datasource_id: SelectedFile,
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
    // setSelectedFile("");
  }

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      event.preventDefault();
      //   handleSearch();
      // onSearch(inputValue);
    }
  };

  function toggleDropdown() {
    setIsDropdownOpen((prev) => !prev);
  }

  function handleSaveCustomEdit() {
    onAddToDashboardHandler(customEdit);
    setShowCustomEdit(false);
    setCustomEdit("");
  }
  const onAddToDashboardHandler = (option) => {
    console.log("option :>> ", option);
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

  return (
    <div className="mx-8 w-fit ">
      {/* <div className="rounded-2xl bg-red"> */}
      <div className="flex w-[1040px] h-[112px] bg-[#F8FAFF] border-[1px] border-[#D1D1D1] rounded-xl">
        <User className="m-5" />
        <div className="my-4 ">
          <p className="text-xl font-semibold">You</p>
          <p>{question}</p>
        </div>
      </div>
      <div className="w-[1040px] h-[404px] border-[1px] border-[#D1D1D1] rounded-xl">
        <div className="flex">
          <User className="m-5" />
          <div className="my-4 ">
            <p className="text-xl font-semibold">Irame.ai</p>
            <p>The Response Given by ai</p>
          </div>
        </div>
        <div className="flex flex-col justify-start mx-16">
          <ul className="flex gap-8 mx-3 cursor-pointer text-[#A1824A]">
            <li
              onClick={() => {
                setShowGraph("Graph");
              }}
            >
              Graph
              {showGraph === "Graph" ? (
                <hr className="border-[2px] border-green-400 w-12" />
              ) : null}
            </li>
            <li
              onClick={() => {
                setShowGraph("Data");
              }}
            >
              Data
              {showGraph === "Data" && (
                <hr className="border-[2px] border-green-400 w-12" />
              )}
            </li>
            <li
              onClick={() => {
                setShowGraph("Source");
              }}
            >
              Source
              {showGraph === "Source" && (
                <hr className="border-[2px] border-green-400 w-12" />
              )}
            </li>
          </ul>
          <hr className="border-[2px] border-[#C38AEE]" />
          <div className=" w-full h-[240px] items-center justify-center bg-red-50">
            {
              <BarGraph
                title={"ghgfh "}
                labels={labels}
                data={chartData}
                label={label}
              />
            }
          </div>
        </div>
      </div>

      <div className="w-[1040px] flex justify-between">
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
          {/* <Button className="flex gap-1 bg-[#076EFF]">
            <PlusCircle />
            Add to dashboard
          </Button> */}
          <Dialog>
            <DialogTrigger>
              <Button
                onClick={toggleDropdown}
                className="flex gap-1 bg-[#076EFF]"
              >
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
                            toggleDropdown();
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
      {/* <div></div> for tags data from api */}
      <footer className="flex gap-5 justify-between items-start p-2 mt-2 w-full text-2xl font-medium leading-10 whitespace-nowrap bg-white rounded-xl border border-solid border-neutral-400 max-w-[1540px] max-md:flex-wrap max-md:mt-10 max-md:max-w-full">
        <Dialog onOpenChange={setUploadboxOpen} open={UploadboxOpen}>
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
              uploaded={true}
              dataSources={dataSources}
              handelcontinue={(ds) => handelcontinue(ds)}
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
      {/* {
          isModalOpen && (
            <Modal taskID={taskID} dataSource={selectedDataSource} options={getDropdownOptions(dataSources, selectedDataSource)} onClose={toggleModal} />
          )
          // modalHandler()
        } */}
    </div>
  );
}
