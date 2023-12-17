import { useContext, useState } from "react";
import "./App.css";
import HomePage from "./HomePage";
import HomePage2 from "./HomePage2";
import { Button } from "./components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuTrigger } from "./components/ui/dropdown-menu";
import { DashboardContext } from "./context/dashboard-context";

const Body = (props) => {
  const [state, setState] = useState({
    query: "",
    isLoading: false,
    error: null,
    taskID: null,
    answerData: null,
    showHomePage2: false,
    userQuestion: "",
    selectedOption: "Select Data source",
    isDropdownOpen: false,
    showPopUp: false,
    currentDashboardList: props.fetchedData,
    currentDashboardType: "",
  });

  const { setDashboardList, setDashboardType, setDashboardName } = useContext(DashboardContext);

  const selectOption = (option) => {
    setState((prev) => ({
      ...prev,
      selectedOption: option,
      currentDashboardList: props.fetchedData?.find((item) => option === item?.datasource_name)?.dropdown || [],
      currentDashboardType: props.fetchedData?.find((item) => option === item?.datasource_name)?.class || "mysql",
    }));

    setDashboardName(option);
    setDashboardList(props.fetchedData?.find((item) => option === item?.datasource_name)?.dropdown || []);
    setDashboardType(props.fetchedData?.find((item) => option === item?.datasource_name)?.class || "mysql");
  };

  const toggleDropdown = () => {
    setState((prev) => ({
      ...prev,
      isDropdownOpen: !prev.isDropdownOpen,
    }));
  };

  const closeDropdown = () => {
    setState((prev) => ({
      ...prev,
      isDropdownOpen: false,
    }));
  };

  const handleShowHomePage2 = () => {
    setState((prev) => ({ ...prev, showHomePage2: true }));
  };

  const handleSearchValue = (value) => {
    return new Promise((resolve) => {
      setState((prev) => ({ ...prev, query: value }));
      resolve();
    });
  };

  const handleInputValue = (event) => {
    setState((prev) => ({ ...prev, query: event.target.value }));
  };

  const fetchChartData = () => {
    console.log("Fetching chart data...");
  };

  const handleSearch = (query = "") => {
    if (!state.selectedOption || state.selectedOption === "Select Data source") {
      alert("Please select a data source first");
      return;
    }

    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify({
      query: query,
      "Data Source Name": state.selectedOption,
    });

    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };

    fetch("https://api.irame.ai/get_answer2", requestOptions)
      .then((response) => response.json())
      .then((result) => {
        if (result?.task_id) {
          setState((prev) => ({ ...prev, showHomePage2: true, taskID: result.task_id }));
        }
      })
      .catch((error) => console.log("error", error));
  };

  // Destructure state for easy access
  const { answerData, isLoading, error, query, userQuestion } = state;

  // Define dropbtnClass
  const dropbtnClass = `dropbtn ${state.isDropdownOpen ? "dropbtnActive" : ""}`;

  return (
    <>
      {state.showPopUp ? (
        <div>
          <p>Select data source before making the API call</p>
          <button onClick={() => setState((prev) => ({ ...prev, showPopUp: false }))}>Close</button>
        </div>
      ) : (
        <div className="body-container">
          <div className="pt-10">
            <DropdownMenu>
              <DropdownMenuTrigger>
                <Button className="flex px-4 font-semibold bg-blue-500 py-7">
                  <div>{state.selectedOption}</div>
                  <img src="./dropdown.svg" alt="Dropdown Icon" className="dronbtnIcon" onClick={toggleDropdown} />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <div className="flex flex-col gap-5 px-3 py-3 font-semibold">
                  {Object.keys(props.dataSources).map((ds) => (
                    <a className="hover:text-blue-500" key={ds} href="#" onClick={() => selectOption(ds)}>
                      {ds}
                    </a>
                  ))}
                </div>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>

          {state.showHomePage2 ? (
            <HomePage2
              taskID={state.taskID}
              dataSources={props.dataSources}
              selectedDataSource={state.selectedOption}
              answerData={answerData}
              userQuestion={userQuestion}
              onSearch={handleSearch}
              handleSearchValue={handleSearchValue}
              dashboard_name={state.selectedOption}
              currentDashboardList={state.currentDashboardList}
              currentDashboardType={state.currentDashboardType}
            />
          ) : (
            <HomePage handleSearchValue={handleSearchValue} onSearch={handleSearch} />
          )}
        </div>
      )}
    </>
  );
};

export default Body;
