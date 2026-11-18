import React, { useState } from 'react';
import { Bell, Check, ChevronRight, LockKeyhole, UserRound } from 'lucide-react';
import { PageTop } from '../components.jsx';

export default function Settings() {
  const [saved, setSaved] = useState(false);
  const [weekly, setWeekly] = useState(true);
  const [reminder, setReminder] = useState(false);
  const [displayName, setDisplayName] = useState('Aairah');
  function saveSettings(event) {
    event.preventDefault();
    localStorage.setItem('debugpath.profile.v1', JSON.stringify({ displayName, weekly, reminder }));
    setSaved(true);
    window.setTimeout(() => setSaved(false), 2200);
  }
  return (
    <div className="page-content settings-page"><PageTop eyebrow="YOUR SPACE, YOUR PACE" title="Settings" description="Tune your learning workspace and account preferences." /><form onSubmit={saveSettings} className="settings-stack">
      <section className="panel settings-section"><div className="settings-section-heading"><span className="settings-icon"><UserRound size={17} /></span><div><h2>Profile</h2><p>How you appear inside DebugPath.</p></div><span className="settings-section-number">01</span></div><div className="settings-fields"><label className="field-label">Display name<input value={displayName} onChange={event => setDisplayName(event.target.value)} /></label><label className="field-label">Email address<input type="email" defaultValue="aairah@example.com" /></label><label className="field-label">Experience level<select defaultValue="Intermediate"><option>Beginner</option><option>Intermediate</option><option>Advanced</option></select></label></div></section>
      <section className="panel settings-section"><div className="settings-section-heading"><span className="settings-icon"><Bell size={17} /></span><div><h2>Learning reminders</h2><p>Gentle nudges for a steady practice habit.</p></div><span className="settings-section-number">02</span></div><label className="toggle-row"><span><strong>Weekly progress note</strong><small>A quick summary of your practice and wins.</small></span><input type="checkbox" checked={weekly} onChange={event => setWeekly(event.target.checked)} /></label><label className="toggle-row"><span><strong>Practice reminder</strong><small>A reminder when you have not practiced in a while.</small></span><input type="checkbox" checked={reminder} onChange={event => setReminder(event.target.checked)} /></label></section>
      <section className="panel settings-section"><div className="settings-section-heading"><span className="settings-icon"><LockKeyhole size={17} /></span><div><h2>Account & privacy</h2><p>Your learning history is stored in this browser for this prototype.</p></div><span className="settings-section-number">03</span></div><button className="settings-action" type="button"><span><b>Manage password</b><small>Connect authentication to enable account security.</small></span><ChevronRight size={16} /></button><button className="settings-action" type="button" onClick={() => { localStorage.removeItem('debugpath.learning.v1'); window.location.reload(); }}><span><b>Clear local practice history</b><small>Reset saved challenges and mistakes on this device.</small></span><ChevronRight size={16} /></button></section>
      <div className="settings-footer"><span>These prototype settings are stored locally in your browser.</span><button className="button button-lime" type="submit">{saved ? <><Check size={15} /> Saved</> : 'Save preferences'}</button></div>
    </form></div>
  );
}
