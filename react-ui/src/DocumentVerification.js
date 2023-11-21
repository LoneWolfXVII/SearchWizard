import React from 'react';
import './DocumentVerification.css'; // Assume you have a corresponding CSS file
import DropdownButton from './DropdownButton';
import UploadButton from './DVUploadButton';
import { useState } from 'react';
import MerchantId from './DVMerchantID';
import { API_BASE_URL } from './constants';

const DocumentVerification = () => {

  const [merchantId, setMerchantId] = useState(''); // State for merchant ID
  const [selectedDocumentType, setSelectedDocumentType] = useState('');
  const [uploadedFiles, setUploadedFiles] = useState([]); // Handling multiple files

  // const handleFileSelect = (file) => {
  //   // When a file is selected, update the name to the selected document type
  //   const updatedFile = { ...file, name: selectedDocumentType };
  //   setUploadedFiles([...uploadedFiles, updatedFile]);
    
  // };
  const handleFileSelect = (file) => {
    if (!file) {
        console.log('No file selected');
        return;
    }

    if (!selectedDocumentType) {
        console.log('Document type not selected');
        alert('Please select a document type first.');
        return;
    }

    // Create a file object with the necessary properties
    const fileObject = {
        file: file,
        docType: selectedDocumentType,
        name: file.name
    };

    // Update the state with the new file
    setUploadedFiles(prevFiles => [...prevFiles, fileObject]);

    // Call handleSubmit immediately after file selection
    handleSubmit(fileObject);
};

  const handleOptionSelect = (option) => {
    setSelectedDocumentType(option);
  };

  const handleFileDelete = (fileName) => {
    // Remove the file from the uploadedFiles array
    setUploadedFiles(uploadedFiles.filter(file => file.name !== fileName));
  };

  const handleMerchantIdChange = (id) => {
    console.log('test');
    console.log(id);
    setMerchantId(id);
  };
  
  const handleSubmit = (fileObject) => {
    console.log(merchantId);
    console.log(fileObject);
    if (!merchantId || !fileObject.docType || !fileObject.file) {
        console.log('Missing data: Merchant ID, Document Type, or File is not provided.');
        alert('Please fill all the fields.');
        return;
    }

    const formData = new FormData();
    formData.append("merch_id", merchantId);
    formData.append("doc_type", fileObject.docType);
    formData.append("doc_img", fileObject.file, fileObject.name);

    console.log(`Sending request with Merchant ID: ${merchantId}, Document Type: ${fileObject.docType}, File Name: ${fileObject.name}`);

    const requestOptions = {
        method: 'POST',
        body: formData,
        redirect: 'follow'
    };

    fetch(`${API_BASE_URL}/paytm/update_merchant_data`, requestOptions)
        .then(response => response.text())
        .then(result => {
            console.log('API Response:', result);
        })
        .catch(error => {
            console.log('API Error:', error);
        });
};

  return (
    <div className="document-verification">
      <div className='doc-ver-heading'>Document Verification</div>
      <div className='doc-ver-white-card'>
        <MerchantId onChange={handleMerchantIdChange}/>

        <div className="upload-section">
          <button className="icon-button">
            <img src='./dv-b1.svg' alt="Icon" className="button-icon" />
            Document 
          </button>
          <DropdownButton onOptionSelect={handleOptionSelect} />
          <UploadButton onFileSelect={handleFileSelect}/>
          <div className="uploaded-files-container">
            {uploadedFiles.map((file, index) => (
              <div className='files-div'>
                  <div key={index} className="file-box">
                    <div className="file-background-image" style={{ backgroundImage: `url('./dv-bg2.svg)` }}>
                      <img src='./dv-verified.svg' alt="Verified" className="verified-icon" />
                      <button onClick={() => handleFileDelete(file.name)} className="delete-icon-button">
                        <img src='./dv-delete.svg' alt="Delete" className="delete-icon" />
                      </button>
                    </div>
                  </div>
                  <div className="file-name">{file.docType}</div>
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
