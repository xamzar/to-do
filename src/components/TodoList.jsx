import React from 'react';
import TodoItem from './TodoItem';
import { filterTodos } from '../hooks/useFilter';

export default function TodoList({
  todos,
  onDelete,
  onToggle,
  onEdit,
  onSetDueDate,
  onSetPriority,
  onSetCategory,
  filter,
  searchText,
  categories,
}) {
  const filtered = filterTodos(todos, filter, searchText);

  return (
    <ul className="space-y-2 mb-6">
      {filtered.length === 0 ? (
        <li className="text-gray-400 dark:text-gray-500 text-center py-8">
          {todos.length === 0 ? 'No tasks yet. Add one to get started!' : 'No tasks match your search.'}
        </li>
      ) : (
        filtered.map((todo) => (
          <TodoItem
            key={todo.id}
            todo={todo}
            onDelete={() => onDelete(todo.id)}
            onToggle={() => onToggle(todo.id)}
            onEdit={(newText) => onEdit(todo.id, newText)}
            onSetDueDate={(date) => onSetDueDate(todo.id, date)}
            onSetPriority={(priority) => onSetPriority(todo.id, priority)}
            onSetCategory={(category) => onSetCategory(todo.id, category)}
            categories={categories}
          />
        ))
      )}
    </ul>
  );
}
