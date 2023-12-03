import React, { Component } from "react";
import { Link } from "react-router-dom";
import "./App.css";

class NavBar extends Component {
  state = {
    showDataSources: false,
    expandedDataSource: null,
    selectedOption: null,
    selectedDataSource: null,
    selectedButton: null,
  };

  presetColors = ["#446CFF", "#F044FF", "#15EB6A", "#FF7E35"];

  getRandomColor = () => {
    const letters = "0123456789ABCDEF";
    let color = "#";
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  };

  renderOptionIcon(selected) {
    return <span className={`option-icon ${selected ? "option-icon-selected" : ""}`}></span>;
  }

  handleDashboardClick = () => {
    this.toggleDataSources(); // This will toggle the visibility of the datasources
    this.selectButton("dashboard"); // This will set the 'dashboard' button as selected
  };

  selectButton = (buttonId) => {
    // this.setState({ selectedButton: buttonId });
    this.props.showBody();
  };

  toggleDataSources = () => {
    this.setState((prevState) => ({
      showDataSources: !prevState.showDataSources,
      expandedDataSource: null,
    }));
  };

  toggleDataSourceOptions = (dataSourceName) => {
    if (this.state.expandedDataSource === dataSourceName) {
      this.setState({ expandedDataSource: null });
    } else {
      this.setState({ expandedDataSource: dataSourceName });
    }
  };

  selectOption = (dataSourceName, option) => {
    this.setState({
      selectedDataSource: dataSourceName,
      selectedOption: option,
    });
    console.log(dataSourceName, option);
    this.props.onSelectDataSource(dataSourceName, option);
  };

  isOptionSelected = (dataSourceName, option) => {
    return this.state.selectedDataSource === dataSourceName && this.state.selectedOption === option;
  };

  render() {
    const { dataSources } = this.props;
    return (
      <>
        {/* <Dashboard optionName= {this.state.selectedOption }/> */}
        <div className="left-nav">
          {/* <div className="nav-item"> */}
          <div className="irameLogo">
            <img src="/irame.ai.svg" alt="Irame Logo" />
          </div>
          <a className="no-padding" href="/">
            <button className={`nav-item-button ${this.state.selectedButton === "query" ? "selected" : ""}`} onClick={() => this.selectButton("query")}>
              <img src="/icon_1.svg" alt="Icon 1" />
              New Query
              {this.state.selectedButton === "query" && <img src="/dropdown1.png" alt="Selected" className="selected-icon" />}
            </button>
          </a>

          <button className={`dashboard-btn ${this.state.selectedButton === "dashboard" ? "selected" : ""}`} onClick={this.handleDashboardClick}>
            <img src="/icon_2.svg" alt="Icon 2" />
            Dashboard
            {this.state.selectedButton === "dashboard" && <img src="/dropdown1.png" alt="Selected" className="selected-icon" />}
          </button>

          {this.state.showDataSources && (
            <div className="datasources">
              {Object.keys(dataSources).map((ds, index) => {
                // Use a preset color or generate a random one
                const color = this.presetColors[index] || this.getRandomColor();
                return (
                  <div key={ds} className="datasource-item">
                    <div className="datasource-row">
                      <div className="datasource-icon" style={{ backgroundColor: color }}></div>
                      <button
                        className={`datasource-btn ${this.state.expandedDataSource === ds ? "selected" : ""}`}
                        onClick={() => this.toggleDataSourceOptions(ds)}
                      >
                        {ds}
                      </button>
                    </div>
                    {this.state.expandedDataSource === ds && (
                      <div className="options">
                        {dataSources[ds].map((opt) => {
                          const selected = this.isOptionSelected(ds, opt);
                          return (
                            <Link key={opt} className={`option ${selected ? "option-selected" : ""}`} to="/sidebar" onClick={() => this.selectOption(ds, opt)}>
                              {this.renderOptionIcon(selected)}
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

          <Link className={`no-padding ${this.state.selectedButton === "automation" ? "selected" : ""}`} to="/configuration">
            <div className="nav-item-button">
              <div>Configuration</div>
              {this.state.selectedButton === "automation" && <img src="/dropdown1.png" alt="Selected" className="selected-icon" />}
            </div>
          </Link>

          <Link className={`no-padding ${this.state.selectedButton === "automation" ? "selected" : ""}`} to="/automation">
            <div className="nav-item-button">
              <img src="/left-nav-automation.svg" alt="Auto" />
              <div>Automation</div>
              {this.state.selectedButton === "automation" && <img src="/dropdown1.png" alt="Selected" className="selected-icon" />}
            </div>
          </Link>

          {/* </div> */}
        </div>
      </>
    );
  }
}

export default NavBar;
