import React, { useState } from 'react';
import UserQuestion from './UserQuestion';
import AnswerSection from './AnswerSection'; // Import the AnswerSection component you created
import FollowUpQuestions from './FollowUpQuestions'; // Import the FollowUpQuestions component

const HomePage2 = (props) => {
    const userQuestion = props.userQuestion;
    let formattedFollowUpQuestions = null;
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
          ];
      }

    const handleExport = () => {
        console.log("Exporting graph...");
    };

    const handleAddToDashboard = () => {
        console.log("Adding graph to dashboard...");
    };

    return (
        <div className='HomePage2Container'>
            {userQuestion ? <UserQuestion profileImage={"/profile.png"} question={userQuestion}/> : null}
            {props.answerData ? <AnswerSection
                answerData={props.answerData}
                onExport={handleExport}
                onAddToDashboard={handleAddToDashboard}
              /> : null
            }
            <FollowUpQuestions followUpQuestions={formattedFollowUpQuestions} onSearch={props.onSearch} handleSearchValue={props.handleSearchValue}/>
        </div>
    );
};

export default HomePage2;