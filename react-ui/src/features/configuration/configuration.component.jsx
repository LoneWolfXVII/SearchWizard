import { useState } from "react";
import { Button } from "../../components/ui/button";
import ArrowSvg from "../homescreen/Waitlist_Assets/arow.svg";
import AddDataSource from "./AddDataSource";
import FooterBadge from "./FooterBadge";
import ToolsBadge from "./ToolsBadge";
import Upload from "./Upload";
import { leftSideConfig, rightSideConfig } from "./constants";
import DataSourceCard from "./data-source-card.component";
import { useSelector } from "react-redux";

const jiraIcon = "/jira.svg";
const notionIcon = "/notion.svg";
const jupiterIcon = "/jupiter.svg";
const databasecontainer = "/databasecontainer.svg";

const ConfigurationPage = () => {
  const [dataSource, setDataSource] = useState("");

  const { dataSources } = useSelector((state) => state.chat);

  return (
    <section className="grid w-full h-screen px-3 py-5 overflow-scroll bg-white grid-col-1 xl:grid-cols-3 ">
      {/* left side  */}
      <div className="xl:col-span-2">
        <header className="px-10">
          <div className="py-5">
            <h2 className="text-2xl font-bold">Import from URL</h2>
            <p className="text-gray-400">Securely connect to a data source</p>
          </div>
          <div className="flex flex-col gap-3 mb-12">
            <AddDataSource
              value={dataSource}
              onChange={(e) => setDataSource(e.target.value)}
            />

            <Upload dataSource={dataSource} setDataSource={setDataSource} />
          </div>
        </header>
        <p className="px-10 text-xl font-bold whitespace-nowrap">
          Configure Tools
        </p>
        <main className="grid grid-cols-1 px-10 mt-4 md:grid-cols-2 gap-x-10">
          {/*left side */}
          <div className="md:border-r-2 md:pr-5 ">
            {leftSideConfig?.map((item, index) => (
              <div
                key={item.title}
                className={`${index !== 0 ? "border-t-2" : ""}
              `}
              >
                <ToolsBadge image={item.image} title={item.title} />
              </div>
            ))}
          </div>

          {/*right side */}

          <div>
            {rightSideConfig?.map((item, index) => (
              <div
                key={item.title}
                className={`${index !== 0 ? "border-t-2" : ""}
              `}
              >
                <ToolsBadge image={item.image} title={item.title} />
              </div>
            ))}
          </div>
        </main>
        <footer className="px-10 pb-6 my-10">
          <div className="flex flex-col gap-5">
            <FooterBadge
              title="Sync data with Jira board"
              image={jiraIcon}
              description="Accesses your tickets and projects to helps in detailed research "
            />
            <FooterBadge
              title="Connect notion to manage your projects"
              image={notionIcon}
              description="Accesses your tickets and projects & helps in detailed research "
            />
            <FooterBadge
              title="Import clients data for analysis"
              image={jupiterIcon}
              description="Accesses your tickets and projects to helps in detailed research "
            />
          </div>

          <Button className="flex items-center w-full gap-2 my-10 text-white bg-blue-500 rounded-xl">
            Save Changes
            <img src={ArrowSvg} alt="drop-down" height={14} width={14} />
          </Button>
        </footer>
      </div>

      {/* right side  */}
      <div>
        <div className="flex flex-col gap-5 px-4 py-5 bg-gray-100 border rounded-lg">
          <header>
            <h2 className="text-2xl font-bold">Manage Datasource</h2>
            <p className="text-gray-400">Securely connect to a datasource</p>
          </header>
          <main className="flex flex-col gap-3 overflow-y-auto max-h-96">
            {dataSources?.map((item) => (
              <DataSourceCard title={item} image={databasecontainer} />
            ))}
          </main>
        </div>
      </div>
    </section>
  );
};

export default ConfigurationPage;
