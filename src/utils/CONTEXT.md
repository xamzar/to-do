# Utils - Context & Implementation Guide

## Overview
Utilities provide reusable functions and constants used across the app.

---

## generateId.js
**Purpose:** Create unique identifiers for tasks.

**Export:**
- Default export: `generateId()` function

**Function Signature:**
```js
generateId() → string
```

**Implementation:**
- Combine `Date.now()` (millisecond timestamp) with `Math.random()` 
- Format: `"<timestamp>-<random>"` (e.g., "1234567890123-abc123")
- Ensures uniqueness even if multiple tasks added in same millisecond

**Usage:**
```js
const id = generateId(); // "1234567890123-abc123"
```

---

## constants.js
**Purpose:** Centralize constant values used throughout the app.

**Exports:**
```js
export const FILTER_ALL = 'all';
export const FILTER_ACTIVE = 'active';
export const FILTER_COMPLETED = 'completed';
export const STORAGE_KEY = 'todos';
```

**Usage:**
- Import in useFilter.js, useFilter callbacks, storage operations
- Avoid string literals; use constants for consistency
- Easy to update across entire app from one place

**Values:**
- Filter constants: Used in filter state, filter buttons, filterTodos()
- Storage key: localStorage key name for task persistence

---

## validation.js
**Purpose:** Input validation utilities.

**Exports:**
```js
export function isValidTodoText(text) {
  // Check if text is not empty and not just whitespace
  return text && text.trim().length > 0;
}
```

**Function Signature:**
```js
isValidTodoText(text: string) → boolean
```

**Logic:**
- Return false if text is falsy (null, undefined, empty string)
- Return false if text is only whitespace (after trim)
- Return true if text has at least 1 visible character

**Usage:**
- TodoInput: Before calling onAdd()
- TodoItem: Before saving edited text (on blur/Enter)
- Prevents empty tasks from being added or saved
