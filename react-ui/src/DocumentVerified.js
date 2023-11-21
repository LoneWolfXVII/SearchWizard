import React from 'react';
import './DocumentVerified.css'; // Assume you have a corresponding CSS file
import DropdownButton from './DropdownButton';
import UploadButton from './DVUploadButton';
import { useState } from 'react';
import MerchantId from './DVMerchantID';
import HistoricalMatch from './DVHistoricalMatch';


const DocumentVerified = () => {

  return (
    <div className="document-verification">
      <div className='doc-ver-heading'>Document Verification</div>
      <div className='doc-ver-white-card2'>
        <div className='doc-ver-card-middle'>
            <div className='merchantCard'>
                <img src='./dv-merchant.svg' alt="Merchant" className="merchant-icon" />
                <div className="merchant-id-display2">
                    Merchant Id: 8541125
                </div>
            </div>
            <HistoricalMatch />
        </div>

        <div className="criteria">
          <div className="acceptance-criteria">
            <div className='criteria-header'>
              <h2>Acceptance Criteria</h2>
            </div>
            {/* Repeat the line item for each criterion */}
            <div className="criteria-item">
              <div className='criteria-item-container'>
                <label htmlFor="accept1">Basic incorrect blood tube/other sample.</label>
              </div>
              <div className='criteria-item-container'>
                <label htmlFor="accept1">Basic incorrect blood tube/other sample.</label>
              </div>
              <div className='criteria-item-container'>
                <label htmlFor="accept1">Basic incorrect blood tube/other sample.</label>
              </div>
              <div className='criteria-item-container'>
                <label htmlFor="accept1">Basic incorrect blood tube/other sample.</label>
              </div>
              <div className='criteria-item-container'>
                <label htmlFor="accept1">Basic incorrect blood tube/other sample.</label>
              </div>
              <div className='criteria-item-container'>
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
                <label htmlFor="reject1">Basic incorrect blood tube/other sample.</label>
              </div>
              <div className='criteria-item-container'>
                <label htmlFor="reject1">Basic incorrect blood tube/other sample.</label>
              </div>
              <div className='criteria-item-container'>
                <label htmlFor="reject1">Basic incorrect blood tube/other sample.</label>
              </div>
              <div className='criteria-item-container'>
                <label htmlFor="reject1">Basic incorrect blood tube/other sample.</label>
              </div>
              <div className='criteria-item-container'>
                <label htmlFor="reject1">Basic incorrect blood tube/other sample.</label>
              </div>
              <div className='criteria-item-container'>
                <label htmlFor="reject1">Basic incorrect blood tube/other sample.</label>
              </div>
            </div>
            {/* ... other rejection criteria */}
          </div>
        </div>

        <div className='dv-buttons'>
            <button className="reject-btn">REJECT</button>
            <button className="approve-btn">MARK APPROVE</button>
        </div>
      </div>
    </div>
  );
};

export default DocumentVerified;
