import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { login, demoLogin } from '../../store/session';
import { LogInEmailError } from './errors/EmailError';
import { LogInPasswordError } from './errors/PasswordError';
import './auth.css';

const LoginForm = ({ formTitle, setShowLoginModal, setShowSignupModal }) => {
  const dispatch = useDispatch();
  const user = useSelector(state => state.session.user);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState([]);

  const [emailInvalid, setEmailInvalid] = useState(false);
  const [passwordInvalid, setPasswordInvalid] = useState(false);
  const [submitDisabled, setSubmitDisabled] = useState(true);

  useEffect(() => {
    setSubmitDisabled(!(email.length >= 4 && password.length >= 6));
  }, [email, password]);

  if (user) {
    return <Redirect to='/' />;
  }

  const onLogin = async (e) => {
    e.preventDefault();
    setErrors([]);
    const data = await dispatch(login(email, password));
    if (data) {
      setErrors(data);
    }
  };

  const onDemoLogin = async (e) => {
    e.preventDefault();
    const data = await dispatch(demoLogin());
    if (data) {
      setErrors(data);
    }
  };

  const emailChange = e => {
    setErrors([]);
    setEmail(e.target.value);
  };

  const passwordChange = e => {
    setErrors([]);
    setPassword(e.target.value);
  };

  const validateEmail = e => {
    setEmailInvalid(email.length < 4);
  };

  const validatePassword = e => {
    setPasswordInvalid(password.length < 6);
  };

  const handleSwitchForm = e => {
    setShowLoginModal(false);
    setShowSignupModal(true);
  };

  return (
    <div
      id="login-form"
      className="page-wrapper flex-column centered bordered rounded-corners"
    >
      <form
        className="auth-form stacked-form"
        onSubmit={onLogin}
      >
        <h2 className="centered">{formTitle}</h2>
        <label className="auth-form-element">
          <input
            name='email'
            type='email'
            onChange={emailChange}
            onBlur={validateEmail}
            placeholder='Email'
            value={email}
            required
          />
          <LogInEmailError visible={emailInvalid} />
        </label>

        <label className="auth-form-element">
          <input
            name='password'
            type='password'
            onChange={passwordChange}
            onBlur={validatePassword}
            placeholder='Password'
            value={password}
            required
          />
          <LogInPasswordError visible={passwordInvalid} />
        </label>

        <div>
          {errors.map((error, ind) => (
            <div key={ind}>{error}</div>
          ))}
        </div>

        <div className="flex-row login-buttons">
          <button
            type='submit'
            className={`cursor-pointer button-submit${submitDisabled ? ' disabled' : ''}`}
            disabled={submitDisabled}
          >
            Log In
          </button>
          <button
            className="button-demo-user cursor-pointer"
            onClick={onDemoLogin}
          >
            Demo User
          </button>
        </div>
      </form>

      <p className="switch-form">
        Don't have an account? <span
          className="green-text bolded cursor-pointer"
          onClick={handleSwitchForm}
        >Create One</span>
      </p>
    </div>
  );
};

export default LoginForm;
