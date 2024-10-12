import React from 'react';
import { motion } from 'framer-motion';
import { Users, Trophy, BarChart2, DollarSign } from 'lucide-react';
import Card from '../components/common/Card';

const Dashboard: React.FC = () => {
  const stats = [
    { title: 'Active Teams', value: 12, icon: Users, color: 'bg-blue-500' },
    { title: 'Upcoming Tournaments', value: 3, icon: Trophy, color: 'bg-green-500' },
    { title: 'Win Rate', value: '72%', icon: BarChart2, color: 'bg-yellow-500' },
    { title: 'Total Earnings', value: '$15,000', icon: DollarSign, color: 'bg-purple-500' },
  ];

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6">Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <motion.div
            key={stat.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
          >
            <Card>
              <div className="flex items-center">
                <div className={`p-3 rounded-full ${stat.color} text-white mr-4`}>
                  <stat.icon size={24} />
                </div>
                <div>
                  <p className="text-sm text-gray-600">{stat.title}</p>
                  <p className="text-2xl font-bold">{stat.value}</p>
                </div>
              </div>
            </Card>
          </motion.div>
        ))}
      </div>
      <div className="mt-8 grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <h2 className="text-xl font-bold mb-4">Recent Matches</h2>
          {/* Add a list or table of recent matches here */}
        </Card>
        <Card>
          <h2 className="text-xl font-bold mb-4">Upcoming Tournaments</h2>
          {/* Add a list of upcoming tournaments here */}
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;
