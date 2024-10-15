import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../store';
import { Line } from 'react-chartjs-2';

const AdvancedAnalytics: React.FC = () => {
  const players = useSelector((state: RootState) => state.players.players);

  const performanceTrend = players.map(player => ({
    name: player.name,
    data: player.performanceHistory || []
  }));

  const data = {
    labels: performanceTrend[0]?.data.map((_, index) => `Match ${index + 1}`),
    datasets: performanceTrend.map(player => ({
      label: player.name,
      data: player.data,
      fill: false,
      borderColor: `#${Math.floor(Math.random()*16777215).toString(16)}`,
    }))
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const,
      },
      title: {
        display: true,
        text: 'Player Performance Trend',
      },
    },
  };

  return (
    <div>
      <h2>Advanced Analytics</h2>
      <Line data={data} options={options} />
      {/* Add more advanced analytics visualizations here */}
    </div>
  );
};

export default AdvancedAnalytics;
