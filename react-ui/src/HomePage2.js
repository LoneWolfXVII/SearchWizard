import React, { useEffect, useState } from "react";
import AnswerSection from "./AnswerSection3"; // Import the AnswerSection component you created
import FollowUpQuestions from "./FollowUpQuestions"; // Import the FollowUpQuestions component
import { Skeleton } from "./components/ui/skeleton";
import Loader from "./components/ui/Loader";

const HomePage2 = (props) => {
  const [followUpQuestions, setFollorUpQuestions] = useState([]);

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

  const dummyAnswerData = {
    dataSources: "Dummy Data Source",
    taskID: "Dummy Task ID",
    selectedDataSource: "Dummy Selected Data Source",
    modalHandler: () => console.log("Dummy Modal Handler"),
    answerData: "Dummy Answer Data",
    onExport: () => console.log("Dummy Export"),
    onAddToDashboard: () => console.log("Dummy Add To Dashboard"),
  };

  const [answer, setAnswer] = useState("");
  const [question, setQuestion] = useState("");
  const [labels, setLabels] = useState([]);
  const [label, setlabel] = useState("");
  const [chartData, setChartData] = useState([]);
  const [fileData, setFileData] = useState({});


  const onAddToDashboardHandler = (option) => {
    console.log("option :>> ", option);
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify({
      task_id: props?.taskID,
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

  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const requestOptions = {
      method: "GET",
      redirect: "follow",
    };
    setIsLoading(true);

    setAnswer("");
    setQuestion("");
    setLabels([]);
    setlabel("");
    setChartData([]);
    setFollorUpQuestions([]);
    setFileData({});

    const fetchStatus = async () => {
      try {
        const response = await fetch(
          `https://api.irame.ai/get_query_status?task_id=${props?.taskID}`,
          requestOptions
        );
        const result = await response.json();

        console.log("result :>> ", result?.query_data?.label);

        if (result?.status?.toLowerCase() !== "done") {
          if (result?.answer) setAnswer(result?.answer);
          if (result?.query) setQuestion(result?.query);
          if (result?.follow_up_questions?.length)
            setFollorUpQuestions(result?.follow_up_questions);
          setTimeout(fetchStatus, 1000);
        } else {
          setIsLoading(false);

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
        setIsLoading(false);
        console.error("Error:", error);
      }
    };

    fetchStatus();
  }, [props?.taskID]);

  return (
    <div className="HomePage2Container flex flex-col w-full gap-10 bg-[#F6F7FB] px-32 min-h-screen">
      <section className="px-8 py-8 my-6 bg-white rounded-sm">
        <FollowUpQuestions
          isLoading={isLoading}
          followUpQuestions={followUpQuestions}
          onSearch={props.onSearch}
          query={question}
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
          <div
            style={{ height: "0.5px", width: "10%", background: "#808080" }}
          />
          Result
          <div
            style={{ height: "0.5px", width: "88%", background: "#808080" }}
          />
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
          label={label}
          data={chartData}
          currentDashboardList={props.currentDashboardList}
          currentDashboardType={props.currentDashboardType}
          fileData={fileData}
        />
      </section>
    </div>
  );
};

export default HomePage2;
