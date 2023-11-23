import React, { useRef, useEffect } from "react";
import Chart from "chart.js/auto";

const BarGraph = ({ labels, data, title = "#" }) => {
  const canvasRef = useRef(null);

  useEffect(() => {
    let myChart;
    const ctx = canvasRef.current.getContext("2d");
    myChart = new Chart(ctx, {
      type: "bar",
      data: {
        labels: labels,
        datasets: [
          {
            label: title !== "#" ? title : "# of Votes",
            data: data,
            backgroundColor: [
              "rgba(255, 99, 132, 0.5)",
              "rgba(54, 162, 235, 0.5)",
              "rgba(255, 206, 86, 0.5)",
              "rgba(75, 192, 192, 0.5)",
              "rgba(153, 102, 255, 0.5)",
              "rgba(255, 159, 64, 0.5)",
            ],
            borderColor: [
              "rgba(255, 99, 132, 1)",
              "rgba(54, 162, 235, 1)",
              "rgba(255, 206, 86, 1)",
              "rgba(75, 192, 192, 1)",
              "rgba(153, 102, 255, 1)",
              "rgba(255, 159, 64, 1)",
            ],
            borderWidth: 1,
            borderRadius: 20,
            borderSkipped: false,
          },
        ],
      },
      options: {
        scales: {
          y: {
            beginAtZero: true,
          },
        },
      },
    });
    return () => {
      myChart.destroy();
    };
  }, [labels, data]);

  return <canvas ref={canvasRef}></canvas>;
};

export default BarGraph;
