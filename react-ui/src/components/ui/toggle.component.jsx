import React from "react";

const Toggle = ({ onValueChange, value }) => {
  return (
    <label class="relative inline-flex items-center cursor-pointer">
      <input
        checked={value}
        onChange={(e) => onValueChange(e.target.checked)}
        type="checkbox"
        value=""
        class="sr-only peer"
      />
      <div class="w-11 h-6 bg-gray-200 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-green-600"></div>
      {/* <span class="ms-3 text-sm font-medium text-gray-900 dark:text-gray-300">Toggle me</span> */}
    </label>
  );
};

export default Toggle;
