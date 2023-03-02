import { FormEvent, useState } from 'react';
import { useAppDispatch } from '../../redux/store';
import { Link, useNavigate } from 'react-router-dom';
import { login } from '../../redux/authSlice';
import './Login.scss';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [error, setError] = useState(false);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    try {
      const response = await fetch(`http://localhost:3001/api/auth/login`, {
        headers: {
          'Content-Type': 'application/json',
        },
        method: 'POST',
        body: JSON.stringify({
          email,
          password,
        }),
      });
      const data = await response.json();
      console.log(data);
      dispatch(login(data));
      navigate('/');
    } catch (error) {
      setError(true);
      setTimeout(() => {
        setError(false);
      }, 2500);
    }
  };

  return (
    <div className="login__container">
      <div className="wrapper">
        <div className="leftSide" />
        <div className="rightSide">
          <h2 className="title">Login</h2>
          <form onSubmit={handleSubmit}>
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
            <button type="submit">Login</button>
            <p>
              Don't have an account?<Link to="/register">&nbsp;Sign up</Link>
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

export default Login;
