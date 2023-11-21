import React from 'react';
import './DocumentVerified.css'; // Make sure to define your styles in this file

const HistoricalMatch = () => {
  // These could be props or state if they need to be dynamic
  const acceptanceRate = '75%';
  const rejectionRate = '75%';

  return (
    <div className="historical-match-container">
      <div className="title">Historical Match</div>
      <div className="match-sections">
        <div className="acceptance-section">
          <div className="label">ACCEPTANCE</div>
          <div className="percentage" style={{ color: '#3A9900' }}>{acceptanceRate}</div>
        </div>
        <div className="divider"></div>
        <div className="rejection-section">
          <div className="label">REJECTION</div>
          <div className="percentage" style={{ color: '#FF3030' }}>{rejectionRate}</div>
        </div>
      </div>
    </div>
  );
};

export default HistoricalMatch;
