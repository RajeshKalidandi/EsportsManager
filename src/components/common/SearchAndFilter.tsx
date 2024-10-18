import React, { useState } from 'react';
import { Input } from './Input';
import { Dropdown } from './Dropdown';

interface SearchAndFilterProps {
  onSearch: (searchTerm: string) => void;
  onFilter: (filterOption: string) => void;
  filterOptions: string[];
}

export const SearchAndFilter: React.FC<SearchAndFilterProps> = ({
  onSearch,
  onFilter,
  filterOptions,
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedFilter, setSelectedFilter] = useState('');

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchTerm(value);
    onSearch(value);
  };

  const handleFilter = (option: string) => {
    setSelectedFilter(option);
    onFilter(option);
  };

  return (
    <div className="flex items-center space-x-4">
      <Input
        type="text"
        placeholder="Search..."
        value={searchTerm}
        onChange={handleSearch}
        className="w-64"
      />
      <Dropdown
        options={filterOptions}
        value={selectedFilter}
        onChange={handleFilter}
        placeholder="Filter by..."
      />
    </div>
  );
};

export default SearchAndFilter;
