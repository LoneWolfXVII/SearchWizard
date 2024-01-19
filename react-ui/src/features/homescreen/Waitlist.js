import React from "react";
import "./Waitlist.css";
import ArrowSvg from "./Waitlist_Assets/arow.svg";
import DatabaseSvg from "./Waitlist_Assets/Database.svg";
import PatternSvg from "./Waitlist_Assets/pattern.svg";
import ChecklistSvg from "./Waitlist_Assets/Checklist.svg";
import GroupSvg from "./Waitlist_Assets/Group.svg";
import DotSvg from "./Waitlist_Assets/dot.svg";
import BalckArrowSvg from "./Waitlist_Assets/blackArrow.svg";
import KnowledgeGraph from "./KnowledgeGraph";
import WebView from "./WebView";

const Waitlist = () => {
  return (
    <div className="Waitlist_page">
      <nav className="flex justify-between ">
        {/* Logo button */}
        <button className="text-lg font-bold text-white">Irame.ai</button>

        {/* Join Waitlist button */}
        <button className="Join_Waitlist_button">Join Waitlist</button>
      </nav>

      <div className="Hero_text">
        <h1>
          AI that excels in understanding
          <br />
          your business dynamics!
        </h1>
        <p>
          IRAME is an advanced AI-focused semantic framework, powered by Knowledge Vector Graph and LLMs. It excels in knowledge processing and
          forecasting enterprise needs, ensuring high accuracy and efficiency.
        </p>
      </div>

      {/* Button for Join Waitlist and Learn More */}
      <div className="flex justify-center gap-4">
        <button className="flex items-center justify-center w-64 p-3 space-x-3 text-white bg-blue-500 rounded-full hover:bg-blue-700 focus:outline-none focus:ring focus:border-blue-300">
          {" "}
          <span>Join the Waitlist </span>
          <img src={ArrowSvg} alt="Arrow" className="" />
        </button>
        <button className="w-48 p-3 text-white border-2 border-white rounded-full hover:bg-blue-700">Learn More</button>
      </div>

      <div className="mt-28 After_Hero_text">
        <h1>
          Surpassing AI Limits: <br />
          Knowledge Graphs Meet LLMs
        </h1>
        <p>
          Introducing a trailblazing approach that synergizes Knowledge Graphs with
          <br /> Large Language Models for superior AI applications.
        </p>
      </div>

      {/* TABLE START FORM HERE */}
      <table className="w-full mx-auto border-separate rounded-full border-spacing-2">
        <tbody>
          <tr>
            <td className="ml-2 rounded-md Border_color">
              {/* First Column */}
              <div className="flex items-center justify-center p-2">
                <img src={DatabaseSvg} alt="Image" className="Table_Icons" />
                {/* Second Column */}
                <div className="flex-1 ml-2">
                  <p className="my-1 text-white">Intelligent Data Fusion</p>
                  <p className="my-2 text-zinc-300">Processing and interpreting data within the context of its use or application.</p>
                </div>
              </div>
            </td>

            <td className="text-white rounded-md Border_color">
              {/* First Column */}
              <div className="flex items-center justify-center p-2">
                <img src={PatternSvg} alt="Image" className="Table_Icons" />
                {/* Second Column */}
                <div className="flex-1 ml-2">
                  <p className="my-1 text-white">Multi-source data handling</p>
                  <p className="my-2 text-zinc-300">Managing and integrating information from various structured and unstructured sources.</p>
                </div>
              </div>
            </td>
          </tr>

          <tr>
            <td className="text-white rounded-md Border_color">
              {/* First Column */}
              <div className="flex items-center justify-center p-2">
                <img src={ChecklistSvg} alt="Image" className="Table_Icons" />
                {/* Second Column */}
                <div className="flex-1 ml-2">
                  <p className="my-1 text-white">Proprietary data handling</p>
                  <p className="my-2 text-zinc-300">Dealing with data that is exclusive or unique to a specific organization or context.</p>
                </div>
              </div>
            </td>

            <td className="text-white rounded-md Border_color">
              {/* First Column */}
              <div className="flex items-center justify-center p-2">
                <img src={GroupSvg} alt="Image" className="Table_Icons" />
                {/* Second Column */}
                <div className="flex-1 ml-2">
                  <p className="my-1 text-white">Fine tuning challenges</p>
                  <p className="my-2 text-zinc-300">Difficulties encountered in adapting and optimizing models for specific tasks or datasets.</p>
                </div>
              </div>
            </td>
          </tr>
        </tbody>
      </table>

      {/* Big button */}
      <div className="flex justify-between mb-20 mt-28 Big_button">
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

      <KnowledgeGraph />
      <WebView />
    </div>
  );
};

export default Waitlist;
