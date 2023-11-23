import { Component } from "react";
import "./App.css";
import HomePage from "./HomePage";
import HomePage2 from "./HomePage2";

class Body extends Component {
  constructor(props) {
    super(props);
    this.state = {
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
      currentDashboardList: this.props.fetchedData,
    };
  }

  //   setSearchParams = useSearchParams()[1];

  selectOption = (option) => {
    this.setState({
      selectedOption: option,
    });
    this.props.fetchedData?.forEach((item) => {
      if (option === item?.datasource_name) {
        this.setState({ currentDashboardList: [...item.dropdown] });
      }
    });
  };

  toggleDropdown = () => {
    this.setState({
      isDropdownOpen: !this.state.isDropdownOpen,
    });
  };

  closeDropdown = () => {
    this.setState({
      isDropdownOpen: false,
    });
  };

  handleShowHomePage2 = () => {
    this.setState({ showHomePage2: true });
  };

  handleSearchValue = (value) => {
    return new Promise((resolve) => {
      this.setState({ query: value }, () => {
        resolve();
      });
    });
  };

  handleInputValue = (event) => {
    this.setState({ query: event.target.value });
  };

  fetchChartData = () => {
    // Implement the logic to fetch chart data here
    console.log("Fetching chart data...");
  };

  handleSearch = (query = "") => {
    // Now this method only calls fetchChartData
    // this.fetchChartData();

    if (
      !this.state.selectedOption ||
      this.state.selectedOption === "Select Data source"
    ) {
      alert("Please select a data source first");
      return;
    }

    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify({
      query: query,
      "Data Source Name": this.state.selectedOption,
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
          this.setState({ showHomePage2: true, taskID: result.task_id });
        }
      })
      .catch((error) => console.log("error", error));
  };

  render() {
    const { answerData, isLoading, error, query, userQuestion } = this.state;
    if (error && !answerData) {
      return <div>Error: {error}</div>;
    }

    if (isLoading) {
      return <div>Loading...</div>;
    }

    const dropbtnClass = `dropbtn ${
      this.state.isDropdownOpen ? "dropbtnActive" : ""
    }`;

    const { dataSources } = this.props;

    return (
      <>
        {this.state.showPopUp ? (
          <div>
            <p>Select data source before making the API call</p>
            <button onClick={() => this.setState({ showPopUp: false })}>
              Close
            </button>
          </div>
        ) : (
          <div className="body-container">
            <div className="dropdown" onMouseLeave={this.closeDropdown}>
              <div className={dropbtnClass}>
                <div>{this.state.selectedOption}</div>
                <img
                  src="./dropdown.svg"
                  alt="Dropdown Icon"
                  className="dronbtnIcon"
                  onClick={this.toggleDropdown}
                />
              </div>
              {this.state.isDropdownOpen && (
                <div className="dropdown-content">
                  {Object.keys(dataSources).map((ds) => (
                    <a key={ds} href="#" onClick={() => this.selectOption(ds)}>
                      {ds}
                    </a>
                  ))}
                </div>
              )}
            </div>

            {this.state.showHomePage2 ? (
              <HomePage2
                taskID={this.state.taskID}
                dataSources={this.props.dataSources}
                selectedDataSource={this.state.selectedOption}
                answerData={answerData}
                userQuestion={userQuestion}
                onSearch={this.handleSearch}
                handleSearchValue={this.handleSearchValue}
                dashboard_name={this.state.selectedOption}
                currentDashboardList={this.state.currentDashboardList}
              />
            ) : (
              <HomePage
                handleSearchValue={this.handleSearchValue}
                onSearch={this.handleSearch}
              />
            )}
          </div>
        )}
      </>
    );
  }
}

export default Body;
