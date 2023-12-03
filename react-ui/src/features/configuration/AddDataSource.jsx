import React from "react";

const AddDataSource = ({ onSave, ...props }) => {
  return (
    <div className="relative w-full px-2 py-3 border rounded-md shadow-lg">
      <input {...props} placeholder="Name your data source" className="w-9/12 h-full bg-transparent outline-none" />
      <button onClick={onSave} className="absolute px-4 py-1 text-sm font-semibold text-white bg-blue-500 rounded-sm top-3 right-4">
        Save
      </button>
    </div>
  );
};

export default AddDataSource;
