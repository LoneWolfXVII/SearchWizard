import React from "react";

const BackedBy = () => {
  return (
    <div className="bg-gray-secondary px-4 p-[7.5rem] md:p-[7.5rem] flex flex-col">
      <h1 className="md:text-[72px] text-[34px] leading-[39px] md:leading-[80px] md:text-center font-bold">
        Backed By Some of the Best Minds in the Industry
      </h1>
      <p className="text-[14px] md:text-2xl mt-4 md:text-center text-black/60">
        Transforming the way finance professionals work
      </p>
      <div className="flex pt-6 sm:pt-24 justify-center flex-wrap gap-8 sm:gap-20">
        {Array.isArray(backedByLogos) && backedByLogos.map((logo, index) => (
          <img
            key={`backedby_logo_${index}`}
            src={logo.img}
            alt={logo.name}
            className="w-16 h-auto sm:w-24 md:w-32"
          />
        ))}
      </div>
    </div>
  );
};

export default BackedBy;

const backedByLogos = [
  {
    img: '/assets/logos/kpmg.svg',
    name: 'KPMG',
  },
  {
    img: '/assets/logos/deloitte.svg',
    name: 'Deloitte',
  },
  {
    img: '/assets/logos/bcg.svg',
    name: 'BCG',
  },
  {
    img: '/assets/logos/ey.svg',
    name: 'EY',
  },
  {
    img: '/assets/logos/pwc.svg',
    name: 'PwC',
  },
];
