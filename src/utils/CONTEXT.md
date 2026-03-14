# Utils - Context & Implementation Guide (Updated)

## Overview
Utilities provide reusable functions and constants used across the app.

---

## dateUtils.js (NEW)
**Purpose:** Helpers for task due dates.

**Exports:**
```js
export function formatDate(date) → "MMM DD, YYYY"
export function isToday(date) → boolean
export function isOverdue(date, completed) → boolean
export function getDueDateStatus(date, completed) → "overdue" | "today" | "upcoming" | "completed" | "none"
export function getDueDateColor(status) → "text-red-600 bg-red-50" | etc.
```

**Usage:**
- TodoItem displays due dates with status colors
- Validate overdue tasks
- Format dates for UI display

---

## generateId.js
**Purpose:** Create unique identifiers for tasks.

**Export:**
- Default export: `generateId()` function

**Implementation:**
- Format: `"${Date.now()}-${random}"`
- Ensures uniqueness even if multiple tasks added in same millisecond

---

## constants.js (Updated)
**Purpose:** Centralize constant values.

**Exports:**
```js
export const FILTER_ALL = 'all';
export const FILTER_ACTIVE = 'active';
export const FILTER_COMPLETED = 'completed';
export const STORAGE_KEY = 'todos';

export const DUE_OVERDUE = 'overdue';
export const DUE_TODAY = 'today';
export const DUE_UPCOMING = 'upcoming';
export const DUE_NONE = 'none';
```

**New:** Due date status constants

---

## validation.js
**Purpose:** Input validation utilities.

**Exports:**
```js
export function isValidTodoText(text) → boolean
```

**Logic:**
- Return false if text is falsy or only whitespace
- Return true if text has at least 1 visible character

**Usage:**
- TodoInput: Before calling onAdd()
- TodoItem: Before saving edited text
