# Hooks

Custom React hooks for reusable logic.

## Hooks to Build

### useTodos.js
**Prompt:** Create a custom hook that manages todo state and localStorage persistence. Returns `todos`, `addTodo`, `deleteTodo`, `toggleTodo`, `editTodo`. On mount, load todos from localStorage. On state change, save to localStorage. Each todo has id (unique), text, completed (boolean).

### useFilter.js
**Prompt:** Create a custom hook for managing filter state. Returns `filter` and `setFilter`. Accepts 'all', 'active', or 'completed'. Provide a helper function `filterTodos(todos, filter)` that returns filtered array.
