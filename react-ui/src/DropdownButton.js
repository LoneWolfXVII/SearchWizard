// import React, { useState, useRef } from 'react';
// import './DocumentVerification.css'; // Make sure to define your styles in this file

// const DropdownButton = () => {
//   const [isOpen, setIsOpen] = useState(false);
//   const dropdownRef = useRef(null);

//   // This function toggles the dropdown's visibility
//   const toggleDropdown = () => setIsOpen(!isOpen);

//   // This function closes the dropdown when the mouse leaves the area
//   const closeDropdown = () => setIsOpen(false);

//   return (
//     <div className="dropdown-container" ref={dropdownRef} onMouseLeave={closeDropdown}>
//       <button className="dropdown-button">
//         Document type
//         <img
//           src='./dv-d1.svg'
//           alt="Open dropdown"
//           className="dropdown-icon"
//           onClick={toggleDropdown}
//         />
//       </button>
//       {isOpen && (
//         <ul className="dropdown-list">
//           <li>Option 1</li>
//           <li>Option 2</li>
//           <li>Option 3</li>
//           {/* Add more hardcoded options as needed */}
//         </ul>
//       )}
//     </div>
//   );
// };

// export default DropdownButton;

import React, { useState, useRef } from 'react';
import './DocumentVerification.css'; // Make sure to define your styles in this file

const DropdownButton = ({ onOptionSelect }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState('Document type');
  const dropdownRef = useRef(null);

  const toggleDropdown = () => setIsOpen(!isOpen);

  const closeDropdown = () => setIsOpen(false);

  const handleOptionClick = (option) => {
    setSelectedOption(option);
    onOptionSelect(option);
    setIsOpen(false); // Optionally close the dropdown
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
          <li onClick={() => handleOptionClick('Aadhar')}>Aadhar</li>
          <li onClick={() => handleOptionClick('PAN')}>PAN</li>
          <li onClick={() => handleOptionClick('License')}>License</li>
          {/* Add more hardcoded options as needed */}
        </ul>
      )}
    </div>
  );
};

export default DropdownButton;

