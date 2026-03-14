# To-Do List App - Master Documentation

## Executive Summary

A minimal React + Vite to-do list app with add/edit/delete/filter capabilities, localStorage persistence, and Tailwind CSS styling. Currently functional but needs expansion for production readiness.

---

## Current Architecture

### Tech Stack
- **Frontend:** React 18 (hooks)
- **Build Tool:** Vite 5 (fast dev server, instant HMR)
- **Styling:** Tailwind CSS 3 (utility-first)
- **Persistence:** localStorage (client-only)
- **State Management:** React hooks (useState, useEffect)

### Project Structure
```
todo-app-react/
├── src/
│   ├── components/       # UI components (TodoApp, TodoInput, TodoList, etc.)
│   ├── hooks/           # Custom hooks (useTodos, useFilter)
│   ├── utils/           # Helpers (generateId, constants, validation)
│   ├── styles/          # globals.css + Tailwind config
│   └── index.jsx        # React DOM entry point
├── public/              # Static assets
├── index.html           # HTML template
├── package.json         # Dependencies + scripts
├── vite.config.js       # Vite config
├── tailwind.config.js   # Tailwind theming
└── postcss.config.cjs   # PostCSS + Tailwind processing
```

---

## Component Hierarchy

```
TodoApp (root)
├── TodoInput        (add new tasks)
├── TodoFilter       (filter buttons: All / Active / Completed)
├── TodoList
│   └── TodoItem[]   (per-task row with edit/delete/toggle)
└── TodoStats        (total / active / completed counts)
```

### Data Flow

```
useTodos() Hook
├── todos[] state
├── addTodo(text)
├── deleteTodo(id)
├── toggleTodo(id)
├── editTodo(id, newText)
└── localStorage persistence

useFilter() Hook
├── filter state ('all' | 'active' | 'completed')
├── setFilter(filter)
└── filterTodos(todos, filter) utility
```

---

## Current Features

✅ **Core CRUD:**
- Add tasks with validation
- Edit task text inline
- Delete tasks
- Mark complete/incomplete (checkbox toggle)

✅ **Filtering:**
- View all tasks
- View only active (incomplete) tasks
- View only completed tasks

✅ **Persistence:**
- Auto-save to localStorage on every change
- Auto-load on app startup

✅ **UI/UX:**
- Clean, centered card layout
- Responsive design (mobile-friendly via Tailwind)
- Visual feedback (strikethrough on completion, color-coded buttons)
- Stats footer (total / active / completed)

❌ **Missing for Production:**
- Backend API integration
- Multi-user support / authentication
- Cloud sync
- Undo/redo
- Task categories / priorities
- Due dates / reminders
- Task descriptions / notes
- Search functionality
- Drag-to-reorder
- Data export (CSV, JSON)
- Dark mode
- Real-time collaboration

---

## File Breakdown

### Components (`src/components/`)

**TodoApp.jsx** (Root)
- Combines useTodos() and useFilter() hooks
- Renders TodoInput, TodoFilter, TodoList, TodoStats
- Passes state & callbacks down tree

**TodoInput.jsx** (Form)
- Input field + Add button
- Validates non-empty input (isValidTodoText)
- Clears input after submission

**TodoList.jsx** (List Wrapper)
- Filters todos using filterTodos() utility
- Maps over filtered array → TodoItem components
- Shows "No tasks" fallback

**TodoItem.jsx** (Row)
- Checkbox toggle
- Edit mode (click Edit → input field → blur/Enter saves)
- Delete button
- Visual: strikethrough on completion

**TodoFilter.jsx** (Filter Buttons)
- Three buttons: All / Active / Completed
- Highlights current filter (blue bg)
- Calls onFilterChange on click

**TodoStats.jsx** (Footer Stats)
- Calculated from full todos array (not filtered)
- Shows: Total, Active, Completed counts

### Hooks (`src/hooks/`)

**useTodos.js**
- useState: todos array
- useEffect mount: Load from localStorage
- useEffect change: Save to localStorage
- Methods: addTodo, deleteTodo, toggleTodo, editTodo

**useFilter.js**
- useState: filter state
- filterTodos() exported helper function
- Filter logic: all / active / completed

### Utilities (`src/utils/`)

**generateId.js**
- Returns unique ID: `${Date.now()}-${random}`
- Used when creating new tasks

**constants.js**
- FILTER_ALL, FILTER_ACTIVE, FILTER_COMPLETED
- STORAGE_KEY = 'todos'

**validation.js**
- isValidTodoText(text): Checks if non-empty/non-whitespace

### Styles (`src/styles/`)

**globals.css**
- Reset margins/padding
- Base font/colors
- Button/input baseline styles

**Tailwind Integration**
- Utility-first CSS via tailwind.config.js
- PostCSS processes @tailwind directives
- CDN + local build support

---

## Expansion Roadmap

### Phase 1: Core UX Improvements (Week 1)
1. **Drag-to-Reorder Tasks**
   - Add react-beautiful-dnd or react-dnd
   - Persist reordered state to localStorage
   - Visual drag indicator

2. **Task Priorities**
   - Add priority field (Low / Medium / High)
   - Filter/sort by priority
   - Color-code by priority

3. **Due Dates**
   - Date picker component (e.g., react-datepicker)
   - Show overdue badge
   - Sort by due date option

4. **Search**
   - Search input in header
   - Filter todos by text match
   - Case-insensitive

5. **Dark Mode Toggle**
   - Switch theme button
   - Persist preference to localStorage
   - Use Tailwind dark: classes

---

### Phase 2: Advanced Features (Week 2)
1. **Task Categories / Tags**
   - Add category field to task data
   - Category dropdown or tag input
   - Filter by category
   - Color-coded tags

2. **Task Descriptions / Notes**
   - Optional description field (expandable)
   - Edit description inline or in modal
   - Show preview on list view

3. **Undo/Redo**
   - Track action history (add, delete, edit, toggle)
   - Undo/Redo buttons or hotkeys (Ctrl+Z / Ctrl+Y)
   - Use a history context or custom hook

4. **Subtasks**
   - Parent-child task relationships
   - Collapsible subtask lists
   - Mark subtasks complete independently

5. **Recurring Tasks**
   - Frequency field (daily, weekly, monthly)
   - Auto-generate next occurrence on completion
   - Show next due date

---

### Phase 3: Data Management (Week 3)
1. **Bulk Actions**
   - Select multiple tasks (checkboxes)
   - Bulk delete / mark complete / change priority
   - Select all / clear selection

2. **Data Export**
   - Export to JSON (full backup)
   - Export to CSV (spreadsheet)
   - Download button in settings

3. **Data Import**
   - Import from JSON file
   - Merge with existing tasks or replace
   - Validation & error handling

4. **Settings Page**
   - Theme (light/dark/auto)
   - Default sort order
   - Items per page / infinite scroll
   - Clear all data button

5. **Archive / Trash**
   - Soft delete (move to archive)
   - Archive tab to view completed tasks
   - Restore from archive
   - Permanent delete option

---

### Phase 4: Backend & Sync (Week 4)
1. **API Integration**
   - Connect to backend (Node/Express, Django, etc.)
   - REST endpoints: GET, POST, PUT, DELETE /tasks
   - Async state management (Context or Redux)

2. **Authentication**
   - User registration & login
   - JWT token management
   - Protected routes

3. **Multi-Device Sync**
   - Sync todos across devices
   - Real-time updates via WebSocket
   - Conflict resolution (last-write-wins or merge logic)

4. **Cloud Storage**
   - Upload to cloud (AWS S3, Google Drive, Dropbox)
   - Automatic backup scheduling

5. **Notifications**
   - Browser notifications for due/overdue tasks
   - Email reminders (backend job)
   - Push notifications (PWA)

---

### Phase 5: Advanced Features (Optional)
1. **Collaboration**
   - Share task lists with other users
   - Real-time multi-user editing
   - Comments/discussion on tasks

2. **AI Features**
   - Smart suggestions (auto-categorize, deduplicate)
   - Priority prediction
   - Natural language parsing ("Buy milk tomorrow at 9am")

3. **Mobile App**
   - React Native version
   - iOS/Android native apps

4. **Analytics**
   - Productivity metrics (tasks completed per day/week)
   - Charts & insights
   - Time tracking per task

5. **Integration**
   - Calendar sync (Google Calendar, Outlook)
   - Email integration (create task from email)
   - Slack/Discord bots
   - Zapier integration

---

## Implementation Priorities

### Must-Have (MVP Enhancement)
- [ ] Drag-to-reorder
- [ ] Due dates
- [ ] Search
- [ ] Dark mode

### Should-Have (Phase 2)
- [ ] Categories/tags
- [ ] Task descriptions
- [ ] Undo/redo
- [ ] Bulk actions

### Nice-to-Have
- [ ] Backend sync
- [ ] Collaboration
- [ ] Mobile app
- [ ] Analytics

---

## Dependencies to Add

### Phase 1 Packages
```json
{
  "react-beautiful-dnd": "^13.1.1",      // Drag-and-drop
  "react-datepicker": "^4.16.0",         // Date picker
  "lucide-react": "^0.263.1"             // Icons library
}
```

### Phase 2 Packages
```json
{
  "zustand": "^4.4.1",                   // State management (lighter than Redux)
  "react-modal": "^3.16.1"               // Modal dialogs
}
```

### Phase 3 Packages
```json
{
  "papaparse": "^5.4.1"                  // CSV parsing/generation
}
```

### Phase 4 Packages
```json
{
  "axios": "^1.6.0",                     // HTTP client
  "jwt-decode": "^4.0.0",                // Decode JWT tokens
  "react-router-dom": "^6.15.0"          // Client-side routing
}
```

---

## Development Milestones

### Week 1: UX Polish
- Implement drag-to-reorder (Kanban-style)
- Add due dates + date picker
- Add task priorities (color-coded)
- Implement search functionality
- Add dark mode toggle

**Estimated:** 20-30 hours

### Week 2: Advanced Features
- Add task categories/tags
- Implement task descriptions (expandable)
- Build undo/redo system
- Add subtask support
- Recurring task logic

**Estimated:** 25-35 hours

### Week 3: Data Management
- Bulk selection/actions
- CSV + JSON export/import
- Settings page (theme, preferences)
- Archive/trash system

**Estimated:** 15-20 hours

### Week 4+: Backend & Scaling
- Design REST API schema
- Implement backend (Node.js + MongoDB / PostgreSQL)
- Add authentication (JWT)
- Sync logic + WebSocket real-time updates
- Deploy to production

**Estimated:** 40-50+ hours (backend heavy)

---

## Testing Strategy

### Unit Tests (Jest + React Testing Library)
```
src/__tests__/
├── components/
├── hooks/
└── utils/
```

### Integration Tests
- User workflows (add → edit → complete → delete)
- localStorage persistence
- Filter state transitions

### E2E Tests (Cypress or Playwright)
- Full app user flows
- Cross-browser testing
- Performance benchmarks

---

## Performance Considerations

### Current
- localStorage limit ~5-10MB (fine for most users)
- Re-renders optimized with hooks + memoization

### Future
- Virtualization for large task lists (1000+) → react-window
- Pagination or infinite scroll
- Service Worker for offline-first PWA
- IndexedDB for larger datasets

---

## Security Notes

### Current
- No backend = no auth needed
- localStorage only (browser-only, not transferable)
- XSS protection: React auto-escapes JSX

### Future
- Input sanitization (DOMPurify)
- CSRF protection on API
- Rate limiting
- Secure token storage (httpOnly cookies)
- Encryption for sensitive fields

---

## Next Steps

1. **Test current app** in browser (create, edit, delete, filter, refresh)
2. **Pick Phase 1 feature** to implement first (recommend: drag-to-reorder or due dates)
3. **Add tests** for new features
4. **Deploy** to Vercel/Netlify
5. **Gather user feedback** and iterate
6. **Plan backend** architecture once feature set stabilizes
