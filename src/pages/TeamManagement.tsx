import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { motion } from 'framer-motion';
import { Plus, Loader } from 'lucide-react';
import { RootState } from '../store';
import { fetchTeams, searchTeams, filterTeams } from '../store/slices/teamSlice';
import TeamList from '../components/team/TeamList';
import TeamForm from '../components/team/TeamForm';
import Button from '../components/common/Button';
import Modal from '../components/common/Modal';
import SearchAndFilter from '../components/common/SearchAndFilter';
import Pagination from '../components/common/Pagination';

const TeamManagement: React.FC = () => {
  const dispatch = useDispatch();
  const { teams, filteredTeams, loading, error } = useSelector((state: RootState) => state.teams);
  const [showModal, setShowModal] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const teamsPerPage = 9;

  useEffect(() => {
    dispatch(fetchTeams());
  }, [dispatch]);

  const handleSearch = (searchTerm: string) => {
    dispatch(searchTeams(searchTerm));
  };

  const handleFilter = (filterOption: string) => {
    dispatch(filterTeams(filterOption));
  };

  const handleCreateTeam = () => {
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  const indexOfLastTeam = currentPage * teamsPerPage;
  const indexOfFirstTeam = indexOfLastTeam - teamsPerPage;
  const currentTeams = (filteredTeams.length > 0 ? filteredTeams : teams).slice(indexOfFirstTeam, indexOfLastTeam);

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Team Management</h1>
      <div className="flex justify-between items-center mb-6">
        <SearchAndFilter
          onSearch={handleSearch}
          onFilter={handleFilter}
          filterOptions={['All', 'Active', 'Inactive']}
        />
        <Button onClick={handleCreateTeam} className="bg-blue-600 hover:bg-blue-700 text-white">
          <Plus size={20} className="mr-2" />
          Create Team
        </Button>
      </div>
      {loading ? (
        <div className="flex justify-center items-center h-64">
          <Loader className="animate-spin" size={48} />
        </div>
      ) : error ? (
        <div className="text-red-500 text-center">{error}</div>
      ) : (
        <>
          <TeamList teams={currentTeams} />
          <Pagination
            itemsPerPage={teamsPerPage}
            totalItems={filteredTeams.length > 0 ? filteredTeams.length : teams.length}
            paginate={paginate}
            currentPage={currentPage}
          />
        </>
      )}
      <Modal isOpen={showModal} onClose={closeModal} title="Create Team">
        <TeamForm onSubmit={closeModal} />
      </Modal>
    </div>
  );
};

export default TeamManagement;
