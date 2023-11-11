import React, { useState } from 'react';
import UserQuestion from './UserQuestion';
import AnswerSection from './AnswerSection'; // Import the AnswerSection component you created
import FollowUpQuestions from './FollowUpQuestions'; // Import the FollowUpQuestions component
// import profilePic from './profile.png'; // Path to your profile image

const HomePage2 = (props) => {
    // Example question
    const userQuestion = props.userQuestion;
    let formattedFollowUpQuestions = null;
    // const originalFollowUpQuestions = props.answerData.follow_up_questions;

    // // Convert the original follow-up questions array to the desired format
    // const formattedFollowUpQuestions = originalFollowUpQuestions.map((question) => ({
    //   text: question,
    // }));
    if (props.answerData && props.answerData.follow_up_questions) {
        const originalFollowUpQuestions = props.answerData.follow_up_questions;
      
        // Convert the original follow-up questions array to the desired format
        formattedFollowUpQuestions = originalFollowUpQuestions.map((question, index) => ({
          text: question,
        }));
      
        // Now you can use formattedFollowUpQuestions in your component
      } else {
        formattedFollowUpQuestions = [
            { text: 'Follow-up Question 1' },
            { text: 'Follow-up Question 2' },
            { text: 'Follow-up Question 1' },
            { text: 'Follow-up Question 2' },
            { text: 'Follow-up Question 1' },
            { text: 'Follow-up Question 2' },
            { text: 'Follow-up Question 1' },
            { text: 'Follow-up Question 2' },
            { text: 'Follow-up Question 1' },
            { text: 'Follow-up Question 2' },
            // Add more follow-up question text here
          ];
        // Handle the case when follow_up_questions is not defined, e.g., set a default value or show an error message
      }
    // const answerData = {
    //     answer: "Total numbers of customers with order > 1000 = 2134",
    //     graph_img: '/graph-answer.png', // The path to the graph image file
    //     insight: 'Loans Revenue Rate Insights Report' +
    //     'Report Date: October 4, 2023 ' +
    //     'The profitability of loan portfolios.In Q1-Q4 2023, the industry average loans revenue rate stood at 8.2%.',
    //   };
    // const answerData = this.props.answerData;
    // console.log(props.answerData);

    // Example function to simulate the export action
    const handleExport = () => {
        console.log("Exporting graph...");
        // Implement the function to export the graph
    };

    // Example function to simulate adding graph to dashboard
    const handleAddToDashboard = () => {
        console.log("Adding graph to dashboard...");
        // Implement the function to add the graph to the dashboard
    };

    return (
        <div className='HomePage2Container'>
            <UserQuestion profileImage={"/profile.png"} question={userQuestion} />
            <AnswerSection
                answerData={props.answerData}
                onExport={handleExport}
                onAddToDashboard={handleAddToDashboard}
            />
            <FollowUpQuestions followUpQuestions={formattedFollowUpQuestions}/>
        </div>
    );
};

export default HomePage2;
