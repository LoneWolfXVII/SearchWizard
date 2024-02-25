import React, { useState } from "react";
import Toggle from "../../components/ui/toggle.component";

const ToolsBadge = ({ image, title }) => {
  const [toggleValue, setToggleValue] = useState(false);

  return (
    <div
      className={`flex items-center w-[22rem] justify-between h-16 px-4 py-12 text-2xl font-medium text-black ${
        toggleValue ? "bg-white" : "bg-transparent"
      } rounded-3xl w-96 transition-all duration-300 ease-in-out`}
    >
      <div className="flex items-center gap-2">
        {image && <img src={image} alt={title} height={26} width={26} />}
        <p>{title}</p>
      </div>
      <Toggle onValueChange={setToggleValue} value={toggleValue} />
    </div>
  );
};

export default ToolsBadge;
