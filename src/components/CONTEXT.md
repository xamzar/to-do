# Components - Context & Implementation Guide (Updated)

## Overview
Build modular, reusable React components here. Each component is self-contained and receives data via props.

## TodoApp.jsx
**Purpose:** Root component managing entire app state.

**Responsibilities:**
- Maintains tasks array state (id, text, completed, dueDate, priority)
- Maintains filter state (all/active/completed)
- Manages callbacks: addTodo, deleteTodo, toggleTodo, editTodo, setDueDate, setPriority

**Props:** None (root component)

**State:**
- `todos`: Array of task objects with dueDate and priority fields
- `filter`: Current active filter

**Children:** TodoInput, TodoFilter, TodoList, TodoStats

---

## TodoInput.jsx
**Purpose:** Form for adding new tasks with optional due date.

**Props:**
- `onAdd(text, dueDate)`: Callback fired when task is added

**State:**
- `input`: Current input field value
- `dueDate`: Selected due date (null or Date object)

**Features:**
- Text input + Add button
- Date picker (optional, minDate = today)
- Validates non-empty input
- Clears both fields after submission

**Dependencies:** react-datepicker, lucide-react (Calendar icon)

---

## TodoList.jsx
**Purpose:** Render filtered list of tasks.

**Props:**
- `todos`: Array of all tasks
- `onDelete(id)`: Delete a task
- `onToggle(id)`: Mark complete/incomplete
- `onEdit(id, newText)`: Edit task text
- `onSetDueDate(id, date)`: Set task due date
- `onSetPriority(id, priority)`: Set task priority
- `filter`: Current filter ('all', 'active', 'completed')

**Behavior:**
- Filter todos using filterTodos() utility
- Show "No tasks" fallback if empty
- Render TodoItem for each filtered task
- Pass all callbacks to TodoItem

---

## TodoItem.jsx
**Purpose:** Single task row with inline actions and details.

**Props:**
- `todo`: Task object {id, text, completed, dueDate, priority}
- `onDelete()`: Delete callback
- `onToggle()`: Complete toggle callback
- `onEdit(newText)`: Edit callback
- `onSetDueDate(date)`: Set due date callback
- `onSetPriority(priority)`: Set priority callback

**State:**
- `isEditing`: Boolean for edit mode
- `editText`: Current edit input value
- `showDatePicker`: Toggle inline date picker

**Features:**
- Checkbox toggle (strikethrough on completion)
- Edit mode (click Edit button → input field)
- Inline date picker (click Calendar icon)
- Priority badge (low/medium/high color-coded)
- Due date display with status (overdue/today/upcoming)
- Delete button

**Due Date Styling:**
- Overdue: Red background + "overdue" label
- Today: Blue background + "today" label
- Upcoming: Gray background
- Completed: No color (grayed out)

---

## TodoFilter.jsx
**Purpose:** Filter selector buttons.

**Props:**
- `currentFilter`: Current active filter string
- `onFilterChange(filter)`: Callback to change filter

**Behavior:**
- Three buttons: All, Active, Completed
- Highlight active filter (blue bg)
- Inactive buttons gray
- Clicking changes filter

---

## TodoStats.jsx
**Purpose:** Display task statistics.

**Props:**
- `todos`: Full array of tasks

**Calculations:**
- Total: todos.length
- Completed: todos.filter(t => t.completed).length
- Active: total - completed
- Overdue: todos.filter(t => isOverdue(t.dueDate, t.completed)).length

**Display:** Four stat values in footer row
