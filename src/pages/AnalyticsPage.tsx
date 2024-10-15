import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

const AnalyticsPage = () => {
  const [analyticsData, setAnalyticsData] = useState([]);
  const tournaments = useSelector((state) => state.tournament.tournaments);
  const teams = useSelector((state) => state.team.teams);

  useEffect(() => {
    // Generate analytics data based on tournaments and teams
    const data = tournaments.map(tournament => ({
      name: tournament.name,
      teams: tournament.teams.length,
      prize: tournament.prize
    }));
    setAnalyticsData(data);
  }, [tournaments, teams]);

  return (
    <div>
      <h1>Analytics and Reporting</h1>
      <h2>Tournament Participation and Prize Pool</h2>
      <BarChart width={600} height={300} data={analyticsData}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis yAxisId="left" orientation="left" stroke="#8884d8" />
        <YAxis yAxisId="right" orientation="right" stroke="#82ca9d" />
        <Tooltip />
        <Legend />
        <Bar yAxisId="left" dataKey="teams" fill="#8884d8" name="Number of Teams" />
        <Bar yAxisId="right" dataKey="prize" fill="#82ca9d" name="Prize Pool" />
      </BarChart>
    </div>
  );
};

export default AnalyticsPage;
