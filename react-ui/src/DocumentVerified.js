import React from 'react';
import './DocumentVerified.css';
import HistoricalMatch from './DVHistoricalMatch';
import { API_BASE_URL } from './constants';

const colorMapping = {
  green: '#D9FFD0',
  orange: '#FFD374',
  red: '#FF9494'
};


const DocumentVerified = (props) => {
  const handleRedirect = (status) => {
    console.log(status);
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    var formdata = new FormData();
    formdata.append("merchant_id", props.merchantId);
    formdata.append("status", status);

    var requestOptions = {
      method: 'POST',
      // headers: myHeaders,
      body: formdata,
      redirect: 'follow'
    };
    console.log(formdata);

    fetch(`${API_BASE_URL}/data_validation/submit_decision`, requestOptions)
      .then(response => response.text())
      .then(result => console.log(result))
      .catch(error => console.log('error', error));
    props.redirect();
  }
  return (
    <div className="document-verification">
      <div className='doc-ver-heading'>Data Matching</div>
      <div className='doc-ver-white-card2'>
        <div className='doc-ver-card-middle'>
          <div className='merchantCard'>
            <img src='./dv-merchant.svg' alt="Merchant" className="merchant-icon" />
            <div className="merchant-id-display2">
              Merchant Id: {props.merchantId}
            </div>
          </div>
          <HistoricalMatch p1={props.p1} p2={props.p2} />
        </div>

        <div className="criteria">
          <div className='criteria-heading'>VALIDATION RESULT</div>
          <div className='criteria-card2'>
            <div>
              <div className="criteria-item">
                {Object.entries(props.conditions).map(([condition, colorName], index) => {
                  const backgroundColor = colorMapping[colorName.toLowerCase()] || colorName; // Default to colorName if not found
                  return (
                    <div
                      className='criteria-item-container2'
                      key={index}
                      style={{
                        backgroundColor: backgroundColor,
                        padding: '10px',
                        margin: '5px 0',
                        borderRadius: '4px'
                      }}
                    >
                      <label htmlFor={`criteria${index}`}>{condition}</label>
                    </div>
                  );
                })}
              </div>


            </div>
            <div className='criteria-vlaidation'>
              <img src='./dv-verified2.png' alt="Verified" className="criteria-icon" />
              <div className='criteria-vlaidation-text'>Validation completed</div>
            </div>
          </div>
        </div>

        <div className='dv-buttons'>
          <button className="reject-btn" onClick={() => handleRedirect(false)}>REJECT</button>
          <button className="approve-btn" onClick={() => handleRedirect(true)}>MARK APPROVE</button>
        </div>
      </div>
    </div>
  );
};

export default DocumentVerified;
