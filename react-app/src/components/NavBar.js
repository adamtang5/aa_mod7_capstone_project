
import React, { useState } from 'react';
import { Modal } from './Modal';
import { NavLink } from 'react-router-dom';
import LoginForm from './auth/LoginForm';
import SignUpForm from './auth/SignUpForm';
import LogoutButton from './auth/LogoutButton';

const NavBar = () => {
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showSignupModal, setShowSignupModal] = useState(false);

  const switchToSignupForm = e => {
    e.preventDefault();
    setShowLoginModal(false);
    setShowSignupModal(true);
  };

  const switchToLoginForm = e => {
    e.preventDefault();
    setShowSignupModal(false);
    setShowLoginModal(true);
  };

  return (
    <nav>
      <div>
        <NavLink to='/' exact={true} activeClassName='active'>
          Home
        </NavLink>
      </div>
      <div className="auth-modal">
        <span
          className="nav-button"
          onClick={() => setShowLoginModal(true)}
        >Log In</span>
        {showLoginModal && (
          <Modal onClose={() => setShowLoginModal(false)}>
            <LoginForm
              handleSwitchForm={switchToSignupForm}
              formTitle="Welcome back."
            />
          </Modal>
        )}
      </div>

      <div className="auth-modal">
        <span
          className="nav-button"
          onClick={() => setShowSignupModal(true)}
        >Sign Up</span>
        {showSignupModal && (
          <Modal onClose={() => setShowSignupModal(false)}>
            <SignUpForm
              handleSwitchForm={switchToLoginForm}
              formTitle="Join Mira."
            />
          </Modal>
        )}
      </div>

      <div>
        <NavLink to='/users' exact={true} activeClassName='active'>
          Users
        </NavLink>
      </div>
      <div>
        <LogoutButton />
      </div>
    </nav>
  );
}

export default NavBar;
