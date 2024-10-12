import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Trophy, Calendar, Users, DollarSign } from 'lucide-react';
import Card from '../components/common/Card';
import Button from '../components/common/Button';
import Modal from '../components/common/Modal';

const TournamentOrganization: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const tournaments = [
    { id: 1, name: 'Summer Showdown', date: '2023-07-15', teams: 16, prize: '$10,000' },
    { id: 2, name: 'Fall Classic', date: '2023-09-22', teams: 8, prize: '$5,000' },
    { id: 3, name: 'Winter Cup', date: '2023-12-10', teams: 32, prize: '$20,000' },
  ];

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Tournament Organization</h1>
        <Button onClick={() => setIsModalOpen(true)}>Create Tournament</Button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {tournaments.map((tournament) => (
          <motion.div
            key={tournament.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            <Card>
              <h2 className="text-xl font-semibold mb-2">{tournament.name}</h2>
              <div className="space-y-2 text-gray-600">
                <div className="flex items-center">
                  <Calendar className="mr-2" size={16} />
                  <span>{tournament.date}</span>
                </div>
                <div className="flex items-center">
                  <Users className="mr-2" size={16} />
                  <span>{tournament.teams} teams</span>
                </div>
                <div className="flex items-center">
                  <DollarSign className="mr-2" size={16} />
                  <span>{tournament.prize} prize pool</span>
                </div>
              </div>
            </Card>
          </motion.div>
        ))}
      </div>
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <h2 className="text-2xl font-bold mb-4">Create New Tournament</h2>
        {/* Add tournament creation form here */}
      </Modal>
    </div>
  );
};

export default TournamentOrganization;