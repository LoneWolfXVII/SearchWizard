import { useState, useEffect } from "react";
import React from "react";
import { Chart, registerables } from "chart.js";
import "./HomePage.css";
import { API_BASE_URL } from "./constants";

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
  const [inputValue, setInputValue] = useState("");
  const [chartData, setChartData] = useState(null);

  const fetchChartData = () => {
    fetch(`${API_BASE_URL}/get_search_data`)
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setChartData({
          labels: data.labels,
          datasets: [
            {
              label: "Your Label",
              data: data.values,
              backgroundColor: "rgba(68,108,255, 0.4)",
              // ...other dataset properties
            },
          ],
        });
      })
      .catch((error) => console.error("Error fetching data:", error));
  };

  const renderChart = () => {
    if (chartData) {
      const config = {
        type: "bar",
        data: chartData,
        options: {
          responsive: true,
          plugins: {
            legend: {
              position: "top",
            },
            title: {
              display: true,
              text: "Your Chart Title",
            },
          },
        },
      };

      new Chart(document.getElementById("myChart"), config);
    }
  };

  useEffect(() => {
    fetchChartData();
  }, []);

  useEffect(() => {
    renderChart();
  }, [chartData]);

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };

  const handleSearch = () => {
    fetchChartData();
  };

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      event.preventDefault();
      //   handleSearch();
      onSearch(inputValue);
    }
  };

  return (
    <>
      <div className="whiteCard">
        <div className="searchContainer">
          <input
            type="text"
            className="searchInput"
            placeholder=""
            onChange={handleInputChange}
            onKeyDown={handleKeyDown}
          />
          <div className="searchIconContainer2">
            <img
              src="/sendIcon.png"
              alt="Send"
              className="searchIcon2"
              onClick={() => onSearch(inputValue)}
            />
          </div>
        </div>

        <h1 className="mainHeading">Visual Analytics Engine</h1>

        <div className="cardsContainer">
          <Card
            icon="/home_i1.png"
            heading="Connect data source"
            text="Seamlessly Integrate and Analyze Data from Any Data Source"
          />
          <Card
            icon="/home_i2.png"
            heading="Analyse data"
            text="Simply Speak Your Search in Plain English Below"
          />
          <Card
            icon="/home_i3.png"
            heading="Visualise on dashboard"
            text="Dashboards Galore: Monitor Daily with Unlimited Customization"
          />
        </div>

        {/* <canvas id="myChart" style={{ marginBottom: "100px" }}></canvas> */}
      </div>
    </>
  );
};

export default HomePage;
