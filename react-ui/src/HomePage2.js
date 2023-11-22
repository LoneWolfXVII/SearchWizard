import React, { useEffect, useState } from "react";
import AnswerSection from "./AnswerSection3"; // Import the AnswerSection component you created
import FollowUpQuestions from "./FollowUpQuestions"; // Import the FollowUpQuestions component

const HomePage2 = (props) => {
  const [followUpQuestions, setFollorUpQuestions] = useState([]);
  const userQuestion = props.userQuestion;
  let formattedFollowUpQuestions = null;
  if (props.answerData && props.answerData.follow_up_questions) {
    const originalFollowUpQuestions = props.answerData.follow_up_questions;

    // Convert the original follow-up questions array to the desired format
    formattedFollowUpQuestions = originalFollowUpQuestions.map(
      (question, index) => ({
        text: question,
      })
    );

    // Now you can use formattedFollowUpQuestions in your component
  } else {
    formattedFollowUpQuestions = [
      { text: "Follow-up Question 1" },
      { text: "Follow-up Question 2" },
      { text: "Follow-up Question 3" },
      { text: "Follow-up Question 4" },
      { text: "Follow-up Question 5" },
      { text: "Follow-up Question 6" },
      { text: "Follow-up Question 7" },
      { text: "Follow-up Question 8" },
      { text: "Follow-up Question 9" },
      { text: "Follow-up Question 10" },
    ];
  }

  const handleExport = () => {
    console.log("Exporting graph...");
  };

  const handleAddToDashboard = () => {
    console.log("Adding graph to dashboard...");
  };
  // Dummy data for follow up questions
  // const dummyFollowUpQuestions = [
  //   {
  //     text: "Dummy Follow-up Question 1 Dummy Follow-up Question 1Dummy Follow-up Question 1Dummy Follow-up Question 1Dummy Follow-up Question 1Dummy Follow-up Question 1Dummy Follow-up Question 1Dummy Follow-up Question 1Dummy Follow-up Question 1Dummy Follow-up Question 1Dummy Follow-up Question 1Dummy Follow-up Question 1Dummy Follow-up Question 1Dummy Follow-up Question 1Dummy Follow-up Question 1Dummy Follow-up Question 1Dummy Follow-up Question 1Dummy Follow-up Question 1Dummy Follow-up Question 1Dummy Follow-up Question 1Dummy Follow-up Question 1Dummy Follow-up Question 1Dummy Follow-up Question 1Dummy Follow-up Question 1Dummy Follow-up Question 1",
  //   },
  //   { text: "Dummy Follow-up Question 2" },
  //   { text: "Dummy Follow-up Question 3" },
  //   { text: "Dummy Follow-up Question 4" },
  //   { text: "Dummy Follow-up Question 5" },
  //   { text: "Dummy Follow-up Question 5" },
  //   { text: "Dummy Follow-up Question 5" },
  // ];
  // Dummy data for AnswerSection component
  const dummyAnswerData = {
    dataSources: "Dummy Data Source",
    taskID: "Dummy Task ID",
    selectedDataSource: "Dummy Selected Data Source",
    modalHandler: () => console.log("Dummy Modal Handler"),
    answerData: "Dummy Answer Data",
    onExport: () => console.log("Dummy Export"),
    onAddToDashboard: () => console.log("Dummy Add To Dashboard"),
  };

  // Dummy data for UserQuestion component
  // const dummyUserQuestion = {
  //   profileImage: "/dummy_profile.png",
  //   question: "Dummy User Question",
  // };

  const [answer, setAnswer] = useState("");
  const [question, setQuestion] = useState("");
  const [labels, setLabels] = useState([]);
  const [chartData, setChartData] = useState([]);

  const onAddToDashboardHandler = () => {
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify({
      task_id: props?.taskID,
      dashboard_name: props?.dashboard_name,
    });

    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };

    fetch("http://3.111.174.29:8080/update_dashboard", requestOptions)
      .then((response) => response.json())
      .then((result) => console.log(result))
      .catch((error) => console.log("error", error));
  };

  useEffect(() => {
    const requestOptions = {
      method: "GET",
      redirect: "follow",
    };

    const fetchStatus = async () => {
      try {
        const response = await fetch(
          `http://3.111.174.29:8080/get_query_status?task_id=${props?.taskID}`,
          requestOptions
        );
        const result = await response.json();
        if (result?.status?.toLowerCase() !== "done") {
          setTimeout(fetchStatus, 1000);
        } else {
          setFollorUpQuestions(result?.follow_up_questions);
          setAnswer(result?.answer);
          setQuestion(result?.query);
          setLabels(result?.query_data?.labels);
          setChartData(result?.query_data?.values);
        }
      } catch (error) {
        console.error("Error:", error);
      }
    };

    fetchStatus();
  }, [props?.taskID]);

  return (
    <div className="HomePage2Container">
      {/* {userQuestion ? (
        <UserQuestion
          profileImage={"/profile.png"}
          question={dummyUserQuestion}
        />
      ) : null} */}
      <FollowUpQuestions
        followUpQuestions={followUpQuestions}
        onSearch={props.onSearch}
        handleSearchValue={props.handleSearchValue}
      />
      <aside
        style={{
          display: "flex",
          alignItems: "center",
          gap: "10px",
          marginLeft: "2rem",
          marginRight: "2rem",
          marginTop: "1rem",
          marginBottom: "0rem",
          color: "#8F8F8F",
        }}
      >
        <div style={{ height: "0.5px", width: "10%", background: "#808080" }} />
        Result
        <div style={{ height: "0.5px", width: "88%", background: "#808080" }} />
      </aside>

      <AnswerSection
        dataSources={dummyAnswerData.dataSources}
        taskID={dummyAnswerData.taskID}
        selectedDataSource={dummyAnswerData.selectedDataSource}
        modalHandler={dummyAnswerData.modalHandler}
        answerData={dummyAnswerData.answerData}
        onExport={dummyAnswerData.onExport}
        onAddToDashboard={onAddToDashboardHandler}
        answerReceived={answer}
        question={question}
        labels={labels}
        data={chartData}
      />
      {/* {props?.answerData && (
        <AnswerSection
          dataSources={props.dataSources}
          taskID={props.taskID}
          selectedDataSource={props.selectedDataSource}
          modalHandler={props.modalHandler}
          answerData={props.answerData}
          onExport={handleExport}
          onAddToDashboard={handleAddToDashboard}
        />
      )} */}
    </div>
  );
};

export default HomePage2;
