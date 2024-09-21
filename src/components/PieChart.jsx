// DonutChart.js
import React from 'react';
import { Doughnut } from 'react-chartjs-2';
import { Chart as ChartJS, Title, Tooltip, Legend, ArcElement } from 'chart.js';

// Register necessary components
ChartJS.register(
  Title,
  Tooltip,
  Legend,
  ArcElement
);

const DonutChart = ({ data }) => {
  // Define bright colors for each segment
  const colors = [
    'rgba(76, 175, 80, 0.9)',  // Bright Green
    'rgba(255, 87, 34, 0.9)',  // Bright Orange
    'rgba(244, 67, 54, 0.9)',  // Bright Red
    'rgba(255, 235, 59, 0.9)'   // Bright Yellow
    // Add more colors if needed
  ];

  // Prepare the chart data
  const chartData = {
    labels: data.map(item => item.department),
    datasets: [{
      data: data.map(item => item.totalAppointments),
      backgroundColor: colors, // Bright colors for each segment
      borderWidth: 1
    }]
  };


  const options = {
    responsive: true,
    plugins: {
      legend: {
        display: false, // Hides the legend
      },
      tooltip: {
        callbacks: {
          label: function(context) {
            return `${context.label}: ${context.raw}`;
          }
        }
      }
    },
    elements: {
      arc: {
        borderWidth: 1,
        shadowOffsetX: 0,   // Removes horizontal shadow offset
        shadowOffsetY: 0,   // Removes vertical shadow offset
        shadowBlur: 0,      // Removes shadow blur
        shadowColor: 'rgba(0,0,0,0)' // Makes shadow color fully transparent
      }
    },
    cutout: '70%' // Adjust the cutout to make the donut thinner
  };

  return (
    <div className='w-full h-[80%] flex flex-col gap-2 justify-center items-center'>
     
      <Doughnut data={chartData} options={options} />
      <span className='text-[14px] font-semibold'>Dept-wise Appointments</span>
    </div>
  );
};

export default DonutChart;
