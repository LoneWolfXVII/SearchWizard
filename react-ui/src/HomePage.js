import { useState } from 'react';
import React, { Component } from 'react';

import './HomePage.css';

const Card = ({ icon, heading, text }) => {
    return (
      <div className="card">
        <div className="circle">
          <img src={icon} alt={heading} className="cardIcon" />
        </div>
        <h2 className="cardHeading">{heading}</h2>
        <p className="cardText">{text}</p>
      </div>
    );
  };

  const HomePage = ({handleSearchValue, onSearch}) => {

    const [inputValue, setInputValue] = useState('');

    // Function to handle changes in the input
    const handleInputChange = (event) => {
      // Update the inputValue state with the current value of the input field
      setInputValue(event.target.value);
      handleSearchValue(event.target.value);
    };
    // const handler = () =>{
    //     props.onSearch(inputValue);
    // };
  
    console.log(inputValue);
    return (
        <div className="whiteCard">
            <h1 className="mainHeading">Visual Analytics Engine</h1>

            <div className="cardsContainer">
                <Card 
                    icon="/home_i1.png"
                    heading="Connect data source"
                    text="The Romans used a type of ancient concrete called opus caementicium."
                />
                <Card 
                    icon="/home_i2.png"
                    heading="Analyse data"
                    text="The Romans used a type of ancient concrete called opus caementicium."
                />
                <Card 
                    icon="/home_i3.png"
                    heading="Visualise on dashboard"
                    text="The Romans used a type of ancient concrete called opus caementicium."
                />
            </div>

                <div className="searchContainer">
                    <input type="text" className="searchInput" placeholder="" onChange={handleInputChange}/>
                    <div className="searchIconContainer">
                        <img src="/sendIcon.png" alt="Send" className="searchIcon" onClick={onSearch}/>
                    </div>
                </div>
        </div>
    );

}
export default HomePage;
