"use client"
import { React, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';

export default function CreateAccountPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const navigate = useNavigate();

  const createAccount = async () => {
    try {
      if (password !== confirmPassword) {
        setError('Passwords do no match');
        return;
      }

      await createUserWithEmailAndPassword(getAuth(), email, password);
      navigate('/articles');
    } catch (e) {
      setError(e.messages);
    }
  };

  return (
    <div className="login_page">
      <h1>Create Account</h1>
      {error && <p className="error">{error}</p>}

      <div className="form-group">
        <label htmlFor="email-input">
          Email address
          <input type="email" className="form-control" id="email-input" aria-describedby="emailHelp" placeholder="Enter email" value={email} onChange={(e) => setEmail(e.target.value)} autoComplete="email" />
        </label>
      </div>
      <small id="emailHelp" className="form-text text-muted">We&apos;ll never share your email with anyone else.</small>
      <div className="form-group">
        <label htmlFor="password1">
          Password
          <input type="password" className="form-control" id="password1" placeholder="Your password" value={password} onChange={(e) => setPassword(e.target.value)} autoComplete="current-password" />
        </label>
      </div>
      <div className="form-group">
        <label htmlFor="confirm-password">
          Confirm Password
          <input type="password" className="form-control" id="confirm-password" placeholder="Re-enter password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} autoComplete="current-password" />
        </label>
      </div>
      <div>
        <button onClick={createAccount} className="btn btn-primary" type="submit">Create Account</button>
      </div>
      <div>
        <Link to="/login">Already have an account? Click Here</Link>
      </div>
    </div>
  );
}
