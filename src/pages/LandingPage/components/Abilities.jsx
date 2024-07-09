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
    <div className="flex bg-gray-secondary flex-col px-4 py-20 sm:p-[3.5rem] tPro:p-[7.5rem]">
      <div className="flex flex-col gap-4 items-center sm:pt-16">
        {/* Text */}
        <h1 className="md:text-[72px] text-[34px] leading-[39px] md:leading-[80px] sm:text-center font-bold">
          AI in Finance to Put Your Processes on{" "}
          <span className="text-border-primary"> Autopilot</span>
        </h1>
        <p className=" text-[14px] sm:text-2xl sm:text-center text-black/60">
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
