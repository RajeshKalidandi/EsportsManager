import React from 'react';
import Card from '../components/common/Card';

const Dashboard: React.FC = () => {
  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <Card title="Active Teams">
          <p className="text-4xl font-bold text-blue-600">12</p>
          <p className="text-gray-600">Total active teams</p>
        </Card>
        <Card title="Upcoming Tournaments">
          <p className="text-4xl font-bold text-green-600">3</p>
          <p className="text-gray-600">Tournaments this month</p>
        </Card>
        <Card title="Recent Performance">
          <p className="text-4xl font-bold text-yellow-600">72%</p>
          <p className="text-gray-600">Win rate last 30 days</p>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;