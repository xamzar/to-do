import React from 'react';
import { Search } from 'lucide-react';

export default function TodoSearch({ searchText, onSearchChange }) {
  return (
    <div className="mb-6 flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg focus-within:ring-2 focus-within:ring-blue-500">
      <Search size={18} className="text-gray-500" />
      <input
        type="text"
        value={searchText}
        onChange={(e) => onSearchChange(e.target.value)}
        placeholder="Search tasks..."
        className="flex-1 bg-transparent focus:outline-none"
      />
      {searchText && (
        <button
          onClick={() => onSearchChange('')}
          className="text-gray-400 hover:text-gray-600"
        >
          ✕
        </button>
      )}
    </div>
  );
}
