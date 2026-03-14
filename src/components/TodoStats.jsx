import React from 'react';

export default function TodoStats({ todos }) {
  const completed = todos.filter((t) => t.completed).length;
  const active = todos.length - completed;

  return (
    <div className="flex justify-between text-sm text-gray-600 pt-4 border-t border-gray-200">
      <span>Total: {todos.length}</span>
      <span>Active: {active}</span>
      <span>Completed: {completed}</span>
    </div>
  );
}
