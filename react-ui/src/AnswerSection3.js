import React, { useState } from "react";
import BarGraph from "./BarGraph";
import "./HomePage2.css";
import Modal from "./Modal";
const EyeIcon = "/bx_show.svg";
const BlueEyeIcon = "/bx_show_blue.svg";
const addIcon = "/add.png";

const AnswerSection = ({
  dataSources,
  taskID,
  selectedDataSource,
  modalHandler,
  answerData,
  onExport,
  onAddToDashboard,
  question,
  answerReceived,
  labels,
  label,
  data,
  currentDashboardList,
  currentDashboardType,
  fileData
}) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [dataToShow, setDataToShow] = useState(
    fileData && Object.keys(fileData).length > 0
      ? fileData[Object.keys(fileData)[0]]
      : null
  );

  const { answer, graph_img, insight } = answerData;

  const jsonString = JSON.stringify(answer);
  // Function to handle exporting the graph
  const handleExport = (graphImage) => {
    // Create a new anchor element dynamically
    const link = document.createElement("a");
    // Set the download attribute with a default filename (users can change it)
    link.download = "exported-graph.png";
    // Set the href to the image's URL
    link.href = graphImage;
    // Append the anchor to the body
    document.body.appendChild(link);
    // Trigger the download
    link.click();
    // Clean up: remove the anchor from the body
    document.body.removeChild(link);
  };

  const [isModalOpen, setModalOpen] = useState(false);

  // Function to toggle the modal's visibility
  const toggleModal = () => {
    setModalOpen(!isModalOpen);
  };

  function getDropdownOptions(apiResponse, datasourceName) {
    // Check if the datasource name exists in the response object
    if (apiResponse.hasOwnProperty(datasourceName)) {
      return apiResponse[datasourceName];
    }

    // If the datasource name is not found, return an empty array
    return [];
  }
  function toggleDropdown() {
    setIsDropdownOpen((prev) => !prev);
  }

  return (
    <div className="answerSection">
      {/* { answer ? <div className="answerText">
        <img src="/chat.png" alt="Answer Icon" className="answerIcon" />
        <div className="textOfAnswer">{typeof answer === 'string' ? answer : jsonString}</div>
      </div> : null} */}

      <div className="answerBox">
        <span className="font-bold">
          Original Answer:
          <span className="font-medium"> {answerReceived}</span>
        </span>
      </div>

      {currentDashboardType === "text_docs" && (
        <div className="my-5 answerBox">
          <div>
            <span className="flex flex-wrap font-bold text-blue-500">
              Source Name:{" "}
              <div className="flex flex-wrap">
                {Object.keys(fileData).map((key) => (
                  <button
                    onClick={() => setDataToShow(fileData[key])}
                    key={key}
                    className={`flex flex-wrap gap-3 mx-4 font-medium text-black`}
                  >
                    {key}{" "}
                    <img
                      src={fileData[key] === dataToShow ? BlueEyeIcon : EyeIcon}
                      className="text-blue-500 fill-current"
                      alt="eye"
                    />
                  </button>
                ))}
              </div>
            </span>
          </div>
          <div>
            <span className="font-bold text-blue-500">
              Source Text:
              <span className="font-medium text-black"> {dataToShow}</span>
            </span>
          </div>
        </div>
      )}

      <div className="graphAndInsight">
        {graph_img ? (
          <div className="graphSection">
            <img src={graph_img} alt="Graph" className="graphImage" />

            <div className="graphButtons">
              <button
                onClick={() => handleExport(graph_img)}
                className="graphButton"
              >
                <img src="/export.png" alt="Export" /> Export
              </button>
              <button onClick={toggleModal} className="graphButton">
                <img src="/add.png" alt="Add" /> Add to Dashboard
              </button>
            </div>
          </div>
        ) : null}
        {insight ? (
          <div className="insightSection">
            <div style={{ display: "flex" }}>
              <img
                src="/insights.png"
                alt="Insights Icon"
                className="insightIcon"
              />
              <div className="Insights">Insights</div>
            </div>
            <div className="insightText">
              <p dangerouslySetInnerHTML={{ __html: insight }}></p>
              {/* <p>
            <TypingEffect text = {insight} />
          </p> */}
            </div>
          </div>
        ) : null}
        {
          isModalOpen && (
            <Modal
              taskID={taskID}
              dataSource={selectedDataSource}
              options={getDropdownOptions(dataSources, selectedDataSource)}
              onClose={toggleModal}
            />
          )
          // modalHandler()
        }
      </div>

      {labels?.length > 0 && currentDashboardType !== "text_docs" ? (
        <div
          className="bar-graph-container"
          style={{ width: "90%", height: "35rem" }}
        >
          <BarGraph labels={labels} label={label} data={data} />
        </div>
      ) : (
        <div style={{ width: "80rem" }} />
      )}
      <footer style={{ display: "flex", justifyContent: "flex-end" }}>
        <div
          style={{
            display: "flex",
            paddingRight: "3rem",
            paddingTop: "2rem",
            flexDirection: "column"
          }}
        >
          <button onClick={toggleDropdown} className="graphButton">
            <img src={addIcon} alt="Add" /> Add to Dashboard
          </button>
          {isDropdownOpen &&
            currentDashboardList?.map((option, index) => (
              <div
                className="graphButton"
                onClick={() => {
                  toggleDropdown();
                  onAddToDashboard(option);
                }}
                key={index}
              >
                {option}
              </div>
            ))}
        </div>
      </footer>
    </div>
  );
};

export default AnswerSection;
