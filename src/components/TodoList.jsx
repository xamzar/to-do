import React from 'react';
import TodoItem from './TodoItem';
import { filterTodos } from '../hooks/useFilter';

export default function TodoList({ todos, onDelete, onToggle, onEdit, filter }) {
  const filtered = filterTodos(todos, filter);

  return (
    <ul className="space-y-2 mb-6">
      {filtered.length === 0 ? (
        <li className="text-gray-400 text-center py-8">No tasks to show</li>
      ) : (
        filtered.map((todo) => (
          <TodoItem
            key={todo.id}
            todo={todo}
            onDelete={() => onDelete(todo.id)}
            onToggle={() => onToggle(todo.id)}
            onEdit={(newText) => onEdit(todo.id, newText)}
          />
        ))
      )}
    </ul>
  );
}
