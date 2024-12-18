/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
/* eslint-disable space-in-parens */
/* eslint-disable object-curly-spacing */
/* eslint-disable quotes */
/* eslint-disable indent */
/* eslint-disable arrow-parens */
/* eslint-disable semi */
/* eslint-disable react/jsx-indent-props */
/* eslint-disable react/jsx-indent */
/* eslint-disable brace-style */
/* eslint-disable jsx-quotes */
/* eslint-disable operator-linebreak */
/* eslint-disable no-shadow */
/* eslint-disable react/jsx-wrap-multilines */
/* eslint-disable  no-multiple-empty-lines */
/* eslint-disable prefer-template */
/* eslint-disable space-infix-ops */
/* eslint-disable react/jsx-one-expression-per-line */
/* eslint-disable prefer-template */
/* eslint-disable react/jsx-tag-spacing */
/* eslint-disable react/jsx-curly-newline */

import { React, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const navigate = useNavigate();

  const login = async() => {
    try {
      await signInWithEmailAndPassword(getAuth(), email, password);
      navigate('/about');
    } catch (e) {
      setError(e.message);
    }
  }
  return (
    <div className="login_page">
      <h1>Log in</h1>
      {error && <p className="error">{error}</p>}

      <div className="form-group">
        <label htmlFor="exampleInputEmail1">Email address</label>
        <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter email" value={email} onChange={e => setEmail(e.target.value)} autoComplete="email"/>
        <small id="emailHelp" className="form-text text-muted">We&apos;ll never share your email with anyone else.</small>
      </div>
      <div className="form-group">
        <label htmlFor="exampleInputPassword1">Password</label>
        <input type="password" className="form-control" id="exampleInputPassword1" placeholder="Your password" value={password} onChange={(e) => setPassword(e.target.value) } autoComplete="current-password"/>
      </div>
      <div>
        <button onClick={login} className="btn btn-primary" type="submit">Log In</button>
      </div>
      <div>
        <Link to="/create_account">Don&apos;t have an account? Click Here</Link>
      </div>
    </div>
  );
};

export default LoginPage;
