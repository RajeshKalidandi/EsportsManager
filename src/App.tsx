import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from './store';
import Navbar from './components/layout/Navbar';
import LandingPage from './pages/LandingPage';
import Dashboard from './pages/Dashboard';
import TeamManagement from './pages/TeamManagement';
import TeamDetails from './pages/TeamDetails';
import TournamentOrganization from './pages/TournamentOrganization';
import Analytics from './pages/Analytics';
import Settings from './pages/Settings';
import UserProfile from './pages/UserProfile';
import Login from './pages/Login';
import Register from './pages/Register';
import ForgotPassword from './pages/ForgotPassword';
import PrivacyPolicy from './pages/PrivacyPolicy';
import TermsAndConditions from './pages/TermsAndConditions';
import ContactUs from './pages/ContactUs';
import AboutUs from './pages/AboutUs';
import { setupSocketListeners } from './services/socket';
import PlayerStatistics from './components/player/PlayerStatistics';
import GameTitleList from './components/game/GameTitleList';

const PrivateRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const auth = useSelector((state: RootState) => state.auth);
  const isAuthenticated = auth ? auth.isAuthenticated : false;

  return isAuthenticated ? (
    <>
      <Navbar />
      {children}
    </>
  ) : (
    <Navigate to="/login" replace />
  );
};

const App: React.FC = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    setupSocketListeners(dispatch);
  }, [dispatch]);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/privacy" element={<PrivacyPolicy />} />
        <Route path="/terms" element={<TermsAndConditions />} />
        <Route path="/contact" element={<ContactUs />} />
        <Route path="/about" element={<AboutUs />} />
        <Route path="/dashboard" element={<PrivateRoute><Dashboard /></PrivateRoute>} />
        <Route path="/teams" element={<PrivateRoute><TeamManagement /></PrivateRoute>} />
        <Route path="/team/:id" element={<PrivateRoute><TeamDetails /></PrivateRoute>} />
        <Route path="/tournaments" element={<PrivateRoute><TournamentOrganization /></PrivateRoute>} />
        <Route path="/analytics" element={<PrivateRoute><Analytics /></PrivateRoute>} />
        <Route path="/settings" element={<PrivateRoute><Settings /></PrivateRoute>} />
        <Route path="/profile" element={<PrivateRoute><UserProfile /></PrivateRoute>} />
        <Route path="/player-stats/:playerId/:tournamentId" element={<PrivateRoute><PlayerStatistics /></PrivateRoute>} />
        <Route path="/game-titles" element={<PrivateRoute><GameTitleList /></PrivateRoute>} />
      </Routes>
    </Router>
  );
};

export default App;