import React from "react";

import KnowledgeGraph from "./KnowledgeGraph";
import WebView from "./WebView";

const PlayGround = () => {
  return (
    <>
      <div className="w-full px-10 bg-[#000101] pt-16">
        {/* Big button */}

        <KnowledgeGraph />
        <br />
        <WebView />
      </div>
    </>
  );
};

export default PlayGround;
