import { useState, useEffect } from 'react';
import { STORAGE_KEY } from '../utils/constants';
import generateId from '../utils/generateId';

const DEFAULT_CATEGORIES = ['Work', 'Personal', 'Shopping', 'Health'];

export default function useTodos() {
  const [todos, setTodos] = useState([]);
  const [categories, setCategories] = useState(DEFAULT_CATEGORIES);

  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    const storedCats = localStorage.getItem('categories');
    
    if (stored) {
      try {
        setTodos(JSON.parse(stored));
      } catch (e) {
        console.error('Failed to parse stored todos', e);
      }
    }
    
    if (storedCats) {
      try {
        setCategories(JSON.parse(storedCats));
      } catch (e) {
        console.error('Failed to parse stored categories', e);
      }
    }
  }, []);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(todos));
  }, [todos]);

  useEffect(() => {
    localStorage.setItem('categories', JSON.stringify(categories));
  }, [categories]);

  const addTodo = (text, dueDate = null, category = null) => {
    const newTodo = {
      id: generateId(),
      text,
      completed: false,
      dueDate,
      priority: 'medium',
      category,
    };
    setTodos([...todos, newTodo]);
  };

  const deleteTodo = (id) => {
    setTodos(todos.filter((t) => t.id !== id));
  };

  const toggleTodo = (id) => {
    setTodos(
      todos.map((t) =>
        t.id === id ? { ...t, completed: !t.completed } : t
      )
    );
  };

  const editTodo = (id, newText) => {
    setTodos(
      todos.map((t) =>
        t.id === id ? { ...t, text: newText } : t
      )
    );
  };

  const setDueDate = (id, dueDate) => {
    setTodos(
      todos.map((t) =>
        t.id === id ? { ...t, dueDate } : t
      )
    );
  };

  const setPriority = (id, priority) => {
    setTodos(
      todos.map((t) =>
        t.id === id ? { ...t, priority } : t
      )
    );
  };

  const setCategory = (id, category) => {
    setTodos(
      todos.map((t) =>
        t.id === id ? { ...t, category } : t
      )
    );
  };

  const addCategory = (name) => {
    if (!categories.includes(name)) {
      setCategories([...categories, name]);
    }
  };

  const removeCategory = (name) => {
    setCategories(categories.filter((c) => c !== name));
    // Remove category from todos
    setTodos(
      todos.map((t) =>
        t.category === name ? { ...t, category: null } : t
      )
    );
  };

  return {
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
  };
}


