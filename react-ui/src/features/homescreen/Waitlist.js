import React from "react";
import "./Waitlist.css";
import ArrowSvg from "./Waitlist_Assets/arow.svg";
import DatabaseSvg from "./Waitlist_Assets/Database.svg";
import PatternSvg from "./Waitlist_Assets/pattern.svg";
import ChecklistSvg from "./Waitlist_Assets/Checklist.svg";
import GroupSvg from "./Waitlist_Assets/Group.svg";
import { useNavigate } from "react-router-dom";

const Waitlist = () => {
  const navigate = useNavigate();
  return (
    <div className="Waitlist_page bg-[#000101]">
      <section
        className="px-20 py-10"
        style={{
          backgroundColor: "#000101",
          backgroundImage: `url('/background-gif.gif')`,
          objectFit: "cover",
          objectPosition: "center",
        }}
      >
        <nav className="flex justify-between ">
          {/* Logo button */}
          <button className="text-lg font-bold text-white">Irame.ai</button>

          {/* Join Waitlist button */}
          <button className="Join_Waitlist_button">Join Waitlist</button>
        </nav>

        <div className="pt-6 Hero_text">
          <h1>
            AI that excels in understanding
            <br />
            your business dynamics!
          </h1>
          <p>
            IRAME is an advanced AI-focused semantic framework, powered by Knowledge Vector Graph and LLMs. It excels in knowledge processing and forecasting
            enterprise needs, ensuring high accuracy and efficiency.
          </p>
        </div>

        {/* Button for Join Waitlist and Learn More */}
        <div className="flex justify-center gap-4 mt-10">
          <button className="flex items-center justify-center w-64 p-3 space-x-3 text-white bg-blue-500 rounded-full hover:bg-blue-700 focus:outline-none focus:ring focus:border-blue-300">
            <span>Join the Waitlist </span>
            <img src={ArrowSvg} alt="Arrow" className="" />
          </button>
          <button
            className="w-48 p-3 text-white border-2 border-white rounded-full hover:bg-blue-700"
            onClick={() => {
              navigate("/playground");
            }}
          >
            Learn More
          </button>
        </div>
      </section>

      <section className="px-20">
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
        <table className="w-full mx-auto my-10 border-separate border-spacing-8">
          <tbody>
            <tr className="rounded-md">
              <td className="ml-2 Border_color">
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

              <td className="text-white Border_color">
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

            <tr className="">
              <td className="text-white Border_color">
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

              <td className="text-white Border_color">
                {/* First Column */}
                <div className="flex items-center justify-center p-2 ">
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
      </section>
    </div>
  );
};

export default Waitlist;
