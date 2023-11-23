import "./App.css";
import NavBar from "./NavBar";
import Header from "./Header";
import Dashboard from "./Dashboard";
import MainComponent from "./MainComponent";
import ImageGrid from "./ImageGrid";

import { useState, useEffect } from "react";
import Body from "./Body";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  useNavigate,
} from "react-router-dom";
import { API_BASE_URL } from "./constants";
import BarGraph from "./BarGraph"; // Adjust the path as necessary
import GraphPage from "./GraphPage";

const App = () => {
  const [navItems, setNavItems] = useState([]);
  const [showImageGrid, setShowImageGrid] = useState(false);
  const [images, setImages] = useState([]);

  useEffect(() => {
    fetch(`${API_BASE_URL}/get_left_nav_items`)
      // fetch("https://testirame.free.beeceptor.com/get_left_nav_items")
      .then((response) => response.json())
      .then((data) => setNavItems(data))
      .catch((error) => console.error("Error fetching left nav items:", error));
  }, []);

  const [dataSources, setDataSources] = useState({});

  useEffect(() => {
    const populateNavItems = (navItems) => {
      const result = {};

      navItems.forEach((item) => {
        const { datasource_name, dropdown } = item;
        result[datasource_name] = dropdown;
      });

      return result;
    };
    setDataSources(populateNavItems(navItems));
  }, [navItems]);

  function handleNavItemSelect(selectedDataSource, selectedDashboard) {
    // console.log(selectedDataSource, selectedDashboard);
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify({
      data_source_name: selectedDataSource,
      dashboard_name: selectedDashboard,
    });

    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };

    fetch(`${API_BASE_URL}/get_dashboard_graphs`, requestOptions)
      .then((response) => response.json())
      .then((data) => setImages(data))
      .catch((error) => console.log("error", error));
    setShowImageGrid(true);
  }

  function extractImageFileNames(apiResponse) {
    if (!apiResponse || !apiResponse.graphs) {
      return [];
    }

    return apiResponse.graphs.map((url) => {
      // Extract the file name from the URL
      // const urlParts = url.split('/');
      return url;
    });
  }

  function toggleBody() {
    setShowImageGrid(false);
  }

  return (
    <div className="app-container">
      <Router>
        <NavBar
          dataSources={dataSources}
          onSelectDataSource={handleNavItemSelect}
          showBody={toggleBody}
        />
        <div className="content">
          <Header />
          <Routes>
            {/* Define your routes here */}

            <Route
              path="/"
              element={
                showImageGrid ? (
                  <ImageGrid images={extractImageFileNames(images)} />
                ) : (
                  <Body fetchedData={navItems} dataSources={dataSources} />
                )
              }
            />

            <Route path="/bar-graph" element={<BarGraph />} />
            {/* Add other routes as needed */}
            {/* Example route for ImageGrid or Body */}
            <Route
              path="/image-grid"
              element={<ImageGrid images={extractImageFileNames(images)} />}
            />
            <Route
              path="/body"
              element={
                <Body fetchedData={navItems} dataSources={dataSources} />
              }
            />
            <Route
              path="/sidebar"
              element={<GraphPage fetchedData={images} />}
            />
          </Routes>
          {/* Conditional rendering outside of Routes */}
        </div>
      </Router>
    </div>
  );
};

export default App;
