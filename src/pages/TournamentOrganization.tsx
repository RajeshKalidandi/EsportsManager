import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { motion } from 'framer-motion';
import { Plus, Loader, Calendar, Trophy, Users } from 'lucide-react';
import { RootState } from '../store';
import { fetchTournaments, searchTournaments, filterTournaments } from '../store/slices/tournamentSlice';
import TournamentList from '../components/tournament/TournamentList';
import TournamentForm from '../components/tournament/TournamentForm';
import Button from '../components/common/Button';
import Modal from '../components/common/Modal';
import SearchAndFilter from '../components/common/SearchAndFilter';
import Pagination from '../components/common/Pagination';

const TournamentOrganization: React.FC = () => {
  const dispatch = useDispatch();
  const { tournaments, filteredTournaments, loading, error } = useSelector((state: RootState) => state.tournaments);
  const [showModal, setShowModal] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const tournamentsPerPage = 6;

  useEffect(() => {
    dispatch(fetchTournaments());
  }, [dispatch]);

  const handleSearch = (searchTerm: string) => {
    dispatch(searchTournaments(searchTerm));
  };

  const handleFilter = (filterOption: string) => {
    dispatch(filterTournaments(filterOption));
  };

  const handleCreateTournament = () => {
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  const indexOfLastTournament = currentPage * tournamentsPerPage;
  const indexOfFirstTournament = indexOfLastTournament - tournamentsPerPage;
  const currentTournaments = (filteredTournaments.length > 0 ? filteredTournaments : tournaments).slice(indexOfFirstTournament, indexOfLastTournament);

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  const stats = {
    total: tournaments.length,
    upcoming: tournaments.filter(t => t.status === 'Upcoming').length,
    ongoing: tournaments.filter(t => t.status === 'Ongoing').length,
    completed: tournaments.filter(t => t.status === 'Completed').length,
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="container mx-auto px-4 py-8"
    >
      <h1 className="text-4xl font-bold mb-8 text-center text-blue-900">Tournament Organization</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
        <StatCard icon={<Trophy size={24} />} title="Total Tournaments" value={stats.total} color="bg-blue-100" />
        <StatCard icon={<Calendar size={24} />} title="Upcoming" value={stats.upcoming} color="bg-green-100" />
        <StatCard icon={<Users size={24} />} title="Ongoing" value={stats.ongoing} color="bg-yellow-100" />
        <StatCard icon={<Trophy size={24} />} title="Completed" value={stats.completed} color="bg-purple-100" />
      </div>

      <div className="flex justify-between items-center mb-6">
        <SearchAndFilter
          onSearch={handleSearch}
          onFilter={handleFilter}
          filterOptions={['All', 'Upcoming', 'Ongoing', 'Completed']}
        />
        <Button onClick={handleCreateTournament} className="bg-blue-600 hover:bg-blue-700 text-white">
          <Plus size={20} className="mr-2" />
          Create Tournament
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
          <TournamentList tournaments={currentTournaments} />
          <Pagination
            itemsPerPage={tournamentsPerPage}
            totalItems={filteredTournaments.length > 0 ? filteredTournaments.length : tournaments.length}
            paginate={paginate}
            currentPage={currentPage}
          />
        </>
      )}

      <Modal isOpen={showModal} onClose={closeModal} title="Create Tournament">
        <TournamentForm onSubmit={closeModal} />
      </Modal>
    </motion.div>
  );
};

const StatCard: React.FC<{ icon: React.ReactNode; title: string; value: number; color: string }> = ({ icon, title, value, color }) => (
  <div className={`${color} rounded-lg p-4 flex items-center justify-between`}>
    <div className="flex items-center">
      {icon}
      <h3 className="ml-2 font-semibold">{title}</h3>
    </div>
    <span className="text-2xl font-bold">{value}</span>
  </div>
);

export default TournamentOrganization;
