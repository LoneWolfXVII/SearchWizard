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

//   const { answer, graph_img, insight } = answerData;
  
//   const [firstPartOfInsight, secondPartOfInsight] = {insight} ? splitInsightText({insight}) : ['', ''];
  console.log({insight});
//   function splitInsightText(insightText) {
//     // Ensure insightText is a string
//     if (typeof insightText === 'string') {
//       // A basic example of splitting the text could be to split by sentences or paragraphs.
//       // Adjust the logic here based on how you want to split your content.
//       const sentences = insightText.split('. ');
//       const halfwayIndex = Math.ceil(sentences.length / 2);
//       const firstPart = sentences.slice(0, halfwayIndex).join('. ');
//       const secondPart = sentences.slice(halfwayIndex).join('. ');
//       return [firstPart, secondPart];
//     }
//     return ['', '']; // Return empty strings if insightText is not a string
//   }

const insightsToShowNextToGraph = 2;

    // Slice the insights array to separate the parts to display
const firstPartOfInsight = Array.isArray({insight}) ? {insight}.slice(0, 2).join(' ') : '';
const secondPartOfInsight = Array.isArray({insight}) ? {insight}.slice(2).join(' ') : '';
console.log(Array.isArray({insight}));
console.log(firstPartOfInsight);

  return (
    <div className="answerSection">
      { answer ? <div className="answerText">
        <img src="/chat.png" alt="Answer Icon" className="answerIcon" />
        <div className="textOfAnswer">{answer}</div>
      </div> : null}
      <div className='graphAndInsight'>
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
          <div className="insightSection">
                    <div className="insightHeader">
                        <img src="/insights.png" alt="Insights Icon" className="insightIcon" />
                        <div className="Insights">Insights</div>
                    </div>
                    <div className="firstPartInsightText">
                        <p dangerouslySetInnerHTML={{ __html: firstPartOfInsight }} />
                    </div>
                </div>
        </div> : null}
        {secondPartOfInsight && (
                <div className="secondPartInsightText">
                    <p dangerouslySetInnerHTML={{ __html: secondPartOfInsight }} />
                </div>
            )}
      </div>
    </div>
  );
};

export default AnswerSection;