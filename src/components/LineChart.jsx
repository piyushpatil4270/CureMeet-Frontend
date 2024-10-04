import React from 'react';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, Title, Tooltip, Legend, LineElement, CategoryScale, LinearScale, PointElement } from 'chart.js';
import moment from 'moment';
ChartJS.register(Title, Tooltip, Legend, LineElement, CategoryScale, LinearScale, PointElement);

const LineChart = ({ dailyData }) => {
  const labels = dailyData.map(data => moment(data.day,"YYYY-MM-DD").format("DD-MMMM").slice(0,6));
  const data = dailyData.map(data => data.appointments);

  const chartData = {
    labels,
    datasets: [
      {
        
        data,
        borderColor: '#ec231d',
        backgroundColor: '#fffff', 
        borderWidth: 1, 
        fill: false, 
        tension: 0.1, 
        pointRadius: 1, 
        pointHoverRadius: 2,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        display:false
      },
      tooltip: {
        callbacks: {
          label: function (context) {
            return ``;
          },
        },
      },
    },
    scales: {
      x: {
        title: {
          display: true,
          
          font: {
            size: 8,
          },
        },
        grid: {
          display: false, 
        },
        ticks: {
          font: {
            size: 8, 
          },
        },
      },
      y: {
        title: {
          display: true,
          font: {
            size: 8, 
          },
        },
        grid: {
          display: false, 
        },
        ticks: {
          font: {
            size: 8,
          },
        },
        beginAtZero: true,
      },
    },
  };

  return (
    <div className='w-full h-full flex flex-col gap-2 items-center justify-center'>
      <Line data={chartData} options={options} />
      <span className='text-[14px] font-semibold'>Daily Appointments</span>
    </div>
  );
};

export default LineChart;
