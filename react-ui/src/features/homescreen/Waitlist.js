import React from "react";
import "./Waitlist.css";
import ArrowSvg from "./Waitlist_Assets/arow.svg";
import DatabaseSvg from "./Waitlist_Assets/Database.svg";
import PatternSvg from "./Waitlist_Assets/pattern.svg";
import ChecklistSvg from "./Waitlist_Assets/Checklist.svg";
import GroupSvg from "./Waitlist_Assets/Group.svg";
import { useNavigate } from "react-router-dom";
import DotSvg from "./Waitlist_Assets/dot.svg";
import { Button } from "../../components/ui/button";

const Waitlist = () => {
  const navigate = useNavigate();
  return (
    <div className="Waitlist_page bg-[#000101]">
      <section
        className="relative px-2 py-10 md:px-20 my-cool-item"
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
          className="absolute top-0 bottom-0 left-0 right-0 bg-gradient-to-b from-black via-grey to-transparent opacity-70"
          style={{
            height: "100%",
            width: "100%",
          }}
        ></div>
        <div
          className="absolute bottom-0 left-0 right-0 bg-gradient-to-b from-black via-grey to-transparent opacity-10"
          style={{
            height: "60%",
            width: "100%",
          }}
        ></div> */}

        {/* Content should be placed after the overlay to ensure it's on top */}
        <nav className="relative z-10 flex justify-between">
          {/* Logo button */}
          <button className="text-lg font-bold text-white font-[phonk]">Irameai</button>

          {/* Join Waitlist button */}
          <button onClick={() => window.open("https://jtxx25xa6e7.typeform.com/to/H1Bc4Ofm", "_blank")} className="Join_Waitlist_button">
            Join Waitlist
          </button>
        </nav>

        <div className="relative z-10 md:px-20 pt-28 Hero_text">
          <h1>
          Build AI that understands your business
            <br />
        
          </h1>
          <p>
            IRAME is an advanced AI-focused semantic framework, powered by Knowledge Vector Graph and LLMs. It excels in knowledge processing and forecasting enterprise
            needs, ensuring high accuracy and efficiency.
          </p>
        </div>

        {/* Button for Join Waitlist and Learn More */}
        <div className="relative z-10 flex justify-center gap-4 mt-10">
          <button
            onClick={() => window.open("https://jtxx25xa6e7.typeform.com/to/H1Bc4Ofm", "_blank")}
            className="flex items-center justify-center w-64 p-3 space-x-3 text-white bg-blue-500 rounded-full hover:bg-blue-700 focus:outline-none focus:ring focus:border-blue-300"
          >
            <span>Join the Waitlist </span>
          </button>
          <button
            className="w-48 p-3 text-white border-2 border-white rounded-full hover:bg-blue-700"
            onClick={() => {
              navigate("/playground");
            }}
          >
            Try yourself(beta)
          </button>
        </div>
      </section>

      <section className="px-2 md:px-20">
        <div className="relative mt-0 After_Hero_text">
          <h1 className="phonk-font">
            Surpassing AI Limits <br />
            Knowledge Graphs Meet LLMs
          </h1>
          <p className="text-md">
            Introducing a trailblazing approach that synergizes Knowledge Graphs with
            <br /> Large Language Models for superior AI applications.
          </p>
          <div className="absolute top-0 -left-28">
            <img src="/leftD.png" className="w-20 h-48 " />
          </div>
          <div className="absolute top-0 -right-28">
            <img src="/RightD.png" className="w-20 h-48 " />
          </div>
        </div>

        <section className="grid grid-cols-1 gap-10 my-10 md:grid-cols-2 gap-y-10">
          <CardComp image={DatabaseSvg} 
          title="Intelligent Data Fusion"
          description="Processing and interpreting data within the context of its use or application." />
          <CardComp
            image={PatternSvg}
            title="Accurate Proprietary Data Responses"
            description="Traditional LLMs often falter on niche, proprietary datasets but our Knowledge Graph-LLM synergy excels, delivering precise and accurate answers every time."
          />
          <CardComp
            image={ChecklistSvg}
            title="Cost-Efficient Context Management"
            description="Dealing with data that is exclusive or unique to a specific organization or context."
          />
          <CardComp
            image={GroupSvg}
            title="Bypass the Fine-Tuning Hassle"
            description="Difficulties encountered in adapting and optimizing models for specific tasks or datasets."
          />
        </section>

        <div className="flex flex-wrap justify-center px-5 mt-48 md:justify-between Big_button">
          <img src={DotSvg} alt="dot" width={90} className="hidden mx-3 md:flex" />
          <div className="flex flex-col gap-1 mt-16 text-center Button_Heading">
            <h1 className="phonk-font">Transform your business</h1>
            <p>Launching soon, stay tuned for reveal!</p>
            <Button
              onClick={() => window.open("https://jtxx25xa6e7.typeform.com/to/H1Bc4Ofm", "_blank")}
              className="relative flex items-center gap-3 mt-2 text-base text-black bg-white rounded-none md:px-28 hover:bg-gray-200"
            >
              Join the Waitlist
              <img src="/rightArrowBlack.png" alt="Arrow" className="fill-black grayscale" />
            </Button>
          </div>

          <img src={DotSvg} alt="dot" width={90} className="hidden mx-3 md:flex" />
        </div>
        <div className="h-40" />
      </section>
    </div>
  );
};

const CardComp = ({ image, title, description }) => {
  return (
    <div className="flex items-center px-8 py-12 Border_color">
      <img src={image} alt="iframe" width={74} height={74} />
      <div className="flex flex-col gap-1 ml-5">
        <h3 className="text-white">{title}</h3>
        <p className="text-white opacity-80">{description}</p>
      </div>
    </div>
  );
};

export default Waitlist;
