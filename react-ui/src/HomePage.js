import { useState, useEffect } from 'react';
import React from 'react';
import { Chart, registerables } from 'chart.js';
import './HomePage.css';
import { API_BASE_URL } from './constants';

Chart.register(...registerables);

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

const HomePage = ({ handleSearchValue, onSearch }) => {
    const [inputValue, setInputValue] = useState('');
    const [chartData, setChartData] = useState(null);

    useEffect(() => {
      fetch(`${API_BASE_URL}/get_search_data`)
          .then(response => response.json())
          .then(data => {
              console.log(data)
              setChartData({
                labels: data.labels, // Assuming 'labels' is part of the API response
                datasets: [{
                    label: 'Your Label',
                    data: data.values, // Assuming 'values' is part of the API response
                    backgroundColor: 'rgba(68,108,255, 0.4)',
                    // ...other dataset properties
                }]
            });
        })
        .catch(error => console.error('Error fetching data:', error));
}, [API_BASE_URL]);

  useEffect(() => {
    if (chartData) {
        const config = {
            type: 'bar',
            data: chartData,
            options: {
                responsive: true,
                plugins: {
                    legend: {
                        position: 'top',
                    },
                    title: {
                        display: true,
                        text: 'Your Chart Title'
                    }
                }
            },
        };

        new Chart(document.getElementById('myChart'), config);
    }
}, [chartData]);
    // useEffect(() => {
    //     const data = {
    //         labels: ['Label1', 'Label2', 'Label3','Label4'], // Example labels
    //         datasets: [{
    //             label: 'Dataset 1',
    //             data: [10, 20, 30, 50 ], // Example data
    //             backgroundColor: 'rgba(68,108,255, 0.4)',
    //             // ... (other dataset properties)
    //         }]
    //     };

    //     const config = {
    //         type: 'bar',
    //         data: data,
    //         options: {
    //             responsive: true,
    //             plugins: {
    //                 legend: {
    //                     position: 'top',
    //                 },
    //                 title: {
    //                     display: true,
    //                     text: 'most booked hotel'
    //                 }
    //             }
    //         },
    //     };

    //     new Chart(document.getElementById('myChart'), config);
    // }, []);

    const handleInputChange = (event) => {
        setInputValue(event.target.value);
        handleSearchValue(event.target.value);
    };

    const handleKeyDown = (event) => {
        if (event.key === 'Enter') {
            onSearch();
        }
    };

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
            
            <canvas id="myChart"></canvas>
            

            <div className="searchContainer">
                <input type="text" className="searchInput" placeholder="" onChange={handleInputChange} onKeyDown={handleKeyDown}/>
                <div className="searchIconContainer">
                    <img src="/sendIcon.png" alt="Send" className="searchIcon" onClick={onSearch}/>
                </div>
            </div>
        </div>
    );
}

export default HomePage;
