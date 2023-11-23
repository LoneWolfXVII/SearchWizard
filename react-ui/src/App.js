import './App.css';
import NavBar from './NavBar';
import Header from './Header';
import Dashboard from './Dashboard';
import MainComponent from './MainComponent';
import ImageGrid from './ImageGrid';
import { useState, useEffect } from 'react';
import Body from './Body';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { API_BASE_URL } from './constants';
import DocumentVerification from './DocumentVerification';
import DocumentVerified from './DocumentVerified';

const App = () => {
  const [navItems, setNavItems] = useState([]);
  const [showImageGrid, setShowImageGrid] = useState(false);
  const [images, setImages] = useState([]);
  const [triggerReload, setTriggerReload] = useState(false);
  const [currentView, setCurrentView] = useState('');

  useEffect(() => {
    fetch(`${API_BASE_URL}/get_left_nav_items`)
    // fetch("https://testirame.free.beeceptor.com/get_left_nav_items")
        .then(response => response.json())
        .then(data => setNavItems(data))
        .catch(error => console.error("Error fetching left nav items:", error));
  }, [triggerReload]);  

  function populateNavItems(navItems) {
    const result = {};

    navItems.forEach(item => {
      const { datasource_name, dropdown } = item;
      result[datasource_name] = dropdown;
    });

    return result;
  }
  const dataSources = populateNavItems(navItems);

  function handleNavItemSelect(selectedDataSource, selectedDashboard) {
    // console.log(selectedDataSource, selectedDashboard);
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify({
      "data_source_name": selectedDataSource,
      "dashboard_name": selectedDashboard
    });

    var requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: raw,
      redirect: 'follow'
    };

    fetch(`${API_BASE_URL}/get_dashboard_graphs`, requestOptions)
      .then(response => response.json())
      .then(data => setImages(data))
      .then(setCurrentView('Dashboard'))
      .catch(error => console.log('error', error));
    setShowImageGrid(true);

  }

  const reloadApp = () => {
    setTriggerReload(!triggerReload);
  }

  function extractImageFileNames(apiResponse) {
    console.log(apiResponse);
    if (!apiResponse || !apiResponse.graphs) {
      return [];
    }
  
    return apiResponse.graphs.map(url => {
      // Extract the file name from the URL
      // const urlParts = url.split('/');
      return url;
    });
  }

  function toggleBody() {
      console.log('test')
  }

  // function handleNavItemSelect(selectedDataSource, selectedDashboard) {
  //   // ... existing logic
  //   setCurrentView('Dashboard');
  // }

  function handleNewQuerySelect() {
    console.log('query1')
    setCurrentView('NewQuery');
  }

  function handleAutomationSelect() {
    setCurrentView('Automation');
  }

  function renderContent() {
    switch(currentView) {
      case 'NewQuery':
        return <Body reloadApp={reloadApp} dataSources={dataSources} />;
      case 'Dashboard':
        return <ImageGrid images={extractImageFileNames(images)} />;
      case 'Automation':
        return <DocumentVerification />;
      default:
        return null; // or any default view
    }
  }


  return (
    // <div className="app-container">
    //     <NavBar dataSources={dataSources} onSelectDataSource ={handleNavItemSelect} showBody = {toggleBody}/>
    //     <div className="content">
    //       <Header />
    //       {/* {showImageGrid ? <ImageGrid images = {extractImageFileNames(images)}/> : <Body reloadApp = {reloadApp} dataSources={dataSources}/>} */}
    //       <DocumentVerification />
    //     </div>
    // </div>
    <div className="app-container">
    <NavBar 
      dataSources={dataSources} 
      onSelectDataSource={handleNavItemSelect} 
      onNewQuerySelect={handleNewQuerySelect}
      onAutomationSelect={handleAutomationSelect}
      showBody={toggleBody}
    />
    <div className="content">
      <Header />
      {renderContent()}
    </div>
  </div>
  );
}

export default App;

