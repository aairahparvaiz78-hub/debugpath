import React, { useState } from 'react';
import { ArrowRight, ChevronDown, RotateCcw } from 'lucide-react';
import { Link } from 'react-router-dom';
import { PageTop } from '../components.jsx';
import { challenges, loadLearningData } from '../learning.js';

export default function Mistakes() {
  const [openSolutions, setOpenSolutions] = useState({});
  const data = loadLearningData();
  const mistakes = data.attempts.filter(attempt => !attempt.passed).slice().reverse();
  const missCount = {};
  mistakes.forEach(item => { missCount[item.challengeId] = (missCount[item.challengeId] || 0) + 1; });
  const topicCounts = {};
  mistakes.forEach(item => { topicCounts[item.topic] = (topicCounts[item.topic] || 0) + 1; });
  const repeated = Object.entries(topicCounts).sort((a, b) => b[1] - a[1])[0];

  return (
    <div className="page-content mistakes-page">
      <PageTop eyebrow="LEARN FROM THE TRACE" title="Mistake notebook" description="Every wrong turn leaves a clue. Review the pattern, then give it another go."><span className="notebook-count"><b>{mistakes.length}</b> saved {mistakes.length === 1 ? 'mistake' : 'mistakes'}</span></PageTop>
      {repeated && <div className="repeat-banner"><span className="repeat-symbol">↻</span><div><b>Pattern spotted in {repeated[0]}</b><p>You’ve hit this topic {repeated[1]} {repeated[1] === 1 ? 'time' : 'times'}. Revisit the idea, then try a fresh challenge.</p></div><Link to="/learning-path">Review path <ArrowRight size={14} /></Link></div>}
      {mistakes.length === 0 ? <section className="empty-state"><div className="empty-illustration"><span>✓</span></div><span className="eyebrow">CLEAR NOTEBOOK</span><h2>No mistakes saved yet.</h2><p>When you submit an incorrect solution, DebugPath will keep the attempt and its explanation here.</p><Link className="button button-dark" to="/practice">Try a challenge <ArrowRight size={14} /></Link></section> : <div className="mistake-list">{mistakes.map((attempt, index) => <article className="mistake-card" key={attempt.id}><div className="mistake-order">{String(mistakes.length - index).padStart(2, '0')}</div><div className="mistake-main"><div className="mistake-meta"><span>{attempt.topic}</span><span>{attempt.level}</span><span>{new Date(attempt.createdAt).toLocaleDateString()}</span></div><h2>{attempt.title}</h2><div className="error-category"><span className="error-dot" />{attempt.category}<span className="attempt-count">{missCount[attempt.challengeId]} {missCount[attempt.challengeId] === 1 ? 'attempt' : 'attempts'} on this challenge</span></div><div className="mistake-explanation"><b>What happened</b><p>{attempt.explanation}</p><div className="mistake-hint"><span>HINT</span>{attempt.hint}</div></div>{openSolutions[attempt.id] && <div className="solution-reveal"><b>One working solution</b><pre>{attempt.solution}</pre></div>}<div className="mistake-actions"><button className="text-button" onClick={() => setOpenSolutions(current => ({ ...current, [attempt.id]: !current[attempt.id] }))}><ChevronDown size={14} />{openSolutions[attempt.id] ? 'Hide solution' : 'Reveal solution'}</button><Link to={`/practice?id=${attempt.challengeId}`}><RotateCcw size={13} /> Retry challenge</Link></div></div></article>)}</div>}
      <div className="notebook-footnote">MISTAKES ARE SIGNALS, NOT SCORES <span>✳</span></div>
    </div>
  );
}
