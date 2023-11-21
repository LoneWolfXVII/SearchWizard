import React, { useState, useEffect, useRef } from 'react';
import './DocumentVerification.css'; // Make sure to define your styles in this file
import { API_BASE_URL } from './constants';

const DropdownButton = ({ onOptionSelect }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [options, setOptions] = useState([]); // State to hold the list of options
  const [selectedOption, setSelectedOption] = useState('Document type');
  const dropdownRef = useRef(null);

  useEffect(() => {
    const requestOptions = {
      method: 'GET',
      redirect: 'follow'
    };

    fetch(`${API_BASE_URL}/get_document_list`, requestOptions)
      .then(response => response.json()) // Assuming the response is in JSON
      .then(result => {
        setOptions(result); // Update the state with the fetched result
      })
      .catch(error => console.log('error', error));
  }, []); // The empty array ensures this effect runs only once when the component mounts

  const toggleDropdown = () => setIsOpen(!isOpen);

  const closeDropdown = () => setIsOpen(false);

  const handleOptionClick = (option) => {
    setSelectedOption(option);
    onOptionSelect(option);
    setIsOpen(false);
  };

  return (
    <div className="dropdown-container" ref={dropdownRef} onMouseLeave={closeDropdown}>
      <button className="dropdown-button" onClick={toggleDropdown}>
        {selectedOption}
        <img
          src='./dv-d1.svg'
          alt="Open dropdown"
          className="dropdown-icon"
        />
      </button>
      {isOpen && (
        <ul className="dropdown-list">
          {options.map((option, index) => (
            <li key={index} onClick={() => handleOptionClick(option)}>
              {option}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default DropdownButton;

