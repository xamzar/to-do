import React from 'react';
import { Undo2, Redo2 } from 'lucide-react';

export default function HistoryControls({ canUndo, canRedo, onUndo, onRedo }) {
  return (
    <div className="flex gap-2 mb-4">
      <button
        onClick={onUndo}
        disabled={!canUndo}
        className={`flex items-center gap-1 px-3 py-1 rounded-lg transition ${
          canUndo
            ? 'bg-blue-500 hover:bg-blue-600 dark:bg-blue-600 dark:hover:bg-blue-700 text-white cursor-pointer'
            : 'bg-gray-300 dark:bg-gray-700 text-gray-500 dark:text-gray-500 cursor-not-allowed opacity-50'
        }`}
        title="Undo (Ctrl+Z)"
      >
        <Undo2 size={16} />
        <span className="text-sm">Undo</span>
      </button>

      <button
        onClick={onRedo}
        disabled={!canRedo}
        className={`flex items-center gap-1 px-3 py-1 rounded-lg transition ${
          canRedo
            ? 'bg-blue-500 hover:bg-blue-600 dark:bg-blue-600 dark:hover:bg-blue-700 text-white cursor-pointer'
            : 'bg-gray-300 dark:bg-gray-700 text-gray-500 dark:text-gray-500 cursor-not-allowed opacity-50'
        }`}
        title="Redo (Ctrl+Y)"
      >
        <Redo2 size={16} />
        <span className="text-sm">Redo</span>
      </button>
    </div>
  );
}
