import React from 'react';
import { NavLink, Outlet } from 'react-router-dom';
import { Activity, Award, BarChart3, BookOpenCheck, Bug, Code2, LayoutDashboard, Map, Settings as SettingsIcon } from 'lucide-react';

export function Brand({ inverse = false }) {
  return <NavLink to="/" className={`brand${inverse ? ' brand-inverse' : ''}`} aria-label="DebugPath home"><span className="brand-mark">d<span>.</span></span><span>debugpath</span></NavLink>;
}

const navGroups = [
  { title: 'WORKSPACE', items: [
    { to: '/dashboard', label: 'Overview', icon: LayoutDashboard },
    { to: '/practice', label: 'Practice lab', icon: Code2 },
    { to: '/learning-path', label: 'Learning path', icon: Map },
  ] },
  { title: 'YOUR GROWTH', items: [
    { to: '/mistakes', label: 'Mistake notebook', icon: Bug },
    { to: '/analytics', label: 'Analytics', icon: BarChart3 },
    { to: '/achievements', label: 'Achievements', icon: Award },
  ] },
];

export function AppShell() {
  return (
    <div className="app-shell">
      <aside className="sidebar">
        <Brand inverse />
        <div className="workspace-switch"><span className="workspace-icon">D</span><span><b>DebugPath</b><small>Personal workspace</small></span><span className="workspace-chevron">⌄</span></div>
        {navGroups.map(group => <div className="nav-group" key={group.title}><div className="sidebar-label">{group.title}</div><nav className="side-nav" aria-label={group.title}>{group.items.map(({ to, label, icon: Icon }) => <NavLink key={to} to={to} className={({ isActive }) => `side-link${isActive ? ' active' : ''}`}><Icon size={16} strokeWidth={1.8} /><span>{label}</span>{to === '/mistakes' && <span className="nav-dot" />}</NavLink>)}</nav></div>)}
        <div className="sidebar-spacer" />
        <div className="sidebar-coach"><span className="coach-icon"><BookOpenCheck size={15} /></span><div><b>Keep your streak alive</b><small>One more challenge today.</small></div><span className="coach-spark">✳</span></div>
        <NavLink to="/settings" className={({ isActive }) => `side-link settings-link${isActive ? ' active' : ''}`}><SettingsIcon size={16} /><span>Settings</span></NavLink>
        <div className="sidebar-user"><div className="user-avatar">A</div><div className="user-copy"><b>Aairah</b><small>Learning account</small></div><button className="user-menu" aria-label="Account menu">···</button></div>
        <div className="sidebar-foot">DEBUGPATH <span>•</span> BUILD 01</div>
      </aside>
      <main className="app-main"><Outlet /></main>
    </div>
  );
}

export function PageTop({ eyebrow, title, description, children }) {
  return <header className="page-top"><div className="page-title"><div className="eyebrow">{eyebrow}</div><h1>{title}</h1>{description && <p>{description}</p>}</div><div className="page-actions">{children}</div></header>;
}

export function SectionHeading({ title, action, to = '/practice', description }) {
  return <div className="section-heading"><div><h2>{title}</h2>{description && <p>{description}</p>}</div>{action && <NavLink to={to} className="text-link">{action}<span>↗</span></NavLink>}</div>;
}

export function StatCard({ label, value, note, icon: Icon, tone = '' }) {
  return <article className={`stat-card ${tone}`}><div className="stat-head"><span>{label}</span>{Icon && <Icon size={16} strokeWidth={1.8} />}</div><div className="stat-value">{value}</div>{note && <div className="stat-note"><Activity size={12} />{note}</div>}</article>;
}
