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
        className="relative px-5 py-10 md:px-20 my-cool-item"
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
          <h1 className="text-left md:text-center">
            Build a plug and play AI that understands your business
            <br />
          </h1>
          <p className="p-0 m-0 !text-left md:!text-center">
            IRAME is an advanced AI-focused semantic framework, powered by Knowledge Vector Graph and LLMs. It excels in knowledge processing and forecasting
            enterprise needs, ensuring high accuracy and efficiency.
          </p>
        </div>

        {/* Button for Join Waitlist and Learn More */}
        <div className="relative z-10 flex justify-start gap-4 mt-10 md:justify-center">
          <button
            onClick={() => window.open("https://jtxx25xa6e7.typeform.com/to/H1Bc4Ofm", "_blank")}
            className="flex items-center justify-center w-6/12 p-3 space-x-3 text-white bg-blue-500 rounded-full md:w-64 hover:bg-blue-700 focus:outline-none focus:ring focus:border-blue-300"
          >
            <span>Join the Waitlist </span>
          </button>
        </div>
      </section>

      <section className="px-5 md:px-20">
        <div className="relative mt-20 md:mt-0 After_Hero_text">
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
          <CardComp
            image={DatabaseSvg}
            title="Intelligent Data Fusion"
            description="Processing and interpreting data within the context of its use or application."
          />
          <CardComp
            image={PatternSvg}
            title="Accurate Proprietary Data Responses"
            description="Traditional LLMs often falter on niche, proprietary datasets but our Knowledge Graph-LLM synergy excels, delivering precise and accurate answers every time."
          />
          <CardComp
            image={ChecklistSvg}
            title="Cost-Efficient Context Management"
            description="Our solution maintains context with efficiency better than LLMs, significantly reducing operational costs and resource demands."
          />
          <CardComp
            image={GroupSvg}
            title="Bypass the Fine-Tuning Hassle"
            description="LLMs demands continual data quality monitoring and updates. Our approach eliminates the need for constant fine-tuning, offering the precision of a fine-tuned LLM right out-of-the-box for your enterprise needs."
          />
        </section>

        <h3 className="mt-32 text-2xl font-semibold text-center text-white phonk-font">
          Transforming Enterprises with <br /> Knowledge Graphs and LLMs
        </h3>
        <h5 className="my-5 text-base font-light tracking-wider text-center text-white opacity-80">
          Introducing a trailblazing approach that synergizes Knowledge Graphs with <br /> Large Language Models for superior AI applications.
        </h5>

        <section className="grid grid-cols-1 my-20 place-items-center sm:grid-cols-2 md:grid-cols-4 gap-x-8 gap-y-8">
          <CategoryCard
            title="Internal audit"
            description="Dealing with data that is exclusive or unique to a specific organisation or context."
            imageUrl="/Category1.png"
          />
          <CategoryCard
            title="Business simulation"
            description="Dealing with data that is exclusive or unique to a specific organisation or context."
            imageUrl="/Category2.png"
          />
          <CategoryCard
            title="Financial data analysis"
            description="Dealing with data that is exclusive or unique to a specific organisation or context."
            imageUrl="/Category3.png"
          />
          <CategoryCard
            title="Document inspection"
            description="Dealing with data that is exclusive or unique to a specific organisation or context."
            imageUrl="/Category4.png"
          />
        </section>

        <div className="flex flex-wrap justify-center px-5 mt-48 md:justify-between Big_button">
          <img src={DotSvg} alt="dot" width={90} className="hidden mx-3 md:flex" />
          <div className="flex flex-col gap-1 mt-16 text-center Button_Heading">
            <h1 className=" phonk-font">Transform your business</h1>
            <p className="hidden md:block">Launching soon, stay tuned for reveal!</p>
            <Button
              onClick={() => window.open("https://jtxx25xa6e7.typeform.com/to/H1Bc4Ofm", "_blank")}
              className="relative flex items-center gap-3 mt-4 text-base text-black bg-white rounded-none md:mt-2 md:px-28 hover:bg-gray-200"
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
    <div className="flex flex-col items-center gap-3 px-8 py-12 md:flex-row Border_color">
      <img src={image} alt="iframe" width={74} height={74} />
      <div className="flex flex-col gap-1 ml-5">
        <h3 className="text-white">{title}</h3>
        <p className="text-white opacity-80">{description}</p>
      </div>
    </div>
  );
};

const CategoryCard = ({ title, description, imageUrl }) => {
  return (
    <div
      style={{
        backgroundImage: `url(${imageUrl})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        objectFit: "cover",
      }}
      className="relative transition-all duration-500 ease-in-out hover:scale-105 group cursor-pointer  flex flex-col justify-end w-64 max-w-xs px-4 rounded-xl py-7 h-96 sm:h-[28rem]"
    >
      <h4 className="relative z-20 text-2xl max-w-[70%]  line-clamp-2 font-semibold text-white">{title}</h4>
      <img src="/right-card-arrow.svg" alt="right arrow" width={35} height={35} className="relative z-20 mt-2 text-white group-hover:hidden" />
      <p className="relative z-20 hidden text-sm font-medium text-white group-hover:block">{description}</p>

      {/* overlay */}
      <div className="absolute group-hover:h-full bottom-0 left-0 right-0 w-full  h-[60%] rounded-xl bg-gradient-to-t from-[#3394FF] to-transparent" />
    </div>
  );
};

export default Waitlist;
