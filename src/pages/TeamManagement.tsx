import React, { useState } from 'react';
import TeamList from '../components/team/TeamList';
import TeamForm from '../components/team/TeamForm';
import Button from '../components/common/Button';
import { motion } from 'framer-motion';

const TeamManagement = () => {
  const [showForm, setShowForm] = useState(false);

  return (
    <motion.div 
      className="container mx-auto px-4 py-8"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <h1 className="text-4xl font-bold mb-8 text-center text-blue-800">Team Management</h1>
      <div className="mb-8 flex justify-end">
        <Button 
          onClick={() => setShowForm(!showForm)}
          className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full transition duration-300 ease-in-out transform hover:scale-105"
        >
          {showForm ? 'Hide Form' : 'Create Team'}
        </Button>
      </div>
      {showForm && (
        <motion.div 
          className="mb-8"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          <TeamForm onSubmit={() => setShowForm(false)} />
        </motion.div>
      )}
      <TeamList />
    </motion.div>
  );
};

export default TeamManagement;
