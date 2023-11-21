import React, { useState } from "react";
import "./HomePage2.css"; // Ensure you have this CSS file for styling
import { API_BASE_URL } from "./constants";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
 
const Modal = ({ reloadApp, taskID, dataSource, options, onClose }) => {
  const [newDashboard, setNewDashboard] = useState("Add to new dashboard");
  const [isEditable, setIsEditable] = useState(false);
  const [selectedDashboard, setSelectedDashboard] = useState(null);
 
  const handleDashboardNameChange = (event) => {
    setNewDashboard(event.target.value);
  };
 
  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      setIsEditable(false);
      setSelectedDashboard(newDashboard);
    }
  };
 
  const enableEditing = () => {
    setIsEditable(true);
  };
  // console.log(taskID);
  function saveToDashboard(dashboardName) {
    console.log(dashboardName);
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
 
    var raw = JSON.stringify({
      task_id: taskID,
      dashboard_name: dashboardName,
    });
 
    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };
 
    fetch(`${API_BASE_URL}/update_dashboard`, requestOptions)
    .then((response) => response.json())
    .then((result) => {
      if (result.status === "success") {
        onClose();
        reloadApp();
        toast.success("Dashboard updated successfully!", {
          position: toast.POSITION.TOP_RIGHT,
        });
      } else {
        console.log("API call failed:", result);
        toast.error("Failed to update dashboard. Please try again.", {
          position: toast.POSITION.TOP_RIGHT,
        });
      }
    })
    .catch((error) => {
      console.log("error", error);
      toast.error("An error occurred. Please try again later.", {
        position: toast.POSITION.TOP_RIGHT,
      });
    });
}
 
  return (
    <div className="modalContainer">
      <div className="modalOverlay" onClick={onClose}></div>
      <div className="modalContent">
        <div className="modalHeader">
          <h4 className="modalTitle">{dataSource}</h4>
          <button className="modalCloseButton" onClick={onClose}>
            &times;
          </button>
        </div>
        <div className="modalBody">
          <button className="addNewDashboardButton" onClick={enableEditing}>
            <img src="/newDashboard.svg" alt="Add" className="addIcon" />
            {isEditable ? (
              <input
                type="text"
                value={newDashboard}
                onChange={handleDashboardNameChange}
                onKeyDown={handleKeyDown}
 
                // autoFocus
              />
            ) : (
              <span>{newDashboard}</span>
            )}
          </button>
 
          <ul className="dashboardList">
            {options.map((option, index) => (
              <li
                key={index}
                className="dashboardItem"
                onClick={() => setSelectedDashboard(option)}
              >
                {option}
              </li>
            ))}
          </ul>
        </div>
        <div className="modalFooter">
          <button className="modalButton modalButtonCancel" onClick={onClose}>
            Cancel
          </button>
          <button
            className="modalButton modalButtonSave"
            onClick={() => saveToDashboard(selectedDashboard)}
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
};
 
export default Modal;