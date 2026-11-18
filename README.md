# DebugPath — Adaptive Debugging Practice Platform

**Learn to debug. Understand your mistakes. Become a better developer.**

DebugPath is a web-based debugging practice platform designed to help developers improve their problem-solving and debugging skills through structured challenges, personalized learning paths, and mistake tracking.

Instead of simply showing the correct answer, DebugPath encourages users to understand why their code fails, learn from repeated mistakes, and gradually improve through practice.

## Overview

DebugPath brings together debugging practice, progress tracking, and adaptive learning in one workspace. It provides a structured environment where learners can work through challenges, review their mistakes, track improvement, and discover what they should practice next.

## Key Features

- **Interactive Practice Lab** — Work through debugging challenges with hints, feedback, and solutions.
- **Adaptive Learning Path** — Progress through challenges from beginner to advanced levels.
- **Mistake Notebook** — Keep track of incorrect attempts, review errors, and understand their solutions.
- **Smart Recommendations** — Get practice suggestions based on topics where mistakes occur repeatedly.
- **Analytics Dashboard** — Monitor solved challenges, practice activity, and learning progress.
- **Achievements** — Track milestones and celebrate learning progress.
- **Personalized Settings** — Manage profile details and practice preferences.

## Pages & Modules

| Page | Description |
|---|---|
| Home | Introduces the platform and its features |
| Login & Signup | Demo authentication screens |
| Dashboard | Displays progress and practice recommendations |
| Practice | Debugging workspace with hints and feedback |
| Learning Path | Structured challenge progression |
| Mistakes | Stores and organizes incorrect attempts |
| Analytics | Displays learning and practice statistics |
| Achievements | Tracks completed milestones |
| Settings | Profile and practice preferences |

## Technology Stack

**Frontend**
- React.js
- JavaScript
- HTML5
- CSS3

**Development Tools & Libraries**
- Vite
- React Router DOM
- Lucide React
- Browser Local Storage

## Getting Started

Follow these steps to run DebugPath locally.

### Prerequisites

Make sure you have installed:

- Node.js (version 18 or newer)
- npm
- Git

### 1. Clone the repository

```bash
git clone https://github.com/aairahparvaiz78-hub/debugpath.git
```

### 2. Navigate to the project folder

```bash
cd debugpath
```

### 3. Install dependencies

```bash
npm install
```

### 4. Start the development server

```bash
npm run dev
```

### 5. Open the application

Open the local URL displayed in your terminal. By default, Vite uses:

```text
http://localhost:5173
```

## Available Scripts

| Command | Purpose |
|---|---|
| `npm run dev` | Starts the development server |
| `npm run build` | Creates a production build |
| `npm run preview` | Previews the production build |

## How It Works

DebugPath uses a collection of sample debugging challenges and rule-based checks to provide feedback.

The platform maintains learning activity in the browser using Local Storage. This allows practice attempts, progress, and mistakes to remain available across browser sessions on the same device.

Its recommendation logic uses repeated mistakes to prioritize relevant unlocked challenges, helping learners focus on areas that need more practice.

## Current Limitations

DebugPath is currently a frontend prototype.

- The practice assistant uses rule-based checks for the included sample challenges.
- It does not currently execute arbitrary user-submitted Python code.
- Login and signup screens are demonstrations and are not connected to a real authentication backend.
- Progress is stored locally in the browser rather than in a cloud database.

## Future Improvements

Some planned areas for further development include:

- Integration of an AI-powered debugging assistant.
- Support for additional programming languages.
- Real-time code execution through a secure sandboxed environment.
- Backend integration for user accounts and cloud-based progress tracking.
- More debugging challenges and personalized recommendations.

## Project Structure

```text
debugpath/
│
├── public/
│
├── src/
│   ├── pages/
│   │   ├── Achievements.jsx
│   │   ├── Analytics.jsx
│   │   ├── Auth.jsx
│   │   ├── Dashboard.jsx
│   │   ├── Home.jsx
│   │   ├── LearningPath.jsx
│   │   ├── Mistakes.jsx
│   │   ├── Practice.jsx
│   │   └── Settings.jsx
│   │
│   ├── App.jsx
│   ├── components.jsx
│   ├── learning.js
│   ├── main.jsx
│   ├── styles.css
│   └── pro-theme.css
│
├── index.html
├── package.json
├── package-lock.json
└── README.md
```

## Author

**Aairah Parvaiz**

Developed as a project exploring interactive learning, debugging workflows, and adaptive practice experiences.

---

*DebugPath — Every mistake is a step towards better code.*
