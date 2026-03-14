# Components - Context & Implementation Guide

## Overview
Build modular, reusable React components here. Each component is self-contained and receives data via props.

## TodoApp.jsx
**Purpose:** Root component managing entire app state.

**Responsibilities:**
- Maintains tasks array state (id, text, completed)
- Maintains filter state (all/active/completed)
- Manages callbacks: addTodo, deleteTodo, toggleTodo, editTodo

**Props:** None (root component)

**State:**
- `todos`: Array of task objects
- `filter`: Current active filter

**Children:** TodoInput, TodoFilter, TodoList, TodoStats

**Key Methods:**
- Pass useTodos and useFilter hooks to manage state
- Render centered card layout using Tailwind

---

## TodoInput.jsx
**Purpose:** Form for adding new tasks.

**Props:**
- `onAdd(text)`: Callback fired when task is added

**State:**
- `input`: Current input field value

**Behavior:**
- Text input + submit button
- Clear input after successful submission
- Validate input is not empty
- Only submit on Enter or button click

**Styling:** Input with focus ring, blue submit button

---

## TodoList.jsx
**Purpose:** Render filtered list of tasks.

**Props:**
- `todos`: Array of all tasks
- `onDelete(id)`: Delete a task
- `onToggle(id)`: Mark complete/incomplete
- `onEdit(id, newText)`: Edit task text
- `filter`: Current filter ('all', 'active', 'completed')

**Behavior:**
- Filter todos based on filter prop using filterTodos()
- Show "No tasks to show" message if list is empty
- Render TodoItem for each filtered task
- Pass callbacks to each TodoItem

---

## TodoItem.jsx
**Purpose:** Single task row with actions.

**Props:**
- `todo`: Task object {id, text, completed}
- `onDelete()`: Delete callback
- `onToggle()`: Complete toggle callback
- `onEdit(newText)`: Edit callback

**State:**
- `isEditing`: Boolean toggle for edit mode
- `editText`: Current edit input value

**Behavior:**
- Display: checkbox | task text | Edit button | Delete button
- Clicking checkbox toggles completion (visual: strikethrough + gray)
- Edit button enters edit mode (input field replaces text)
- On blur or Enter, save edit
- On Escape, cancel edit
- Auto-focus input field when entering edit mode

---

## TodoFilter.jsx
**Purpose:** Filter selector buttons.

**Props:**
- `currentFilter`: Current active filter string
- `onFilterChange(filter)`: Callback to change filter

**Behavior:**
- Three buttons: All, Active, Completed
- Highlight active filter with blue background
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

**Display:** Three stat values in footer row
