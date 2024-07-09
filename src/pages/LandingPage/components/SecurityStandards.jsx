import React from "react";

const SecurityStandards = () => {
  return (
    <div className="bg-border-light p-[7.5rem] flex flex-col">
      <h1 className="text-[72px] leading-[80px] text-center font-bold">
        Irame Comes with Impeccable Data Security Standards
      </h1>
      <p className="text-2xl mt-4 text-center text-black/60">
        Transforming the way finance professionals work
      </p>
      <div className="flex pt-24 justify-center flex-wrap gap-20">
        <img src="/assets/icons/iso.svg" alt="iso icon" />
        <img src="/assets/icons/gdpr.svg" alt="gdpr icon" />
        <img src="/assets/icons/soc2.svg" alt="soc2 icon" />
        <img
          src="/assets/icons/software-suggest.svg"
          alt="software-suggest icon"
        />
        <img src="/assets/icons/g2.svg" alt="g2 icon" />
      </div>
    </div>
  );
};

export default SecurityStandards;
