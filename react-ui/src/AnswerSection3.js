import React, { useState } from "react";
import BarGraph from "./BarGraph";
import "./HomePage2.css";
import Modal from "./Modal";
const addIcon = "/add.png";

const AnswerSection = ({
  dataSources,
  taskID,
  selectedDataSource,
  modalHandler,
  answerData,
  onExport,
  onAddToDashboard,
}) => {
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

  return (
    <div className="answerSection">
      {/* { answer ? <div className="answerText">
        <img src="/chat.png" alt="Answer Icon" className="answerIcon" />
        <div className="textOfAnswer">{typeof answer === 'string' ? answer : jsonString}</div>
      </div> : null} */}

      <div className="answerBox">
        Most booked hotel: <span style={{ fontWeight: "800" }}> EBOWLA </span>
      </div>

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

      <div
        className="bar-graph-container"
        style={{ width: "90%", height: "40rem" }}
      >
        <BarGraph />
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "flex-end",
          paddingRight: "3rem",
          paddingTop: "2rem",
        }}
      >
        <button className="addDashboard">
          <img src={addIcon} alt="add icon" /> Add to dashboard
        </button>
      </div>
    </div>
  );
};

export default AnswerSection;
