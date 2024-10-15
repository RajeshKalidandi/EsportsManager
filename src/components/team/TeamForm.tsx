import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { createTeam } from '../../store/slices/teamSlice';
import Button from '../common/Button';
import { motion } from 'framer-motion';

interface TeamFormProps {
  onSubmit: () => void;
}

const TeamForm: React.FC<TeamFormProps> = ({ onSubmit }) => {
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    name: '',
    description: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    dispatch(createTeam(formData));
    setFormData({ name: '', description: '' });
    onSubmit();
  };

  return (
    <motion.form 
      onSubmit={handleSubmit} 
      className="bg-white shadow-md rounded-lg px-8 pt-6 pb-8 mb-4"
      initial={{ opacity: 0, y: -50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">
          Team Name
        </label>
        <input
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline focus:border-blue-500 transition duration-300"
          id="name"
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          placeholder="Team Name"
          required
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="description">
          Description
        </label>
        <textarea
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline focus:border-blue-500 transition duration-300"
          id="description"
          name="description"
          value={formData.description}
          onChange={handleChange}
          placeholder="Team Description"
          rows={4}
        />
      </div>
      <div className="flex items-center justify-between">
        <Button type="submit" className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full transition duration-300 ease-in-out transform hover:scale-105">
          Create Team
        </Button>
      </div>
    </motion.form>
  );
};

export default TeamForm;
