import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import AnalyticsIcon from "../../assets/analytics.svg";
import AutomationIcon from "../../assets/automation.svg";
import homeIcon from "../../assets/home.svg";
import { Button } from "../../components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../../components/ui/dropdown-menu";
import { chatActions } from "../../store/chat-slice";

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
  const { dataSources, selectedDataSource } = useSelector(
    (state) => state.chat
  );

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

        <DropdownMenu>
          <DropdownMenuTrigger>
            <Button className="flex px-6 font-semibold text-black bg-white border hover:bg-gray-200 py-7">
              <div>{selectedDataSource || "Select data source"}</div>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <div className="flex flex-col gap-5 px-3 py-3 font-semibold">
              {dataSources?.map((ds) => (
                <DropdownMenuItem
                  key={ds}
                  onClickCapture={() => {
                    dispatch(chatActions.setSelectedDataSource(ds));
                    handleDBSelect(ds);
                  }}
                >
                  {ds}
                </DropdownMenuItem>
              ))}
            </div>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </aside>
  );
}
