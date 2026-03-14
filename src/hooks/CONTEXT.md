# Hooks - Context & Implementation Guide (Updated)

## Overview
Custom React hooks encapsulate state and side-effect logic, keeping components clean.

---

## useTodos.js
**Purpose:** Centralized todo management with localStorage persistence.

**API:**
```js
const { todos, addTodo, deleteTodo, toggleTodo, editTodo, setDueDate, setPriority } = useTodos();
```

**Returned State & Methods:**
- `todos`: Array of task objects
- `addTodo(text, dueDate)`: Add new task with optional due date
- `deleteTodo(id)`: Remove task by id
- `toggleTodo(id)`: Toggle completed status
- `editTodo(id, newText)`: Update task text
- `setDueDate(id, dueDate)`: Set due date (ISO string or null)
- `setPriority(id, priority)`: Set priority ('low', 'medium', 'high')

**Data Structure:**
```js
{
  id: "timestamp-random",
  text: "Task description",
  completed: boolean,
  dueDate: "YYYY-MM-DD" or null,
  priority: "low" | "medium" | "high"
}
```

**Persistence:**
- Mount: Load from localStorage
- Change: Save to localStorage
- Handle JSON parse errors gracefully

---

## useFilter.js
**Purpose:** Filter state management + filtering utility.

**API:**
```js
const { filter, setFilter } = useFilter();
const filtered = filterTodos(todos, filter);
```

**Hook Returns:**
- `filter`: Current filter string ('all', 'active', 'completed')
- `setFilter(newFilter)`: Update filter state

**filterTodos() Logic:**
- 'all': Return all todos
- 'active': Return only todos where completed === false
- 'completed': Return only todos where completed === true

**Initial State:**
- Default filter: 'all'
- Use constants from ../utils/constants.js
