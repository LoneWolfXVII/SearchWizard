import React, { useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import "./App.css";

const NavBar = ({ dataSources, onSelectDataSource, showBody }) => {
  const [showDataSources, setShowDataSources] = useState(false);
  const [expandedDataSource, setExpandedDataSource] = useState(null);
  const [selectedOption, setSelectedOption] = useState(null);
  const [selectedDataSource, setSelectedDataSource] = useState(null);
  const [selectedButton, setSelectedButton] = useState(null);

  const location = useLocation();

  const presetColors = ["#446CFF", "#F044FF", "#15EB6A", "#FF7E35"];

  const getRandomColor = () => {
    const letters = "0123456789ABCDEF";
    let color = "#";
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  };

  const renderOptionIcon = (selected) => {
    return (
      <span
        className={`option-icon ${selected ? "option-icon-selected" : ""}`}
      ></span>
    );
  };

  const handleDashboardClick = () => {
    toggleDataSources();
    selectButton("dashboard");
  };

  const selectButton = (buttonId) => {
    setSelectedButton(buttonId);
    showBody();
  };

  const toggleDataSources = () => {
    setShowDataSources(!showDataSources);
    setExpandedDataSource(null);
  };

  const toggleDataSourceOptions = (dataSourceName) => {
    if (expandedDataSource === dataSourceName) {
      setExpandedDataSource(null);
    } else {
      setExpandedDataSource(dataSourceName);
    }
  };

  const selectOption = (dataSourceName, option) => {
    setSelectedDataSource(dataSourceName);
    setSelectedOption(option);
    console.log(dataSourceName, option);
    onSelectDataSource(dataSourceName, option);
  };

  const isOptionSelected = (dataSourceName, option) => {
    return selectedDataSource === dataSourceName && selectedOption === option;
  };

  return (
    <>
      <div className="left-nav">
        <div className="p-10 irameLogo">
          <img src="/irame.ai.svg" alt="Irame Logo" />
        </div>
        <a className="no-padding" href="/">
          <button
            className={`nav-item-button ${selectedButton === "query" ? "selected" : ""}`}
            onClick={() => selectButton("query")}
          >
            <img src="/icon_1.svg" alt="Icon 1" />
            New Query
            {selectedButton === "query" && (
              <img
                src="/dropdown1.png"
                alt="Selected"
                className="selected-icon"
              />
            )}
          </button>
        </a>

        <button
          className={`dashboard-btn ${selectedButton === "dashboard" ? "selected" : ""}`}
          onClick={handleDashboardClick}
        >
          <img src="/icon_2.svg" alt="Icon 2" />
          Dashboard
          {selectedButton === "dashboard" && (
            <img
              src="/dropdown1.png"
              alt="Selected"
              className="selected-icon"
            />
          )}
        </button>

        {showDataSources && (
          <div className="datasources">
            {Object.keys(dataSources).map((ds, index) => {
              const color = presetColors[index] || getRandomColor();
              return (
                <div key={ds} className="datasource-item">
                  <div className="datasource-row">
                    <div
                      className="datasource-icon"
                      style={{ backgroundColor: color }}
                    ></div>
                    <button
                      className={`datasource-btn ${expandedDataSource === ds ? "selected" : ""}`}
                      onClick={() => toggleDataSourceOptions(ds)}
                    >
                      {ds}
                    </button>
                  </div>
                  {expandedDataSource === ds && (
                    <div className="options">
                      {dataSources[ds].map((opt) => {
                        const selected = isOptionSelected(ds, opt);
                        return (
                          <Link
                            key={opt}
                            className={`option ${selected ? "option-selected" : ""}`}
                            to="/sidebar"
                            onClick={() => selectOption(ds, opt)}
                          >
                            {renderOptionIcon(selected)}
                            {opt}
                          </Link>
                        );
                      })}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}

        <NavLink
          style={{
            background: location.pathname
              .toString()
              .toLowerCase()
              .includes("automation")
              ? "#d2dbfa"
              : "",
          }}
          className={`no-padding ${selectedButton === "automation" ? "selected" : ""}`}
          to="/automation"
        >
          <div
            onClick={() => setSelectedButton("")}
            className="nav-item-button"
          >
            <img src="/left-nav-automation.svg" alt="Auto" />
            <div>Automation</div>
            {selectedButton === "automation" && (
              <img
                src="/dropdown1.png"
                alt="Selected"
                className="selected-icon"
              />
            )}
          </div>
        </NavLink>

        <NavLink
          style={{
            background: location.pathname
              .toString()
              .toLowerCase()
              .includes("configuration")
              ? "#d2dbfa"
              : "",
          }}
          className={`no-padding ${selectedButton === "automation" ? "selected" : ""}`}
          to="/configuration"
        >
          <div
            onClick={() => setSelectedButton("")}
            className="nav-item-button"
          >
            <img src="/configuration.svg" alt="Auto" height={24} width={24} />
            <div>Configuration</div>
            {selectedButton === "automation" && (
              <img
                src="/dropdown1.png"
                alt="Selected"
                className="selected-icon"
              />
            )}
          </div>
        </NavLink>
      </div>
    </>
  );
};

export default NavBar;
