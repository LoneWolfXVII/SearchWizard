import { tranformDataIntoAction } from "../types/home.content";

const TransformData = () => {
  return (
    <section className="mt-32">
      <div className="my-container">
        <div className="grid grid-cols-2 gap-x-3 ">
          <div className="flex flex-col items-center content my-auto justify-end lpro:px-10 tPro:mt-50 mt-10 tPro:mx-0 mx-10">
            <h2 className="w-full">
              Transform Your
              <span className="block">Data Into Action</span>
            </h2>
            <p className="mt-8">{tranformDataIntoAction?.content}</p>
          </div>
          <div className="mx-10">
            <img
              src="/assets/bgs/transform-data-action.svg"
              className=" w-full tPro:h-[500px]  h-auto object-contain"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default TransformData;
