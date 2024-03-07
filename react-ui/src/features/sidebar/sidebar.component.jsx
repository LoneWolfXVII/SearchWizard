import axios from "axios";
import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import AnalyticsIcon from "../../assets/analytics.svg";
import AutomationIcon from "../../assets/automation.svg";
import homeIcon from "../../assets/home.svg";
import { Button } from "../../components/ui/button";
import { chatActions } from "../../store/chat-slice";
import { ScrollArea } from "../../components/ui/scroll-area";

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
  const { dataSources, selectedDataSource, dataSourceID } = useSelector(
    (state) => state.chat
  );

  const [expand, setExpand] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const dropdownBtnRef = useRef();

  useEffect(() => {
    const handleClickOutside = (event) => {
      // If the clicked element is not the dropdown button or a descendant of the dropdown button,
      // then close the dropdown
      if (
        dropdownBtnRef.current &&
        !dropdownBtnRef.current.contains(event.target)
      ) {
        setDropdownOpen(false);
      }
    };

    document.addEventListener("click", handleClickOutside);

    // Clean up the event listener when the component unmounts
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []); // Empty array means this effect runs once when the component mounts

  const dispatch = useDispatch();

  async function handleDBSelect(ds) {
    const data = {
      datasource_name: ds,
    };

    const config = {
      method: "post",
      maxBodyLength: Infinity,
      url: "https://api.irame.ai/knowledge-graph/kg/kg/get_datasource_info",
      headers: {
        accept: "application/json",
        "Content-Type": "application/x-www-form-urlencoded",
      },
      data: data,
    };

    const MAX_RETRIES = 5;
    const RETRY_TIMEOUT = 1000;

    let retryCount = 0;
    let isRequestSuccessful = false;

    while (retryCount < MAX_RETRIES && !isRequestSuccessful) {
      try {
        const response = await axios.request(config);

        if (response.data.status === "Processing") {
          retryCount++;
        } else {
          isRequestSuccessful = true;
          dispatch(chatActions.setDataSourceId(response?.data?.datasource_id));
          dispatch(
            chatActions.setSampleQuestions(response.data.sample_questions)
          );
        }
      } catch (error) {
        console.error(error);
      } finally {
        await new Promise((resolve) => setTimeout(resolve, RETRY_TIMEOUT));
      }
    }

    if (!isRequestSuccessful) {
      console.error("Maximum retries reached, process timed out.");
    }
  }

  return (
    <aside
      onMouseOver={() => setExpand(true)}
      onMouseLeave={() => setExpand(false)}
      className={`fixed h-screen border-r-2 ${dataSourceID ? (expand || dropdownOpen ? "w-[200px]" : "w-[80px]") : "w-[200px]"} flex transition-all duration-300 ease-in-out flex-col items-center`}
    >
      <h1 className="my-10 text-3xl font-bold">
        {dataSourceID
          ? expand || dropdownOpen
            ? "IRAME.AI"
            : "AI"
          : "IRAME.AI"}
      </h1>
      <div className="flex flex-col items-center w-full gap-7">
        {linksArr?.map((item) => (
          <NavLink
            to={`/${item.value}`}
            className={({ isActive }) =>
              `w-full flex gap-2 text-center px-5 py-3 font-bold ${isActive ? "bg-blue-100 border-r-4 border-blue-500" : ""}`
            }
          >
            <img src={item.icon} alt={item.label} width={20} height={20} />
            {dataSourceID
              ? expand || dropdownOpen
                ? item.label
                : ""
              : item.label}
          </NavLink>
        ))}

        <Button
          onClickCapture={() => {
            setDropdownOpen(true);
          }}
          ref={dropdownBtnRef}
          className="flex px-6 font-semibold text-black bg-white border hover:bg-gray-200 py-7"
        >
          {dataSourceID ? (
            expand || dropdownOpen ? (
              <div>{selectedDataSource || "Select data source"}</div>
            ) : (
              ""
            )
          ) : (
            <div>{selectedDataSource || "Select data source"}</div>
          )}
          {!expand && "DB"}
        </Button>

        {dropdownOpen && (
          <ScrollArea className="flex flex-col max-w-[180px] gap-5 overflow-y-auto font-semibold max-h-[250px] border shadow-sm rounded-sm">
            {dataSources?.map((ds) => (
              <div
                key={ds}
                className="px-3 py-3 cursor-pointer hover:bg-blue-200"
                onClickCapture={() => {
                  dispatch(chatActions.setSelectedDataSource(ds));
                  handleDBSelect(ds);
                }}
              >
                {ds}
              </div>
            ))}
          </ScrollArea>
        )}
      </div>
    </aside>
  );
}
