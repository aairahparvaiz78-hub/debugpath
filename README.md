# DebugPath

A responsive React and Vite prototype for an adaptive debugging practice platform. It includes a redesigned landing page, learner workspace, practice lab, adaptive learning path, mistake notebook, analytics, achievements, settings, and sign-in screens.

## Run in VS Code

1. Install Node.js 18 or newer.
2. Extract this folder and open `debugpath-starter` in VS Code.
3. Open a terminal in the folder containing `package.json` and run:

   ```bash
   npm install
   npm run dev
   ```

4. Open the local address Vite prints, usually `http://localhost:5173`.

Do not open `index.html` by double-clicking it; use the Vite address.

## Pages

- `/` — new product landing page
- `/login`, `/signup` — demo sign-in and registration screens
- `/dashboard` — progress overview and adaptive recommendation
- `/practice` — sample debugging workbench with feedback and test-style checks
- `/learning-path` — beginner to advanced challenge progression
- `/mistakes` — saved incorrect attempts, categories, hints, and solutions
- `/analytics` — local attempt and topic signals
- `/achievements` — milestone badges
- `/settings` — local profile and practice preferences

## What works in this prototype

- Attempts, solved challenges, practice days, and mistakes persist in browser `localStorage`.
- The recommendation engine prioritizes an unlocked challenge in topics with repeated misses.
- The practice assistant classifies the five bundled sample challenges, points to a likely error line, gives a hint, and reveals a solution only when requested.
- Learning path unlocks challenges as earlier stages are completed; achievements update from practice history.

## Prototype limits

The current practice checks are rule-based checks for the included examples. They do **not** execute arbitrary Python. Before adding user-submitted code execution, connect a backend to a sandboxed runner such as Judge0; do not put an execution-service secret key in the browser. Login, signup, email reminders, and account security are also demo screens and are not connected to a real account service.

## Main structure

```text
src/
  App.jsx                 Routes
  components.jsx          Shared navigation and components
  learning.js             Challenge bank, local progress, and adaptive rules
  styles.css              Original base styles
  pro-theme.css           New graphite, ivory, and lime visual system
  pages/                  One file per page
public/
  debug-ribbon.svg         Original illustration asset
```
