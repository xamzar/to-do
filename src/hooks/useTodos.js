import { useState, useEffect } from 'react';
import { STORAGE_KEY } from '../utils/constants';
import generateId from '../utils/generateId';

export default function useTodos() {
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      try {
        setTodos(JSON.parse(stored));
      } catch (e) {
        console.error('Failed to parse stored todos', e);
      }
    }
  }, []);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(todos));
  }, [todos]);

  const addTodo = (text, dueDate = null) => {
    const newTodo = {
      id: generateId(),
      text,
      completed: false,
      dueDate, // ISO date string or null
      priority: 'medium', // low, medium, high
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

  return { todos, addTodo, deleteTodo, toggleTodo, editTodo, setDueDate, setPriority };
}

