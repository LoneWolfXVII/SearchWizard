import React from "react";

const AddDataSource = ({ ...props }) => {
  return (
    <input
      {...props}
      placeholder="Name your data source"
      className="w-full py-4 px-3 rounded-md h-full bg-[#f1f5f9] outline-none"
    />
  );
};

export default AddDataSource;
