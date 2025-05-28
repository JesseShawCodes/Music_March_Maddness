import { React, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const navigate = useNavigate();

  const login = async () => {
    try {
      navigate('/about');
    } catch (e) {
      setError(e.message);
    }
  };
  return (
    <div className="login_page">
      <h1>Log in</h1>
      {error && <p className="error">{error}</p>}

      <div className="form-group">
        <label htmlFor="exampleInputEmail1">
          Email address
          <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter email" value={email} onChange={(e) => setEmail(e.target.value)} autoComplete="email" />
        </label>
        <small id="emailHelp" className="form-text text-muted">We&apos;ll never share your email with anyone else.</small>
      </div>
      <div className="form-group">
        <label htmlFor="password">
          Password
          <input type="password" className="form-control" id="password" placeholder="Your password" value={password} onChange={(e) => setPassword(e.target.value)} autoComplete="current-password" />
        </label>
      </div>
      <div>
        <button onClick={login} className="btn btn-primary" type="submit">Log In</button>
      </div>
      <div>
        <Link to="/create_account">Don&apos;t have an account? Click Here</Link>
      </div>
    </div>
  );
}

export default LoginPage;
