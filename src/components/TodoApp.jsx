import React, { useState } from 'react';
import TodoInput from './TodoInput';
import TodoSearch from './TodoSearch';
import TodoList from './TodoList';
import TodoFilter from './TodoFilter';
import TodoStats from './TodoStats';
import ThemeToggle from './ThemeToggle';
import useTodos from '../hooks/useTodos';
import useFilter from '../hooks/useFilter';
import useTheme from '../hooks/useTheme';

export default function TodoApp() {
  const {
    todos,
    categories,
    addTodo,
    deleteTodo,
    toggleTodo,
    editTodo,
    setDueDate,
    setPriority,
    setCategory,
    addCategory,
    removeCategory,
  } = useTodos();
  const { filter, setFilter, searchText, setSearchText } = useFilter();
  const { theme, toggleTheme } = useTheme();

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 py-8 px-4 transition">
      <ThemeToggle theme={theme} onToggle={toggleTheme} />
      
      <div className="max-w-2xl mx-auto bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 transition">
        <h1 className="text-3xl font-bold text-gray-800 dark:text-white mb-6">📝 To-Do List</h1>
        
        <TodoInput onAdd={addTodo} categories={categories} />
        
        <TodoSearch searchText={searchText} onSearchChange={setSearchText} />
        
        <TodoFilter currentFilter={filter} onFilterChange={setFilter} />
        
        <TodoList
          todos={todos}
          onDelete={deleteTodo}
          onToggle={toggleTodo}
          onEdit={editTodo}
          onSetDueDate={setDueDate}
          onSetPriority={setPriority}
          onSetCategory={setCategory}
          filter={filter}
          searchText={searchText}
          categories={categories}
        />
        
        <TodoStats todos={todos} />
      </div>
    </div>
  );
}
