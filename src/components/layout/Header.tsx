import React from 'react';
import { Link } from 'react-router-dom';
import { Menu } from 'lucide-react';
import Button from '../common/Button';

const Header: React.FC = () => {
  return (
    <header className="bg-white shadow-md">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <Link to="/" className="text-2xl font-bold text-blue-600">
          EsportsManager
        </Link>
        <nav className="hidden md:flex space-x-4">
          <Link to="/dashboard" className="text-gray-600 hover:text-blue-600">
            Dashboard
          </Link>
          <Link to="/teams" className="text-gray-600 hover:text-blue-600">
            Teams
          </Link>
          <Link to="/tournaments" className="text-gray-600 hover:text-blue-600">
            Tournaments
          </Link>
          <Link to="/analytics" className="text-gray-600 hover:text-blue-600">
            Analytics
          </Link>
        </nav>
        <div className="flex items-center space-x-4">
          <Button variant="outline" size="sm">
            Login
          </Button>
          <Button size="sm">Sign Up</Button>
        </div>
        <button className="md:hidden text-gray-600">
          <Menu size={24} />
        </button>
      </div>
    </header>
  );
};

export default Header;