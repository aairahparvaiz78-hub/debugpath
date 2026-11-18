import React, { useState } from 'react';
import { ArrowLeft, ArrowRight, Eye, EyeOff, LockKeyhole, Mail, Sparkles } from 'lucide-react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Brand } from '../components.jsx';

export default function Auth() {
  const location = useLocation();
  const navigate = useNavigate();
  const signup = location.pathname === '/signup';
  const [showPassword, setShowPassword] = useState(false);
  const [notice, setNotice] = useState('');

  function handleSubmit(event) {
    event.preventDefault();
    setNotice('Demo mode: connecting real accounts needs a backend. Opening your workspace…');
    window.setTimeout(() => navigate('/dashboard'), 900);
  }

  return (
    <main className="auth-page"><section className="auth-story"><header><Brand inverse /><Link to="/" className="auth-back"><ArrowLeft size={14} /> Home</Link></header><div className="auth-story-body"><span className="auth-pip"><Sparkles size={13} /> DEBUG WITH INTENTION</span><h1>{signup ? <>Make room<br />for <em>better bugs.</em></> : <>Welcome<br />back to the<br /><em>workbench.</em></>}</h1><p>{signup ? 'Build a practice habit that makes the next tricky bug feel a little less mysterious.' : 'Your next debugging breakthrough is waiting right where you left off.'}</p><div className="auth-code-sample"><span>01</span><code><b>if</b> curious:</code><span>02</span><code>&nbsp;&nbsp;keep_learning()</code><span>03</span><code>&nbsp;&nbsp;fix_the_bug()</code><span className="auth-code-cursor">_</span></div></div><div className="auth-story-foot"><span>THINK CLEARLY</span><i /> <span>TRACE DEEPLY</span><i /> <span>GROW DAILY</span></div></section>
      <section className="auth-form-side"><div className="auth-mobile-brand"><Brand inverse /></div><div className="auth-card"><div className="auth-tabs"><Link className={!signup ? 'selected' : ''} to="/login">Log in</Link><Link className={signup ? 'selected' : ''} to="/signup">Create account</Link></div><div className="auth-intro"><span className="eyebrow">YOUR PRACTICE SPACE</span><h2>{signup ? 'Start your path.' : 'Good to see you.'}</h2><p>{signup ? 'Set up a learner profile to begin.' : 'Sign in to continue building your debugging instinct.'}</p></div><form onSubmit={handleSubmit}>{signup && <label className="field-label">Name<div className="input-wrap"><span className="field-icon">✳</span><input required placeholder="Your name" autoComplete="name" /></div></label>}<label className="field-label">Email address<div className="input-wrap"><Mail size={15} /><input type="email" required placeholder="you@example.com" autoComplete="email" /></div></label><label className="field-label">Password<div className="input-wrap"><LockKeyhole size={15} /><input type={showPassword ? 'text' : 'password'} required minLength={6} placeholder="At least 6 characters" autoComplete={signup ? 'new-password' : 'current-password'} /><button className="input-action" type="button" aria-label={showPassword ? 'Hide password' : 'Show password'} onClick={() => setShowPassword(!showPassword)}>{showPassword ? <EyeOff size={15} /> : <Eye size={15} />}</button></div></label>{!signup && <div className="forgot-row"><label className="check-label"><input type="checkbox" /> Keep me signed in</label><button type="button" className="quiet-button" onClick={() => setNotice('Password reset needs an email service connection.')}>Forgot password?</button></div>}<button className="button button-lime button-full" type="submit">{signup ? 'Create my account' : 'Log in'} <ArrowRight size={15} /></button></form><div className="auth-divider"><span /> OR CONTINUE WITH <span /></div><div className="social-row"><button type="button" onClick={() => setNotice('Social sign-in needs a provider connection.')}>◉ <span>GitHub</span></button><button type="button" onClick={() => setNotice('Social sign-in needs a provider connection.')}>G <span>Google</span></button></div>{notice && <div className="form-notice" role="status">{notice}</div>}<p className="auth-legal">By continuing, you agree to our <a href="#terms">Terms</a> and <a href="#privacy">Privacy Policy</a>.</p></div><div className="auth-side-foot"><span>DEBUGPATH / PERSONAL LEARNING WORKSPACE</span><span>01—05</span></div></section></main>
  );
}
