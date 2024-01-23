import React from "react";
import DotSvg from "./Waitlist_Assets/dot.svg";
import KnowledgeGraph from "./KnowledgeGraph";
import WebView from "./WebView";
import ArrowSvg from "./Waitlist_Assets/arow.svg";

const PlayGround = () => {
  return (
    <>
      <div className="w-full px-10 bg-[#000101] py-28">
        {/* Big button */}
        <div className="flex justify-between Big_button">
          <img src={DotSvg} alt="dot" width={90} className="mx-3" />
          <div className="mt-20 Button_Heading">
            <h1>Transform your business</h1>
            <p>Launching soon, stay tuned for reveal!</p>
            <button className="flex items-center justify-center w-64 p-2 my-3 space-x-3 text-white bg-blue-500 rounded-full hover:bg-blue-700 focus:outline-none focus:ring focus:border-blue-300">
              {" "}
              <span>Join the Waitlist </span>
              <img src={ArrowSvg} alt="Arrow" className="" />
            </button>
          </div>

          <img src={DotSvg} alt="dot" width={90} className="mx-3" />
        </div>
        <br />
        <br />
        <br />
        <br />

        <KnowledgeGraph />
        <br />
        <WebView />
      </div>
    </>
  );
};

export default PlayGround;
