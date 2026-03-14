import React from 'react';
import { FILTER_ALL, FILTER_ACTIVE, FILTER_COMPLETED } from '../utils/constants';

export default function TodoFilter({ currentFilter, onFilterChange }) {
  return (
    <div className="flex gap-2 mb-6 border-b border-gray-200 dark:border-gray-700 pb-4">
      {[
        { label: 'All', value: FILTER_ALL },
        { label: 'Active', value: FILTER_ACTIVE },
        { label: 'Completed', value: FILTER_COMPLETED },
      ].map((f) => (
        <button
          key={f.value}
          onClick={() => onFilterChange(f.value)}
          className={`px-4 py-2 rounded-lg transition ${
            currentFilter === f.value
              ? 'bg-blue-500 text-white dark:bg-blue-600'
              : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600'
          }`}
        >
          {f.label}
        </button>
      ))}
    </div>
  );
}

