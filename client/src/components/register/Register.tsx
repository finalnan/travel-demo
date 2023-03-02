import { FormEvent, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { register } from '../../redux/authSlice';
import { useAppDispatch } from '../../redux/store';

import './Register.scss';

const Register = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const [error, setError] = useState(false);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch(`http://localhost:3001/api/auth/register`, {
        headers: {
          'Content-Type': 'application/json',
        },
        method: 'POST',
        body: JSON.stringify({
          username,
          email,
          password,
        }),
      });
      if (!response.ok) throw new Error('Register Mistake!');

      const data = await response.json();
      dispatch(register(data));
      navigate('/');
    } catch (error) {
      setError(true);
      setTimeout(() => {
        setError(false);
      }, 2500);
    }
  };

  return (
    <div className="register__container">
      <div className="wrapper">
        <div className="leftSide"></div>
        <div className="rightSide">
          <h2>Register</h2>
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              placeholder="Joe Doe"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            <input
              type="email"
              placeholder="Email Address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <button>Register</button>
            <p>
              Already have an account? <Link to="/login">&nbsp;login</Link>
            </p>
          </form>
          {error && (
            <div className="errorMessage">
              Wrong Credentials, Try different ones!
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Register;
