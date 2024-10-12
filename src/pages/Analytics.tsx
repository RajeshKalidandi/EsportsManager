import React from 'react';
import { motion } from 'framer-motion';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import Card from '../components/common/Card';

const Analytics: React.FC = () => {
  const performanceData = [
    { month: 'Jan', winRate: 65, revenue: 5000 },
    { month: 'Feb', winRate: 68, revenue: 5500 },
    { month: 'Mar', winRate: 70, revenue: 6000 },
    { month: 'Apr', winRate: 72, revenue: 6200 },
    { month: 'May', winRate: 75, revenue: 6800 },
    { month: 'Jun', winRate: 78, revenue: 7500 },
  ];

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6">Analytics</h1>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          <Card>
            <h2 className="text-xl font-semibold mb-4">Win Rate Over Time</h2>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={performanceData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="winRate" stroke="#8884d8" />
              </LineChart>
            </ResponsiveContainer>
          </Card>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.1 }}
        >
          <Card>
            <h2 className="text-xl font-semibold mb-4">Revenue Over Time</h2>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={performanceData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="revenue" stroke="#82ca9d" />
              </LineChart>
            </ResponsiveContainer>
          </Card>
        </motion.div>
      </div>
    </div>
  );
};

export default Analytics;