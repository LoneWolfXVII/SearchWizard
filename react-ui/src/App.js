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

const App = () => {
  const [navItems, setNavItems] = useState([]);
  useEffect(() => {
    fetch(`${API_BASE_URL}/get_left_nav_items`)
    // fetch("https://testirame.free.beeceptor.com/get_left_nav_items")
        .then(response => response.json())
        .then(data => setNavItems(data))
        .catch(error => console.error("Error fetching left nav items:", error));
}, []);  

function populateNavItems(navItems) {
  const result = {};

  navItems.forEach(item => {
    const { datasource_name, dropdown } = item;
    result[datasource_name] = dropdown;
  });

  return result;
}
const dataSources = populateNavItems(navItems); 
console.log(navItems);
console.log(dataSources);

const images = [
  "/graph-1.png",
  "/graph-2.png",
  "/graph-3.png",
  "/graph-4.png",
  "/graph-5.png",
  "/graph-6.png",
  "/graph-7.png",
  "/graph-8.png",
];

console.log(navItems);
// console.log(navItems[0]);

const [isDataSourceSelected, setDataSourceSelected] = useState(false);

return (
  <div className="app-container">
      <NavBar dataSources={dataSources} onSelectDataSource={() => setDataSourceSelected(true)} />
      <div className="content">
        <Header />
        <Body dataSources={dataSources}/>
      </div>
  </div>
);
}

export default App;

