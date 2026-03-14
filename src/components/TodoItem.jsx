import React, { useState } from 'react';

export default function TodoItem({ todo, onDelete, onToggle, onEdit }) {
  const [isEditing, setIsEditing] = useState(false);
  const [editText, setEditText] = useState(todo.text);

  const handleSave = () => {
    if (editText.trim()) {
      onEdit(editText.trim());
      setIsEditing(false);
    }
  };

  const handleCancel = () => {
    setEditText(todo.text);
    setIsEditing(false);
  };

  if (isEditing) {
    return (
      <li className="flex gap-2 p-3 bg-gray-50 rounded-lg">
        <input
          autoFocus
          type="text"
          value={editText}
          onChange={(e) => setEditText(e.target.value)}
          onBlur={handleSave}
          onKeyDown={(e) => {
            if (e.key === 'Enter') handleSave();
            if (e.key === 'Escape') handleCancel();
          }}
          className="flex-1 px-2 py-1 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </li>
    );
  }

  return (
    <li className="flex gap-3 p-3 bg-gray-50 rounded-lg items-center hover:bg-gray-100 transition">
      <input
        type="checkbox"
        checked={todo.completed}
        onChange={onToggle}
        className="w-5 h-5 text-blue-500 rounded cursor-pointer"
      />
      <span
        className={`flex-1 ${
          todo.completed
            ? 'line-through text-gray-400'
            : 'text-gray-800'
        }`}
      >
        {todo.text}
      </span>
      <button
        onClick={() => setIsEditing(true)}
        className="text-sm text-blue-500 hover:text-blue-700 transition"
      >
        Edit
      </button>
      <button
        onClick={onDelete}
        className="text-sm text-red-500 hover:text-red-700 transition"
      >
        Delete
      </button>
    </li>
  );
}
