import React from 'react';
import { Search } from 'lucide-react';

export default function TodoSearch({ searchText, onSearchChange }) {
  return (
    <div className="mb-6 flex items-center gap-2 px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 focus-within:ring-2 focus-within:ring-blue-500">
      <Search size={18} className="text-gray-500 dark:text-gray-400" />
      <input
        type="text"
        value={searchText}
        onChange={(e) => onSearchChange(e.target.value)}
        placeholder="Search tasks..."
        className="flex-1 bg-transparent dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none"
      />
      {searchText && (
        <button
          onClick={() => onSearchChange('')}
          className="text-gray-400 dark:text-gray-500 hover:text-gray-600 dark:hover:text-gray-300"
        >
          ✕
        </button>
      )}
    </div>
  );
}

