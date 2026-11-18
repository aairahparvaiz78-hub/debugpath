import React from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import { AppShell } from './components.jsx';
import Analytics from './pages/Analytics.jsx';
import Auth from './pages/Auth.jsx';
import Achievements from './pages/Achievements.jsx';
import Dashboard from './pages/Dashboard.jsx';
import Home from './pages/Home.jsx';
import LearningPath from './pages/LearningPath.jsx';
import Mistakes from './pages/Mistakes.jsx';
import Practice from './pages/Practice.jsx';
import Settings from './pages/Settings.jsx';

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Auth />} />
      <Route path="/signup" element={<Auth />} />
      <Route element={<AppShell />}>
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/practice" element={<Practice />} />
        <Route path="/learning-path" element={<LearningPath />} />
        <Route path="/mistakes" element={<Mistakes />} />
        <Route path="/analytics" element={<Analytics />} />
        <Route path="/achievements" element={<Achievements />} />
        <Route path="/settings" element={<Settings />} />
      </Route>
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}
