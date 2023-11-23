import React from "react";
import BarGraph from "./BarGraph";

const GraphPage = ({ fetchedData }) => {
  return (
    <div
      style={{
        width: "100vw",
        minheight: "100vh",
        background: "#fff",
        padding: "2rem",

        display: "flex",
        gap: "2rem",
        flexDirection: "column",
      }}
    >
      {Object.keys(fetchedData)?.map((key) => (
        <div
          key={key}
          style={{
            // background: "#fff",
            padding: "2rem",
            height: "auto",
            borderRadius: "0.625rem",
            borderTop: "4px solid rgba(173, 100, 185, 0.80)",
            borderRight: "1px solid rgba(173, 100, 185, 0.80)",
            borderBottom: "4px solid rgba(173, 100, 185, 0.80)",
            borderLeft: "1px solid rgba(173, 100, 185, 0.80)",
            background:
              "linear-gradient(180deg, rgba(255, 255, 255, 0.00) 0%, rgba(173, 100, 185, 0.05) 100%)",
            boxShadow: "0px 4px 4px 0px rgba(0, 0, 0, 0.25)",
          }}
        >
          <BarGraph
            title={key}
            labels={fetchedData[key]?.labels}
            data={fetchedData[key]?.values}
            label={fetchedData[key]?.label}
          />
        </div>
      ))}
    </div>
  );
};

export default GraphPage;
