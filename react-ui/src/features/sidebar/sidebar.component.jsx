import { NavLink } from "react-router-dom";
import AnalyticsIcon from "../../assets/analytics.svg";
import AutomationIcon from "../../assets/automation.svg";
import homeIcon from "../../assets/home.svg";

const linksArr = [
  {
    label: "Home",
    value: "query",
    icon: homeIcon,
  },
  {
    label: "Configuration",
    value: "configuration",
    icon: AnalyticsIcon,
  },
  {
    label: "Automation",
    value: "automation",
    icon: AutomationIcon,
  },
];

export function Sidebar() {
  return (
    <aside className="fixed h-screen border-r-2 w-[200px] flex flex-col items-center">
      <h1 className="my-10 text-3xl font-bold">IRAME.AI</h1>
      <div className="flex flex-col items-center w-full gap-7">
        {linksArr?.map((item) => (
          <NavLink
            to={`/${item.value}`}
            className={({ isActive }) =>
              `w-full flex gap-2 text-center px-5 py-3 font-bold ${isActive ? "bg-blue-100 border-r-4 border-blue-500" : ""}`
            }
          >
            <img src={item.icon} alt={item.label} width={20} height={20} />
            {item.label}
          </NavLink>
        ))}
      </div>
    </aside>
  );
}
