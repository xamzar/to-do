import React, { useEffect, useState } from 'react';
import TodoInput from './TodoInput';
import TodoSearch from './TodoSearch';
import TodoList from './TodoList';
import TodoFilter from './TodoFilter';
import TodoStats from './TodoStats';
import ThemeToggle from './ThemeToggle';
import HistoryControls from './HistoryControls';
import BulkActions from './BulkActions';
import useTodos from '../hooks/useTodos';
import useFilter from '../hooks/useFilter';
import useTheme from '../hooks/useTheme';
import useHistory from '../hooks/useHistory';

export default function TodoApp() {
  const {
    todos,
    categories,
    addTodo,
    deleteTodo,
    toggleTodo,
    editTodo,
    setDescription,
    setDueDate,
    setPriority,
    setCategory,
  } = useTodos();

  const { filter, setFilter, searchText, setSearchText } = useFilter();
  const { theme, toggleTheme } = useTheme();
  const { state: todosSnapshot, updateState: updateSnapshot, undo, redo, canUndo, canRedo } = useHistory(todos);
  
  const [selected, setSelected] = useState(new Set());

  // Update snapshot whenever todos change
  useEffect(() => {
    updateSnapshot(todos);
  }, [todos]);

  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 'z') {
        e.preventDefault();
        undo();
      }
      if ((e.ctrlKey || e.metaKey) && e.key === 'y') {
        e.preventDefault();
        redo();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [undo, redo]);

  // Bulk actions
  const toggleSelect = (id) => {
    const newSelected = new Set(selected);
    if (newSelected.has(id)) {
      newSelected.delete(id);
    } else {
      newSelected.add(id);
    }
    setSelected(newSelected);
  };

  const selectAll = () => {
    setSelected(new Set(todos.map((t) => t.id)));
  };

  const clearSelection = () => {
    setSelected(new Set());
  };

  const deleteSelected = () => {
    selected.forEach((id) => deleteTodo(id));
    setSelected(new Set());
  };

  const completeSelected = () => {
    selected.forEach((id) => {
      const todo = todos.find((t) => t.id === id);
      if (todo && !todo.completed) {
        toggleTodo(id);
      }
    });
  };

  const setCategoryBulk = (category) => {
    selected.forEach((id) => setCategory(id, category));
    setSelected(new Set());
  };

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 py-8 px-4 transition">
      <ThemeToggle theme={theme} onToggle={toggleTheme} />
      
      <div className="max-w-2xl mx-auto bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 transition">
        <h1 className="text-3xl font-bold text-gray-800 dark:text-white mb-6">📝 To-Do List</h1>
        
        <HistoryControls canUndo={canUndo} canRedo={canRedo} onUndo={undo} onRedo={redo} />
        
        <TodoInput onAdd={addTodo} categories={categories} />
        
        <TodoSearch searchText={searchText} onSearchChange={setSearchText} />
        
        <TodoFilter currentFilter={filter} onFilterChange={setFilter} />
        
        <BulkActions
          selectedCount={selected.size}
          totalCount={todos.length}
          onSelectAll={selectAll}
          onClearSelection={clearSelection}
          onDeleteSelected={deleteSelected}
          onCompleteSelected={completeSelected}
          onSetCategoryBulk={setCategoryBulk}
          categories={categories}
        />
        
        <TodoList
          todos={todos}
          selected={selected}
          onSelect={toggleSelect}
          onDelete={deleteTodo}
          onToggle={toggleTodo}
          onEdit={editTodo}
          onSetDueDate={setDueDate}
          onSetPriority={setPriority}
          onSetCategory={setCategory}
          onSetDescription={setDescription}
          filter={filter}
          searchText={searchText}
          categories={categories}
        />
        
        <TodoStats todos={todos} />
      </div>
    </div>
  );
}
