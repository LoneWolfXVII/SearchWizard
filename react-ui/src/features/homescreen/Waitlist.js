import React from "react";
import "./Waitlist.css";
import ArrowSvg from "./Waitlist_Assets/arow.svg";
import DatabaseSvg from "./Waitlist_Assets/Database.svg";
import PatternSvg from "./Waitlist_Assets/pattern.svg";
import ChecklistSvg from "./Waitlist_Assets/Checklist.svg";
import GroupSvg from "./Waitlist_Assets/Group.svg";
import { useNavigate } from "react-router-dom";
import DotSvg from "./Waitlist_Assets/dot.svg";

const Waitlist = () => {
  const navigate = useNavigate();
  return (
    <div className="Waitlist_page bg-[#000101]">
      <section
        className="px-20 py-10 relative my-cool-item"
        style={{
          backgroundColor: "#000101",
          backgroundImage: `url('/background-gif.gif')`,
          objectFit: "cover",
          objectPosition: "center",
          height: "100vh",
          width: "100vw",
          backgroundSize: "cover",
        }}
      >
        {/* Black sheet with gradient overlay */}
        {/* <div
          className="absolute top-0 left-0 right-0 bottom-0 bg-gradient-to-b from-black via-grey to-transparent opacity-70"
          style={{
            height: "100%",
            width: "100%",
          }}
        ></div>
        <div
          className="absolute  left-0 right-0 bottom-0 bg-gradient-to-b from-black via-grey to-transparent opacity-10"
          style={{
            height: "60%",
            width: "100%",
          }}
        ></div> */}

        {/* Content should be placed after the overlay to ensure it's on top */}
        <nav className="flex justify-between z-10 relative">
          {/* Logo button */}
          <button className="text-lg font-bold text-white">Irame.ai</button>

          {/* Join Waitlist button */}
          <button className="Join_Waitlist_button">Join Waitlist</button>
        </nav>

        <div className="pt-28 Hero_text z-10 relative">
          <h1>
            AI that excels in understanding
            <br />
            your business dynamics!
          </h1>
          <p>
            IRAME is an advanced AI-focused semantic framework, powered by Knowledge Vector Graph and LLMs. It excels in knowledge processing and forecasting enterprise
            needs, ensuring high accuracy and efficiency.
          </p>
        </div>

        {/* Button for Join Waitlist and Learn More */}
        <div className="flex justify-center gap-4 mt-10 z-10 relative">
          <button className="flex items-center justify-center w-64 p-3 space-x-3 text-white bg-blue-500 rounded-full hover:bg-blue-700 focus:outline-none focus:ring focus:border-blue-300">
            <span>Join the Waitlist </span>
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
        <div className="mt-0 After_Hero_text relative">
          <h1>
            Surpassing AI Limits: <br />
            Knowledge Graphs Meet LLMs
          </h1>
          <p className="text-md">
            Introducing a trailblazing approach that synergizes Knowledge Graphs with
            <br /> Large Language Models for superior AI applications.
          </p>
          <div className="absolute top-0 -left-28">
            <img src="/leftD.png" className=" h-48 w-20 " />
          </div>
          <div className="absolute top-0 -right-28">
            <img src="/RightD.png" className="h-48 w-20 " />
          </div>
        </div>
        {/* TABLE START FORM HERE */}
        <table className="w-full mx-auto mt-0 my-10 border-separate border-spacing-8">
          <tbody>
            <tr className="rounded-md">
              <td className="ml-2 Border_color p-5">
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

              <td className="text-white Border_color p-5">
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
              <td className="text-white Border_color p-5">
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

              <td className="text-white Border_color p-5">
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
        <div className="flex justify-between Big_button">
          <img src={DotSvg} alt="dot" width={90} className="mx-3" />
          <div className="mt-16 Button_Heading">
            <h1>Transform your business</h1>
            <p>Launching soon, stay tuned for reveal!</p>
            <button
              onClick={() => window.open("https://jtxx25xa6e7.typeform.com/to/H1Bc4Ofm", "_blank")}
              className="flex items-center ml-8 justify-center w-64 p-2 my-3 space-x-3 text-white bg-white  hover:bg-blue-700 focus:outline-none focus:ring focus:border-blue-300"
            >
              <span className="text-black">Join the Waitlist </span>
              <img src="/rightArrowBlack.png" alt="Arrow" className="fill-black grayscale" />
            </button>
          </div>

          <img src={DotSvg} alt="dot" width={90} className="mx-3" />
        </div>
        <div className="h-40" />
      </section>
    </div>
  );
};

export default Waitlist;
