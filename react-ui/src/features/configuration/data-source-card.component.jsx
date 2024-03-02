import React from "react";
const dropdownarrow = "/dropdownarrow.svg";

const DataSourceCard = ({ title, image }) => {
  return (
    <div className="flex items-center justify-between px-5 py-3 bg-white border rounded-md">
      <div className="flex items-center w-full gap-5">
        <img src={image} alt={title} height={28} width={28} />
        <div className="flex flex-col w-full">
          <h5 className="text-xl font-semibold ">{title}</h5>
          {/* show progress bar here  */}
          {/* <div class="w-full  rounded-full h-2 dark:bg-gray-700">
            <div
              class="bg-green-400 h-2 rounded-full"
              style={{ width: "50%" }}
            ></div>
          </div> */}
        </div>
      </div>
      {/* <img src={dropdownarrow} alt="drop-down" height={14} width={14} /> */}
    </div>
  );
};

export default DataSourceCard;
