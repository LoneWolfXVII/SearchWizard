import React, { useState } from "react";

import KnowledgeGraph from "./KnowledgeGraph";
import WebView from "./WebView";
import { Button } from "../../components/ui/button";

const PlayGround = () => {
  const [dataSourceId, setDataSourceId] = useState("");
  const [showGraph, setShowGraph] = useState(false);

  const successFullUploadHandler = () => {
    setShowGraph(true);
  };

  return (
    <>
      <div className="w-full min-h-screen bg-[#000101] pt-16">
        {!!showGraph && (
          <Button
            onClick={() => {
              setShowGraph(false);
            }}
            className="float-right mr-20 tracking-widest bg-[#076eff] rounded-3xl"
          >
            Create new dataset
          </Button>
        )}
        {!showGraph && (
          <div className="px-10">
            <KnowledgeGraph onSuccessfulUpload={successFullUploadHandler} setDataSourceId={setDataSourceId} />{" "}
          </div>
        )}
        {!!showGraph && (
          <div className="px-28">
            {" "}
            <WebView dataSourceId={dataSourceId} />{" "}
          </div>
        )}
      </div>
    </>
  );
};

export default PlayGround;
