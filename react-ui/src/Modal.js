import React from 'react';
import './HomePage2.css'; // Ensure you have this CSS file for styling
import { API_BASE_URL } from './constants';

const Modal = ({ taskID, dataSource, options, onClose }) => {

  console.log(taskID);
  function saveToDashboard(dashboardName){
    var myHeaders = new Headers();
    console.log(dashboardName);
    myHeaders.append("Content-Type", "application/json");
    
    var raw = JSON.stringify({
      "task_id": taskID,
      "dashboard_name": dashboardName,
    });

    var requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: raw,
      redirect: 'follow'
    };
    
    fetch(`${ API_BASE_URL }/update_dashboard`, requestOptions)
      .then(response => response.text())
      .then(result => console.log(result))
      .catch(error => console.log('error', error));
    };

  return (
    <div className="modalContainer">
      <div className="modalOverlay" onClick={onClose}></div>
      <div className="modalContent">
        <div className="modalHeader">
          <h4 className="modalTitle">{dataSource}</h4>
          <button className="modalCloseButton" onClick={onClose}>&times;</button>
        </div>
        <div className="modalBody">
            <button className="addNewDashboardButton">
                <img src="/newDashboard.svg" alt="Add" className="addIcon" /> Add to new dashboard
            </button>
          {/* <ul className="dashboardList">
            <li className="dashboardItem">Saved Dashboard name 1</li>
            <li className="dashboardItem">Saved Dashboard name 2.exe</li>
            <li className="dashboardItem">Saved Dashboard 3</li>
          </ul> */}
          <ul className="dashboardList">
            {options.map((option, index) => (
              <li key={index} className="dashboardItem" onClick={() => saveToDashboard(option)}>{option}</li>
            ))}
          </ul>
        </div>
        <div className="modalFooter">
          <button className="modalButton modalButtonCancel" onClick={onClose}>Cancel</button>
          <button className="modalButton modalButtonSave">Save</button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
