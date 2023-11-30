import React from 'react';
import { useDropzone } from 'react-dropzone';
import './DocumentVerification.css'; // Assume you have a corresponding CSS file
import DropdownButton from './DropdownButton';
import UploadButton from './DVUploadButton';
import { useState,useCallback, useEffect } from 'react';
import MerchantId from './DVMerchantID';
import { API_BASE_URL } from './constants';
import DocumentVerified from './DocumentVerified';

const DocumentVerification = () => {

  const [merchantId, setMerchantId] = useState(''); // State for merchant ID
  const [selectedDocumentType, setSelectedDocumentType] = useState('');
  const [uploadedFiles, setUploadedFiles] = useState([]); // Handling multiple files
  const [criteria, setCriteria] = useState([]); // State to store criteria
  const [documentVerified, setDocumentVerified] = useState(false);
  const [selectedCriteria, setSelectedCriteria] = useState([]);
  const [p1, setP1] = useState(null);
  const [p2, setP2] = useState(null);
  const [conditions, setConditions] = useState([]);
  const [loading, setLoading] = useState(false);
  // ... other states and useEffect for fetching criteria

  const handleCriteriaChange = (criteriaName, isChecked) => {
    if (isChecked) {
      setSelectedCriteria([...selectedCriteria, criteriaName]);
    } else {
      setSelectedCriteria(selectedCriteria.filter(item => item !== criteriaName));
    }
  };

  const submitValidationParams = () => {
    setLoading(true);
    var formdata = new FormData();
    formdata.append("merch_id", merchantId);
    formdata.append("validation_params", JSON.stringify(selectedCriteria));

    var requestOptions = {
      method: 'POST',
      body: formdata,
      redirect: 'follow'
    };

    fetch(`${API_BASE_URL}/analyse_merchant_data`, requestOptions)
      .then(response => response.json())
      .then(response =>{ 
        setP1(response.historical_match.Acceptance);
        setP2(response.historical_match.Rejection);
        setConditions(response.matched_conditions);
        setDocumentVerified(true);
        setLoading(false);
        console.log(response, p1, p2)})
      .catch(error => console.log('error', error));
      // setDocumentVerified(true);
  };

  //   const submitValidationParams = () => {
  //     const queryParams = new URLSearchParams({
  //         merch_id: merchantId,
  //         validation_params: JSON.stringify(selectedCriteria)
  //     }).toString();

  //     fetch(`http://13.126.140.56:8080/analyse_merchant_data?${queryParams}`, {
  //         method: 'GET',
  //         redirect: 'follow'
  //     })
  //     .then(response => {
  //       if (!response.ok) {
  //           throw new Error('Network response was not ok');
  //       }
  //       return response.text();
  //   })
  //     .then(response => response.text())
  //     .then(result => console.log(result))
  //     .catch(error => console.log('error', error));
  // };

  // Fetch criteria from API on component mount
  useEffect(() => {
    fetch(`${API_BASE_URL}/paytm/get_param_list`, {
      method: 'GET',
      redirect: 'follow'
    })
      .then(response => response.json())
      .then(data => {
        if (data.success && Array.isArray(data.data)) {
          console.log('Criteria fetched:', data.data);
          setCriteria(data.data);
        } else {
          console.error('Invalid response format:', data);
        }
      })
      .catch(error => console.log('error', error));
  }, []);

  const onDrop = useCallback(acceptedFiles => {
    console.log(acceptedFiles); // Add this line to debug
      handleSubmit({ file: acceptedFiles, docType: selectedDocumentType, name: acceptedFiles.name });
  }, [selectedDocumentType]);
  

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });


  const handleOptionSelect = (option) => {
    setSelectedDocumentType(option);
  };

  const handleFileDelete = (fileName) => {
    // Remove the file from the uploadedFiles array
    setUploadedFiles(uploadedFiles.filter(file => file !== fileName));
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

     // Ensure the file is a Blob or File object
     if (!(fileObject.file instanceof Blob) && !(fileObject.file instanceof File)) {
      console.error('The file is not a Blob or File object');
      return;
  }

    const formData = new FormData();
    formData.append("merch_id", merchantId);
    formData.append("doc_type", fileObject.docType);
    formData.append("file", fileObject.file, fileObject.name);

    console.log(`Sending request to upload to s3 with Merchant ID: ${merchantId}, Document Type: ${fileObject.docType}, File Name: ${fileObject.name}`);
    console.log('test');
    const requestOptions = {
      method: 'POST',
      body: formData,
      redirect: 'follow'
    };

    fetch(`http://3.111.174.29:8080/upload_to_s3`, requestOptions)
      .then(response => response.json())
      .then(result => {
        console.log('API Response:', result.url);
        callBackendAPI(result.url, fileObject.docType);
      })
      .catch(error => {
        console.log('API Error:', error);
      });
  };

  const callBackendAPI = async (fileUrl, docType) => {
    const formData = new FormData();
    formData.append("merch_id", merchantId);
    formData.append("doc_type", docType);
    formData.append("doc_img", fileUrl);


    console.log(`Sending request to backend with Merchant ID: ${merchantId}, Document Type: ${docType}, File Url: ${fileUrl}`);
    const requestOptions = {
      method: 'POST',
      body: formData,
      redirect: 'follow'
    };

    fetch(`${API_BASE_URL}/paytm/update_merchant_data`, requestOptions)
      .then(response => response.text())
      .then(result => {
        console.log('API Response:', result);
        setUploadedFiles(prevFiles => [...prevFiles, fileUrl]);
      })
      .catch(error => {
        console.log('API Error:', error);
      });
  }

  const redirect = () => {
    setDocumentVerified(false);
  }

  if(loading) return (
    <div>
      Analyzing
    </div>
  )

  return (
    !documentVerified ?
      <>
        <div className="document-verification">
          <div className='doc-ver-heading'>Data Matching</div>
          <div className='doc-ver-white-card'>
            <MerchantId onChange={handleMerchantIdChange} />

            <div className="upload-section">
              <button className="icon-button">
                <img src='./dv-b1.svg' alt="Icon" className="button-icon" />
                Document
              </button>
              <DropdownButton onOptionSelect={handleOptionSelect} />
              <UploadButton onFileSelect={onDrop} />
              <div className="uploaded-files-container">
                {uploadedFiles.map((file, index) => (
                  <div className='files-div'>
                    <div key={index} className="file-box">
                      <div className="file-background-image">
                        <img src='./dv-verified.svg' alt="Verified" className="verified-icon" />
                        <button onClick={() => handleFileDelete(file)} className="delete-icon-button">
                          <img src='./dv-delete.svg' alt="Delete" className="delete-icon" />
                        </button>
                      </div>
                    </div>
                    <div className="file-name">{file}</div>
                  </div>
                ))}
              </div>
            </div>

            <div className="criteria">
              <div className='criteria-heading'>Select validation rules</div>
              <div className='criteria-card'>
                <div>
                  {criteria.map((item, index) => (
                    <div className='criteria-item-container' key={index}>
                      <input
                        type="checkbox"
                        id={`criteria${index}`}
                        style={{ display: 'none' }}
                        onChange={(e) => handleCriteriaChange(item, e.target.checked)}
                      />
                      <label htmlFor={`criteria${index}`}>{item}</label>
                    </div>
                  ))}
                </div>
                <img src='./dv-verification.png' alt="Verified" className="criteria-icon" />
              </div>
            </div>

            <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
              <button className="analyze-btn" onClick={submitValidationParams}>Analyze</button>
            </div>
          </div>
        </div>
      </> :

      <DocumentVerified p1 = {p1} p2 = {p2} merchantId = {merchantId} conditions = {conditions} redirect = {redirect}/>
  );
};

export default DocumentVerification;


