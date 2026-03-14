# Hooks - Context & Implementation Guide

## Overview
Custom React hooks encapsulate state and side-effect logic, keeping components clean.

---

## useTodos.js
**Purpose:** Centralized todo management with localStorage persistence.

**API:**
```js
const { todos, addTodo, deleteTodo, toggleTodo, editTodo } = useTodos();
```

**Returned State & Methods:**
- `todos`: Array of task objects [{id, text, completed}, ...]
- `addTodo(text)`: Add new task with unique id
- `deleteTodo(id)`: Remove task by id
- `toggleTodo(id)`: Toggle completed status
- `editTodo(id, newText)`: Update task text

**Data Structure:**
```js
{
  id: "string (unique, timestamp + random)",
  text: "Task description",
  completed: boolean
}
```

**Persistence:**
- On component mount: Load from localStorage using STORAGE_KEY ('todos')
- On todos state change: Save to localStorage
- Handle JSON parse errors gracefully (console.error, don't crash)

**Logic:**
- Use useState for todos array
- Use useEffect to load on mount (empty dependency array)
- Use useEffect to save on todos change (todos dependency)
- Generate unique IDs using generateId()

---

## useFilter.js
**Purpose:** Filter state management + filtering utility.

**API:**
```js
const { filter, setFilter } = useFilter();
const filtered = filterTodos(todos, filter);
```

**Exported Items:**
- Default export: Hook function
- Named export: `filterTodos(todos, filter)` utility function

**Hook Returns:**
- `filter`: Current filter string ('all', 'active', 'completed')
- `setFilter(newFilter)`: Update filter state

**filterTodos() Logic:**
- Input: todos array, filter string
- Output: Filtered todos array
- Rules:
  - 'all': Return all todos
  - 'active': Return only todos where completed === false
  - 'completed': Return only todos where completed === true
- Default to 'all' if filter is invalid

**Initial State:**
- Default filter: 'all'
- Use constants from ../utils/constants.js (FILTER_ALL, FILTER_ACTIVE, FILTER_COMPLETED)

**Integration:**
- TodoList uses filterTodos() to display correct subset
- TodoFilter allows changing filter via setFilter
- Stats calculated on full todos array (not filtered)
