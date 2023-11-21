import React from 'react';
import './DocumentVerification.css'; // Assume you have a corresponding CSS file
import DropdownButton from './DropdownButton';
import UploadButton from './DVUploadButton';
import { useState } from 'react';
import MerchantId from './DVMerchantID';


const DocumentVerification = () => {

  const [selectedDocumentType, setSelectedDocumentType] = useState('');
  const [uploadedFiles, setUploadedFiles] = useState([]);

  const handleFileSelect = (file) => {
    // When a file is selected, update the name to the selected document type
    const updatedFile = { ...file, name: selectedDocumentType };
    setUploadedFiles([...uploadedFiles, updatedFile]);
    
  };

  const handleOptionSelect = (option) => {
    setSelectedDocumentType(option);
  };

  // // Handles state and events here if needed
  // const handleFileSelect = (file) => {
  //   // Process the file. For example, you can set it in the state or send it to an API
  //   // console.log('File selected:', file);
  //   setUploadedFiles([...uploadedFiles, file]);
  // };

  const handleFileDelete = (fileName) => {
    // Remove the file from the uploadedFiles array
    setUploadedFiles(uploadedFiles.filter(file => file.name !== fileName));
  };

  return (
    <div className="document-verification">
      <div className='doc-ver-heading'>Document Verification</div>
      <div className='doc-ver-white-card'>
        {/* <div className="merchant-id">
          <label className='merchant-id-label' htmlFor="merchantId">Merchant Id:</label>
          <input className='merchant-id-input' id="merchantId" type="text" defaultValue="#12345678" readOnly />
        </div> */}
        <MerchantId />

        <div className="upload-section">
          {/* <label htmlFor="uploadDocument">Upload document</label>
          <input type="file" id="uploadDocument" /> */}
          <button className="icon-button">
            <img src='./dv-b1.svg' alt="Icon" className="button-icon" /> {/* Icon image */}
            Document {/* Button text */}
          </button>
          <DropdownButton onOptionSelect={handleOptionSelect} />
          <UploadButton onFileSelect={handleFileSelect}/>
          <div className="uploaded-files-container">
            {uploadedFiles.map((file, index) => (
              <div className='files-div'>
                  <div key={index} className="file-box">
                    <div className="file-background-image" style={{ backgroundImage: `url('./dv-bg2.svg)` }}>
                    {/* <div className="file-background-image"> */}
                      <img src='./dv-verified.svg' alt="Verified" className="verified-icon" />
                      <button onClick={() => handleFileDelete(file.name)} className="delete-icon-button">
                        <img src='./dv-delete.svg' alt="Delete" className="delete-icon" />
                      </button>
                    </div>
                  </div>
                  <div className="file-name">{file.name}</div>
              </div>
            ))}
          </div>
        </div>

        <div className="criteria">
          <div className="acceptance-criteria">
            <div className='criteria-header'>
              <h2>Acceptance Criteria</h2>
            </div>
            {/* Repeat the line item for each criterion */}
            <div className="criteria-item">
              <div className='criteria-item-container'>
                <input type="checkbox" id="accept1" />
                <label htmlFor="accept1">Basic incorrect blood tube/other sample.</label>
              </div>
              <div className='criteria-item-container'>
                <input type="checkbox" id="accept1" />
                <label htmlFor="accept1">Basic incorrect blood tube/other sample.</label>
              </div>
              <div className='criteria-item-container'>
                <input type="checkbox" id="accept1" />
                <label htmlFor="accept1">Basic incorrect blood tube/other sample.</label>
              </div>
              <div className='criteria-item-container'>
                <input type="checkbox" id="accept1" />
                <label htmlFor="accept1">Basic incorrect blood tube/other sample.</label>
              </div>
              <div className='criteria-item-container'>
                <input type="checkbox" id="accept1" />
                <label htmlFor="accept1">Basic incorrect blood tube/other sample.</label>
              </div>
              <div className='criteria-item-container'>
                <input type="checkbox" id="accept1" />
                <label htmlFor="accept1">Basic incorrect blood tube/other sample.</label>
              </div>
            </div>
            {/* ... other acceptance criteria */}
          </div>
          <div className="rejection-criteria">
            <div className='criteria-header'>
              <h2>Rejection Criteria</h2>
            </div>
            {/* Repeat the line item for each criterion */}
            <div className="criteria-item">
              <div className='criteria-item-container'>
                <input type="checkbox" id="reject1" />
                <label htmlFor="reject1">Basic incorrect blood tube/other sample.</label>
              </div>
              <div className='criteria-item-container'>
                <input type="checkbox" id="reject1" />
                <label htmlFor="reject1">Basic incorrect blood tube/other sample.</label>
              </div>
              <div className='criteria-item-container'>
                <input type="checkbox" id="reject1" />
                <label htmlFor="reject1">Basic incorrect blood tube/other sample.</label>
              </div>
              <div className='criteria-item-container'>
                <input type="checkbox" id="reject1" />
                <label htmlFor="reject1">Basic incorrect blood tube/other sample.</label>
              </div>
              <div className='criteria-item-container'>
                <input type="checkbox" id="reject1" />
                <label htmlFor="reject1">Basic incorrect blood tube/other sample.</label>
              </div>
              <div className='criteria-item-container'>
                <input type="checkbox" id="reject1" />
                <label htmlFor="reject1">Basic incorrect blood tube/other sample.</label>
              </div>
            </div>
            {/* ... other rejection criteria */}
          </div>
        </div>

        <button className="analyze-btn">Analyze</button>
      </div>
    </div>
  );
};

export default DocumentVerification;
