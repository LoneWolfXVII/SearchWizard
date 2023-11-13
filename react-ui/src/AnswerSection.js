import React from 'react';
import './HomePage2.css';
import TypingEffect from './TypingEffect';

const AnswerSection = ({ answerData, onExport, onAddToDashboard }) => {
  
    const { answer, graph_img, insight } = answerData;
  // Function to handle exporting the graph
  // Function to handle exporting the graph
    const handleExport = (graphImage) => {
        // Create a new anchor element dynamically
        const link = document.createElement('a');
        // Set the download attribute with a default filename (users can change it)
        link.download = 'exported-graph.png';
        // Set the href to the image's URL
        link.href = graphImage;
        // Append the anchor to the body
        document.body.appendChild(link);
        // Trigger the download
        link.click();
        // Clean up: remove the anchor from the body
        document.body.removeChild(link);
    };
    

  // Function to handle adding the graph to the dashboard
  const handleAddToDashboard = () => {
    // Implement add to dashboard functionality here
    alert('Graph added to dashboard!');
  };

  return (
    <div className="answerSection">
      { answer ? <div className="answerText">
        <img src="/chat.png" alt="Answer Icon" className="answerIcon" />
        <div className="textOfAnswer">{answer}</div>
      </div> : null}
      {graph_img ? <div className="graphSection">
        <img src={graph_img} alt="Graph" className="graphImage" />

         <div className="graphButtons">
        <button onClick={() => handleExport(graph_img)} className="graphButton">
            <img src="/export.png" alt="Export" /> Export
        </button>
          <button onClick={handleAddToDashboard} className="graphButton">
            <img src="/add.png" alt="Add" /> Add to Dashboard
          </button>
        </div>
      </div> : null}
      { insight ? <div className="insightSection">
        <div style={{display: 'flex'}}>
          <img src="/insights.png" alt="Insights Icon" className="insightIcon" />
          <div className='Insights'>Insights</div>
        </div>
        <div className="insightText">
        <p dangerouslySetInnerHTML={{ __html: insight }}></p>
        {/* <p>
          <TypingEffect text = {insight} />
        </p> */}
        </div>
        </div>:null}
    </div>
  );
};

export default AnswerSection;