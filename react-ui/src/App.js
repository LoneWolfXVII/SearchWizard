import { useEffect, useState } from "react";
import { Route, BrowserRouter as Router } from "react-router-dom";
import "./App.css";
import Body from "./Body";
import DocumentVerification from "./DocumentVerification";
import ImageGrid from "./ImageGrid";
import { API_BASE_URL } from "./constants";

import { Routes } from "react-router-dom";
import { Apiresult } from "./ApiResult";
import BarGraph from "./BarGraph"; // Adjust the path as necessary
import GraphPage from "./GraphPage";
import { GlobalLayout } from "./components/global-layout";
import Signin from "./features/auth/signin";
import ConfigurationPage from "./features/configuration/configuration.component";
import PlayGround from "./features/homescreen/PlayGround";
import AutomationWorkflow from "./features/workflow/Automation_Workflow";
import DocumentValidator from "./features/workflow/Document_Validator";
import { QueryPage } from "./pages/query-page";
import { useDispatch } from "react-redux";
import axios from "axios";
import { chatActions } from "./store/chat-slice";

const App = () => {
  const [navItems, setNavItems] = useState([]);
  const [showImageGrid, setShowImageGrid] = useState(false);
  const [images, setImages] = useState([]);
  const [triggerReload, setTriggerReload] = useState(false);
  const [currentView, setCurrentView] = useState("");
  const [isWaitlist, setIsWaitlist] = useState(false);
  const [isLoggedIn] = useState(true);

  useEffect(() => {
    fetch(`${API_BASE_URL}/get_left_nav_items`)
      // fetch("https://testirame.free.beeceptor.com/get_left_nav_items")
      .then((response) => response.json())
      .then((data) => setNavItems(data))
      .catch((error) => console.error("Error fetching left nav items:", error));
  }, [triggerReload]);

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
    console.log("selected data Sources", selectedDataSource, selectedDashboard);
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

  const reloadApp = () => {
    setTriggerReload(!triggerReload);
  };

  function extractImageFileNames(apiResponse) {
    console.log(apiResponse);
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
    console.log("test");
  }

  // function handleNavItemSelect(selectedDataSource, selectedDashboard) {
  //   // ... existing logic
  //   setCurrentView('Dashboard');
  // }

  function handleNewQuerySelect() {
    console.log("query1");
    setCurrentView("NewQuery");
  }

  function handleAutomationSelect() {
    setCurrentView("Automation");
  }

  function renderContent() {
    switch (currentView) {
      case "NewQuery":
        return <Body reloadApp={reloadApp} dataSources={dataSources} />;
      case "Dashboard":
        return <ImageGrid images={extractImageFileNames(images)} />;
      case "Automation":
        return <DocumentVerification />;
      default:
        return null; // or any default view
    }
  }

  const location = window.location.pathname;

  useEffect(() => {
    if (location.toString().toLowerCase().includes("waitlist")) {
      setIsWaitlist(true);
    } else {
      setIsWaitlist(false);
    }
  }, [location]);

  const dispatch = useDispatch();

  useEffect(() => {
    let config = {
      method: "get",
      maxBodyLength: Infinity,
      url: "https://api.irame.ai/knowledge-graph/kg/kg/get_datasource",
      headers: {
        accept: "application/json",
      },
    };

    axios
      .request(config)
      .then((response) => {
        dispatch(chatActions.setDataSources(response?.data || []));
      })
      .catch((error) => {
        console.log(error);
      });
  }, [dispatch]);

  return (
    // <div className="app-container">
    //     <NavBar dataSources={dataSources} onSelectDataSource ={handleNavItemSelect} showBody = {toggleBody}/>
    //     <div className="content">
    //       <Header />
    //       {/* {showImageGrid ? <ImageGrid images = {extractImageFileNames(images)}/> : <Body reloadApp = {reloadApp} dataSources={dataSources}/>} */}
    //       <DocumentVerification />
    //     </div>
    // </div>
    <>
      {!isLoggedIn ? <Signin /> : ""}
      {isLoggedIn ? (
        <div className="w-full">
          <Router>
            <Routes>
              {/* <Route path="/index.html" element={<PlayGround />} /> */}
              <Route path="/" element={<Signin />} />
              <Route path="/" element={<GlobalLayout />}>
                <Route
                  path="query"
                  element={
                    <QueryPage
                      dataSources={dataSources}
                      fetchedData={navItems}
                    />
                  }
                />
                <Route
                  path="chat"
                  element={
                    <Apiresult
                      dataSources={dataSources}
                      fetchedData={navItems}
                    />
                  }
                />
                <Route path="/configuration" element={<ConfigurationPage />} />
              </Route>

              <Route path="/playground" element={<PlayGround />} />

              {/* Define your routes here */}
              <Route
                path="/dashboard"
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
              {/*
            <Route path="/automation" element={<DocumentVerification />} />
            <Route path="/automation-page" element={<AutomationWorkflow />} />
            <Route path="document-validator" element={<DocumentValidator />} /> */}
              <Route
                path="/automation/data-validation"
                element={<DocumentVerification />}
              />
              <Route path="/automation" element={<AutomationWorkflow />} />
              <Route
                path="/automation/document-validator"
                element={<DocumentValidator />}
              />
            </Routes>
            {/* Conditional rendering outside of Routes */}
          </Router>
        </div>
      ) : (
        ""
      )}
    </>
  );
};

export default App;

{
  /*     {isWaitlist ||
            window.location.pathname === "/" ||
            window.location.pathname.toLocaleLowerCase().includes("signin") ||
            window.location.pathname
              .toLocaleLowerCase()
              .includes("playground") ? (
              ""
            ) : (
              <NavBar
                dataSources={dataSources}
                onSelectDataSource={handleNavItemSelect}
                showBody={toggleBody}
              />
            )}{" "}
            <div
              className={`${
                !isWaitlist &&
                !window.location.pathname
                  .toLocaleLowerCase()
                  .includes("signin") &&
                window.location.pathname !== "/" &&
                !window.location.pathname
                  .toLocaleLowerCase()
                  .includes("playground")
                  ? "content"
                  : "w-full"
              }`}
            >
              {!isWaitlist &&
              !window.location.pathname
                .toLocaleLowerCase()
                .includes("signin") &&
              !window.location.pathname
                .toLocaleLowerCase()
                .includes("playground") &&
              !window.location.pathname === "/" ? (
                <Header />
              ) : (
                ""
              )} */
}
