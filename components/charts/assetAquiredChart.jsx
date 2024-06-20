"use client";
import { useEffect, useRef } from "react";
import Chart from "chart.js/auto";

const ReportChart = ({ data }) => {
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
              label: "Total Reports",
              data: data.totalReports,
              backgroundColor: "#FB6340",
              barThickness: 5, 
              borderRaduis: 4,
              barRaduis:8
            },
          ],
        },
        options: {
          scales: {
            y: {
              beginAtZero: true,
              title: {
                display: true,
                text: "Total Reports",
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

export default ReportChart;
