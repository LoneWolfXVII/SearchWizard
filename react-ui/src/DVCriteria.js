import React, { useState } from 'react';
import './DocumentVerification.css';

const CriteriaSection = ({ title, criteria, setCriteria }) => {
  const [showInput, setShowInput] = useState(false);
  const [newCriterion, setNewCriterion] = useState('');

  const addCriterion = () => {
    if (newCriterion.trim()) {
      setCriteria([...criteria, newCriterion]);
      setNewCriterion('');
      setShowInput(false);
    }
  };

  return (
    <div className="criteria-section">
      <div className="criteria-header">
        <h2>{title}</h2>
        <button className="add-condition-button" onClick={() => setShowInput(true)}>
          {/* Replace with the path to your plus icon image */}
          <img src='./path-to-plus-icon.svg' alt="Add" className="plus-icon" />
          Add more conditions
        </button>
      </div>
      {showInput && (
        <div className="criteria-input">
          <input
            type="text"
            placeholder="Type your condition here"
            value={newCriterion}
            onChange={(e) => setNewCriterion(e.target.value)}
          />
          <button className="confirm-addition-button" onClick={addCriterion}>✔️</button>
        </div>
      )}
      {/* Existing criteria list... */}
    </div>
  );
};

export default CriteriaSection;
