import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Users, Plus } from 'lucide-react';
import { fetchTeams } from '../store/slices/teamSlice';
import { RootState } from '../store';
import Card from '../components/common/Card';
import Button from '../components/common/Button';
import Modal from '../components/common/Modal';
import TeamForm from '../components/team/TeamForm';

const TeamManagement: React.FC = () => {
  const dispatch = useDispatch();
  const { teams, loading, error } = useSelector((state: RootState) => state.team);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    dispatch(fetchTeams());
  }, [dispatch]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Team Management</h1>
        <Button onClick={() => setIsModalOpen(true)}>
          <Plus className="mr-2" /> Add New Team
        </Button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {teams.map((team) => (
          <motion.div
            key={team.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            <Card>
              <Link to={`/team/${team.id}`} className="block">
                <h2 className="text-xl font-semibold mb-2">{team.name}</h2>
                <div className="flex items-center text-gray-600">
                  <Users className="mr-2" size={20} />
                  <span>{team.members?.length || 0} members</span>
                </div>
              </Link>
            </Card>
          </motion.div>
        ))}
      </div>
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <h2 className="text-2xl font-bold mb-4">Add New Team</h2>
        <TeamForm onSubmit={() => setIsModalOpen(false)} />
      </Modal>
    </div>
  );
};

export default TeamManagement;