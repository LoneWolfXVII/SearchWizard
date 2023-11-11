import { Component } from "react";
import HomePage from './HomePage';
import HomePage2 from './HomePage2';

class Body extends Component{

state = {
    query: "", // This should hold the query input by the user
    isLoading: false,
    error: null,
    taskID: null,
    answerData: null,
    showHomePage2: false,
  };

handleShowHomePage2 = () => {
  this.setState({ShowHomePage2: true});
};

handleSearchValue = (value) => {
  this.setState({query: value});
};

  // constructor(props) {
  //     super(props);
  //     this.handleSearch = this.handleSearch.bind(this);
  //     this.fetchAnswer = this.fetchAnswer.bind(this);
  //     this.fetchTaskID = this.fetchTaskID.bind(this);
  //   }

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
  
      return fetch("http://3.110.92.208:8080/get_answer", requestOptions)
      .then(response => response.json())
      .then(data => data.task_id)
      .catch(error => {
          console.error('Error fetching task_id:', error);
          return null;
      });
  };

//   const handleSearch = async () => {
//     const query = "Most booked hotel"; // Replace with user input
//     const dataSourceName = "Travel - 1"; // Replace with user input

//     const taskID = await fetchTaskID(query, dataSourceName);

//     if (taskID) {
//       // Do something with the taskID
//       console.log("Task ID:", taskID);
//     }
//   };

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


  // if (typeof onSearch === 'function') {
  //   onSearch();
  // }
//   this.props.onSearch();
};

fetchAnswer = () => {
  let { taskID } = this.state;
  if (!taskID) return;
  taskID = '127b66af-5e69-4154-a1e4-ee3015ddcdfc';
  const requestOptions = {
    method: 'GET',
    redirect: 'follow'
  };

  // Define an interval time, e.g., 2 seconds
  const intervalTime = 2000; // 2 seconds
  const maxRetries = 15; // Maximum number of retries
  let retries = 0;

  // Store the interval ID so you can clear it later
  const intervalId = setInterval(() => {
    fetch(`http://3.110.92.208:8080/get_query_status?task_id=${taskID}`, requestOptions)
      .then(response => response.json())
      .then(data => {
        // Increment the number of retries
        retries++;

        if (data.status === "Done" || retries > maxRetries) {
          // If the status is "Done" or max retries exceeded, clear the interval
          clearInterval(intervalId);
          // console.log(taskID);
          // console.log(data);
          const formattedAnswerData = {
            answer: data.answer,
            graph_img: data.graph_img, // Assuming these properties exist on the fetched data
            // insight: data.insights.join(' '), // Join insights array into a single string if necessary
            insight: data.insights,
            follow_up_questions: data.follow_up_questions,
          };
          // console.log(formattedAnswerData);
        
          this.setState({ answerData: formattedAnswerData, isLoading: false, showHomePage2: true});

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
    const { answerData, isLoading, error, query } = this.state;
    // console.log(answerData);
  if (error && !answerData) {
    // Render error message
    return <div>Error: {error}</div>;
  }

  if (isLoading) {
    // Render loading state
    return <div>Loading...</div>;
  }

  // if (!answerData) {
  //   // Render nothing or some initial state if answerData is not yet fetched
  //   return null;
  // }

  // Now that we are sure answerData is defined, we can safely destructure it
  // const { answer, graph_img, insights } = answerData;
  return(
  <div className="body-container">
    {this.state.showHomePage2 ? <HomePage2 answerData = {answerData} userQuestion = {query}/> : <HomePage handleSearchValue={this.handleSearchValue} onSearch={this.handleSearch} />}
  </div>);


}
}

export default Body;

