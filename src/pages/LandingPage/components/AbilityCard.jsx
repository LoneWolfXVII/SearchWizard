/* eslint-disable react/prop-types */

const AbilityCard = ({ title, description, imgPath }) => {
  return (
    <section className="ability-card rounded-[2.5rem]">
      <div className="grid grid-cols-2 gap-x-3 mr-6">
        <div className="tPro:col-span-1 col-span-2 flex flex-col items-center content my-auto justify-start lpro:px-10 tPro:mt-12 mt-8 tPro:mx-0 mx-10">
          <h2 className="w-full">{title}</h2>
          <p className="mt-8">{description}</p>
        </div>
        <div className="tPro:col-span-1 col-span-2 lpro:mx-0 mx-10">
          <img
            src={imgPath}
            className=" w-full tPro:h-[500px]  h-auto object-contain"
          />
        </div>
      </div>
    </section>
  );
};

export default AbilityCard;
