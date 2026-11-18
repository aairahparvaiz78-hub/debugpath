import React from 'react';
import { Activity, ArrowUpRight, Bug, CalendarDays, Target } from 'lucide-react';
import { PageTop, SectionHeading, StatCard } from '../components.jsx';
import { challenges, getLearningStats, loadLearningData } from '../learning.js';

export default function Analytics() {
  const data = loadLearningData();
  const stats = getLearningStats(data);
  const topics = [...new Set(challenges.map(challenge => challenge.topic))].map(topic => {
    const attempts = data.attempts.filter(attempt => attempt.topic === topic);
    const correct = attempts.filter(attempt => attempt.passed).length;
    return { topic, attempts: attempts.length, accuracy: attempts.length ? Math.round((correct / attempts.length) * 100) : 0, misses: attempts.filter(attempt => !attempt.passed).length };
  }).sort((a, b) => b.misses - a.misses);
  const activity = Array.from({ length: 7 }, (_, index) => {
    const day = new Date(); day.setDate(day.getDate() - (6 - index));
    const key = `${day.getFullYear()}-${String(day.getMonth() + 1).padStart(2, '0')}-${String(day.getDate()).padStart(2, '0')}`;
    const count = data.attempts.filter(attempt => {
      const date = new Date(attempt.createdAt);
      return date.getFullYear() === day.getFullYear() && date.getMonth() === day.getMonth() && date.getDate() === day.getDate();
    }).length;
    return { key, label: day.toLocaleDateString('en', { weekday: 'short' }).slice(0, 1), count };
  });
  const maxActivity = Math.max(1, ...activity.map(item => item.count));

  return (
    <div className="page-content analytics-page">
      <PageTop eyebrow="SIGNALS, NOT SCORES" title="Your analytics" description="See what’s clicking, where you’re getting stuck, and how your practice is adding up."><span className="range-select"><CalendarDays size={14} /> All time</span></PageTop>
      <div className="stats-grid analytics-stats"><StatCard label="Accuracy" value={`${stats.accuracy}%`} note={stats.totalAttempts ? 'Across submitted attempts' : 'Appears after your first attempt'} icon={Target} tone="stat-lime" /><StatCard label="Fixes made" value={stats.solved} note={`${challenges.length} starter challenges`} icon={ArrowUpRight} /><StatCard label="Practice days" value={data.practiceDays.length} note="Different days in this browser" icon={Activity} /></div>
      <div className="analytics-columns"><section className="panel activity-panel"><SectionHeading title="Practice rhythm" description="Submissions from the last seven days." /><div className="activity-summary"><strong>{stats.totalAttempts}</strong><span>total submissions</span><i>LOCAL HISTORY</i></div><div className="activity-chart">{activity.map((item, index) => <div className="activity-column" key={item.key}><span className="activity-value">{item.count || ''}</span><div className="activity-bar-track"><i className={index === 6 ? 'today' : ''} style={{ height: `${Math.max(5, (item.count / maxActivity) * 100)}%` }} /></div><span className="activity-label">{item.label}</span></div>)}</div><div className="chart-caption"><span>LESS</span><i /><i /><i /><i /><b>MORE</b></div></section>
        <section className="panel topic-panel"><SectionHeading title="Topic signals" description="Accuracy and attempts by skill." /><div className="topic-signals">{topics.map((topic, index) => <div className="topic-signal" key={topic.topic}><div className={`topic-signal-icon tone-${index % 4}`}>{topic.topic.slice(0, 1)}</div><div className="topic-signal-copy"><div><b>{topic.topic}</b><span>{topic.attempts ? `${topic.attempts} attempts` : 'Not practiced yet'}</span></div><div className="topic-meter"><i style={{ width: `${topic.attempts ? topic.accuracy : 0}%` }} /></div></div><strong>{topic.attempts ? `${topic.accuracy}%` : '—'}</strong></div>)}</div></section></div>
      <section className="insight-strip"><span className="insight-icon"><Bug size={15} /></span><div><b>{stats.weakTopics.length ? `${stats.weakTopics[0].topic} is showing up in your mistakes.` : 'Your debugging pattern will appear here.'}</b><p>{stats.weakTopics.length ? 'Use your notebook to see why, then follow the recommended practice to strengthen that skill.' : 'Submit a few challenges and DebugPath will surface topics that need another look.'}</p></div><a href="/mistakes">Open notebook ↗</a></section>
    </div>
  );
}
