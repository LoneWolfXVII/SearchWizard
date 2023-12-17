import React from "react";
import "./Automation_Workflow.css";
// All images imported here from assets
import WriteIcon from "../../assets/Write.svg";
import PluseIcon from "../../assets/Plus.svg";
import DatavalidationIcon from "../../assets/Datavalidation.svg";
import SentIcon from "../../assets/sent.svg";
import ExtrationIcon from "../../assets/extraction.svg";
import ValidatorIcon from "../../assets/validator.svg";
import SocialIcon from "../../assets/Social.svg";
import { Link } from "react-router-dom";

const AutomationWorkflow = () => {
  return (
    <div className="flex flex-col w-full gap-10 bg-[#F6F7FB] px-32 min-h-screen">
      <section className="px-8 py-8 my-6 bg-white rounded-sm">
        <h1 className="p-3 text-center">Automation templates</h1>
        {/* Table start from here */}
        {/* First Row */}
        <Card
          to="/automation/custom-template"
          image1={WriteIcon}
          image2={PluseIcon}
          title="Create custom template"
          subtitle="Create multiple workflows just adding step by step"
        />

        {/* Second Row */}
        <div className="flex items-center mt-10 mr-5 p-9">
          {/* First Horizontal Line */}
          <div className="flex-1 border-t border-black"></div>

          {/* Text in the Middle */}
          <div className="mx-4">
            <p className="text-center text-black">Browse templates</p>
          </div>

          {/* Second Horizontal Line */}
          <div className="flex-1 border-t border-black"></div>
        </div>

        <main className="flex flex-col gap-10">
          {/* Third row  */}
          <Card
            to="/automation/data-validation"
            image1={DatavalidationIcon}
            image2={SentIcon}
            title="Data validation"
            subtitle="Reconcile text, image data from multiple sources as per your rules"
          />

          {/* forth row */}
          <Card
            to="/automation/image-feature-extraction"
            image1={ExtrationIcon}
            image2={SentIcon}
            title="Image feature extraction"
            subtitle="Extract text, metadata, image summary just by uploading an image"
          />

          {/* Fifth row  */}
          <Card
            to="/automation/document-validator"
            image1={ValidatorIcon}
            image2={SocialIcon}
            title="Document Validator"
            subtitle="Reporting integrated with your platform"
          />
        </main>
      </section>
    </div>
  );
};

function Card({ to, image1, image2, title, subtitle }) {
  return (
    <Link to={to} className="flex items-center transition-all duration-500 ease-in-out shadow-lg cursor-pointer hover:scale-105">
      {/* First Column */}
      <div className="flex p-2">
        <img src={image1} alt="" className="Icons" />
      </div>

      {/* Second Column */}
      <div className="flex-1 mx-4 ">
        <p className="Heading_pera">{title}</p>
        <p className="text-black">{subtitle}</p>
      </div>

      {/* Third Column */}
      <div className="p-4 flex-3">
        <img src={image2} alt="" className="Icons" />
      </div>
    </Link>
  );
}

export default AutomationWorkflow;
