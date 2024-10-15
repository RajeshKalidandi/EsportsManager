import React from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

interface PlayerStatsChartProps {
  player: any; // Replace with your Player type
}

const PlayerStatsChart: React.FC<PlayerStatsChartProps> = ({ player }) => {
  const data = {
    labels: ['Kills', 'Deaths', 'Assists', 'Avg Damage/Round'],
    datasets: [
      {
        label: 'Player Statistics',
        data: [
          player.statistics.kills,
          player.statistics.deaths,
          player.statistics.assists,
          player.statistics.averageDamagePerRound,
        ],
        backgroundColor: [
          'rgba(255, 99, 132, 0.2)',
          'rgba(54, 162, 235, 0.2)',
          'rgba(255, 206, 86, 0.2)',
          'rgba(75, 192, 192, 0.2)',
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
        ],
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const,
      },
      title: {
        display: true,
        text: `${player.name}'s Statistics`,
      },
    },
  };

  return <Bar data={data} options={options} />;
};

export default PlayerStatsChart;
