# Configuration Files - Context & Implementation Guide

## Overview
Build and development configuration files for the React + Vite project.

---

## package.json
**Purpose:** Project metadata and dependency management.

**Key Fields:**
- `name`: "todo-app-react"
- `version`: "1.0.0"
- `type`: "module" (ES modules, required for Vite + modern JavaScript)
- `private`: true (npm registry not needed)

**Scripts:**
- `dev`: `vite` → Start dev server on localhost:3000
- `build`: `vite build` → Create optimized production build (dist/)
- `preview`: `vite preview` → Preview production build locally

**Dependencies:**
- `react`: ^18.2.0 (React library)
- `react-dom`: ^18.2.0 (DOM binding for React)

**DevDependencies:**
- `vite`: ^5.0.0 (Build tool & dev server)
- `@vitejs/plugin-react`: ^4.0.0 (React + JSX support for Vite)
- `tailwindcss`: ^3.3.0 (Utility-first CSS)
- `postcss`: ^8.4.31 (CSS transformation tool)
- `autoprefixer`: ^10.4.16 (Add vendor prefixes for browser compatibility)

**Funding:** Some packages have optional funding; run `npm fund` to see details.

---

## vite.config.js
**Purpose:** Configure Vite bundler and dev server.

**Configuration:**
- `plugins`: [react()] → Enable React + JSX support
- `server.port`: 3000 → Dev server runs on port 3000
- `server.open`: true → Auto-open browser on `npm run dev`
- `root`: '.' → Serve from project root (where index.html is)

**Why Vite?**
- Extremely fast dev server (instant HMR - hot module replacement)
- Lightning-fast builds
- Native ES modules
- Built-in Tailwind support

---

## tailwind.config.js
**Purpose:** Customize Tailwind CSS behavior.

**Configuration:**
- `content`: Paths to scan for class names
  - './index.html' → Scan HTML file
  - './src/**/*.{js,jsx}' → Scan all React components
- `theme.extend`: Customize or extend default theme (minimal here)
- `plugins`: Array of Tailwind plugins (empty for basic setup)

**How It Works:**
- Tailwind scans files for className="..." patterns
- Generates CSS for only used classes (tree-shaken)
- Result: Tiny production CSS bundle

---

## postcss.config.cjs
**Purpose:** Configure PostCSS processors (CSS transformations).

**Plugins:**
- `tailwindcss`: Process @tailwind directives, generate utility classes
- `autoprefixer`: Add vendor prefixes (-webkit-, -moz-, etc.)

**Why CommonJS (.cjs)?**
- package.json has `"type": "module"` (ES modules)
- PostCSS config needs CommonJS syntax
- Renaming to .cjs tells Node: "This is CommonJS, not ES module"

---

## .gitignore
**Purpose:** Tell Git which files to ignore (not commit).

**Patterns:**
- `node_modules/` → Dependency directory (huge, not needed in repo)
- `dist/` → Production build (regenerated via `npm run build`)
- `.env*` → Environment secrets (API keys, tokens)
- `.DS_Store` → macOS metadata
- `*.log` → Log files
- Editor/IDE files: `.idea/`, `.vscode/`, `*.swp`

**Why?**
- Keeps repo lean (no build artifacts or dependencies)
- Prevents accidental secret commits
- Faster clone/push/pull
- Different developers can use different editors

---

## Development Workflow

### First Time Setup
```bash
npm install           # Install dependencies
npm run dev          # Start dev server (http://localhost:3000)
```

### During Development
- Vite watches files for changes
- HMR (Hot Module Replacement) updates browser instantly
- No manual refresh needed

### Production Build
```bash
npm run build        # Create optimized dist/ folder
npm run preview      # Preview production build locally
```

### Deployment
- Copy `dist/` folder to static hosting
- Works on Netlify, Vercel, GitHub Pages, etc.
