import React from "react";
import AbilityCard from "./AbilityCard";

const Abilities = () => {
  const data = [
    {title: "AI Data Extraction & Cleaning" ,
      description: "Ira effortlessly connects to any data source, be it structured or unstructured, to dig into your financial data and uncover its complexities.",
      imgPath: '/assets/bgs/transform-data-action.svg'
    },
    {title: "AI Data Analytics" ,
      description: "With Ira, data is not just a collection of numbers and text. Its intelligent algorithms identify tasks that transform raw information into valuable insights and actions.",
      imgPath: '/assets/bgs/ai-data-anyalytics-black.svg'
    },
    {title: "AI Data Analytics" ,
      description: "With Ira, data is not just a collection of numbers and text. Its intelligent algorithms identify tasks that transform raw information into valuable insights and actions.",
      imgPath: '/assets/bgs/transform-data-action.svg'
    },
    {title: "Learning, Evolution, and Customization",
      description: "Ira redefines adaptability, learning new tasks tailored to your business needs and evolving over time. You can personalize your experience, set up dashboards and get custom insights from live dashboards.",
      imgPath: '/assets/bgs/transform-data-action.svg'
    },
    {title: "Highlighting Unidentified Risks" ,
      description: "Ira redefines adaptability, learning new tasks tailored to your business needs and evolving over time. You can personalize your experience, set up dashboards and get custom insights from live dashboards.",
      imgPath: '/assets/bgs/transform-data-action.svg'
    },
    {title: "Automating Sox Compliance" ,
      description: "Ira redefines adaptability, learning new tasks tailored to your business needs and evolving over time. You can personalize your experience, set up dashboards and get custom insights from live dashboards.",
      imgPath: '/assets/bgs/transform-data-action.svg'
    },
  ]
  return (
    <div className="flex bg-gray-secondary flex-col p-[7.5rem]">
      <div className="flex flex-col gap-4 items-center pt-16">
        {/* Text */}
        <h1 className="text-[72px] leading-[72px] text-center font-bold">
          AI in Finance to Put Your Processes on{" "}
          <span className="text-border-primary"> Autopilot</span>
        </h1>
        <p className="text-2xl text-center text-black/60">
          Transforming the way finance professionals work
        </p>
      </div>
      <div className="mt-[100px] flex flex-col gap-10">
        {data.map((item, index) => {
          return (<AbilityCard key={`ability_card_${index}`} title={item.title} description={item.description} imgPath={item.imgPath} />)
        })}
      </div>
    </div>
  );
};

export default Abilities;
