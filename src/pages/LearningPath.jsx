import React from 'react';
import { ArrowRight, Check, LockKeyhole, Sparkles } from 'lucide-react';
import { Link } from 'react-router-dom';
import { PageTop } from '../components.jsx';
import { challenges, getLearningStats, isChallengeUnlocked, loadLearningData, recommendChallenge } from '../learning.js';

const levelOrder = ['Beginner', 'Intermediate', 'Advanced'];

export default function LearningPath() {
  const data = loadLearningData();
  const stats = getLearningStats(data);
  const recommended = recommendChallenge(data);
  return (
    <div className="page-content learning-page">
      <PageTop eyebrow="YOUR PERSONAL ROUTE" title="Learning path" description="A flexible route through the debugging skills you’re building."><span className="status-pill"><span className="status-pulse" /> PATH ACTIVE</span></PageTop>
      <section className="path-hero"><div><span className="path-kicker"><Sparkles size={13} /> ADAPTS TO YOUR PRACTICE</span><h2>Build your debugging<br /><em>instincts, one fix at a time.</em></h2><p>Challenges unlock as you grow. Your recent attempts shape what we recommend next.</p><Link to={`/practice?id=${recommended.id}`} className="button button-lime">Continue your path <ArrowRight size={15} /></Link></div><div className="path-progress-visual"><div className="progress-ring" style={{ background: `conic-gradient(var(--lime) ${Math.round((data.solvedIds.length / challenges.length) * 100)}%, rgba(235,244,229,.12) 0)` }}><div><strong>{Math.round((data.solvedIds.length / challenges.length) * 100)}%</strong><small>COMPLETE</small></div></div><div className="path-progress-caption"><b>{data.solvedIds.length} <span>/ {challenges.length}</span></b><small>challenges solved</small></div></div></section>
      {levelOrder.map((level, levelIndex) => {
        const levelChallenges = challenges.filter(challenge => challenge.level === level);
        const solvedInLevel = levelChallenges.filter(challenge => data.solvedIds.includes(challenge.id)).length;
        return <section className={`path-level level-${levelIndex}`} key={level}><div className="level-marker"><span>{String(levelIndex + 1).padStart(2, '0')}</span><i /></div><div className="level-content"><div className="level-heading"><div><span className="eyebrow">STAGE {String(levelIndex + 1).padStart(2, '0')}</span><h2>{level}</h2></div><span className="level-count">{solvedInLevel}/{levelChallenges.length} complete</span></div><div className="challenge-track">{levelChallenges.map((challenge, index) => {
          const solved = data.solvedIds.includes(challenge.id);
          const unlocked = isChallengeUnlocked(challenge, data);
          const isRecommended = recommended.id === challenge.id && !solved;
          return <article className={`path-challenge${solved ? ' completed' : ''}${!unlocked ? ' locked' : ''}${isRecommended ? ' recommended' : ''}`} key={challenge.id}><div className="path-challenge-icon">{solved ? <Check size={16} /> : unlocked ? <span>{String(index + 1).padStart(2, '0')}</span> : <LockKeyhole size={14} />}</div><div className="path-challenge-copy"><div className="path-challenge-tags"><span>{challenge.topic}</span><span>{challenge.minutes} min</span>{isRecommended && <b>RECOMMENDED</b>}</div><h3>{challenge.title}</h3><p>{challenge.prompt}</p></div>{unlocked ? <Link className="path-open" to={`/practice?id=${challenge.id}`} aria-label={`Open ${challenge.title}`}><ArrowRight size={16} /></Link> : <span className="locked-note">LOCKED</span>}</article>;
        })}</div></div></section>;
      })}
      <aside className="path-recommendation"><span className="recommendation-icon"><Sparkles size={16} /></span><div><b>Why this next?</b><p>{stats.weakTopics.length ? `You have a few more ${stats.weakTopics[0].topic.toLowerCase()} bugs to untangle. We’ve queued practice in that area.` : 'Start with a short challenge. Your path will adapt to what you find tricky.'}</p></div><Link to={`/practice?id=${recommended.id}`}>Start <ArrowRight size={14} /></Link></aside>
    </div>
  );
}
