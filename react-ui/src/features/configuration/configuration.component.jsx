import React, { useState } from "react";
import AddDataSource from "./AddDataSource";
import FooterBadge from "./FooterBadge";
import ToolsBadge from "./ToolsBadge";
import Upload from "./Upload";
import Divider from "./Divider";
import axios from "axios";
const SQLIcon = "/devicon_postgresql.svg";

const ConfigurationPage = () => {
  const [dataSource, setDataSource] = useState("");
  const [dataSourceId, setDataSourceId] = useState("");
  const [showDataSource, setShowDataSource] = useState(false);

  const handleSaveDataSource = async () => {
    const formData = new FormData();
    formData.append("datasource_name", dataSource);
    formData.append("class", "text_docs");
    try {
      const res = await axios.post("http://3.111.174.29:8080/create_new_datasource", formData);
      if (res.status !== 200) {
        throw new Error(`Unexpected status code: ${res.status}`);
      }
      setShowDataSource(true);
      setDataSourceId(res?.data?.datasource_id);
    } catch (error) {
      console.error(error);
      alert("An error occurred while saving the data source. Please try again.");
    }
  };

  return (
    <section className="w-full ">
      <h2 className="my-2 text-xl font-semibold text-center">Create your own database</h2>
      <header
        style={{
          boxShadow: "0px 4px 4px 0px rgba(0, 0, 0, 0.25) inset",
        }}
        className="relative flex items-center shadow-[0px 4px 4px 0px rgba(0, 0, 0, 0.25) inset] justify-center w-8/12 gap-3 px-5 mx-auto bg-white border divide-x-2 rounded-lg"
      >
        {!showDataSource && <AddDataSource onSave={handleSaveDataSource} value={dataSource} onChange={(e) => setDataSource(e.target.value)} />}
        {showDataSource && (
          <div className="flex items-center w-full gap-4">
            <p className="w-full text-sm font-semibold">{dataSource}</p>{" "}
            <button
              onClick={() => {
                setDataSource("");
                setShowDataSource(false);
                setDataSourceId("");
              }}
              className="flex items-center px-3 py-1 text-red-700 border border-none rounded-lg bg-red-50 whitespace-nowrap"
            >
              Change data source
            </button>
          </div>
        )}
        <div className="w-full h-full p-6 border-l-2">
          <Upload disabled={!dataSourceId} dataSourceId={dataSourceId} />
        </div>
      </header>
      <main className="grid grid-cols-2 mt-4 px-28 gap-x-7 gap-y-10">
        <div className="flex items-center col-span-2 gap-5 ">
          <Divider />
          <p className="text-xl whitespace-nowrap">Configure Tools</p>
          <Divider />
        </div>

        <ToolsBadge image={SQLIcon} title="SQL" />
        <ToolsBadge image={SQLIcon} title="SQL" />
        <ToolsBadge image={SQLIcon} title="SQL" />
        <ToolsBadge image={SQLIcon} title="SQL" />
        <ToolsBadge image={SQLIcon} title="SQL" />
      </main>
      <footer className="pb-6 px-28">
        <div className="flex items-center col-span-2 gap-5 py-5">
          <Divider />
          <p className="text-xl whitespace-nowrap">Configure Tools</p>
          <Divider />
        </div>
        <div className="flex flex-col gap-5">
          <FooterBadge title="Sync data with Jira board" image={SQLIcon} description="Accesses your tickets and projects to helps in detailed research " />
          <FooterBadge title="Sync data with Jira board" image={SQLIcon} description="Accesses your tickets and projects to helps in detailed research " />
          <FooterBadge title="Sync data with Jira board" image={SQLIcon} description="Accesses your tickets and projects to helps in detailed research " />
        </div>{" "}
      </footer>
    </section>
  );
};

export default ConfigurationPage;
