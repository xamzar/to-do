# Components

Build modular, reusable React components here.

## Components to Build

### TodoApp.jsx
**Prompt:** Create the root component that manages the app's state (tasks, filter). Use useState to hold an array of task objects with id, text, completed. Include a title and render TodoInput and TodoList subcomponents.

### TodoInput.jsx
**Prompt:** Create an input form component. Takes `onAdd` callback. Has an input field and "Add Task" button. Clear input after submission. Validate that input is not empty.

### TodoList.jsx
**Prompt:** Create a list component that renders tasks. Takes `tasks` array, `onDelete`, `onToggle`, `onEdit`, and `filter` as props. Filter tasks based on filter prop (all/active/completed). Render TodoItem for each task.

### TodoItem.jsx
**Prompt:** Create a single task item component. Shows task text, checkbox to toggle completion, edit button, delete button. On edit, replace text with an input field. On blur or Enter, save edit or cancel.

### TodoFilter.jsx
**Prompt:** Create a filter selector. Takes `currentFilter` and `onFilterChange` props. Shows three buttons: All, Active, Completed. Highlight the active filter.

### TodoStats.jsx
**Prompt:** Create a stats footer. Shows total tasks, completed count, active count. Pass tasks array as prop.
