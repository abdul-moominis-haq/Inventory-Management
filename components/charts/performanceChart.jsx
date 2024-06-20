"use client";
import { useEffect, useRef } from "react";
import Chart from "chart.js/auto";

const PerformanceChart = ({ data }) => {
  const chartContainer = useRef(null);
  const chartInstance = useRef(null);

  useEffect(() => {
    if (chartInstance.current) {
      chartInstance.current.destroy();
    }

    if (chartContainer.current) {
      const ctx = chartContainer.current.getContext("2d");
      chartInstance.current = new Chart(ctx, {
        type: "bar",
        data: {
          labels: data.months,
          datasets: [
            {
              label: "Total Requests",
              data: data.totalRequests,
              backgroundColor: "#FB6340",
              barThickness: 5, 
              barRaduis: 8,
              borderRadius:4
            },
          ],
        },
        options: {
          scales: {
            y: {
              beginAtZero: true,
              title: {
                display: true,
                text: "Total Requests",
              },
            },
            x: {
              title: {
                display: true,
                text: "Months",
              },
            },
          },
          plugins: {
            title: {
              display: true,
              //   text: 'Performance',
              font: {
                size: 18,
              },
            },
          },
        },
      });
    }

    return () => {
      if (chartInstance.current) {
        chartInstance.current.destroy();
      }
    };
  }, [data]);

  return (
    <div>
      <canvas ref={chartContainer} style={{ height: "200px" }}></canvas>
    </div>
  );
};

export default PerformanceChart;
