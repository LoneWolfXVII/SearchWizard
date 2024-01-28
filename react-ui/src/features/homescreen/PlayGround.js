import React, { useState } from "react";

import KnowledgeGraph from "./KnowledgeGraph";
import WebView from "./WebView";

const PlayGround = () => {
    const [dataSourceId, setDataSourceId] = useState('');

  return (
    <>
      <div className="w-full px-10 bg-[#000101] pt-16">
        <KnowledgeGraph setDataSourceId={setDataSourceId} />
        <br />
        <WebView dataSourceId={dataSourceId} />
      </div>
    </>
  );
};

export default PlayGround;
