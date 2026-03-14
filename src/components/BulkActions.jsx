import React from 'react';
import { CheckSquare, Trash2, Tag } from 'lucide-react';

export default function BulkActions({ selectedCount, totalCount, onSelectAll, onClearSelection, onDeleteSelected, onCompleteSelected, onSetCategoryBulk, categories }) {
  if (selectedCount === 0) return null;

  return (
    <div className="mb-4 p-3 bg-blue-50 dark:bg-blue-950 border border-blue-200 dark:border-blue-800 rounded-lg">
      <div className="flex items-center justify-between gap-4">
        <span className="text-sm font-medium text-blue-900 dark:text-blue-100">
          {selectedCount} of {totalCount} selected
        </span>

        <div className="flex gap-2 flex-wrap">
          <button
            onClick={onSelectAll}
            className="text-xs px-2 py-1 rounded bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 hover:bg-blue-200 dark:hover:bg-blue-800 transition"
          >
            Select all
          </button>

          <button
            onClick={onClearSelection}
            className="text-xs px-2 py-1 rounded bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 hover:bg-blue-200 dark:hover:bg-blue-800 transition"
          >
            Clear
          </button>

          <button
            onClick={onCompleteSelected}
            className="text-xs px-2 py-1 rounded bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200 hover:bg-green-200 dark:hover:bg-green-800 transition flex items-center gap-1"
          >
            <CheckSquare size={14} />
            Mark complete
          </button>

          <select
            onChange={(e) => {
              if (e.target.value) {
                onSetCategoryBulk(e.target.value || null);
                e.target.value = '';
              }
            }}
            className="text-xs px-2 py-1 rounded border border-blue-300 dark:border-blue-700 bg-white dark:bg-blue-900 text-blue-900 dark:text-blue-100 hover:bg-blue-50 dark:hover:bg-blue-800 transition"
          >
            <option value="">Set category...</option>
            {categories.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>

          <button
            onClick={onDeleteSelected}
            className="text-xs px-2 py-1 rounded bg-red-100 dark:bg-red-900 text-red-800 dark:text-red-200 hover:bg-red-200 dark:hover:bg-red-800 transition flex items-center gap-1"
          >
            <Trash2 size={14} />
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}
