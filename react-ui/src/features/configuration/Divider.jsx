import React from "react";

const Divider = ({ direction }) => {
  const rotationRight = direction === "vertical" ? "rotate-90" : "";
  return <hr className={` h-0.5 w-full border-t-0 bg-gray-300 opacity-100 dark:opacity-50 ${rotationRight}`} />;
};

export default Divider;
