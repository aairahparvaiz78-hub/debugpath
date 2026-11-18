import React, { useEffect, useMemo, useState } from 'react';
import { ArrowLeft, ArrowRight, Check, ChevronDown, CircleHelp, Clock3, Lightbulb, Play, RotateCcw, Send, Sparkles } from 'lucide-react';
import { Link, useSearchParams } from 'react-router-dom';
import { PageTop } from '../components.jsx';
import { challenges, evaluateChallenge, loadLearningData, recommendChallenge, recordAttempt } from '../learning.js';

function escapeHtml(text) {
  return text.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}

function highlightLine(line) {
  return escapeHtml(line).replace(/(#.*$|"(?:[^"\\]|\\.)*"|'(?:[^'\\]|\\.)*'|\b(?:def|for|in|if|elif|else|return|range|print|True|False|None|and|or|not)\b|\b\d+\b)/g, token => {
    const kind = token.startsWith('#') ? 'token-comment' : token.startsWith('"') || token.startsWith("'") ? 'token-string' : /^\d/.test(token) ? 'token-number' : 'token-keyword';
    return `<span class="${kind}">${token}</span>`;
  });
}

export default function Practice() {
  const [searchParams] = useSearchParams();
  const data = loadLearningData();
  const recommended = recommendChallenge(data);
  const challenge = useMemo(() => challenges.find(item => item.id === searchParams.get('id')) || recommended, [searchParams, recommended.id]);
  const [code, setCode] = useState(challenge.starterCode);
  const [result, setResult] = useState(null);
  const [solutionOpen, setSolutionOpen] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    setCode(challenge.starterCode);
    setResult(null);
    setSolutionOpen(false);
    setSubmitted(false);
  }, [challenge.id]);

  function handleRun(submit = false) {
    const checked = evaluateChallenge(challenge, code);
    setResult(checked);
    setSubmitted(submit);
    if (submit) recordAttempt(challenge, code, checked);
  }

  const lines = code.split('\n');
  return (
    <div className="page-content practice-page">
      <PageTop eyebrow={`PRACTICE LAB / ${challenge.topic.toUpperCase()}`} title={challenge.title} description={challenge.prompt}><span className="difficulty-chip">{challenge.level}<i /> {challenge.minutes} MIN</span></PageTop>
      <div className="practice-toolbar"><Link to="/dashboard" className="back-link"><ArrowLeft size={14} /> Back to overview</Link><div className="practice-context"><span className="context-pulse" /> ADAPTIVE SESSION <span className="context-divider">/</span> {challenge.topic.toUpperCase()}</div></div>
      <div className="practice-workbench">
        <section className="problem-column">
          <article className="problem-brief"><div className="problem-brief-head"><span className="brief-index">01</span><span className="eyebrow">THE CHALLENGE</span><span className="brief-help"><CircleHelp size={15} /></span></div><h2>Read the trace.<br /><em>Find the fault.</em></h2><p>{challenge.prompt}</p><div className="expected-output"><span>EXPECTED OUTPUT</span><code>{challenge.expected}</code></div><div className="problem-hint"><Lightbulb size={15} /><span>Start by following the variable through each loop or condition.</span></div></article>
          <article className="assistant-card"><div className="assistant-heading"><span className="assistant-icon"><Sparkles size={15} /></span><div><b>Debugging assistant</b><small>HINTS THAT HELP YOU THINK</small></div><span className="assistant-live">READY</span></div>{result && !result.passed ? <div className="assistant-feedback"><span className="error-badge">{result.category}</span><p>{result.explanation}</p><div className="assistant-hint"><b>HINT</b><span>{result.hint}</span></div></div> : result?.passed ? <div className="assistant-success"><Check size={15} /><span>Clean fix. You corrected the bug and passed the checks.</span></div> : <p className="assistant-empty">Run a check to get a line-level explanation, then reveal the solution only if you need it.</p>}{result && <button className="solution-toggle" onClick={() => setSolutionOpen(!solutionOpen)}><ChevronDown size={14} /> {solutionOpen ? 'Hide solution' : 'Reveal full solution'}</button>}{solutionOpen && <pre className="solution-code">{challenge.solution}</pre>}</article>
        </section>
        <section className="editor-column"><div className="editor-card"><div className="editor-topbar"><div className="file-tab"><span className="file-language">Py</span><span>challenge.py</span><span className="file-unsaved">●</span></div><div className="editor-top-actions"><span className="editor-status"><i /> Python 3.11</span><button className="icon-text-button" onClick={() => { setCode(challenge.starterCode); setResult(null); setSubmitted(false); }}><RotateCcw size={13} /> Reset</button></div></div>
            <div className="code-editor"><div className="line-gutter">{lines.map((_, index) => <span className={result?.issueLine === index + 1 && !result.passed ? 'line-error' : ''} key={index}>{String(index + 1).padStart(2, '0')}</span>)}</div><div className="code-surface"><pre className="code-highlight" aria-hidden="true">{lines.map((line, index) => <span className={`code-line${result?.issueLine === index + 1 && !result.passed ? ' highlighted-error' : ''}`} key={index} dangerouslySetInnerHTML={{ __html: highlightLine(line) || ' ' }} />)}</pre><textarea aria-label="Python code editor" spellCheck="false" value={code} onChange={event => { setCode(event.target.value); setResult(null); setSubmitted(false); }} onScroll={event => { const pre = event.currentTarget.previousSibling; pre.scrollTop = event.currentTarget.scrollTop; pre.scrollLeft = event.currentTarget.scrollLeft; }} /></div></div>
            <div className="editor-bottom"><span><i className="editor-bottom-dot" /> {lines.length} lines <span className="bottom-divider">·</span> Spaces: 4</span><div><button className="button button-run" onClick={() => handleRun(false)}><Play size={13} fill="currentColor" /> Run checks</button><button className="button button-lime" onClick={() => handleRun(true)}><Send size={13} /> Submit solution</button></div></div>
          </div>
          <div className="execution-note"><span>ⓘ</span> This starter uses local rule checks for the sample challenges; it does not execute arbitrary Python code.</div>
          {result && <section className={`results-panel${result.passed ? ' result-good' : ' result-bad'}`}><div className="results-header"><div><span className={`result-state-icon${result.passed ? ' passed' : ''}`}>{result.passed ? <Check size={14} /> : '!'}</span><div><b>{result.passed ? (submitted ? 'Challenge solved' : 'All checks passed') : 'A bug is still hiding'}</b><small>{submitted ? 'Your attempt was added to your learning history.' : 'Run a check, then submit when you’re ready.'}</small></div></div><span className="runtime"><Clock3 size={12} /> {result.runtime}</span></div><div className="test-list">{result.tests.map((test, index) => <div className="test-row" key={test.name}><span className={test.passed ? 'test-check pass' : 'test-check fail'}>{test.passed ? '✓' : '×'}</span><span>{test.name}</span><span className={test.passed ? 'test-passed' : 'test-failed'}>{test.passed ? 'Passed' : 'Failed'}</span><span className="test-number">0{index + 1}</span></div>)}</div>{result.passed && <Link className="next-challenge-link" to="/learning-path">View your updated learning path <ArrowRight size={14} /></Link>}</section>}
        </section>
      </div>
    </div>
  );
}
