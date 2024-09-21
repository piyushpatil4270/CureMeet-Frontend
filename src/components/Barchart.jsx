import React from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';


ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const BarChart = ({data}) => {
 
  
  const colors = [
    'rgba(76, 175, 80, 0.9)',
    'rgba(255, 87, 34, 0.9)',  
    'rgba(244, 67, 54, 0.9)',  
    'rgba(255, 235, 59, 0.9)'  
  ];
 
  const chartData = {
    labels: data.map(item => item.month?.split(' ')[0]?.substring(0,3)),
    datasets: [
      {
        label: 'Total Appointments',
        data: data.map(item => item.totalAppointments),
        backgroundColor: data.map((_, index) => colors[index % colors.length]), 
        borderColor: data.map((_, index) => colors[index % colors.length].replace('0.6', '1')), 
        borderWidth: 1,
        barThickness: 12, 
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        callbacks: {
          label: function(context) {
            let label = context.dataset.label || '';
            if (label) {
              label += ': ';
            }
            if (context.parsed.y !== null) {
              label += context.parsed.y;
            }
            return label;
          },
        },
      },
    },
    scales: {
      x: {
        beginAtZero: true,
        grid: {
          display: false,
        },
        // Add gap between bars
        stacked: false,
        barPercentage: 0.8, // Adjust bar width to leave space for the gap
        categoryPercentage: 0.9, // Adjust space between bars
      },
      y: {
        beginAtZero: true,
        grid: {
          display: false,
        },
      },
    },
  };

  return (
    <div className='h-full w-full  flex flex-col gap-2 items-center justify-center'>
      <Bar data={chartData} options={options} />
      <span className='text-[14px] font-semibold'>Monthly Appointments</span>
    </div>
  );
};

export default BarChart;
