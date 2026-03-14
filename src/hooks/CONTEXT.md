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

## useFilter.js (Updated)
**Purpose:** Filter state management + search + filtering utility.

**API:**
```js
const { filter, setFilter, searchText, setSearchText } = useFilter();
const filtered = filterTodos(todos, filter, searchText);
```

**Hook Returns:**
- `filter`: Current filter string ('all', 'active', 'completed')
- `setFilter(newFilter)`: Update filter state
- `searchText`: Current search query
- `setSearchText(text)`: Update search query

**filterTodos(todos, filter, searchText) Logic:**
- **Filter Step:** Apply filter (all/active/completed)
- **Search Step:** Case-insensitive substring match on task text
- Returns: Filtered and searched todos array

**Initial State:**
- Default filter: 'all'
- Default searchText: '' (empty)
- Use constants from ../utils/constants.js

