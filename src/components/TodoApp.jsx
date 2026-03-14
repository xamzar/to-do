import React, { useState } from 'react';
import TodoInput from './TodoInput';
import TodoSearch from './TodoSearch';
import TodoList from './TodoList';
import TodoFilter from './TodoFilter';
import TodoStats from './TodoStats';
import useTodos from '../hooks/useTodos';
import useFilter from '../hooks/useFilter';

export default function TodoApp() {
  const { todos, addTodo, deleteTodo, toggleTodo, editTodo, setDueDate, setPriority } = useTodos();
  const { filter, setFilter, searchText, setSearchText } = useFilter();

  return (
    <div className="min-h-screen bg-gray-100 py-8 px-4">
      <div className="max-w-2xl mx-auto bg-white rounded-lg shadow-md p-6">
        <h1 className="text-3xl font-bold text-gray-800 mb-6">📝 To-Do List</h1>
        
        <TodoInput onAdd={addTodo} />
        
        <TodoSearch searchText={searchText} onSearchChange={setSearchText} />
        
        <TodoFilter currentFilter={filter} onFilterChange={setFilter} />
        
        <TodoList
          todos={todos}
          onDelete={deleteTodo}
          onToggle={toggleTodo}
          onEdit={editTodo}
          onSetDueDate={setDueDate}
          onSetPriority={setPriority}
          filter={filter}
          searchText={searchText}
        />
        
        <TodoStats todos={todos} />
      </div>
    </div>
  );
}
