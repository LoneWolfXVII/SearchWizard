import { createContext, useState } from "react";

export const DashboardContext = createContext({
  dashboard: {
    dashboardList: [],
    dashboardName: "",
    dashboardType: "",
  },
  setDashboardList: () => {},
  setDashboardName: () => {},
  setDashboardType: () => {},
});

const DashboardProvider = ({ children }) => {
  const [dashboard, setDashboard] = useState({
    dashboardName: "",
    dashboardList: [],
    dashboardType: "",
  });

  function setDashboardName(data) {
    setDashboard((prev) => {
      const updatedData = structuredClone(prev);
      updatedData.dashboardName = data;
      return updatedData;
    });
  }

  function setDashboardType(data) {
    setDashboard((prev) => {
      const updatedData = structuredClone(prev);
      updatedData.dashboardType = data;
      return updatedData;
    });
  }

  function setDashboardList(data) {
    setDashboard((prev) => {
      const updatedData = structuredClone(prev);
      updatedData.dashboardList = data;
      return updatedData;
    });
  }

  return <DashboardContext.Provider value={{ dashboard, setDashboardList, setDashboardName, setDashboardType }}>{children}</DashboardContext.Provider>;
};

export default DashboardProvider;
