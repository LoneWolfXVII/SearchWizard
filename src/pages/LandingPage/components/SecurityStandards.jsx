import React from "react";

const SecurityStandards = () => {
  return (
    <div className="bg-border-light px-4 p-[7.5rem] md:p-[7.5rem] flex flex-col">
      <h1 className="md:text-[72px] text-[34px] leading-[39px] md:leading-[80px] md:text-center font-bold">
        Irame Comes with Impeccable Data Security Standards
      </h1>
      <p className="text-[14px] md:text-2xl mt-4 md:text-center text-black/60">
        Transforming the way finance professionals work
      </p>
      <div className="flex pt-6 sm:pt-24 justify-around sm:justify-center flex-wrap sm:gap-20">
        {Array.isArray(securityIcons) && securityIcons.map((icon, index) => (
          <img
            key={`security_icon_${index}`}
            src={icon.img}
            alt={icon.name}
            className="w-12 h-auto sm:w-24 md:w-32"
          />
        ))}
      </div>
    </div>
  );
};

export default SecurityStandards;

const securityIcons = [
  {
    img: '/assets/icons/iso.svg',
    name: 'ISO',
  },
  {
    img: '/assets/icons/gdpr.svg',
    name: 'GDPR',
  },
  {
    img: '/assets/icons/soc2.svg',
    name: 'SOC2',
  },
  {
    img: '/assets/icons/software-suggest.svg',
    name: 'Software Suggest',
  },
  {
    img: '/assets/icons/g2.svg',
    name: 'G2',
  },
];
