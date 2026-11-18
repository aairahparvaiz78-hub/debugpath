import React from 'react';
import { ArrowRight, LockKeyhole, Sparkles } from 'lucide-react';
import { Link } from 'react-router-dom';
import { PageTop } from '../components.jsx';
import { getAchievements, getLearningStats, loadLearningData } from '../learning.js';

export default function Achievements() {
  const data = loadLearningData();
  const achievements = getAchievements(data);
  const stats = getLearningStats(data);
  const unlocked = achievements.filter(item => item.unlocked).length;
  return (
    <div className="page-content achievements-page">
      <PageTop eyebrow="MILESTONES & MOMENTUM" title="Achievements" description="Small wins deserve a little spotlight."><span className="achievement-total"><Sparkles size={14} /> {unlocked} / {achievements.length} unlocked</span></PageTop>
      <section className="achievement-hero"><div className="achievement-hero-copy"><span className="eyebrow">YOUR DEBUGGING STORY</span><h2>Every fix makes<br /><em>you sharper.</em></h2><p>Collect milestones as you practice, learn from mistakes, and build a steady routine.</p></div><div className="achievement-hero-stat"><strong>{stats.solved}</strong><span>FIXES MADE</span><div className="achievement-orbit orbit-one" /><div className="achievement-orbit orbit-two" /><span className="orbit-star">✳</span></div></section>
      <div className="achievement-grid">{achievements.map((item, index) => <article className={`achievement-card${item.unlocked ? ' unlocked' : ' locked'}`} key={item.id}><div className="achievement-number">{String(index + 1).padStart(2, '0')}</div><div className="achievement-badge"><span>{item.icon}</span>{!item.unlocked && <i><LockKeyhole size={12} /></i>}</div><div className="achievement-copy"><span className="eyebrow">{item.unlocked ? 'UNLOCKED' : 'IN PROGRESS'}</span><h3>{item.title}</h3><p>{item.detail}</p></div><div className="achievement-status">{item.unlocked ? <span className="unlocked-check">✓</span> : <span className="locked-label">LOCKED</span>}</div></article>)}</div>
      <div className="achievement-cta"><div><b>Ready to earn your next one?</b><p>Your next recommended challenge is waiting.</p></div><Link className="button button-lime" to="/practice">Go to practice <ArrowRight size={14} /></Link></div>
    </div>
  );
}
