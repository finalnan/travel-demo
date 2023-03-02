import './Navbar.scss';
import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../redux/store';
import { logout } from '../../redux/authSlice';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const { user } = useAppSelector((state) => state.auth);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout());
    navigate('/login');
  };

  window.onscroll = () => {
    setIsScrolled(window.scrollY === 0 ? false : true);

    return () => (window.onscroll = null);
  };

  return (
    <div className={`navbar__container ${isScrolled ? 'active' : ''}`}>
      <div className="navbar__wrapper">
        <div className="left">
          <Link to="/">
            <h2 className="title">WebDevMania</h2>
          </Link>
        </div>
        <div className="center">
          <ul className={`list ${isScrolled ? 'active__list' : ''}`}>
            <li className="listItem">
              <a href="/">Home</a>
            </li>
            <li className="listItem">
              <a href="#about">About</a>
            </li>
            <li className="listItem">
              <a href="#services">Services</a>
            </li>
            <li className="listItem">
              <a href="#suggested">Suggested</a>
            </li>
          </ul>
        </div>
        <div className="right">
          {user ? (
            <>
              <Link to="/create" className="main_btn">
                Create
              </Link>
              <button className="secondary_btn" onClick={handleLogout}>
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className="main_btn">
                Login
              </Link>
              <Link to="/register" className="secondary_btn">
                Sign Up
              </Link>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
