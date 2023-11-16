import { Component } from "react";
import HomePage from './HomePage';
import HomePage2 from './HomePage2';
import { useState, useEffect } from 'react';
import './App.css';
import Modal from "./Modal";

let options = [' - 1', 'Revenue Monitoring Board', 'trav2'];
class Body extends Component{

  state = {
      query: "", // This should hold the query input by the user
      isLoading: false,
      error: null,
      taskID: null,
      answerData: null,
      showHomePage2: false,
      userQuestion: "",
      selectedOption: 'Select Data source',
      isDropdownOpen: false,
    };
    
  //   toggleModal = () => {
  //     setModalOpen(!isModalOpen);
  // };

    // renderModal = () => {
    //   // Assuming options are associated with the selected data source in your state
    //   const options = this.state.selectedOptionOptions; // Replace with actual state that holds options
    //   return <Modal dataSource={this.state.selectedOption} options={options} onClose={this.closeModal} />;
    // };

  selectOption = (option) => {
    this.setState({
      selectedOption: option
  });
  };

  toggleDropdown = () => {
    this.setState({
      isDropdownOpen: !this.state.isDropdownOpen
  });
  };

  closeDropdown = () => {
    this.setState({
      isDropdownOpen: false,
    });
  };

  calculateButtonWidth = () => {
    const button = document.getElementById('dropdownButton');
    if (button) {
      let textWidth = button.offsetWidth;
      // console.log(textWidth);
      button.style.width = `${textWidth}px`;
    }
  };

  componentDidUpdate() {
    this.calculateButtonWidth();
  }

  handleShowHomePage2 = () => {
    this.setState({ShowHomePage2: true});
  };

  handleSearchValue = (value) => {
    this.setState({query: value});
  };

  handleInputValue = (event) => {
    // Update the inputValue state with the current value of the input field
    this.setState({query: event.target.value});
  };

  fetchTaskID = async (query, dataSourceName) => {
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    var data = {
    query: query,
    "Data Source Name": dataSourceName
    };

    var requestOptions = {
    method: 'POST',
    headers: myHeaders,
    body: JSON.stringify(data),
    redirect: 'follow'
    };

    return fetch("http://13.232.9.15:8080/get_answer", requestOptions)
    // return fetch("https://testirame.free.beeceptor.com/get_answer", requestOptions)
    .then(response => response.json())
    .then(data => data.task_id)
    .catch(error => {
        console.error('Error fetching task_id:', error);
        return null;
    }); 
  };

  handleSearch = async () => {
    const { query } = this.state;
    // const query = "Most booked hotel";
    const dataSourceName = "Travel - 1";
    this.setState({ isLoading: true, error: null });

    const { onSearch } = this.props;
    try {
      const taskID = await this.fetchTaskID(query, dataSourceName);
      if (taskID) {
        this.setState({ taskID }, this.fetchAnswer);
      }
    } catch (error) {
      this.setState({ error, isLoading: false });
      console.error('Error fetching task_id:', error);
    }
  };

  fetchAnswer = () => {
    let { taskID } = this.state;
    if (!taskID) return;
    // taskID = '127b66af-5e69-4154-a1e4-ee3015ddcdfc';
    const requestOptions = {
      method: 'GET',
      redirect: 'follow'
    };
  
    const intervalTime = 1000;
    const maxRetries = 10;
    let retries = 0;
  
    // Store the interval ID so you can clear it later
    const intervalId = setInterval(() => {
      fetch(`http://13.232.9.15:8080/get_query_status?task_id=${taskID}`, requestOptions)
      // fetch(`https://testirame.free.beeceptor.com/get_query_status?task_id=${taskID}`, requestOptions)
        .then(response => response.json())
        .then(data => {
          // Increment the number of retries
          retries++;
          const formattedAnswerData = {
            answer: data.answer,
            graph_img: data.graph_img,
            insight: data.insights,
            follow_up_questions: data.follow_up_questions,
          };
        
          this.setState({ userQuestion: this.state.query, answerData: formattedAnswerData, isLoading: false, showHomePage2: true});
          if (data.status === "Done" || retries > maxRetries) {
            // If the status is "Done" or max retries exceeded, clear the interval
            clearInterval(intervalId);
  

          // Handle the case when maximum retries are exceeded
          if (retries > maxRetries) {
            this.setState({ error: "Maximum retries exceeded", isLoading: false });
          }
        }
      })
      .catch(error => {
        clearInterval(intervalId);
        this.setState({ error, isLoading: false });
        console.log('error', error);
      });
  }, intervalTime);
};



render(){
  const { answerData, isLoading, error, query, userQuestion } = this.state;
  if (error && !answerData) {
    return <div>Error: {error}</div>;
  }

  if (isLoading) {
    return <div>Loading...</div>;
  }

  // const [selectedOption, setSelectedOption] = useState('Select Option');
  // const options = ['Option 1', 'Option 2', 'Option 3'];
  const dropbtnClass = `dropbtn ${this.state.isDropdownOpen ? 'dropbtnActive' : ''}`;

  
  const {dataSources} = this.props;
  // console.log(dataSources);

  return(
    <div className="body-container">
      <div className="dropdown" onMouseLeave={this.closeDropdown}>
        <div className={dropbtnClass}>
          <div>{this.state.selectedOption}</div>
          <img
            src='./dropdown.svg'
            alt="Dropdown Icon"
            className="dronbtnIcon"
            onClick={this.toggleDropdown}
          />
        </div>
        {this.state.isDropdownOpen && (
          <div className="dropdown-content">
            {Object.keys(dataSources).map(ds => (
              <a key={ds} href="#" onClick={() => this.selectOption(ds)}>
                {ds}
            </a>
            ))}
          </div>
        )}
      </div>
      {this.state.showHomePage2 ? <HomePage2 taskID = {this.state.taskID} dataSources = {this.props.dataSources} selectedDataSource = {this.state.selectedOption} answerData = {answerData} userQuestion = {userQuestion} onSearch={this.handleSearch} handleSearchValue={this.handleSearchValue}/> : <HomePage handleSearchValue={this.handleSearchValue} onSearch={this.handleSearch} />}
    </div>
  );
}
}

export default Body;